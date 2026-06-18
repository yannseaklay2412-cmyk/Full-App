// models/booking.model.js
const { supabase } = require('../config/supabase')

const getByUser = async (userId) => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`*, service:services(id,name,price,duration_min), timeslot:time_slots(id,date,start_time,end_time)`)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

const getById = async (bookingId) => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`*, service:services(id,name,price,duration_min), timeslot:time_slots(id,date,start_time,end_time), user:users(id,name,email,phone)`)
    .eq('id', bookingId)
    .single()
  if (error) throw error
  return data
}

const getAll = async ({ status, date } = {}) => {
  let query = supabase
    .from('bookings')
    .select(`*, service:services(id,name,price), timeslot:time_slots(id,date,start_time,end_time), user:users(id,name,email,phone)`)
    .order('created_at', { ascending: false })
  if (status) query = query.eq('status', status)
  const { data, error } = await query
  if (error) throw error
  return data
}

const create = async ({ user_id, service_id, timeslot_id, note }) => {
  // 1. Create booking
  const { data: booking, error } = await supabase
    .from('bookings')
    .insert([{ user_id, service_id, timeslot_id, note, status: 'pending' }])
    .select()
    .single()
  if (error) throw error

  // 2. Mark slot as booked
  const { error: slotError } = await supabase.from('time_slots').update({ status: 'booked' }).eq('id', timeslot_id)
  if (slotError) throw slotError

  // 3. Send notification
  const { error: notifError } = await supabase.from('notifications').insert([{
    user_id,
    booking_id: booking.id,
    title: 'Booking Received',
    message: 'Your appointment request has been received and is pending confirmation.'
  }])
  if (notifError) console.error('Failed to send booking notification:', notifError)

  return booking
}

const cancel = async (bookingId) => {
  const { data: booking, error: fetchError } = await supabase
    .from('bookings').select('timeslot_id, user_id').eq('id', bookingId).single()
  if (fetchError) throw fetchError

  const { data, error } = await supabase
    .from('bookings')
    .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
    .eq('id', bookingId).select().single()
  if (error) throw error

  // Free timeslot + notify
  const { error: slotError } = await supabase.from('time_slots').update({ status: 'available' }).eq('id', booking.timeslot_id)
  if (slotError) throw slotError

  const { error: notifError } = await supabase.from('notifications').insert([{
    user_id: booking.user_id, booking_id: bookingId,
    title: 'Booking Cancelled', message: 'Your appointment has been cancelled.'
  }])
  if (notifError) console.error('Failed to send cancel notification:', notifError)

  return data
}

const reschedule = async (bookingId, newTimeslotId) => {
  const { data: booking, error: fetchError } = await supabase
    .from('bookings').select('timeslot_id, user_id').eq('id', bookingId).single()
  if (fetchError) throw fetchError

  // Free old slot
  const { error: freeError } = await supabase.from('time_slots').update({ status: 'available' }).eq('id', booking.timeslot_id)
  if (freeError) throw freeError

  const { data, error } = await supabase
    .from('bookings')
    .update({ timeslot_id: newTimeslotId, status: 'pending' })
    .eq('id', bookingId).select().single()
  if (error) throw error

  // Book new slot + notify
  const { error: bookError } = await supabase.from('time_slots').update({ status: 'booked' }).eq('id', newTimeslotId)
  if (bookError) throw bookError

  const { error: notifError } = await supabase.from('notifications').insert([{
    user_id: booking.user_id, booking_id: bookingId,
    title: 'Booking Rescheduled', message: 'Your appointment has been rescheduled.'
  }])
  if (notifError) console.error('Failed to send reschedule notification:', notifError)

  return data
}

const updateStatus = async (bookingId, status) => {
  const { data: booking, error: fetchError } = await supabase
    .from('bookings').select('user_id').eq('id', bookingId).single()
  if (fetchError) throw fetchError

  const { data, error } = await supabase
    .from('bookings').update({ status }).eq('id', bookingId).select().single()
  if (error) throw error

  const messages = {
    confirmed: 'Your appointment has been confirmed!',
    cancelled: 'Your appointment has been cancelled by the clinic.',
    done: 'Your appointment is complete. Thank you for visiting ToothTime!'
  }
  if (messages[status]) {
    const { error: notifError } = await supabase.from('notifications').insert([{
      user_id: booking.user_id, booking_id: bookingId,
      title: `Booking ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      message: messages[status]
    }])
    if (notifError) console.error('Failed to send status notification:', notifError)
  }
  return data
}

module.exports = { getByUser, getById, getAll, create, cancel, reschedule, updateStatus }
