import { supabase } from '../config/supabase.js'

export const getByPatientId = async (patientId) => {
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      id, status, notes, created_at, appointment_date, start_time, end_time,
      dentists ( id, dentist_name, specialty ),
      patients ( id, full_name, phone ),
      appointment_services ( services ( id, service_name, price, duration_minutes ) )
    `)
    .eq('patient_id', patientId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export const getById = async (id) => {
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      id, status, notes, created_at, appointment_date, start_time, end_time,
      dentists ( id, dentist_name, specialty ),
      patients ( id, full_name, email, phone ),
      appointment_services ( services ( id, service_name, price, duration_minutes ) )
    `)
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export const getAll = async ({ status } = {}) => {
  let query = supabase
    .from('appointments')
    .select(`
      id, status, notes, created_at, appointment_date, start_time, end_time,
      dentists ( id, dentist_name, specialty ),
      patients ( id, full_name, email, phone ),
      appointment_services ( services ( id, service_name, price, duration_minutes ) )
    `)
    .order('created_at', { ascending: false })
  if (status) query = query.eq('status', status)
  const { data, error } = await query
  if (error) throw error
  return data
}

export const create = async ({ patient_id, dentist_id, notes, appointment_date, start_time, end_time }) => {
  const { data, error } = await supabase
    .from('appointments')
    .insert({ patient_id, dentist_id, status: 'pending', notes, appointment_date, start_time, end_time })
    .select()
    .single()
  if (error) throw error
  return data
}

export const updateStatus = async (id, status) => {
  const { data, error } = await supabase
    .from('appointments')
    .update({ status })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export const cancel = async (id) => {
  return updateStatus(id, 'cancelled')
}

export const linkServices = async (appointmentId, serviceIds) => {
  const { error } = await supabase
    .from('appointment_services')
    .insert(serviceIds.map(serviceId => ({ appointment_id: appointmentId, service_id: serviceId })))
  if (error) throw error
}