import { Outlet } from 'react-router-dom'
import { Navbar } from '..'

const Layout = () => {
  return (
    <main className='app'>
      <Outlet />
      <Navbar />
    </main>
  )
}

export default Layout
