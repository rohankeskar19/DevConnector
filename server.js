/**
 * Main Server File
 * This File is executed first
 */

 // Dependency declaration
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const user = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
// DB Config
const db = keys.mongoDBURI;

// Connect to mongo db using mongoose
mongoose.connect(db,{useNewUrlParser : true})
        .then(() => {
            console.log("Mongo DB Connected");
        })
        .catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());

// Passport Config 
require('./config/passport')(passport);

// Use routes 
app.use('/api/user',user);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


const port = process.env.PORT || 5000;

app.listen(port,() => {
    console.log(`Server listening on port ${port}`);
})