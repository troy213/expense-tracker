import getDateInTimezone from './getDateInTimezone'

const getChartData = (input) => {
  const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const result = input.reduce((acc, curr) => {
    const timezoneDate = getDateInTimezone(curr.date)
    const date = new Date(timezoneDate)
    const month = MONTHS[date.getMonth()]
    const year = date.getFullYear()
    const key = `${month} ${year}`
    let entry = acc.find((item) => item.name === key)

    if (entry) {
      if (curr.type === 'Income') {
        entry.income += curr.amount
      } else if (curr.type === 'Outcome') {
        entry.outcome += curr.amount
      }
    } else {
      if (curr.type === 'Income') {
        entry = { name: key, income: curr.amount, outcome: 0 }
      } else if (curr.type === 'Outcome') {
        entry = { name: key, income: 0, outcome: curr.amount }
      }
      acc.push(entry)
    }
    return acc
  }, [])
  return result.sort((a, b) => {
    const dateA = new Date(a.name).getTime()
    const dateB = new Date(b.name).getTime()
    return dateA - dateB
  })
}

export default getChartData
