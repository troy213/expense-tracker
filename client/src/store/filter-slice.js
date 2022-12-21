import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    from: '',
    to: '',
    error: {
      from: false,
      to: false,
    },
    modalValue: '',
  },
  reducers: {
    setInputField(state, action) {
      state[action.payload.field] = action.payload.value
    },
    setError(state, action) {
      state.error[action.payload.field] = action.payload.value
    },
    setModalValue(state, action) {
      state.modalValue = action.payload
    },
    clearForm(state) {
      for (const stateObj in state) {
        const EXCEPTION = ['error']
        if (EXCEPTION.includes(stateObj)) continue

        state[stateObj] = ''
      }
    },
  },
})

export const filterAction = filterSlice.actions

export default filterSlice
