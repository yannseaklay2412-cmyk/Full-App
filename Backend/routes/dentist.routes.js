import { Router } from 'express'
import { getAllDentists, getDentistById, createDentist, updateDentist, deleteDentist, getDentistSchedule, upsertDentistSchedule } from '../controllers/dentist.controller.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Dentists
 *   description: Dentist profiles and work schedules
 */

/**
 * @swagger
 * /dentists:
 *   get:
 *     summary: List all dentists
 *     tags: [Dentists]
 *     security: []
 *     responses:
 *       200:
 *         description: List of dentists
 */
router.get('/',    getAllDentists)

/**
 * @swagger
 * /dentists/{id}:
 *   get:
 *     summary: Get a dentist by ID
 *     tags: [Dentists]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Dentist details
 */
router.get('/:id', getDentistById)

/**
 * @swagger
 * /dentists:
 *   post:
 *     summary: Create a dentist (admin only)
 *     tags: [Dentists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [dentist_name, telegram]
 *             properties:
 *               dentist_name: { type: string }
 *               specialty: { type: string }
 *               phone: { type: string }
 *               telegram: { type: string }
 *               background: { type: string }
 *               age: { type: integer }
 *               image_path: { type: string }
 *     responses:
 *       201:
 *         description: Dentist created
 */
router.post('/',    protect, adminOnly, createDentist)

/**
 * @swagger
 * /dentists/{id}:
 *   put:
 *     summary: Update a dentist (admin only)
 *     tags: [Dentists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dentist_name: { type: string }
 *               specialty: { type: string }
 *               phone: { type: string }
 *               telegram: { type: string }
 *               background: { type: string }
 *               age: { type: integer }
 *               image_path: { type: string }
 *     responses:
 *       200:
 *         description: Dentist updated
 */
router.put('/:id',  protect, adminOnly, updateDentist)

/**
 * @swagger
 * /dentists/{id}:
 *   delete:
 *     summary: Delete a dentist (admin only)
 *     tags: [Dentists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Dentist deleted
 */
router.delete('/:id', protect, adminOnly, deleteDentist)

/**
 * @swagger
 * /dentists/{id}/schedule:
 *   get:
 *     summary: Get a dentist's work schedule
 *     tags: [Dentists]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Dentist schedule (start_time/end_time)
 */
router.get('/:id/schedule', getDentistSchedule)

/**
 * @swagger
 * /dentists/{id}/schedule:
 *   put:
 *     summary: Set a dentist's work schedule (admin only)
 *     tags: [Dentists]
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
 *             required: [start_time, end_time]
 *             properties:
 *               start_time: { type: string, example: "09:00" }
 *               end_time: { type: string, example: "17:00" }
 *     responses:
 *       200:
 *         description: Schedule saved
 */
router.put('/:id/schedule', protect, adminOnly, upsertDentistSchedule)

export default router
