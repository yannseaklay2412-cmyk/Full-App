import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { notFound, errorHandler } from './middleware/error.middleware.js'

import authRoutes     from './routes/auth.routes.js'
import userRoutes     from './routes/user.routes.js'
import bookingRoutes  from './routes/booking.routes.js'
import dentistRoutes  from './routes/dentist.routes.js'
import serviceRoutes  from './routes/service.routes.js'
import timeslotRoutes from './routes/timeslot.routes.js'
import adminRoutes    from './routes/admin.routes.js'

const app = express()

// ── Global Middleware ─────────────────────────────────────
app.use(helmet())

const corsOrigin = process.env.CORS_ORIGIN
if (!corsOrigin) {
  console.warn('CORS_ORIGIN is not set — defaulting to same-origin only')
}
app.use(cors({ origin: corsOrigin || false }))

app.use(express.json({ limit: '1mb' }))

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
} else {
  app.use(morgan('combined'))
}

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many requests, please try again later' },
})
app.use('/api/auth', authLimiter)

// ── Health Check ──────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ success: true, message: '🦷 Smilly API is running!' })
})

// ── API Routes ────────────────────────────────────────────
app.use('/api/auth',      authRoutes)
app.use('/api/users',     userRoutes)
app.use('/api/bookings',  bookingRoutes)
app.use('/api/dentists',  dentistRoutes)
app.use('/api/services',  serviceRoutes)
app.use('/api/timeslots', timeslotRoutes)
app.use('/api/admin',     adminRoutes)

// ── 404 & Error ───────────────────────────────────────────
app.use(notFound)
app.use(errorHandler)

export default app