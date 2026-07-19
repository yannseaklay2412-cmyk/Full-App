import express from 'express'
import { getAllTimeslots, getAvailableSlots } from '../controllers/timeslot.controller.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Timeslots
 *   description: Appointment time slot lookup
 */

/**
 * @swagger
 * /timeslots:
 *   get:
 *     summary: List all timeslots
 *     tags: [Timeslots]
 *     security: []
 *     responses:
 *       200:
 *         description: List of timeslots
 */
router.get('/', getAllTimeslots)

/**
 * @swagger
 * /timeslots/available:
 *   get:
 *     summary: Get available slots for a dentist/service/date
 *     tags: [Timeslots]
 *     security: []
 *     parameters:
 *       - in: query
 *         name: dentist_id
 *         schema: { type: string }
 *       - in: query
 *         name: service_id
 *         schema: { type: string }
 *       - in: query
 *         name: date
 *         schema: { type: string, format: date }
 *     responses:
 *       200:
 *         description: List of available start/end times
 */
router.get('/available', getAvailableSlots)

export default router
