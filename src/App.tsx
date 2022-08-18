import { useState, useEffect, useRef, MutableRefObject, RefObject } from "react";
import { 
  debounce, 
  isEmpty
} from "lodash";

import Input from "./components/Input";

import { 
  inputInfo, 
  interestFree,
  removeSpace, 
  getDaysYear,
  formValidation } from "./utils";
 
type FormDataState = {
  limit: number,
  rate: number,
  days: number,
  balance: number,
  spending: number
}

type ErrorMsg = {
  type: string,
  msg: string
}

const App = () => {
  const [formData, setFormData] = useState<FormDataState>({
    limit: 0,
    rate: 0,
    days: 0,
    balance: 0,
    spending: 0
  })

  const [errorMsg, setErrorMsg] = useState<ErrorMsg[]>([])
  const [disabledBtn, setDisabledBtn] = useState(false)
  const [charge, setCharge] = useState<number | string | null>(null)

  const limitRef = useRef<RefObject<typeof Input>>()
  const daysOfYear = getDaysYear()
  
  // TODO: Will replaced by Select component
  // Add ! to tell the Typescript compiler that currentInterestFree will never be undefined
  const currentInterestFree = interestFree.find(
    item => item.key === "premier"
  )!.value

  // Set focus when component loads
  useEffect(() => {
    limitRef?.current?.focus();
  }, [])
  
  // Set Button state depends on the error state
  useEffect(() => { 
    isEmpty(errorMsg) ? setDisabledBtn(false) : setDisabledBtn(true)
  }, [errorMsg])

  // Set the charge with formData updated
  useEffect(() => {
    setCharge(null)
  },[formData])
  
  // Reset Error message of Total spending field when limit and balanc change 
  useEffect(() => {

    const { limit, balance, spending } = formData;
    const allowedOverdrawn = limit + balance;

    // Reset error message when limit or balance changed
    if(limit > 0 || balance > 0) {
      validation("spending", undefined, undefined,`Cannot spend over than ${allowedOverdrawn}`)
    }
    
    // Rmove the error msg if speding less than allowedOverdrawn
    if(spending <= allowedOverdrawn) {
     
      // TODO: DUPLICATED CODE
      setErrorMsg(errorMsg.map(
        item => 
          item.type === "spending" ?
            {
              ...item, 
              msg : ""
            } 
            : item
            ).filter( 
              item => 
                !isEmpty(item.msg)
              )
            )
    }
  }, [formData])

  // Form Validation
  const validation = (
    type:string, 
    errorObject: ErrorMsg | undefined,
    currentValue?: number, 
    customMsg?: string, 
  ) => {
   
    const { balance, limit } = formData;

    // Exist check
    const isExist =  errorMsg.find(item => item?.type === type)

    errorObject.type = type;

    if(currentValue)
      errorObject.msg = (formValidation(currentValue, type, balance, limit) || "") 
    if(customMsg)
      errorObject.msg = customMsg

    if(isExist) {
      setErrorMsg(errorMsg.map(
        item => 
          item.type === type ?
            {
              ...item, 
              msg : errorObject.msg
            } 
            : item
            ).filter( 
              item => 
                !isEmpty(item.msg)
              )
            )
    }else {
      !isEmpty(errorObject.msg) && 
        setErrorMsg([...errorMsg, errorObject])
    }
  }

  console.log('errorMsg', errorMsg)
  const handleInputOnChanges = (e: React.MouseEvent<HTMLInputElement>): void => { 
    // Remove all spaces from input value
    // string to number: new feature "+"
    const currentValue = +removeSpace((e.target as HTMLInputElement).value)

    const type =(e.target as HTMLInputElement).name
    
    if(currentValue) {
      validation(type,undefined,currentValue)
    }

    setFormData((prev) => ({
      ...prev,
      [type]: currentValue
    }))
  }

  // Debounced the input on change event
  const debouncedResult = debounce((e) => {
    handleInputOnChanges(e)
  }, 300)

  // Formula: A/N * R/P (https://efinancemanagement.com/working-capital-financing/overdraft-interest)
  const handleOnCalculating = (e: React.MouseEvent<HTMLButtonElement>): void => {
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
                  const maximum: number | undefined = max
                  const currentRef: HTMLInputElement | undefined = limitRef

                  return (
                    <Input 
                      key={key}
                      name={key}
                      title={name}
                      min={min}
                      maximum={maximum}
                      errorMsg={errorMsg}
                      currentRef={currentRef}
                      isRequired={true}
                      handleOnChange={debouncedResult} 
                    />
                  )
                })
              }
              <button 
                type="submit" 
                className={disabledBtn ? "btn--disabled" : "btn"} 
                onClick={handleOnCalculating}
                disabled={disabledBtn ? true : false}
              >
                Calculate
              </button>
              {
                charge&&charge >= 0 &&
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
