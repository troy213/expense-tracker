import { configureStore } from '@reduxjs/toolkit'
import addTransactionSlice from './add-transaction-slice'
import editTransactionSlice from './edit-transaction-slice'
import addCategorySlice from './add-category-slice'
import filterSlice from './filter-slice'
import searchSlice from './search-slice'
import transactionsDataSlice from './transaction-data-slice'
import categoryDataSlice from './category-data-slice'
import editCategorySlice from './edit-category-slice'
import loginSlice from './login-slice'
import registerSlice from './register-slice'

const store = configureStore({
  reducer: {
    addTransaction: addTransactionSlice.reducer,
    editTransaction: editTransactionSlice.reducer,
    addCategory: addCategorySlice.reducer,
    filter: filterSlice.reducer,
    search: searchSlice.reducer,
    transactionsData: transactionsDataSlice.reducer,
    categoryData: categoryDataSlice.reducer,
    editCategory: editCategorySlice.reducer,
    login: loginSlice.reducer,
    register: registerSlice.reducer,
  },
})

export default store
