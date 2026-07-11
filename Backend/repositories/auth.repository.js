import { supabase } from '../config/supabase.js'

export const findUserByEmail = async (email) => {
  // Check patients table first
  const { data: patient, error: patientError } = await supabase
    .from('patients')
    .select('id, email, full_name')
    .eq('email', email)
    .maybeSingle()

  if (patientError) throw { status: 500, message: patientError.message }
  if (patient) return patient

  // Fall back to profiles table (for admin users)
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, email')
    .eq('email', email)
    .maybeSingle()

  if (profileError) throw { status: 500, message: profileError.message }
  return profile || null
}

export const saveResetToken = async (email, tokenHash, expiresAt) => {
  // Remove any existing tokens for this email — only one active token at a time
  await supabase.from('password_reset_tokens').delete().eq('email', email)

  const { error } = await supabase
    .from('password_reset_tokens')
    .insert({ email, token_hash: tokenHash, expires_at: expiresAt })

  if (error) throw { status: 500, message: error.message }
}

export const findValidToken = async (tokenHash) => {
  const { data, error } = await supabase
    .from('password_reset_tokens')
    .select('id, email')
    .eq('token_hash', tokenHash)
    .eq('used', false)
    .gt('expires_at', new Date().toISOString())
    .maybeSingle()

  if (error) throw { status: 500, message: error.message }
  return data || null
}

export const markTokenUsed = async (id) => {
  const { error } = await supabase
    .from('password_reset_tokens')
    .update({ used: true })
    .eq('id', id)

  if (error) throw { status: 500, message: error.message }
}
