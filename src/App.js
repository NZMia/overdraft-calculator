import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

import { useDebounce } from "./hooks/useDebounce";

import Input from "./components/Input";
import Select from "./components/Select";

import { inputInfo, interestFree } from './utils/constant';
import { getDaysYear } from "./utils/getDaysYear";
import { isNumber, removeSpace, isEmptyString, isNumberInTheRange, isNegativeNumber } from "./utils/validation";

const App = () => {
  const limitRef = useRef();

  const [inteFree, setInteFree] = useState(0)
  const [limit, setLimit] = useState(0)
  const [rate, setRate] = useState(0)
  const [days, setDays] = useState(0)

  const [accountBalance, setAccountBalance] = useState(0)
  const [totalSpending, setTotalSpending] = useState(0)

  const [errorMsg, setErrorMsg] = useState('')


  // Set focus when component loads
  useEffect(() => {
    limitRef.current.focus();
  }, [])

  // Set or reset errorMsg back to '' 
  useEffect(() => {
    setErrorMsg('');
  }, [limit, rate, days, accountBalance, totalSpending])
  
  // Set Interest Free
  const handleSelected = (e) => {
    e.preventDefault();
    setInteFree(e.target.name)
  }

  const handleInputOnChange = (e) => {
    e.preventDefault();
    
    // Remove all spaces from input value
    const currentValue = removeSpace(e.target.value);
    
    // Validation : General Test
    if(!isNumber(currentValue)) return setErrorMsg('Please input number');
    if(!isNumberInTheRange(currentValue)) return setErrorMsg('Please input number between 0 ~ 100');
    if(isNegativeNumber(currentValue)) return setErrorMsg('Please input number bigger than 0');

    // TODO: 
    // Validation : limition comes from client

    switch(e.target.name) {
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
  console.info('errorMsg', errorMsg);
  // Set onClick function 
  const handleOnCalculating = async (e) => {
    e.preventDefault();

    // Interest = A/N * R/P
    // A = Amount Overdrawn

    // N = Number of Days in a billing period

    // R = Annual interest rate

    // P = number of periods per year

    const amountOverdrawn = totalSpending - accountBalance;

    console.log('inteFree', inteFree);
    
    const result = amountOverdrawn <= inteFree ? "Remember pay it" : (amountOverdrawn / days) * (rate/100 / getDaysYear())
    console.log('result',result)
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
                  interestFree.map((item) => {
                    const { key, value } = item
                    return (<Select key={key} type={key} currentValue={value} handleOnChange={handleSelected}/>)
                  })
                }
                {
                  inputInfo.map((item) => {
                    const { name, key, value } = item
                    return (
                     <Input 
                        key={key}
                        title={name}
                        inputValue={value}
                        currentRef={key === "limit" ? limitRef : null}
                        handleOnChange={handleInputOnChange} 
                      />
                    )
                  })
                }
                <button type="submit" className={"btn" + " " + `${isEmptyString(errorMsg) ? "disabled" : ""}`} onClick={handleOnCalculating}>
                    Calculate
                </button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default App;
