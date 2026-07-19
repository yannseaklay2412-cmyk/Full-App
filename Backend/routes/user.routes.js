import { Router } from 'express'
import * as patientController from '../controllers/patient.controller.js'
import { protect , adminOnly} from '../middleware/auth.middleware.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Alias of the Patients endpoints, mounted under /users
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get the logged-in user's own profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User profile
 */
router.get('/me',     protect,            patientController.getMyProfile)

/**
 * @swagger
 * /users/me:
 *   put:
 *     summary: Update the logged-in user's own profile
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name: { type: string }
 *               phone: { type: string }
 *               sex: { type: string, enum: [male, female, other] }
 *               date_of_birth: { type: string, format: date }
 *               address: { type: string }
 *     responses:
 *       200:
 *         description: Profile updated
 */
router.put('/me',     protect,            patientController.updateMyProfile)

/**
 * @swagger
 * /users:
 *   get:
 *     summary: List all users/patients (admin only)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/',       protect, adminOnly, patientController.getAllPatients)

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID (admin only)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: User details
 */
router.get('/:id',    protect, adminOnly, patientController.getPatientById)

/**
 * @swagger
 * /users/{id}/ban:
 *   patch:
 *     summary: Ban a user account (admin only)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: User banned successfully
 */
router.patch('/:id/ban', protect, adminOnly, patientController.banPatient)

export default router
