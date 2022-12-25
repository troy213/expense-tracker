import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useRefreshToken from '../../hooks/useRefreshToken'
import useAuth from '../../hooks/useAuth'
import { Spinner } from '../../components'

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const refresh = useRefreshToken()
  const { auth } = useAuth()

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (err) {
        console.error('Persist Error: ', err)
      } finally {
        setIsLoading(false)
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
  }, [])

  return <>{isLoading ? <Spinner /> : <Outlet />}</>
}

export default PersistLogin
