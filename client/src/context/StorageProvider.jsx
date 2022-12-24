import { createContext, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { transactionsDataAction } from '../store/transaction-data-slice'
import { categoryDataAction } from '../store/category-data-slice'

const StorageContext = createContext({})

export const StorageProvider = ({ children }) => {
  const [storageTransactionsData, setStorageTransactionsData] = useState([])
  const [storageCategoryData, setStorageCategoryData] = useState([])
  const dispatch = useDispatch()

  const localStorageTransactionsData = JSON.parse(
    localStorage.getItem('transactionsData')
  )
  const localStorageCategoryData = JSON.parse(
    localStorage.getItem('categoryData')
  )

  useEffect(() => {
    if (localStorageTransactionsData) {
      setStorageTransactionsData(localStorageTransactionsData)
      dispatch(
        transactionsDataAction.setTransactionsData({
          value: localStorageTransactionsData,
        })
      )
    }

    if (localStorageCategoryData) {
      setStorageCategoryData(localStorageCategoryData)
      dispatch(
        categoryDataAction.setCategoryData({ value: localStorageCategoryData })
      )
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      'transactionsData',
      JSON.stringify(storageTransactionsData)
    )
    dispatch(
      transactionsDataAction.setTransactionsData({
        value: storageTransactionsData,
      })
    )
  }, [storageTransactionsData])

  useEffect(() => {
    localStorage.setItem('categoryData', JSON.stringify(storageCategoryData))
    dispatch(categoryDataAction.setCategoryData({ value: storageCategoryData }))
  }, [storageCategoryData])

  return (
    <StorageContext.Provider
      value={{
        storageTransactionsData,
        setStorageTransactionsData,
        storageCategoryData,
        setStorageCategoryData,
      }}
    >
      {children}
    </StorageContext.Provider>
  )
}

export default StorageContext
