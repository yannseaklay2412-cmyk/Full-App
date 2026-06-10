import { supabase } from '../config/supabase.js'

export const getByEmail = async (email) => {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('email', email)
    .maybeSingle()
  if (error) throw error
  return data
}

export const getById = async (id) => {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export const getAll = async () => {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export const upsert = async (patientData) => {
  const { data, error } = await supabase
    .from('patients')
    .upsert(patientData, { onConflict: 'email' })
    .select()
    .single()
  if (error) throw error
  return data
}

export const update = async (id, updates) => {
  const { data, error } = await supabase
    .from('patients')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}