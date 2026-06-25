// src/routes/PrivateRoute.jsx
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'
import useBlockBrowserNav from '../hooks/useBlockBrowserNav'

export default function PrivateRoute() {
  const { user, role, loading } = useAuth()
  useBlockBrowserNav()

  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (role === 'admin') return <Navigate to="/admin" replace />

  return <Outlet />
}