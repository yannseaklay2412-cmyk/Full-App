import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/error.middleware.js'
import patientRoutes from './routes/patient.routes.js'

import authRoutes     from './routes/auth.routes.js'
import userRoutes     from './routes/user.routes.js'
import bookingRoutes  from './routes/booking.routes.js'
import dentistRoutes  from './routes/dentist.routes.js'
import serviceRoutes  from './routes/service.routes.js'
import timeslotRoutes from './routes/timeslot.routes.js'
import adminRoutes    from './routes/admin.routes.js'


const app = express()

// ── Global Middleware ─────────────────────────────────────
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }))
app.use(express.json())
app.use(morgan('dev'))

// ── Health Check ──────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ success: true, message: '🦷 Smilly API is running!' })
})

// ── API Routes ────────────────────────────────────────────
app.use('/api/auth',      authRoutes)
app.use('/api/patients', patientRoutes)
app.use('/api/users',     userRoutes)
app.use('/api/bookings',  bookingRoutes)
app.use('/api/dentists',  dentistRoutes)
app.use('/api/services',  serviceRoutes)
app.use('/api/timeslots', timeslotRoutes)
app.use('/api/admin',     adminRoutes)
app.use('/api/timeslots', timeslotRoutes)


// ── 404 & Error ───────────────────────────────────────────
app.use(notFound)
app.use(errorHandler)

export default app