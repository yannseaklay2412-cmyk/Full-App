import { supabase } from '../config/supabase.js'

export const getByDentistAndDate = async (dentistId, date) => {
  const { data, error } = await supabase
    .from('timeslots')
    .select('id, date, start_time, end_time, status')
    .eq('dentist_id', dentistId)
    .eq('date', date)
    .order('start_time')
  if (error) throw error
  return data
}

export const getById = async (id) => {
  const { data, error } = await supabase
    .from('timeslots')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export const getAll = async () => {
  const { data, error } = await supabase
    .from('timeslots')
    .select('id, date, start_time, end_time, status, dentist_id')
    .order('date')
  if (error) throw error
  return data
}

export const create = async (slotData) => {
  const { data, error } = await supabase
    .from('timeslots')
    .insert(slotData)
    .select()
    .single()
  if (error) throw error
  return data
}

export const update = async (id, updates) => {
  const { data, error } = await supabase
    .from('timeslots')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export const remove = async (id) => {
  const { error } = await supabase
    .from('timeslots')
    .delete()
    .eq('id', id)
  if (error) throw error
  return { message: 'Timeslot deleted' }
}