// routes/admin.routes.js
const express = require('express')
const router = express.Router()
const { getAllUsers, getUserById, updateUser, deleteUser, getAllBookings, updateBookingStatus, getDashboard } = require('../controllers/admin.controller')
const { protect, adminOnly } = require('../middleware/auth.middleware')

// All admin routes require auth + admin role
router.use(protect, adminOnly)

// GET  /api/admin/dashboard
router.get('/dashboard', getDashboard)

// GET  /api/admin/users
router.get('/users', getAllUsers)

// GET  /api/admin/users/:id
router.get('/users/:id', getUserById)

// PUT  /api/admin/users/:id
router.put('/users/:id', updateUser)

// DELETE /api/admin/users/:id
router.delete('/users/:id', deleteUser)

// GET  /api/admin/bookings
router.get('/bookings', getAllBookings)

// PUT  /api/admin/bookings/:id/status
router.put('/bookings/:id/status', updateBookingStatus)

module.exports = router
