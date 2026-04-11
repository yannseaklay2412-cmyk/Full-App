import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'
import DoctorInfo from '../pages/user/DoctorInfo'


import Home from '../pages/user/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'

import UserDashboard from '../pages/user/Dashboard'
import Book from '../pages/user/Book'
import MyBookings from '../pages/user/MyBookings'
import Profile from '../pages/user/Profile'

import AdminDashboard from '../pages/admin/Dashboard'
import Users from '../pages/admin/Users'
import UserDetail from '../pages/admin/UserDetail'
import Appointments from '../pages/admin/Appointments'
import Schedule from '../pages/admin/Schedule'
import Dentists from '../pages/admin/Dentists'
import Reports from '../pages/admin/Reports'

export default function AppRoutes() {
  return (
    
    <Routes>

      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/doctor/:id" element={<DoctorInfo />} />

      {/* User routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/book" element={<Book />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Admin routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/users/:id" element={<UserDetail />} />
        <Route path="/admin/appointments" element={<Appointments />} />
        <Route path="/admin/schedule" element={<Schedule />} />
        <Route path="/admin/dentists" element={<Dentists />} />
        <Route path="/admin/reports" element={<Reports />} />
      </Route>

      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}
// there  are  3  route  here  1  is  admin ssecond  is  private  and  third  is  public 