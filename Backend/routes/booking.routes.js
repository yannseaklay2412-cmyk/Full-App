import { Router } from 'express'
import { getMyBookings, getBookingById, createBooking, cancelBooking } from '../controllers/booking.controller.js'
import { protect, patientOnly } from '../middleware/auth.middleware.js'

const router = Router()

router.use(protect)

// GET  /api/bookings        — get my bookings
router.get('/',          patientOnly, getMyBookings)

// GET  /api/bookings/:id    — get booking by id
router.get('/:id',       patientOnly, getBookingById)

// POST /api/bookings        — create booking
router.post('/',         patientOnly, createBooking)

// PUT  /api/bookings/:id/cancel — cancel booking
router.put('/:id/cancel', patientOnly, cancelBooking)

export default router