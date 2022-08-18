import React, { RefObject } from "react";
import { isEmpty } from "lodash";

import { icon } from "../utils";

export type IInput =  {
  name: string,
  title: string,
  handleOnChange: (e: React.MouseEvent) => void, 
  min: number, 
  maximum: number | undefined,
  errorMsg: object[],
  isRequired: boolean,
  currentRef?: React.ForwardedRef<HTMLInputElement>
}

const Icon= (name: string) => icon.filter(item => {
  if(name.includes("days")) return item.name === "text"
  if(name.includes("rate")) return item.name === "percentage"

  return item.name === "dollar"
})


const Input = React.forwardRef<RefObject<HTMLElement>,IInput>(
  ({
    name, 
    title,
    handleOnChange,
    min,
    maximum,
    errorMsg,
    isRequired 
  }, currentRef) => {
  
  const currentErrormsg = errorMsg.find(msg => msg.type === name)
  
  const ariaLabel=`input-${name}`;
  
  const icon =  Icon(name)
  const { sign, position } = icon[0]

  return (
    <div className="relative w-full">
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-slate-700" 
          id={ariaLabel}
        >
          {title} 
          {
            isRequired && <span className="text-pink-500"> * </span>
          }
        </label>
        {
          !!min && !!maximum && <span className="text-sm italic text-slate-400">Enter a value between {min} and {maximum}</span>
        }
        <div className="flex">
          {
            position === "left" && <span className="input__icon">{sign}</span>
          }
          <input 
            className="input" 
            ref={currentRef} 
            name={name}
            aria-label={ariaLabel}
            onChange={() => handleOnChange}
            required={isRequired}
            />
            {
              position === "right" && <span className="input__icon">{sign}</span>
            }
        </div>
        {
          !isEmpty(currentErrormsg) &&  <p className="mt-2 peer-invalid:visible text-pink-600 text-sm">{currentErrormsg.msg}</p>
        }
    </div>
  )
})
export default Input
