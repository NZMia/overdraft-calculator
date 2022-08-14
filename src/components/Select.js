import React from "react";

const Select = ({type, currentValue, selected, handleOnChange}) => {
  return (
    <div className="form-check flex items-center mb-4">
      <input className="select" 
        id={type} 
        type="radio" 
        value="" 
        name={currentValue} 
        onChange={handleOnChange} s/>
      <label className="form-check-label inline-block text-gray-800" htmlFor={type}>
        
      Interest Free: $ {currentValue}
      </label>
    </div>
  )
}

export default Select
