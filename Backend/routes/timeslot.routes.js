import express from 'express'
import { getAllTimeslots, getAvailableSlots } from '../controllers/timeslot.controller.js'

const router = express.Router()

router.get('/', getAllTimeslots)
router.get('/available', getAvailableSlots)

export default router
