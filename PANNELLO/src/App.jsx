import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { AdminLogin } from './pages/AdminLogin.jsx'
import { AdminDashboard } from './pages/AdminDashboard.jsx'

const RequireAuth = ({ children }) => {
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('adminLoggedIn') === 'true'
  return isLoggedIn ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/dashboard" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
