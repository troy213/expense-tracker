import { createSlice } from '@reduxjs/toolkit'

const addCategorySlice = createSlice({
  name: 'addCategory',
  initialState: {
    type: '',
    value: '',
    error: {
      type: false,
      value: false,
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

      for (const stateObj in state.error) {
        state.error[stateObj] = false
      }
    },
  },
})

export const addCategoryAction = addCategorySlice.actions

export default addCategorySlice
