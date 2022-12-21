export const getAlphaNumericRegex = (maxLength) => {
  return new RegExp(`^[a-zA-Z0-9]{0,${maxLength}}$`)
}

export const getAlphabetRegex = (maxLength) => {
  return new RegExp(`^[a-zA-Z]{0,${maxLength}}$`)
}

export const getNumericRegex = (maxLength) => {
  return new RegExp(`^[0-9]{0,${maxLength}}$`)
}

export const getMaxLengthRegex = (maxLength) => {
  return new RegExp(`^.{0,${maxLength}}$`)
}

export const getCurrencyRegex = (maxLength) => {
  return new RegExp(`^([1-9][0-9]{0,${maxLength - 1}}|)(\\.[0-9]{0,2})?$`)
}
