import { createContext, useState, useEffect } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})

  const isGuest = JSON.parse(localStorage.getItem('isGuest'))

  useEffect(() => {
    if (isGuest) {
      setAuth({
        id: 'guest',
        username: 'guest',
        email: null,
        accessToken: null,
      })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
