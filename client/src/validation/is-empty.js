const isEmpty = function(value){
    if(value === undefined || value === null || (typeof(value) === "object" && Object.keys(value).length === 0) || (typeof(value) === "string" && value.trim().length === 0)){
            return true;
    }
    else{
            return false;
    }
    
}

export default isEmpty;