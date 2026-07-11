import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'
import DoctorInfo from '../pages/user/DoctorInfo'
import History from '../pages/user/Historyy'


import Home from '../pages/user/Home'
import Login from '../pages/Login'
import ResetPassword from '../pages/ResetPassword'
import NotFound from '../pages/NotFound'

import UserDashboard from '../pages/user/Dashboard'
import Book from '../pages/user/Book'
import MyBookings from '../pages/user/MyBookings'
import Profile from '../pages/user/Profile'
import SymptomTriage from '../pages/user/symptomTriage'

import AdminDashboard from '../pages/admin/Dashboard'
import Users from '../pages/admin/Users'
import UserDetail from '../pages/admin/UserDetail'
import Appointments from '../pages/admin/Appointments'
import Schedule from '../pages/admin/Schedule'
import Dentists from '../pages/admin/Dentists'
import AdminSetting from '../pages/admin/AdminSetting'
import Concerns from '../pages/admin/Concerns'

export default function AppRoutes() {
  return (
    
    <Routes>

      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password"   element={<ResetPassword />} />
      <Route path="/doctor/:id" element={<DoctorInfo />} />

      {/* User routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/book" element={<Book />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
        <Route path="/symptom-triage" element={<SymptomTriage />} />
         <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/users/:id" element={<UserDetail />} />
        <Route path="/admin/appointments" element={<Appointments />} />
        <Route path="/admin/schedule" element={<Schedule />} />
        <Route path="/admin/dentists" element={<Dentists />} />
        <Route path="/admin/concerns" element={<Concerns />} />
        <Route path="/admin/AdminSetting" element={<AdminSetting />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      

    </Routes>
  )
}
// there  are  3  route  here  1  is  admin ssecond  is  private  and  third  is  public 