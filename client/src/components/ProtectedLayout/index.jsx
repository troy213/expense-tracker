import { Navbar } from '..'
import { Outlet } from 'react-router-dom'

const ProtectedLayout = () => {
  return (
    <div className='protected-layout'>
      <Navbar />
      <div className='container'>
        <Outlet />
      </div>
    </div>
  )
}

export default ProtectedLayout
