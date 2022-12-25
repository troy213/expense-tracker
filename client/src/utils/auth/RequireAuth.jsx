import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const RequireAuth = ({ restrictGuest = false }) => {
  const { auth } = useAuth()
  const location = useLocation()

  if (!auth?.id)
    return <Navigate to='/login' state={{ from: location }} replace />

  if (restrictGuest && auth?.id === 'guest') {
    return <Navigate to='/unauthorized' state={{ from: location }} replace />
  } else {
    return <Outlet />
  }
}

export default RequireAuth
