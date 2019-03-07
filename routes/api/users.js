const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/keys');
const passport = require('passport');
const gravatar = require('gravatar');
// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Import User Model
const User = require('../../models/User');

// @route   GET /api/user/test
// @desc    Test user route
// @access  Public
router.get('/test', (req,res) => {
    res.json({"msg" : "User Works"});
    

});






// @route   POST /api/user/register
// @desc    Register a User
// @access  Public
router.post('/register',(req,res) => {
    var { errors, isValid} = validateRegisterInput(req.body);
    
   
    // Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    

   


    User.findOne({email : req.body.email})
        .then(user => {
            if(user){
                errors.email = "User Already Exists"
                // User already exists send back and error
                return res.status(400).json(errors);
            }
            else{
                
                const url = gravatar.url(req.body.email,{ s : '200', r : 'pg', d : 'mm'});
                

                // User doesn't exists create a new user
                const user = new User({
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    gravatar : url
                });
                

     
                    bcrypt.hash(user.password,10,(err,hash) => {
                        if(err) throw err;
                        else {
                            user.password = hash;
                            user.save()
                                .then(user => {
                                    
                                    res.json({"user" : "user created!"});
                                })
                                .catch(err => console.log(err))
                        }
                    })
                
            }
        })
        .catch(err => console.log(err));
});





// @route   POST /api/user/login
// @desc    Login a User / Return the jwt (JSON Web Token)
// @access  Public
router.post('/login',(req,res) => {
    const { errors, isValid} = validateLoginInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;


    // Find the user by email
    User.findOne({email : email})
        .then( user => {
            if(!user){
                errors.email = 'User not found';
                
                return res.status(404).json(errors);
            }
            // Check password
            bcrypt.compare(password,user.password)
                  .then( (isMatch) => {
                        if(isMatch){
                            // User Matched
                            // Create JWT Payload
                            const payload = {
                                id : user.id,
                                name : user.name,
                                gravatar : user.gravatar
                            };
                            

                            // Sign Token
                            jwt.sign(
                                payload,
                                config.secretOrKey,
                                { expiresIn : 3600}, 
                                (err,token) => {
                                    res.json({
                                        success : true,
                                        token : "Bearer " + token
                                    })
                                    
                                });
                        }
                        else{
                            errors.password = 'Password Incorrect'
                            return res.status(400).json(errors);
                        }
                })
        })
        .catch(err => console.log(err))
        


});


// @route   POST /api/user/current
// @desc    Return current user 
// @access  Private
router.get('/current',passport.authenticate('jwt',{session : false}),(req,res) => {

    res.json({
        id : req.user.id,
        name : req.user.name,
        email : req.user.email
    });




});


module.exports = router;