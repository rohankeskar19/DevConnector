const mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Create Schema 
const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true,
        default : Date.now
    },
    gravatar : {
        type : String,
        required : true
    }
})


module.exports = User = mongoose.model('users',userSchema);