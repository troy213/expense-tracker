import { createContext, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { transactionsDataAction } from '../store/transaction-data-slice'
import { categoryDataAction } from '../store/category-data-slice'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import useAuth from '../hooks/useAuth'

const StorageContext = createContext({})

export const StorageProvider = ({ children }) => {
  const [storageTransactionsData, setStorageTransactionsData] = useState([])
  const [storageCategoryData, setStorageCategoryData] = useState([])
  const axiosPrivate = useAxiosPrivate()
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { auth } = useAuth()

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

  useEffect(() => {
    const controller = new AbortController()

    const getTransactionsData = async () => {
      try {
        const response = await axiosPrivate.get(`/api/transaction/${auth.id}`, {
          signal: controller.signal,
        })

        // if (response?.data?.data?.length > 0) {
        //   setIsLoading(false) // set redux loading might work
        // }

        if (response?.data?.data) {
          dispatch(
            transactionsDataAction.setTransactionsData({
              value: response?.data?.data,
            })
          )
        }
      } catch (err) {
        console.error(err)
        navigate('/login', { state: { from: location }, replace: true })
      }
    }

    const getCategoryData = async () => {
      try {
        const response = await axiosPrivate.get(`/api/category/${auth.id}`, {
          signal: controller.signal,
        })

        if (response?.data?.data) {
          dispatch(
            categoryDataAction.setCategoryData({
              value: response?.data?.data,
            })
          )
        }
      } catch (err) {
        console.error(err)
        navigate('/login', { state: { from: location }, replace: true })
      }
    }

    if (auth.id && auth.id !== 'guest') {
      getTransactionsData()
      getCategoryData()
    }

    return () => {
      controller.abort()
    }
  }, [auth])

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
