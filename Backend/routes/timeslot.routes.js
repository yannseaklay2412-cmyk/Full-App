// routes/timeslot.routes.js
const express = require('express')
const router = express.Router()
const { getAllSlots, getAvailableSlots, getSlotById, createSlot, generateSlots, updateSlot, deleteSlot } = require('../controllers/timeslot.controller')
const { protect, adminOnly } = require('../middleware/auth.middleware')

// GET /api/timeslots?date=YYYY-MM-DD       — Public
router.get('/', getAllSlots)

// GET /api/timeslots/available?date=...    — Public
router.get('/available', getAvailableSlots)

// GET /api/timeslots/:id                   — Public
router.get('/:id', getSlotById)

// POST /api/timeslots                      — Admin only
router.post('/', protect, adminOnly, createSlot)

// POST /api/timeslots/generate             — Admin only
router.post('/generate', protect, adminOnly, generateSlots)

// PUT /api/timeslots/:id                   — Admin only
router.put('/:id', protect, adminOnly, updateSlot)

// DELETE /api/timeslots/:id               — Admin only
router.delete('/:id', protect, adminOnly, deleteSlot)

module.exports = router
