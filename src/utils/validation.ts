
export const isNumber = (value: number | string) => {
  return (/^[\d\s]*$/.test(value))
}

export const removeSpace = (value: string) => {
  return value.replace(/\s/g, '');
}

export const isEmptyString = (value: string) => {
  return value == null || value === '' ? true : false
}

export const isNumberLessThan5000 = (value: number) => {
  return (/^(?:[1-9]|\d{2,3}|[1-4]\d{3}|5000)$/.test(value))
}

export const isNumberLessThan100 = (value:number) => {
  return (/^[1-9][0-9]?$|^100$/.test(value))
}

export const daysCheck = (value: number) => {
  return (/^(0?[1-9]|[12][0-9]|3[01])$/.test(value))
}

export const isOverrun = (value: number, allowedValue: number) => {
  return value > allowedValue ? true : false
}

export const isBlank = (value) => {
  return (/^\s*$/.test(value))
}
