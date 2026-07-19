import { Router } from 'express'
import { getAllBookings, updateBookingStatus } from '../controllers/booking.controller.js'
import { getAllPatients, getPatientById } from '../controllers/user.controller.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'

const router = Router()

router.use(protect, adminOnly)

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-only shortcuts for bookings and patients
 */

/**
 * @swagger
 * /admin/bookings:
 *   get:
 *     summary: List all bookings (admin only)
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of bookings
 */
// Bookings
router.get('/bookings',              getAllBookings)

/**
 * @swagger
 * /admin/bookings/{id}/status:
 *   put:
 *     summary: Update a booking's status (admin only)
 *     tags: [Admin]
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
router.put('/bookings/:id/status',   updateBookingStatus)

/**
 * @swagger
 * /admin/patients:
 *   get:
 *     summary: List all patients (admin only)
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of patients
 */
// Patients
router.get('/patients',              getAllPatients)

/**
 * @swagger
 * /admin/patients/{id}:
 *   get:
 *     summary: Get a patient by ID (admin only)
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Patient details
 */
router.get('/patients/:id',          getPatientById)


export default router
