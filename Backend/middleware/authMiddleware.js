import { supabase } from '../config/supabaseClient.js'

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' })
  }

  try {
    // Verify token with Supabase
    const { data, error } = await supabase.auth.getUser(token)

    if (error || !data.user) {
      return res.status(401).json({ message: 'Invalid or expired token.' })
    }

    // Attach user to request
    req.user = data.user
    next()

  } catch (err) {
    console.error('Auth middleware error:', err)
    res.status(401).json({ message: 'Unauthorized.' })
  }
}

export { protect }