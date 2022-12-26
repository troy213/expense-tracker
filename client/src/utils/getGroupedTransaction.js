import getDateInTimezone from './getDateInTimezone'

const getGroupedTransaction = (data) => {
  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const groupedData = []

  for (const item of data) {
    const timezoneDate = getDateInTimezone(item.date)
    const year = new Date(timezoneDate).getFullYear()
    const month = MONTHS[new Date(timezoneDate).getMonth()]
    const date = new Date(timezoneDate).getDate()
    const monthIndex = groupedData.findIndex(
      (obj) => obj.month === `${month} ${year}`
    )

    if (monthIndex >= 0) {
      const dateIndex = groupedData[monthIndex].data.findIndex(
        (obj) => obj.date === `${date} ${month} ${year}`
      )
      if (dateIndex >= 0) {
        groupedData[monthIndex].data[dateIndex].data = [
          ...groupedData[monthIndex].data[dateIndex].data,
          item,
        ]
      } else {
        groupedData[monthIndex].data.push({
          date: `${date} ${month} ${year}`,
          data: [item],
        })
      }
    } else {
      groupedData.push({
        month: `${month} ${year}`,
        data: [{ date: `${date} ${month} ${year}`, data: [item] }],
      })
    }
  }

  return groupedData.sort((a, b) => {
    const dateA = new Date(a.month).getTime()
    const dateB = new Date(b.month).getTime()
    return dateB - dateA
  })
}

export default getGroupedTransaction
