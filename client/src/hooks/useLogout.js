import axios from '../api/axios'
import useAuth from './useAuth'

const useLogout = () => {
  const { auth, setAuth } = useAuth()

  const logout = async () => {
    setAuth({})
    try {
      const response = await axios.post(
        '/api/logout',
        { id: auth.id },
        {
          withCredentials: true,
        }
      )
    } catch (err) {
      console.error('Logout Error:', err)
    }
  }
  return logout
}

export default useLogout
