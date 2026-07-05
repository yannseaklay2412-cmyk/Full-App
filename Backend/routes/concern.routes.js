import { Router } from 'express'
import * as concernController from '../controllers/concern.controller.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'

const router = Router()

// Anyone can submit a concern — no login required, so it's truly anonymous
router.post('/', concernController.submitConcern)

// Only a logged-in admin can view the list of concerns
router.get('/', protect, adminOnly, concernController.getAllConcerns)

export default router
