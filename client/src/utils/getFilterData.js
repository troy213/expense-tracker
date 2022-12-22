const getFilterData = (data, input) => {
  const { from, to } = input
  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.date)
    return itemDate >= new Date(from) && itemDate <= new Date(to)
  })
  return filteredData
}

export default getFilterData
