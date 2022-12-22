const getSearchData = (term, data = []) => {
  const searchResults = data.filter(
    (item) =>
      item.description.toLowerCase().includes(term.toLowerCase()) ||
      item.category.toLowerCase().includes(term.toLowerCase())
  )
  return searchResults
}

export default getSearchData
