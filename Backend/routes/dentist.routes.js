import { Router } from 'express'
import { getAllDentists, getDentistById, createDentist, updateDentist, deleteDentist, getDentistSchedule, upsertDentistSchedule } from '../controllers/dentist.controller.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'

const router = Router()

// Public — anyone can view dentists
router.get('/',    getAllDentists)
router.get('/:id', getDentistById)

// Admin only
router.post('/',    protect, adminOnly, createDentist)
router.put('/:id',  protect, adminOnly, updateDentist)
router.delete('/:id', protect, adminOnly, deleteDentist)

// Schedule (work hours) — public read, admin write
router.get('/:id/schedule', getDentistSchedule)
router.put('/:id/schedule', protect, adminOnly, upsertDentistSchedule)

export default router