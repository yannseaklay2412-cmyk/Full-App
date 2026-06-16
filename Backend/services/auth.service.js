import { supabase } from '../config/supabase.js'
import * as patientRepo from '../repositories/patient.repository.js'
import jwt from 'jsonwebtoken'
import { jwtConfig } from '../config/jwt.js'

export const register = async ({ full_name, email, phone, sex, password }) => {
  if (!full_name || !email || !phone || !sex || !password)
    throw { status: 400, message: 'All fields are required' }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) throw { status: 400, message: 'Invalid email format' }

  const phoneRegex = /^\d{9,10}$/
  if (!phoneRegex.test(phone)) throw { status: 400, message: 'Invalid phone number' }

  if (!['male', 'female', 'other'].includes(sex))
    throw { status: 400, message: 'Invalid sex value' }

  if (password.length < 6)
    throw { status: 400, message: 'Password must be at least 6 characters' }

  // Create auth account
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) {
    if (error.message === 'User already registered')
      throw { status: 400, message: 'Email already registered' }
    throw { status: 400, message: error.message }
  }

  // Insert patient profile
  const { error: profileError } = await supabase
    .from('patients')
    .insert({ id: data.user.id, full_name, email, phone, sex })

  if (profileError) throw { status: 500, message: 'Failed to create profile' }

  return { message: 'Account created successfully' }
}

export const login = async ({ email, password }) => {
  if (!email || !password)
    throw { status: 400, message: 'Email and password are required' }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw { status: 401, message: 'Invalid email or password' }

  // Check role
  const { data: user } = await supabase
    .from('profiles').select('role').eq('email', data.user.email).maybeSingle()

 const role = user?.role === 'admin' ? 'admin' : 'patient'  

  // Generate JWT
  const token = jwt.sign(
    { id: data.user.id, email: data.user.email, role },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  )

  return { token, role, user: { id: data.user.id, email: data.user.email } }
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw { status: 500, message: 'Logout failed' }
  return { message: 'Logged out successfully' }
}

export const forgotPassword = async (email) => {
  if (!email) throw { status: 400, message: 'Email is required' }
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.FRONTEND_URL}/reset-password`
  })
  if (error) throw { status: 400, message: error.message }
  return { message: 'Password reset email sent' }
}

export const resetPassword = async (password) => {
  if (!password || password.length < 6)
    throw { status: 400, message: 'Password must be at least 6 characters' }
  const { error } = await supabase.auth.updateUser({ password })
  if (error) throw { status: 400, message: error.message }
  return { message: 'Password updated successfully' }
}