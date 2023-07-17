const mongoose = require('mongoose')
// https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/

const userSchema = new mongoose.Schema({
    firstName:{type:String,default:null},
    lastName:{type:String,default:null},
    email:{type:String},
    password:{type:String},
    token:{type:String}
})

const User= mongoose.model('user', userSchema);

module.exports = User;


