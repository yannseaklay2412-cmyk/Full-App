// controllers/booking.controller.js
const BookingModel = require('../models/booking.model')

// GET /api/bookings  (current user)
const getMyBookings = async (req, res, next) => {
  try {
    const data = await BookingModel.getByUser(req.user.id)
    res.status(200).json({ success: true, data })
  } catch (err) { next(err) }
}

// GET /api/bookings/:id
const getBookingById = async (req, res, next) => {
  try {
    const data = await BookingModel.getById(req.params.id)
    res.status(200).json({ success: true, data })
  } catch (err) { next(err) }
}

// POST /api/bookings
const createBooking = async (req, res, next) => {
  try {
    const { service_id, timeslot_id, note } = req.body
    const data = await BookingModel.create({ user_id: req.user.id, service_id, timeslot_id, note })
    res.status(201).json({ success: true, message: 'Booking created', data })
  } catch (err) { next(err) }
}

// PUT /api/bookings/:id/cancel
const cancelBooking = async (req, res, next) => {
  try {
    const data = await BookingModel.cancel(req.params.id)
    res.status(200).json({ success: true, message: 'Booking cancelled', data })
  } catch (err) { next(err) }
}

// PUT /api/bookings/:id/reschedule
const rescheduleBooking = async (req, res, next) => {
  try {
    const { new_timeslot_id } = req.body
    const data = await BookingModel.reschedule(req.params.id, new_timeslot_id)
    res.status(200).json({ success: true, message: 'Booking rescheduled', data })
  } catch (err) { next(err) }
}

// ── Admin ─────────────────────────────────────────────────

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

module.exports = { getMyBookings, getBookingById, createBooking, cancelBooking, rescheduleBooking, getAllBookings, updateBookingStatus }
