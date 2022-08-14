import React from "react";
import { isEmpty } from "lodash";

const Input = ({ 
  title, 
  currentRef=null, 
  handleOnChange, 
  min, 
  max,
  errorMsg,
  icon,
  isRequired }) => {
  
  const currentErrormsg = errorMsg.find(msg => msg.title === title)
  const { sign, position } = icon
  return (
    <div className="relative w-full">
        <p className="block text-sm font-medium text-slate-700">
          {title} 
          {
            isRequired && <span className="text-pink-500"> * </span>
          }
        </p>
        {
          !!min && !!max && <span className="text-sm italic text-slate-400">Enter a value between {min} and {max}</span>
        }
        <div className="flex">
          {
            position === "left" && <span className="input__icon">{sign}</span>
          }
          <input 
            className="input" 
            ref={currentRef} 
            name={title}
            onChange={handleOnChange}
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
}

export default Input
