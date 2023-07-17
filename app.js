require('dotenv').config();
const db = require('./config/database')
//require('./config/database').connect();     // incase of using exports.connect() this will be used,in my case i am using module.exports

const User = require('./model/user')
const express = require('express')
const {validationResult, check}= require('express-validator')
const app = express();
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const auth = require('./middleware/auth')

app.use(express.json())

db.connection

app.post('/register',[check('email').isEmail().withMessage('invalid emial'),
check('password').isLength({min:3 , max:9}).withMessage('min 3 and max 9 characters')
],async (req,res)=>{
    
    const validationErrors= validationResult(req);
    if(!validationErrors.isEmpty())
    {
        res.json({errors:validationErrors.array()})
    }else{
    
    
        try{

            const {firstName, lastName, email, password} = req.body;
            // need to add express validator for checking the desired format of user data credentials
            
            if(!(email && password)) {
                res.send('email and password are required')
            // throw new Error('E-mail already in use'); // catch it ?
            }

            const oldUserCheck = await User.find({email});

            //  uncommment later and check

            if(oldUserCheck){
                res.send('user already exists, Please LogIN')
            }

            
            hashedPassword = await bcrypt.hash(password,10)
            // .then(()=>{console.log('successfully hashed ');})
            // .catch((error)=>{console.log('failed due to error' + error);})



            const token = jwt.sign(
                {user_sign : firstName,email},
                process.env.TOKEN_KEY

            )
            //console.log(hashedPassword);


            const newUser= await User.create({  
                "firstName":firstName,
                "lastName":lastName,
                "email":email,
                "password":hashedPassword,
                "token":token
            })

            //await User.create(newUser);
            

            //see pros and cons of jwt tokens
            // const token = jwt.sign(
            //     {user_sign : firstName,email},
            //     process.env.TOKEN_KEY

            // )
            // newUser.token= token
            
            res.json(newUser)
        }
        catch(error){
            console.log(error.message);}
        
    }



    
    
    //res.send({firstName, lastName, email, token})
    


})


app.post('/login', async (req,res)=>{

    try{

        const {email , password}= req.body
        if(!(email && password)){
            res.send('email and password are required')
        }

        const userExists = await User.findOne({email})

       if(!userExists){
            res.send('user doesnot exists. Please REGISTER')
        }else{
            if(await bcrypt.compare(password,userExists.password)){

            const token = jwt.sign(
                {user_sign : userExists.firstName,email},
                process.env.TOKEN_KEY

            )
            userExists.token = token

            res.json(userExists)

            }
            else {res.send('Invalid Credentials')}

        }




    }catch(err){
        console.log('this is the error : ' + err.message);
    }




})



app.post('/welcome',auth , (req,res)=>{
    res.status(200).send('welcome user')
    // use  jade templates
})

app.get('/welcome',auth , (req,res)=>{
    res.send('welcome user bro').status(200).end()
    // use jade templates
})


module.exports = app;





