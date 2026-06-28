import crypto from 'crypto'
import { supabase } from '../config/supabase.js'
import * as patientRepo from '../repositories/patient.repository.js'
import * as authRepo from '../repositories/auth.repository.js'
import { sendPasswordConfirmEmail, sendPasswordUpdatedEmail } from './email.service.js'
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
  const patient = await patientRepo.findByEmail(email)
  if(patient?.is_banned){
    throw{ status : 403,message:'Your account has been banned'}
  }
  if (!email || !password)
    throw { status: 400, message: 'Email and password are required' }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw { status: 401, message: 'Invalid email or password' }

  // Check role
  const { data: user } = await supabase
    .from('profiles').select('role').eq('email', data.user.email).maybeSingle()

  // const role = user?.role == 'admin' ? 'admin' : 'patient' 
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

export const forgotPassword = async (email, newPassword) => {
  if (!email) throw { status: 400, message: 'Email is required' }
  if (!newPassword || newPassword.length < 6)
    throw { status: 400, message: 'Password must be at least 6 characters' }

  const user = await authRepo.findUserByEmail(email)
  if (!user) throw { status: 404, message: 'We could not find an account with that email.' }

  // Generate a token
  const rawToken = crypto.randomBytes(32).toString('hex')
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString()

  // Store token + new password temporarily — applied only when user confirms
  await authRepo.saveResetToken(email, tokenHash, expiresAt, newPassword)

  // Send email with confirm button link
  const confirmLink = `${process.env.FRONTEND_URL}/confirm-password?token=${rawToken}`
  await sendPasswordConfirmEmail(email, confirmLink)

  return { message: 'A confirmation email has been sent. Click the button in your email to apply the change.' }
}

export const confirmPasswordChange = async (rawToken) => {
  if (!rawToken) throw { status: 400, message: 'Token is required' }

  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')
  const record = await authRepo.findValidToken(tokenHash)
  if (!record) throw { status: 400, message: 'This confirmation link is invalid or has expired.' }

  const user = await authRepo.findUserByEmail(record.email)
  if (!user) throw { status: 404, message: 'Account not found.' }

  // Now apply the password change
  const { error } = await supabase.auth.admin.updateUserById(user.id, { password: record.new_password })
  if (error) throw { status: 500, message: 'Failed to update password' }

  // Mark token as used so it cannot be clicked again
  await authRepo.markTokenUsed(record.id)

  // Notify user that their password was changed
  await sendPasswordUpdatedEmail(record.email)

  return { message: 'Password updated successfully.' }
}

export const resetPassword = async (rawToken, newPassword) => {
  if (!rawToken || !newPassword)
    throw { status: 400, message: 'Token and new password are required' }

  if (newPassword.length < 6)
    throw { status: 400, message: 'Password must be at least 6 characters' }

  // 1. Hash the incoming token to match against what's stored
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')

  // 2. Look it up — only valid if not used and not expired
  const record = await authRepo.findValidToken(tokenHash)
  if (!record) throw { status: 400, message: 'Reset link is invalid or has expired' }

  // 3. Find the patient to get their Supabase Auth UUID
  const user = await authRepo.findUserByEmail(record.email)
  if (!user) throw { status: 400, message: 'User not found' }

  // 4. Update the password through the Supabase Auth admin API
  //    (requires SUPABASE_SERVICE_KEY — already configured in config/supabase.js)
  const { error } = await supabase.auth.admin.updateUserById(user.id, { password: newPassword })
  if (error) throw { status: 500, message: 'Failed to update password' }

  // 5. Mark the token as used so it cannot be reused
  await authRepo.markTokenUsed(record.id)

  return { message: 'Password updated successfully' }
}