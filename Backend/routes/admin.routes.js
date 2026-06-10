import { Router } from 'express'
import { getAllBookings, updateBookingStatus } from '../controllers/booking.controller.js'
import { getAllPatients, getPatientById } from '../controllers/user.controller.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'

const router = Router()

router.use(protect, adminOnly)

// Bookings
router.get('/bookings',              getAllBookings)
router.put('/bookings/:id/status',   updateBookingStatus)

// Patients
router.get('/patients',              getAllPatients)
router.get('/patients/:id',          getPatientById)

export default router