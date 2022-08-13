
export const isNumber = (value) => {
  return (/^[\d\s]*$/.test(value))
}

export const removeSpace = (value) => {
  return value.replace(/\s/g, '');
}

export const isEmptyString = (value) => {
  if (value == null || value === '') {
		return true
	}
	return false
}

// Number should between 0 ~ 100
// eg: Rate
export const isNumberInTheRange = (value) => {
  return (/^[1-9][0-9]?$|^100$/.test(value))
}

export const isPositiveNumber = (value) => {
  console.log(value)
  console.log((/^-?\d*\.?\d+$/.test(value)))
  return (/^-?\d*\.?\d+$/.test(value))
}
