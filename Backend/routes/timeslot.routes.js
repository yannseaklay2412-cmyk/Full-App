import { Router } from 'express'
import { getTimeslots, getAllTimeslots, createTimeslot, updateTimeslot, deleteTimeslot } from '../controllers/timeslot.controller.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'

const router = Router()

// Public — patients can view timeslots
router.get('/', getTimeslots)

// Admin only
router.get('/all',    protect, adminOnly, getAllTimeslots)
router.post('/',      protect, adminOnly, createTimeslot)
router.put('/:id',    protect, adminOnly, updateTimeslot)
router.delete('/:id', protect, adminOnly, deleteTimeslot)

export default router