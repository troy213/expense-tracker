import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { StorageProvider } from './context/StorageProvider'
import { Layout } from './components'
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
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='account' element={<AccountSettings />} />
          <Route path='edit-category' element={<EditCategory />} />
          <Route path='reports' element={<Reports />} />
          <Route path='settings' element={<Settings />} />
        </Route>

        {/* 404 not found */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </StorageProvider>
  )
}

export default App
