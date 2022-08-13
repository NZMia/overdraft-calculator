import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

import { useDebounce } from "./hooks/useDebounce";
import Input from "./components/Input";

import { inputInfo } from './utils/constant';

const App = () => {
  const limitRef = useRef();

  const [value, setValue] = useState(0)
  const [limit, setLimit] = useState(0)
  const [rate, setRate] = useState(0)
  const [days, setDays] = useState(0)

  const [accountBalance, setAccountBalance] = useState(0)
  const [totalSpending, setTotalSpending] = useState(0)

  const [errorMsg, setErrorMsg] = useState('')

  const debouncedValue = useDebounce(value, 750);

  // Set focus when component loads
  useEffect(() => {
    limitRef.current.focus();
  }, [])

  // Set or reset errorMsg back to '' 
  useEffect(() => {
    setErrorMsg('');
  }, [limit, rate, days, accountBalance, totalSpending])
  
  const handleInputOnChange = async(e) => {
    e.preventDefault();

    switch(e.target.name) {
      case 'Arranged overdraft limit':
        setLimit(e.target.value)
      case 'Overdraft interest rate':
        setRate(e.target.value)
      case 'Number of days overdrawn':
        setDays(e.target.value)
      case 'Account balance':
        setAccountBalance(e.target.value)
      case 'Total Spending':
        setTotalSpending(e.target.value)
      break
    }
  }
  const getDaysYear = () => {
    const now = new Date();
    const currentYear = now.getFullYear()
    return (currentYear%4===0&&currentYear%100!==0||currentYear%100===0&&currentYear%400===0) ? 366 : 365
  }

  // Set onClick function 
  const handleOnCalculating = async (e) => {
    e.preventDefault();

    // Interest = A/N * R/P
    // A = Amount Overdrawn

    // N = Number of Days in a billing period

    // R = Annual interest rate

    // P = number of periods per year

    const amountOverdrawn = totalSpending - accountBalance;

    const result = (amountOverdrawn / days) * (rate/100 / getDaysYear())
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
                <button type="submit" className="btn" onClick={handleOnCalculating}>
                    Calculate
                </button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default App;
