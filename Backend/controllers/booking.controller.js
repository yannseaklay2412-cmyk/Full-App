import * as bookingService from '../services/booking.service.js'
import dashboardmodel from '../models/dashboard.model.js'

export const getDashboard = async (req, res, next) => {
  try {
    const data = await dashboardmodel.getStats()   // was "DashboardModel" — wrong casing, would crash
    res.status(200).json({ success: true, data })
  } catch (err) { next(err) }
}

export const getMyBookings = async (req, res, next) => {
  try {
    const data = await bookingService.getMyBookings(req.user.email)
    res.status(200).json({ success: true, data })
  } catch (err) { next(err) }
}

export const getBookingById = async (req, res, next) => {
  try {
    const data = await bookingService.getBookingById(req.params.id)
    res.status(200).json({ success: true, data })
  } catch (err) { next(err) }
}

export const createBooking = async (req, res, next) => {
  try {
    const data = await bookingService.createBooking(req.user.email, req.body)
    res.status(201).json({ success: true, message: 'Booking created', data })
  } catch (err) { next(err) }
}

export const cancelBooking = async (req, res, next) => {
  try {
    const data = await bookingService.cancelBooking(req.params.id)
    res.status(200).json({ success: true, message: 'Booking cancelled', data })
  } catch (err) { next(err) }
}

export const getAllBookings = async (req, res, next) => {
  try {
    const data = await bookingService.getAllBookings(req.query)  // req.query passed through
    res.json(data)
  } catch (err) { next(err) }
}
export const updateBookingStatus = async (req, res, next) => {
  try {
    const data = await bookingService.updateBookingStatus(req.params.id, req.body.status)
    res.json(data)
  } catch (err) { next(err) }
}