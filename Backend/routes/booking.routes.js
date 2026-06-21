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

router.get('/', adminOnly, getAllBookings)
router.get('/mine', patientOnly, getMyBookings)
router.get('/:id', getBookingById)
router.post('/', patientOnly, createBooking)
router.put('/:id/cancel', cancelBooking)
router.patch('/:id', adminOnly, updateBookingStatus)

export default router