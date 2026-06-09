// controllers/admin.controller.js
const UserModel = require('../models/user.model')
const BookingModel = require('../models/booking.model')
const { supabase } = require('../config/supabase')

// GET /api/admin/users
const getAllUsers = async (req, res, next) => {
  try {
    const data = await UserModel.getAll()
    res.status(200).json({ success: true, data })
  } catch (err) { next(err) }
}

// GET /api/admin/users/:id
const getUserById = async (req, res, next) => {
  try {
    const data = await UserModel.getById(req.params.id)
    res.status(200).json({ success: true, data })
  } catch (err) { next(err) }
}

// PUT /api/admin/users/:id
const updateUser = async (req, res, next) => {
  try {
    const data = await UserModel.update(req.params.id, req.body)
    res.status(200).json({ success: true, message: 'User updated', data })
  } catch (err) { next(err) }
}

// DELETE /api/admin/users/:id
const deleteUser = async (req, res, next) => {
  try {
    await UserModel.remove(req.params.id)
    res.status(200).json({ success: true, message: 'User deleted' })
  } catch (err) { next(err) }
}

// GET /api/admin/bookings
const getAllBookings = async (req, res, next) => {
  try {
    const { status, date } = req.query
    const data = await BookingModel.getAll({ status, date })
    res.status(200).json({ success: true, data })
  } catch (err) { next(err) }
}

// PUT /api/admin/bookings/:id/status
const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body
    const data = await BookingModel.updateStatus(req.params.id, status)
    res.status(200).json({ success: true, message: `Booking marked as ${status}`, data })
  } catch (err) { next(err) }
}

// GET /api/admin/dashboard
const getDashboard = async (req, res, next) => {
  try {
    const [users, bookings, services] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'patient'),
      supabase.from('bookings').select('status'),
      supabase.from('services').select('*', { count: 'exact', head: true }).eq('is_active', true),
    ])

    const revenue = await supabase
      .from('bookings')
      .select('service:services(price)')
      .in('status', ['confirmed', 'done'])

    const totalRevenue = revenue.data?.reduce((sum, b) => sum + (b.service?.price || 0), 0) || 0
    const counts = bookings.data || []

    res.status(200).json({
      success: true,
      data: {
        totalPatients: users.count || 0,
        totalServices: services.count || 0,
        totalRevenue,
        bookings: {
          total: counts.length,
          pending: counts.filter(b => b.status === 'pending').length,
          confirmed: counts.filter(b => b.status === 'confirmed').length,
          cancelled: counts.filter(b => b.status === 'cancelled').length,
          done: counts.filter(b => b.status === 'done').length,
        }
      }
    })
  } catch (err) { next(err) }
}

module.exports = { getAllUsers, getUserById, updateUser, deleteUser, getAllBookings, updateBookingStatus, getDashboard }
