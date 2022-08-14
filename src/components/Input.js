import React from "react";
import { isEmpty } from "lodash";

const Input = ({ title, currentRef=null, handleOnChange, min, max, errorMsg}) => {
  
  const currentErrormsg = errorMsg.find(msg => msg.title === title)

  return (
    <div className="relative w-full">
        <p className="block text-sm font-medium text-slate-700">
          {title}
        </p>
        {
          !!min && !!max && <span className="text-sm text-slate-700">Enter a value between {min} and {max}</span>
        }
        <input 
          className="input" 
          ref={currentRef} 
          name={title}
          onChange={handleOnChange}
          required
           />
          {
            !isEmpty(currentErrormsg) &&  <p className="mt-2 peer-invalid:visible text-pink-600 text-sm">{currentErrormsg.msg}</p>
          }
    </div>
  )
}

export default Input
