import { createSlice } from '@reduxjs/toolkit'

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    type: '',
    category: '',
    error: {
      type: '',
      category: '',
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

export const categoryAction = categorySlice.actions

export default categorySlice
