import React from "react";

const Input = ({ title, currentRef=null, handleOnChange }) => {
  
  return (
    <div className="relative w-full">
        <span className="block text-sm font-medium text-slate-700">
          {title}
        </span>
        <input 
          className="input" 
          ref={currentRef} 
          name={title}
          onChange={handleOnChange}
         />

        <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
          Please provide a valid email address.
        </p>
    </div>
  )
}

export default Input
