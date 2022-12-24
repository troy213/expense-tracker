const getFirstAndLastDate = (input) => {
  const fromDate = new Date(input.from)
  const toDate = new Date(input.to)

  const from = new Date(
    fromDate.getFullYear(),
    fromDate.getMonth(),
    1
  ).toISOString()
  const to = new Date(
    toDate.getFullYear(),
    toDate.getMonth() + 1,
    0
  ).toISOString()

  return { from, to }
}

export default getFirstAndLastDate
