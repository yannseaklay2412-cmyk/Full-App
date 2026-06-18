import { supabase } from '../config/supabase.js'

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ success: false, message: 'No token provided' })

  const token = authHeader.split(' ')[1]

  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data.user)
    return res.status(401).json({ success: false, message: 'Invalid or expired token' })

  req.user = data.user
  next()
}

const requireRole = (role) => async (req, res, next) => {
  const { data } = await supabase
    .from('profiles')
    .select('role')
    .eq('email', req.user.email)
    .maybeSingle()

  if (data?.role !== role)
    return res.status(403).json({ success: false, message: `${role.charAt(0).toUpperCase() + role.slice(1)} access required` })
  next()
}

export const adminOnly = requireRole('admin')
export const patientOnly = requireRole('patient')
