import React from "react";

const Select = ({type, currentValue, handleOnChange}) => {
  return (
    <div className="flex items-center mb-4">
      <input id={type} type="radio" value="" name={currentValue} className="select" onChange={handleOnChange} />
      <label htmlFor={type} className="block text-sm font-medium text-slate-700 ml-2">Interest Free: $ {currentValue}</label>
    </div>
  )
}

export default Select
