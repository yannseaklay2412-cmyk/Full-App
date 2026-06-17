import { supabase } from '../config/supabase.js'
import { createRepository } from './baseRepository.js'

const base = createRepository('patients', { orderBy: 'created_at' })

export const getAll = async () => {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export const getById = base.getById
export const update = base.update

export const getByEmail = async (email) => {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('email', email)
    .maybeSingle()
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
