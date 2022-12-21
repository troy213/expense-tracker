const getReportData = (data) => {
  const result = data.reduce((acc, curr) => {
    const entry = acc.find((item) => item.type === curr.type)
    if (entry) {
      const categoryEntry = entry.data.find(
        (item) => item.category === curr.category
      )
      if (categoryEntry) {
        categoryEntry.amount += curr.amount
      } else {
        entry.data.push({
          category: curr.category,
          amount: curr.amount,
        })
      }
    } else {
      acc.push({
        type: curr.type,
        data: [
          {
            category: curr.category,
            amount: curr.amount,
          },
        ],
      })
    }
    return acc
  }, [])
  return result
}

export default getReportData
