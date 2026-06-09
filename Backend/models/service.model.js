// models/service.model.js
const { supabase } = require('../config/supabase')

const getAll = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true })
  if (error) throw error
  return data
}

const getById = async (serviceId) => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', serviceId)
    .single()
  if (error) throw error
  return data
}

const create = async ({ name, description, price, duration_min, image_url }) => {
  const { data, error } = await supabase
    .from('services')
    .insert([{ name, description, price, duration_min, image_url }])
    .select()
    .single()
  if (error) throw error
  return data
}

const update = async (serviceId, updates) => {
  const { data, error } = await supabase
    .from('services')
    .update(updates)
    .eq('id', serviceId)
    .select()
    .single()
  if (error) throw error
  return data
}

// Soft delete
const remove = async (serviceId) => {
  const { error } = await supabase
    .from('services')
    .update({ is_active: false })
    .eq('id', serviceId)
  if (error) throw error
}

module.exports = { getAll, getById, create, update, remove }
