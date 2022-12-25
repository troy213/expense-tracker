import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    email: '',
    password: '',
    errorMessage: '',
  },
  reducers: {
    setInputField(state, action) {
      state[action.payload.field] = action.payload.value
    },
    clearForm(state) {
      for (const stateObj in state) {
        state[stateObj] = ''
      }
    },
  },
})

export const loginAction = loginSlice.actions

export default loginSlice
