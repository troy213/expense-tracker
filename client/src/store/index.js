import { configureStore } from '@reduxjs/toolkit'
import addTransactionSlice from './add-transaction-slice'
import editTransactionSlice from './edit-transaction-slice'
import categorySlice from './category-slice'
import filterSlice from './filter-slice'
import searchSlice from './search-slice'

const store = configureStore({
  reducer: {
    addTransaction: addTransactionSlice.reducer,
    editTransaction: editTransactionSlice.reducer,
    category: categorySlice.reducer,
    filter: filterSlice.reducer,
    search: searchSlice.reducer,
  },
})

export default store