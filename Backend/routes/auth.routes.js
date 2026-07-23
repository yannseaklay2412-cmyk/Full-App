import { Router } from 'express'
import { register, login, logout, forgotPassword, resetPassword } from '../controllers/auth.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Registration, login, and password reset
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new patient account
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [full_name, email, phone, sex, password]
 *             properties:
 *               full_name: { type: string, example: John Doe }
 *               email: { type: string, example: john@example.com }
 *               phone: { type: string, example: "012345678" }
 *               sex: { type: string, enum: [male, female, other] }
 *               password: { type: string, format: password, example: secret123 }
 *     responses:
 *       200:
 *         description: Account created successfully
 */
router.post('/register',        register)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in and receive a JWT
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string }
 *               password: { type: string, format: password }
 *     responses:
 *       200:
 *         description: Returns the user's role and basic user info
 */
router.post('/login',           login)

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out the current session
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post('/logout',          protect, logout)

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request a password reset email
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string }
 *     responses:
 *       200:
 *         description: Reset email sent
 */
router.post('/forgot-password', forgotPassword)

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password using the emailed token
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token, password]
 *             properties:
 *               token: { type: string }
 *               password: { type: string, format: password }
 *     responses:
 *       200:
 *         description: Password updated successfully
 */
router.post('/reset-password',       resetPassword)

export default router
