import { Router } from 'express'
import { getMyProfile, updateMyProfile } from '../controllers/user.controller.js'
import { protect, patientOnly } from '../middleware/auth.middleware.js'

const router = Router()

router.use(protect, patientOnly)

// GET  /api/users/me  — get my profile
router.get('/me',  getMyProfile)

// PUT  /api/users/me  — update my profile
router.put('/me',  updateMyProfile)

export default router