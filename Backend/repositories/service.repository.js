import { supabase } from '../config/supabase.js'

export const getAll = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('id, service_name, description, price, duration_minutes')
    .order('service_name')
  if (error) throw error
  return data
}

export const getById = async (id) => {
  const { data, error } = await supabase
    .from('services')
    .select('id, service_name, description, price, duration_minutes')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export const create = async (serviceData) => {
  const { data, error } = await supabase
    .from('services')
    .insert(serviceData)
    .select()
    .single()
  if (error) throw error
  return data
}

export const update = async (id, updates) => {
  const { data, error } = await supabase
    .from('services')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export const remove = async (id) => {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id)
  if (error) throw error
  return { message: 'Service deleted' }
}