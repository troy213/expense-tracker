import { useContext } from 'react'
import StorageContext from '../context/StorageProvider'

const useStorage = () => {
  return useContext(StorageContext)
}

export default useStorage
