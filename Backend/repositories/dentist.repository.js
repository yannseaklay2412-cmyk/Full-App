import { supabase } from '../config/supabase.js'

export const getAll = async () => {
  const { data, error } = await supabase
    .from('dentists')
    .select('id, dentist_name, specialty, phone, background, age')
    .order('dentist_name')
  if (error) throw error
  return data
}

export const getById = async (id) => {
  const { data, error } = await supabase
    .from('dentists')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export const create = async (dentistData) => {
  const { data, error } = await supabase
    .from('dentists')
    .insert(dentistData)
    .select()
    .single()
  if (error) throw error
  return data
}

export const update = async (id, updates) => {
  const { data, error } = await supabase
    .from('dentists')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export const remove = async (id) => {
  const { error } = await supabase
    .from('dentists')
    .delete()
    .eq('id', id)
  if (error) throw error
  return { message: 'Dentist deleted' }
}