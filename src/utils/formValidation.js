import { 
  isNumber,
  isNumberLessThan5000,
  daysCheck, 
  isNumberLessThan100,
  isOverrun,
  isBlank } from "./validation";

export const formValidation = (value, type, balance=null, limit=null) => {
  if(!isNumber(value)) return "Positive whole numbers only";
  if(isBlank(value)) return "Please fill in this filed";

  if(type==="limit") {
    if(!isNumberLessThan5000(value)) return "Please input number between 1 ~ 5000";
  }

  if(type==="rate") { 
    if(!isNumberLessThan100(value)) return "Please input number between 1 ~ 100"
  };
  
  if(type==="days") {
    if(!daysCheck(value)) return "Please input number between 1 ~ 31"
  };
 
  if(type==="spending") {
    const allowedOverdrawn = balance*1 + limit*1; 
    if(isOverrun(value, allowedOverdrawn)) return `Cannot spend over than ${allowedOverdrawn}`
  }
}

