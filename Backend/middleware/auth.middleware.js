import { supabase } from '../config/supabase.js'

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ success: false, message: 'No token provided' })

  const token = authHeader.split(' ')[1]

  // ✅ Verify Supabase token instead of JWT
  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data.user)
    return res.status(401).json({ success: false, message: 'Invalid or expired token' })

  req.user = data.user
  next()
}

export const adminOnly = async (req, res, next) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('email', req.user.email)
    .maybeSingle()

  if (error)
    return res.status(500).json({ success: false, message: 'Failed to verify role' })
  if (data?.role !== 'admin')
    return res.status(403).json({ success: false, message: 'Admin access required' })
  next()
}

export const patientOnly = async (req, res, next) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('email', req.user.email)
    .maybeSingle()

  if (error)
    return res.status(500).json({ success: false, message: 'Failed to verify role' })
  if (data?.role !== 'patient')
    return res.status(403).json({ success: false, message: 'Patient access required' })
  next()
}