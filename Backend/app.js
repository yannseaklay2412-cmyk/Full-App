// app.js
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { errorHandler, notFound } = require('./middleware/error.middleware')

// Routes
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const serviceRoutes = require('./routes/service.routes')
const timeslotRoutes = require('./routes/timeslot.routes')
const bookingRoutes = require('./routes/booking.routes')
const adminRoutes = require('./routes/admin.routes')

const app = express()

// ── Global Middleware ──────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || '*' }))
app.use(express.json())
app.use(morgan('dev'))

// ── Health Check ──────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ success: true, message: 'ToothTime API is running 🦷' })
})

// ── API Routes ────────────────────────────────────────────
app.use('/api/auth',      authRoutes)
app.use('/api/users',     userRoutes)
app.use('/api/services',  serviceRoutes)
app.use('/api/timeslots', timeslotRoutes)
app.use('/api/bookings',  bookingRoutes)
app.use('/api/admin',     adminRoutes)

// ── 404 & Error Handlers ──────────────────────────────────
app.use(notFound)
app.use(errorHandler)

module.exports = app
