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

export const isNumberLessThan5000 = (value) => {
  return (/^(?:[1-9]|\d{2,3}|[1-4]\d{3}|5000)$/.test(value))
}

export const isNumberLessThan100 = (value) => {
  return (/^[1-9][0-9]?$|^100$/.test(value))
}

export const daysCheck = (value) => {
  return (/^(0?[1-9]|[12][0-9]|3[01])$/.test(value))
}

export const isOverrun = (value, allowedValue) => {
  return value > allowedValue 
}

export const isBlank = (value) => {
  return (/^\s*$/.test(value))
}
