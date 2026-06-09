// routes/booking.routes.js
const express = require('express')
const router = express.Router()
const { getMyBookings, getBookingById, createBooking, cancelBooking, rescheduleBooking } = require('../controllers/booking.controller')
const { protect } = require('../middleware/auth.middleware')

// All booking routes require authentication
router.use(protect)

// GET  /api/bookings
router.get('/', getMyBookings)

// GET  /api/bookings/:id
router.get('/:id', getBookingById)

// POST /api/bookings
router.post('/', createBooking)

// PUT  /api/bookings/:id/cancel
router.put('/:id/cancel', cancelBooking)

// PUT  /api/bookings/:id/reschedule
router.put('/:id/reschedule', rescheduleBooking)

module.exports = router
