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

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Appointment booking and status tracking
 */

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: List all bookings (admin only)
 *     tags: [Bookings]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [pending, confirmed, done, cancelled, expired] }
 *     responses:
 *       200:
 *         description: List of all bookings
 */
router.get('/', adminOnly, getAllBookings) // for admin to view all bookings

/**
 * @swagger
 * /bookings/mine:
 *   get:
 *     summary: List the logged-in patient's own bookings
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: List of the patient's bookings
 */
router.get('/mine', patientOnly, getMyBookings) // for patient to view their own bookings

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get a booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Booking details
 */
router.get('/:id', getBookingById) //for both patient and admin to view a booking

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create an appointment (patient only)
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [dentist_id, appointment_date, start_time, end_time]
 *             properties:
 *               dentist_id: { type: string }
 *               service_ids: { type: array, items: { type: string } }
 *               notes: { type: string }
 *               full_name: { type: string }
 *               phone: { type: string }
 *               sex: { type: string, enum: [male, female, other] }
 *               date_of_birth: { type: string, format: date }
 *               address: { type: string }
 *               appointment_date: { type: string, format: date }
 *               start_time: { type: string, example: "09:00" }
 *               end_time: { type: string, example: "09:30" }
 *     responses:
 *       201:
 *         description: Booking created
 */
router.post('/', patientOnly, createBooking) // for patient to create a appointment

/**
 * @swagger
 * /bookings/{id}/cancel:
 *   put:
 *     summary: Cancel a booking (patient)
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Booking cancelled
 */
router.put('/:id/cancel', cancelBooking) // for patient to cancel

/**
 * @swagger
 * /bookings/{id}:
 *   patch:
 *     summary: Update a booking's status (admin only)
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status: { type: string, enum: [pending, confirmed, done, cancelled, expired] }
 *     responses:
 *       200:
 *         description: Booking status updated
 */
router.patch('/:id', adminOnly, updateBookingStatus) // for admin to update, confirm, reject

export default router
