const getGroupedCategory = (data) => {
  const output = []

  for (const category of data) {
    const index = output.findIndex((item) => item.type === category.type)

    if (index >= 0) {
      output[index].data = [...output[index].data, category]
    } else {
      output.push({ type: category.type, data: [category] })
    }
  }

  return output
}

export default getGroupedCategory
