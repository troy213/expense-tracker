const checkEmptyField = (state, action, dispatch, exceptions) => {
  let isValid = true

  for (const obj in state) {
    if (exceptions.includes(obj)) continue

    if (!state[obj]) {
      isValid = false
      dispatch(
        action.setError({
          field: `${obj}`,
          value: true,
        })
      )
    } else {
      dispatch(
        action.setError({
          field: `${obj}`,
          value: false,
        })
      )
    }
  }

  return isValid
}

export default checkEmptyField
