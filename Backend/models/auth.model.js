// models/auth.model.js
const { supabase } = require('../config/supabase')

const register = async ({ name, email, password, phone }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name, phone, role: 'patient' } }
  })
  if (error) throw error
  return data
}

const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

const forgotPassword = async (email) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email)
  if (error) throw error
}

const resetPassword = async (newPassword) => {
  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) throw error
}

module.exports = { register, login, logout, forgotPassword, resetPassword }
