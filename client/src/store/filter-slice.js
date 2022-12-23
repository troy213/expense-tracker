import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    from: new Date().toISOString(),
    to: new Date().toISOString(),
    error: {
      from: false,
      to: false,
    },
  },
  reducers: {
    setInputField(state, action) {
      state[action.payload.field] = action.payload.value
    },
    setError(state, action) {
      state.error[action.payload.field] = action.payload.value
    },
    clearForm(state) {
      for (const stateObj in state) {
        const EXCEPTION = ['error']
        if (EXCEPTION.includes(stateObj)) continue

        state[stateObj] = ''
      }

      state.from = new Date().toISOString()
      state.to = new Date().toISOString()

      for (const stateObj in state.error) {
        state.error[stateObj] = false
      }
    },
  },
})

export const filterAction = filterSlice.actions

export default filterSlice
