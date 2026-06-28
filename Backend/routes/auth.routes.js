import { Router } from 'express'
import { register, login, logout, forgotPassword, resetPassword, confirmPasswordChange } from '../controllers/auth.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = Router()

router.post('/register',        register)
router.post('/login',           login)
router.post('/logout',          protect, logout)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password',       resetPassword)
router.post('/confirm-password',     confirmPasswordChange)

export default router