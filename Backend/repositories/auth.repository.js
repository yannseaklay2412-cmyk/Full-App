import { supabase } from '../config/supabase.js'

export const findUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('patients')
    .select('id, email, full_name')
    .eq('email', email)
    .maybeSingle()

  if (error) throw { status: 500, message: error.message }
  return data || null
}

export const saveResetToken = async (email, tokenHash, expiresAt, newPassword) => {
  // Remove any existing tokens for this email — only one active token at a time
  await supabase.from('password_reset_tokens').delete().eq('email', email)

  const { error } = await supabase
    .from('password_reset_tokens')
    .insert({ email, token_hash: tokenHash, expires_at: expiresAt, new_password: newPassword })

  if (error) throw { status: 500, message: error.message }
}

export const findValidToken = async (tokenHash) => {
  const { data, error } = await supabase
    .from('password_reset_tokens')
    .select('id, email, new_password')
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
