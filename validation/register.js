const Validator = require('validator');
const isEmpty = require('./is-empty');





module.exports = function validateRegisterInput(data){
    let errors = {};

    if(isEmpty(data.name)){
        data.name = "";
    }

    if(isEmpty(data.email)){
        data.email = "";
    }
    if(isEmpty(data.password)){
        data.password = "";
    }
    if(isEmpty(data.password2)){
        data.password2 = "";
    }
    
   
    
    if(!Validator.isLength(data.name, { min : 2, max : 30})){
        errors.name = 'Name must be between 2 to 30 characters';
    }
    if(Validator.isEmpty(data.name)){
        errors.name = "Name field is required";
    }
    if(Validator.isEmpty(data.email)){
        errors.email = "Email field is required";
    }
    if(!Validator.isEmail(data.email)){
        errors.email = "Invalid Email";
    }
    if(Validator.isEmpty(data.password)){
        errors.password = "Password field is required";
    }
    if(!Validator.isLength(data.password, { min : 6, max : 30})){
        errors.password = 'Password must be atleast 6 characters';
    }
    if(Validator.isEmpty(data.password2)){
        errors.password2 = "Confirm Password field is required";
    }
    if(data.password != data.password2){
        errors.password2 = 'Passwords must match';
    }
    


    return{
        errors,
        isValid : isEmpty(errors)
    }
}