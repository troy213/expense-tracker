import { createSlice } from '@reduxjs/toolkit'

const transactionsDataSlice = createSlice({
  name: 'transactionsData',
  initialState: {
    transactionsData: [],
  },
  reducers: {
    setTransactionsData(state, action) {
      state.transactionsData = [...action.payload.value]
    },
  },
})

export const transactionsDataAction = transactionsDataSlice.actions

export default transactionsDataSlice
