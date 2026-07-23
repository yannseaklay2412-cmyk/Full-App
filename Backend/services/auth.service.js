import crypto from 'crypto'
import { supabase } from '../config/supabase.js'
import * as patientRepo from '../repositories/patient.repository.js'
import * as authRepo from '../repositories/auth.repository.js'
import { sendPasswordConfirmEmail, sendPasswordUpdatedEmail } from './email.service.js'

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

  // Insert role profile
  const { error: profileError } = await supabase
    .from('profiles')
    .insert({ id: data.user.id, email, role: 'patient' })

  if (profileError) throw { status: 500, message: 'Failed to create profile' }

  // Insert patient record
  const { error: patientError } = await supabase
    .from('patients')
    .insert({ id: data.user.id, full_name, email, phone, sex })

  if (patientError) throw { status: 500, message: 'Failed to create patient record' }

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

  return { role, user: { id: data.user.id, email: data.user.email } }
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw { status: 500, message: 'Logout failed' }
  return { message: 'Logged out successfully' }
}

export const forgotPassword = async (email) => {
  if (!email) throw { status: 400, message: 'Email is required' }

  const user = await authRepo.findUserByEmail(email)
  if (!user) throw { status: 404, message: 'We could not find an account with that email.' }

  // Generate a token — the password itself is never stored, only proof the user owns the email
  const rawToken = crypto.randomBytes(32).toString('hex')
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString()

  await authRepo.saveResetToken(email, tokenHash, expiresAt)

  // Send email with reset link — user sets their new password after clicking through
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`
  await sendPasswordConfirmEmail(email, resetLink)

  return { message: 'A reset email has been sent. Click the link in your email to set a new password.' }
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

  // Notify the user their password was changed
  await sendPasswordUpdatedEmail(record.email)

  return { message: 'Password updated successfully' }
}