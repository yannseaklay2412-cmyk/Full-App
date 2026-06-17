import { supabase } from '../config/supabase.js'
import { createRepository } from './baseRepository.js'

const base = createRepository('timeslots', {
  selectFields: 'id, date, start_time, end_time, status, dentist_id',
  orderBy: 'date',
})

export const getAll = base.getAll
export const getById = base.getById
export const create = base.create
export const update = base.update
export const remove = base.remove

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
