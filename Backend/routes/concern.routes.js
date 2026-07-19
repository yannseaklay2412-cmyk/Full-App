import { Router } from 'express'
import * as concernController from '../controllers/concern.controller.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Concerns
 *   description: Anonymous concerns/complaints submitted by patients
 */

/**
 * @swagger
 * /concerns:
 *   post:
 *     summary: Submit a concern (no login required)
 *     tags: [Concerns]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [message]
 *             properties:
 *               message: { type: string }
 *     responses:
 *       201:
 *         description: Concern submitted
 */
// Anyone can submit a concern — no login required, so it's truly anonymous
router.post('/', concernController.submitConcern)

/**
 * @swagger
 * /concerns:
 *   get:
 *     summary: List all concerns (admin only)
 *     tags: [Concerns]
 *     responses:
 *       200:
 *         description: List of concerns
 */
// Only a logged-in admin can view the list of concerns
router.get('/', protect, adminOnly, concernController.getAllConcerns)

export default router
