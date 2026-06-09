// routes/user.routes.js
const express = require('express')
const router = express.Router()
const { getMyProfile, updateMyProfile, changePassword } = require('../controllers/user.controller')
const { protect } = require('../middleware/auth.middleware')

// All routes require authentication
router.use(protect)

// GET  /api/users/me
router.get('/me', getMyProfile)

// PUT  /api/users/me
router.put('/me', updateMyProfile)

// PUT  /api/users/me/password
router.put('/me/password', changePassword)

module.exports = router
