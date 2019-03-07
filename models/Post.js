const mongoose = require('mongoose');


// Create Schema
const postSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    text : {
        type : String,
        required : true
    },
    name : {
        type : String
    },
    likes : [
        {
            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'users'
            }
        }
    ],
    comments : [
        {
            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'users'
            },
            text : {
                type : String,
                required : true
            },
            name : {
                type : String
            },
            date : {
                type : Date,
                default : Date.now
            },
            gravatar : {
                type : String,
                required : true
            }

        }

    ],
    date : {
        type : Date,
        default : Date.now
    },
    gravatar : {
        type : String,
        required : true
    }
});


module.exports = Post = mongoose.model('post',postSchema);