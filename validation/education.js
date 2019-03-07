const Validator = require('validator');
const isEmpty = require('./is-empty');





module.exports = function validateEducationInput(data){
    let errors = {};

    if(isEmpty(data.school)){
        data.school = "";
    }
    if(isEmpty(data.degree)){
        data.degree = "";
    }
    if(isEmpty(data.fieldofstudy)){
        data.fieldofstudy = "";
    }
    if(isEmpty(data.from)){
        data.from = "";
    }
    

    if(Validator.isEmpty(data.school)){
 
        errors.school = "School field is required";
    }
    if(Validator.isEmpty(data.degree)){
 
        errors.degree = "Degree field is required";
    }
    if(Validator.isEmpty(data.fieldofstudy)){
 
        errors.fieldofstudy = "Field of study field is required";
    }
    if(Validator.isEmpty(data.from)){
 
        errors.from = "From date field is required";
    }
   
    


    return{
        errors,
        isValid : isEmpty(errors)
    }
}