const jwt = require('jsonwebtoken')
const config = process.env


const verifyToken=(req,res,next)=>{
    const token = req.headers["x-access-token"]|| req.query 
    //console.log(token);


    if(!token.hasOwnProperty('x-access-token')){
       return res.send('token is requried  for authentication')        
    }else{
        try{
            console.log('try jwt entered');

            const checkToken = jwt.verify(token['x-access-token'], config.TOKEN_KEY) // kaisay
            console.log(checkToken);
            //req.user = checkToken;

        }
        catch(error){
            return res.send(error)
        }
    }

    next();
}


module.exports = verifyToken;
