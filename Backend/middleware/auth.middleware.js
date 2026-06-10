import jwt from 'jsonwebtoken'
import { jwtConfig } from '../config/jwt.js'

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ success: false, message: 'No token provided' })

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, jwtConfig.secret)
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' })
  }
}

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin')
    return res.status(403).json({ success: false, message: 'Admin access required' })
  next()
}

export const patientOnly = (req, res, next) => {
  if (req.user?.role !== 'patient')
    return res.status(403).json({ success: false, message: 'Patient access required' })
  next()
}