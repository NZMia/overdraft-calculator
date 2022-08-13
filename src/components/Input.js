import React from "react";

const Input = ({ title, currentRef=null, handleOnChange, limit, errorMsg}) => {
  
  const hasError = errorMsg != null;

  return (
    <div className="relative w-full">
        <p className="block text-sm font-medium text-slate-700">
          {title}
        </p>
        {
          limit > 0 && <span className="text-sm text-slate-700">Enter a value between 0 and {limit}</span>
        }
        <input 
          className="input" 
          ref={currentRef} 
          name={title}
          onChange={handleOnChange}
         />
        <p className={"mt-2 peer-invalid:visible text-pink-600 text-sm" + `${hasError ? "visible" : "invisible"}`}>
          {
            errorMsg[title]
          }
        </p>
    </div>
  )
}

export default Input
