// routes/timeslot.routes.js
import express from 'express'
import { getAllSlots, addSlot, deleteSlot } from '../controllers/timeslot.controller.js'

const router = express.Router()

router.get('/',       getAllSlots)
router.post('/',      addSlot)
router.delete('/:id', deleteSlot)

export default router