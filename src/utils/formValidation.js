import { isNumber,isNumberInTheRange, isPositiveNumber } from "./validation";

const formValidation = (value, type=null) => {

  if(!isNumber(value)) return 'Please input positive number';
  else if(!isNumberInTheRange(value)) return 'Please input number between 0 ~ 100';
  else if (!isPositiveNumber(value)) return 'Please input number bigger than 0';
  else return ''

}

export default formValidation
