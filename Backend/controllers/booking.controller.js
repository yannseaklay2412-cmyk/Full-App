import * as bookingService from '../services/booking.service.js'
import asyncHandler from '../utils/asyncHandler.js'

export const getMyBookings = asyncHandler(async (req, res) => {
  const data = await bookingService.getMyBookings(req.user.email)
  res.status(200).json({ success: true, data })
})

export const getBookingById = asyncHandler(async (req, res) => {
  const data = await bookingService.getBookingById(req.params.id)
  res.status(200).json({ success: true, data })
})

export const createBooking = asyncHandler(async (req, res) => {
  const data = await bookingService.createBooking(req.user.email, req.body)
  res.status(201).json({ success: true, message: 'Booking created', data })
})

export const cancelBooking = asyncHandler(async (req, res) => {
  const data = await bookingService.cancelBooking(req.params.id)
  res.status(200).json({ success: true, message: 'Booking cancelled', data })
})

export const getAllBookings = asyncHandler(async (req, res) => {
  const data = await bookingService.getAllBookings(req.query)
  res.status(200).json({ success: true, data })
})

export const updateBookingStatus = asyncHandler(async (req, res) => {
  const data = await bookingService.updateBookingStatus(req.params.id, req.body.status)
  res.status(200).json({ success: true, message: `Booking marked as ${req.body.status}`, data })
})
