import { supabase } from '../config/supabase.js'

export const getAll = async () => {
  const { data, error } = await supabase
    .from('dentists')
    .select('id, dentist_name, specialty, phone, background, age, image_path, dentist_schedules(start_time, end_time)')
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

export const getSchedule = async (dentistId) => {
  const { data, error } = await supabase
    .from('dentist_schedules')
    .select('id, start_time, end_time')
    .eq('dentist_id', dentistId)
    .maybeSingle()
  if (error) throw error
  return data || null
}

export const upsertSchedule = async (dentistId, start_time, end_time) => {
  const { data: existing } = await supabase
    .from('dentist_schedules')
    .select('id')
    .eq('dentist_id', dentistId)
    .maybeSingle()

  if (existing) {
    const { data, error } = await supabase
      .from('dentist_schedules')
      .update({ start_time, end_time })
      .eq('dentist_id', dentistId)
      .select()
      .single()
    if (error) throw error
    return data
  } else {
    const { data, error } = await supabase
      .from('dentist_schedules')
      .insert({ dentist_id: dentistId, start_time, end_time })
      .select()
      .single()
    if (error) throw error
    return data
  }
}