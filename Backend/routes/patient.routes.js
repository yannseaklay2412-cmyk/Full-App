import { Router } from 'express'
import * as patientController from '../controllers/patient.controller.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Patient profile and records management
 */

// ── Patient (self) ────────────────────────────────────────────────────────

/**
 * @swagger
 * /patients/me:
 *   get:
 *     summary: Get the logged-in patient's own profile
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: Patient profile
 */
router.get('/me',     protect,             patientController.getMyProfile)

/**
 * @swagger
 * /patients/me:
 *   put:
 *     summary: Update the logged-in patient's own profile
 *     tags: [Patients]
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
router.put('/me',     protect,             patientController.updateMyProfile)

// ── Admin only ────────────────────────────────────────────────────────────

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: List all patients (admin only)
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: List of patients
 */
router.get('/',       protect, adminOnly,  patientController.getAllPatients)

/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Get a patient by ID (admin only)
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Patient details
 */
router.get('/:id',    protect, adminOnly,  patientController.getPatientById)

/**
 * @swagger
 * /patients/{id}/ban:
 *   patch:
 *     summary: Ban a patient account (admin only)
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Patient banned successfully
 */
router.patch('/:id/ban', protect, adminOnly,  patientController.banPatient)

export default router
