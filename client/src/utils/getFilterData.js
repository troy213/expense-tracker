import getDateInTimezone from './getDateInTimezone'

const getFilterData = (data, input) => {
  const { from, to } = input
  const filteredData = data.filter((item) => {
    const timezoneDate = getDateInTimezone(item.date)
    const itemDate = new Date(timezoneDate)
    return itemDate >= new Date(from) && itemDate <= new Date(to)
  })
  return filteredData
}

export default getFilterData
