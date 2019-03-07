const Validator = require('validator');
const isEmpty = require('./is-empty');





module.exports = function validateLoginInput(data){
    let errors = {};

    if(isEmpty(data.email)){
        data.email = "";
    }
    if(isEmpty(data.password)){
        data.password = "";
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
    


    return{
        errors,
        isValid : isEmpty(errors)
    }
}