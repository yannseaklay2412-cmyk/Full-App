import { supabase } from '../config/supabase.js'

export const getDentistSchedule = async (dentistId) => {
  const { data, error } = await supabase
    .from('dentist_schedules')
    .select('start_time, end_time')
    .eq('dentist_id', dentistId)
    .single()
  if (error) throw error
  return data
}

export const getBookedSlots = async (dentistId, date) => {
  const { data, error } = await supabase
    .from('appointments')
    .select('start_time, end_time')
    .eq('dentist_id', dentistId)
    .eq('appointment_date', date)
    .neq('status', 'cancelled')
    .not('start_time', 'is', null)
    .order('start_time')
  if (error) throw error
  return data
}

export const getServiceDuration = async (serviceId) => {
  const { data, error } = await supabase
    .from('services')
    .select('duration_minutes')
    .eq('id', serviceId)
    .single()
  if (error) throw error
  return data.duration_minutes
}
