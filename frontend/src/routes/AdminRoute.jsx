// src/routes/AdminRoute.jsx
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'
import useBlockBrowserNav from '../hooks/useBlockBrowserNav'

export default function AdminRoute() {
  const { user, role, loading } = useAuth()
  useBlockBrowserNav()

  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (role !== 'admin') return <Navigate to="/dashboard" replace />

  return <Outlet />
}

