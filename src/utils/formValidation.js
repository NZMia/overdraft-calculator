import { isNumber,isNumberLessThan10000, daysCheck, isNumberLessThan100, isOverrun } from "./validation";

const formValidation = (value, type=null, balance=null, limit=null) => {

  const currentType = type.toString().toLowerCase();
 
  if(!isNumber(value)) return 'Please input positive number';

  if(currentType.includes('overdraft limit')) {
    if(!isNumberLessThan10000(value)) return "Please input number between 0 ~ 5000";
  }

  if(currentType.includes('rate')) { 
    if(!isNumberLessThan100(value)) return "Please input number between 1 ~ 100"
  };
  
  if(currentType.includes('days')) {
    if(!daysCheck(value)) return "Please input number between 1 ~ 31"
  };
 
  if(currentType.includes('total spending')) {
    const allowedOverdrawn = balance*1 + limit*1;
    if(isOverrun(value, allowedOverdrawn)) return `Cannot spend over than  ${allowedOverdrawn}`
  }
}

export default formValidation
