
export const isNumber = (value) => {
  return (/^[\d\s]*$/.test(value))
}

export const removeSpace = (value) => {
  return value.replace(/\s/g, '');
}
