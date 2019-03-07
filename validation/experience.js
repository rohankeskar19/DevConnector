const Validator = require('validator');
const isEmpty = require('./is-empty');





module.exports = function validateExperienceInput(data){
    let errors = {};

    if(isEmpty(data.title)){
        data.title = "";
    }
    if(isEmpty(data.company)){
        data.company = "";
    }
    if(isEmpty(data.from)){
        data.from = "";
    }
    
    

    if(Validator.isEmpty(data.title)){
 
        errors.title = "Job Title field is required";
    }
    if(Validator.isEmpty(data.company)){
 
        errors.company = "Company field is required";
    }
    if(Validator.isEmpty(data.from)){
 
        errors.from = "From date field is required";
    }
   
    


    return{
        errors,
        isValid : isEmpty(errors)
    }
}