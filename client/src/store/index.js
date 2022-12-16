import { configureStore } from '@reduxjs/toolkit'
import addTransactionSlice from './add-transaction-slice'
import categorySlice from './category-slice'

const store = configureStore({
  reducer: {
    addTransaction: addTransactionSlice.reducer,
    category: categorySlice.reducer,
  },
})

export default store
