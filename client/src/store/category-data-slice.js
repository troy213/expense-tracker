import { createSlice } from '@reduxjs/toolkit'

const categoryDataSlice = createSlice({
  name: 'categoryData',
  initialState: {
    categoryData: [],
  },
  reducers: {
    setCategoryData(state, action) {
      state.categoryData = [...action.payload.value]
    },
  },
})

export const categoryDataAction = categoryDataSlice.actions

export default categoryDataSlice
