import { Router } from 'express'
import { getAllServices, getServiceById, createService, updateService, deleteService } from '../controllers/service.controller.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'

const router = Router()

// Public
router.get('/',    getAllServices)
router.get('/:id', getServiceById)

// Admin only
router.post('/',      protect, adminOnly, createService)
router.put('/:id',    protect, adminOnly, updateService)
router.delete('/:id', protect, adminOnly, deleteService)

export default router