// src/routes/AdminRoute.jsx
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

export default function AdminRoute() {
  const { user,role,loading } = useAuth()
    console.log('AdminRoute - loading:', loading)
  console.log('AdminRoute - user:', user)
  console.log('AdminRoute - role:', role)
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (role !== 'admin') return <Navigate to="/dashboard" replace />

  return <Outlet />
}

