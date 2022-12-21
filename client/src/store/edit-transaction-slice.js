import { createSlice } from '@reduxjs/toolkit'

const editTransactionSlice = createSlice({
  name: 'editTransaction',
  initialState: {
    date: new Date().toISOString(),
    type: '',
    category: '',
    description: '',
    amount: '',
    error: {
      date: false,
      type: false,
      category: false,
      amount: false,
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

      state.date = new Date().toISOString()

      for (const stateObj in state.error) {
        state.error[stateObj] = false
      }
    },
  },
})

export const editTransactionAction = editTransactionSlice.actions

export default editTransactionSlice
