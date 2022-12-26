const getDateInTimezone = (utcString) => {
  const date = new Date(utcString)
  const offset = new Date().getTimezoneOffset() * 60 * 1000 * -1
  return new Date(date.getTime() + offset)
}

export default getDateInTimezone
