import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { debounce, isEmpty, isUndefined } from "lodash";

import Input from "./components/Input";
import Select from "./components/Select";

import { inputInfo, interestFree } from './utils/constant';
import { getDaysYear } from "./utils/getDaysYear";
import { removeSpace } from "./utils/validation";

import formValidation from "./utils/formValidation";

const App = () => {
  const limitRef = useRef();
  const daysOfYear = getDaysYear()

  const [inteFree, setInteFree] = useState(0)
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
  
  // Set focus when component loads
  useEffect(() => {
    limitRef.current.focus();
  }, [])
  
  // Set Button state depends on the error state
  useEffect(() => { 
    isEmpty(errorMsg) ? setDisabledBtn(false) : setDisabledBtn(true)
  }, [errorMsg])

  // Set Interest Free
  const handleSelected = (e) => {
    setInteFree(e.target.name)
  }

  const handleInputOnChanges = (e) => { 

    // Remove all spaces from input value
    const currentValue = removeSpace(e.target.value)
    const type = e.target.name

    // Form Validation
    const validationResult = formValidation(currentValue, type, accountBalance)

    // Update error state
    errorObject.title = type
    errorObject.msg = validationResult

    const isExist =  errorMsg.find(item => item.title === type)
    
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
      !isUndefined(validationResult) && setErrorMsg([...errorMsg, errorObject])
    }
    
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
      case 'Total Spending':
        setTotalSpending(currentValue)
      break
    }
  }

  // debounced the input on change event
  const debouncedResult = debounce((e, value) => {
    handleInputOnChanges(e, value)
  }, 300)

  // Set onClick function 
  // Formula =  A/N * R/P (https://efinancemanagement.com/working-capital-financing/overdraft-interest)
  // A = Amount Overdrawn
  // N = Number of Days in a billing period
  // R = Annual interest rate
  // P = number of periods per year

  const handleOnCalculating = async (e) => {
    e.preventDefault();

    const amountOverdrawn = totalSpending - accountBalance;
    const annualRate = rate / 100;
    
    const numberOfPeriods = daysOfYear / days;
    const result = ((amountOverdrawn / days) * (annualRate/ numberOfPeriods)).toFixed(4)
    // TODO: interestFree
    // const result = amountOverdrawn <= inteFree ? "Remember pay it" : (amountOverdrawn / days) * (rate/100 / getDaysYear())
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
                {/* {
                  interestFree.map((item) => {
                    const { key, value } = item
                    return (
                      <Select 
                        key={key} 
                        type={key} 
                        currentValue={value} 
                        selected={inteFree}
                        handleOnChange={handleSelected} 
                      />)
                  })
                } */}
                {
                  inputInfo.map((item) => {
                    const { name, key, min, max } = item
                    
                    return (
                     <Input 
                        key={key}
                        title={name}
                        min={min}
                        max={max}
                        errorMsg={errorMsg}
                        currentRef={key === "limit" ? limitRef : null}
                        handleOnChange={(e, value)=>debouncedResult(e, value)} 
                      />
                    )
                  })
                }
                <button type="submit" className={"btn" + " " + `${disabledBtn ? "btn--disabled" : ""}`} onClick={handleOnCalculating}>
                    Calculate
                </button>
            </form>
            <div>
              {
                 charge > 0 && <p className="btn bg-blue-200 text-blue-700 text-center">{charge}</p> 
              }
            </div>
        </div>
      </div>
    </div>
  )
}

export default App;
