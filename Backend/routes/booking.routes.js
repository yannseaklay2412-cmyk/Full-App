import { Router } from 'express'
import {
  getMyBookings,
  getAllBookings,
  getBookingById,
  createBooking,
  cancelBooking,
  updateBookingStatus,
} from '../controllers/booking.controller.js'
import { protect, patientOnly, adminOnly } from '../middleware/auth.middleware.js'

const router = Router()

router.use(protect)

router.get('/', adminOnly, getAllBookings) // for admin to view all bookings
router.get('/mine', patientOnly, getMyBookings) // for patient to view their own bookings
router.get('/:id', getBookingById) //for both patient and admin to view a booking
router.post('/', patientOnly, createBooking) // for patient to create a appointment
router.put('/:id/cancel', cancelBooking) // for patient to cancel
router.patch('/:id', adminOnly, updateBookingStatus) // for admin to update, confirm, reject

export default router