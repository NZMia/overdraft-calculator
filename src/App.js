import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { 
  debounce, 
  isEmpty, 
  isUndefined
} from "lodash";

import Input from "./components/Input";
import Select from "./components/Select";

import { 
  inputInfo, 
  icon, 
  interestFree 
} from './utils/_constant';
import { getDaysYear } from "./utils/getDaysYear";
import { removeSpace } from "./utils/validation";

import formValidation from "./utils/formValidation";

const App = () => {
  const limitRef = useRef();
  const daysOfYear = getDaysYear()

  const [limit, setLimit] = useState(0)
  const [rate, setRate] = useState(0)
  const [days, setDays] = useState(0)

  const [accountBalance, setAccountBalance] = useState(0)
  const [totalSpending, setTotalSpending] = useState(0)

  const [errorMsg, setErrorMsg] = useState([])

  const [disabledBtn, setDisabledBtn] = useState(false)
  const [charge, setCharge] = useState(0)

  let errorObject = {
    title: "",
    msg: ""
  };
  
  const currentIcon = (key) => {
    if(key.includes("day")) return icon.text
    if(key.includes("rate")) return icon.percentage

    return icon.dollar
  }

  // Set focus when component loads
  useEffect(() => {
    limitRef.current.focus();
  }, [])
  
  // Set Button state depends on the error state
  useEffect(() => { 
    isEmpty(errorMsg) ? setDisabledBtn(false) : setDisabledBtn(true)
  }, [errorMsg])
  
  // Form Validation
  const validation = (currentValue, type) => {
    // Exist check
    const isExist =  errorMsg.find(item => item.title === type)
    const validationResult = formValidation(currentValue, type, accountBalance, limit)

    errorObject.title = type
    errorObject.msg = validationResult
    
    if(isExist) {
      setErrorMsg(errorMsg.map(
        item => 
          item.title === type ?
           {...item, 
              msg :formValidation(currentValue, type)} : 
              item).filter(
                item => item.msg != undefined 
              )
            )
    }else {
      !isUndefined(validationResult) && 
        setErrorMsg([...errorMsg, errorObject])
    }
  }

  const handleInputOnChanges = (e) => { 
    // Remove all spaces from input value
    const currentValue = removeSpace(e.target.value)
    const type = e.target.name

    validation(currentValue, type)
    
    // Inputs change
    switch(type) {
      case 'Arranged overdraft limit':
        setLimit(currentValue)
      case 'Overdraft interest rate':
        setRate(currentValue)
      case 'Number of days overdrawn':
        setDays(currentValue)
      case 'Account balance':
        setAccountBalance(currentValue)
      case 'Total spending':
        setTotalSpending(currentValue)
      break
    }
    console.info('currentValue', currentValue);
    
  }

  // Debounced the input on change event
  const debouncedResult = debounce((e, value) => {
    handleInputOnChanges(e, value)
  }, 300)

  // Set onClick function 
  // Formula =  A/N * R/P (https://efinancemanagement.com/working-capital-financing/overdraft-interest)
  const handleOnCalculating = (e) => {
    e.preventDefault();

    const amountOverdrawn = totalSpending - accountBalance;
    const annualRate = rate / 100;
    
    const numberOfPeriods = daysOfYear * 1 / days;
    const result = ((amountOverdrawn / days) * (annualRate/ numberOfPeriods)).toFixed(4)
    // TODO: interestFree
    setCharge(result)  
  }

  return (
    <div className="page">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div className="page__form__wrapper">
            <div className="text-center mb-4">
              <h6 className="font-semibold text-[#063970] text-xl">
                Overdraft Calculator
              </h6>
            </div>
            <form className="space-y-5">
              {
                inputInfo.map((item) => {
                  const { name, key, min, max } = item
                  
                  return (
                    <Input 
                      key={key}
                      title={name}
                      min={min}
                      max={max}
                      icon={currentIcon(key)}
                      errorMsg={errorMsg}
                      currentRef={key === "limit" ? limitRef : null}
                      isRequired={true}
                      handleOnChange={(e, value)=>debouncedResult(e, value)} 
                    />
                  )
                })
              }
              {
                charge > 0 && 
                  <p className="btn bg-blue-200 text-blue-700 text-center">
                    interest charged : ${charge}
                  </p> 
              }
              <button 
                type="submit" 
                className={"btn" + " " + `${disabledBtn ? "btn--disabled" : ""}`} 
                onClick={handleOnCalculating}
              >
                Calculate
              </button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default App;
