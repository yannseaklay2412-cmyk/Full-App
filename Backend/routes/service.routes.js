// routes/service.routes.js
const express = require('express')
const router = express.Router()
const { getAllServices, getServiceById, createService, updateService, deleteService } = require('../controllers/service.controller')
const { protect, adminOnly } = require('../middleware/auth.middleware')

// GET /api/services        — Public
router.get('/', getAllServices)

// GET /api/services/:id    — Public
router.get('/:id', getServiceById)

// POST /api/services       — Admin only
router.post('/', protect, adminOnly, createService)

// PUT /api/services/:id    — Admin only
router.put('/:id', protect, adminOnly, updateService)

// DELETE /api/services/:id — Admin only
router.delete('/:id', protect, adminOnly, deleteService)

module.exports = router
