// models/user.model.js
const { supabase } = require('../config/supabase')

const getAll = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

const getById = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) throw error
  return data
}

const update = async (userId, updates) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  if (error) throw error
  return data
}

const changePassword = async (newPassword) => {
  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) throw error
}

const remove = async (userId) => {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId)
  if (error) throw error
}

module.exports = { getAll, getById, update, changePassword, remove }
