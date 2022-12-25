import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { StorageProvider } from './context/StorageProvider'
import { Layout } from './components'
import PersistLogin from './utils/auth/PersistLogin'
import RequireAuth from './utils/auth/RequireAuth'
import {
  AccountSettings,
  EditCategory,
  Login,
  Register,
  Unauthorized,
  Dashboard,
  NotFound,
  Settings,
  Reports,
} from './pages'

const App = () => {
  return (
    <StorageProvider>
      <Routes>
        {/* public routes */}
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='unauthorized' element={<Unauthorized />} />

        {/* private routes */}
        <Route element={<PersistLogin />}>
          <Route path='/' element={<Layout />}>
            <Route element={<RequireAuth />}>
              <Route path='/' element={<Dashboard />} />
              <Route path='edit-category' element={<EditCategory />} />
              <Route path='reports' element={<Reports />} />
              <Route path='settings' element={<Settings />} />
            </Route>

            <Route element={<RequireAuth restrictGuest={true} />}>
              <Route path='account' element={<AccountSettings />} />
            </Route>
          </Route>
        </Route>

        {/* 404 not found */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </StorageProvider>
  )
}

export default App
