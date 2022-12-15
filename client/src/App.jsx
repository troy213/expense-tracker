import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components'
import {
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
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='unauthorized' element={<Unauthorized />} />

        {/* private routes */}
        <Route path='/' element={<Dashboard />} />
        <Route path='reports' element={<Reports />} />
        <Route path='settings' element={<Settings />} />

        {/* 404 not found */}
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
