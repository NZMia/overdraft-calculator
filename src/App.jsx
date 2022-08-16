import { useState, useEffect, useRef } from "react";
import { 
  debounce, 
  isEmpty, 
  isUndefined
} from "lodash";

import Input from "./components/Input";

import { 
  inputInfo, 
  interestFree,
  removeSpace, 
  getDaysYear,
  formValidation } from "./utils";

const App = () => {
  const [formData, setFormData] = useState({
    limit: 0,
    rate: 0,
    days: 0,
    balance: 0,
    spending: 0
  })

  const [errorMsg, setErrorMsg] = useState([])
  const [disabledBtn, setDisabledBtn] = useState(false)
  const [charge, setCharge] = useState()

  const limitRef = useRef()
  const daysOfYear = getDaysYear()
  
  const currentInterestFree = interestFree.find(
    item => item.key === "premier"
  ).value

  let errorObject = {
    type: "",
    msg: ""
  };

  // Set focus when component loads
  useEffect(() => {
    limitRef.current.focus();
  }, [])
  
  // Set Button state depends on the error state
  useEffect(() => { 
    isEmpty(errorMsg) ? setDisabledBtn(false) : setDisabledBtn(true)
  }, [errorMsg])

  // Set the charge with formData updated
  useEffect(() => {
    setCharge()
  },[formData])
  
  // Form Validation
  const validation = (currentValue, type) => {
    const { balance, limit } = formData;

    // Exist check
    const isExist =  errorMsg.find(item => item.type === type)
    const validationResult = formValidation(currentValue, type, balance, limit)

    errorObject.type = type
    errorObject.msg = validationResult
    
    if(isExist) {
      setErrorMsg(errorMsg.map(
        item => 
          item.type === type ?
            {
              ...item, 
              msg : validationResult
            } : 
              item).filter(
                item => item.msg !== undefined 
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
    setFormData((prev) => ({
      ...prev,
      [type]: currentValue
    }))
  }

  // Debounced the input on change event
  const debouncedResult = debounce((e, value) => {
    handleInputOnChanges(e, value)
  }, 300)

  // Formula: A/N * R/P (https://efinancemanagement.com/working-capital-financing/overdraft-interest)
  const handleOnCalculating = (e) => {
    e.preventDefault(); 

    const { spending, balance, days, rate } = formData;

    const amountOverdrawn = spending - balance;

    if(amountOverdrawn < currentInterestFree ) {
      setCharge(0)  
    }else {
      const annualRate = rate / 100;
      const numberOfPeriods = daysOfYear * 1 / days;
      const result = (((amountOverdrawn -  currentInterestFree * 1) / days) * (annualRate/ numberOfPeriods)).toFixed(4)
   
      setCharge(result)       
    }
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
              <p>Interest Free: ${currentInterestFree}</p>
              {
                inputInfo.map((item) => {
                  const { name, key, min, max } = item

                  return (
                    <Input 
                      key={key}
                      name={key}
                      title={name}
                      min={min}
                      max={max}
                      errorMsg={errorMsg}
                      currentRef={key === "limit" ? limitRef : null}
                      isRequired={true}
                      handleOnChange={(key, value)=>debouncedResult(key, value)} 
                    />
                  )
                })
              }
              <button 
                type="submit" 
                className={disabledBtn ? "btn--disabled" : "btn"} 
                onClick={handleOnCalculating}
              >
                Calculate
              </button>
              {
                charge >= 0 &&
                (<p className="btn bg-blue-200 text-blue-700 text-center">
                  Interest charged : ${charge}
                </p>)
              }
            </form>
        </div>
      </div>
    </div>
  )
}

export default App;
