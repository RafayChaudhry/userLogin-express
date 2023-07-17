const mongoose = require('mongoose')

const uri='mongodb+srv://Rafay:VOd7KhdY8doimhih@authcluster.lexhjhx.mongodb.net/?retryWrites=true&w=majority';// set atlas uri here
//VOd7KhdY8doimhih
//const {MONGO_URI} = process.env // set the url fo atlas in env



async function connect(){
    mongoose.connect(uri)
    .then(()=>{
        console.log('connected to atlas data base' );
    })
    .catch((err)=>{
        console.log('couldnot connect to database');
        console.log(err);
        console.error(err);
        process.exit(1);
    })
}




//exports.connect();
module.exports = connect();





