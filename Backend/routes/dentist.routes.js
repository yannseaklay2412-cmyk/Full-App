import { Router } from 'express'
import { getAllDentists, getDentistById, createDentist, updateDentist, deleteDentist } from '../controllers/dentist.controller.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'

const router = Router()

// Public — anyone can view dentists
router.get('/',    getAllDentists)
router.get('/:id', getDentistById)

// Admin only
router.post('/',    protect, adminOnly, createDentist)
router.put('/:id',  protect, adminOnly, updateDentist)
router.delete('/:id', protect, adminOnly, deleteDentist)

export default router