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
  await supabase.from('time_slots').update({ status: 'booked' }).eq('id', timeslot_id)

  // 3. Send notification
  await supabase.from('notifications').insert([{
    user_id,
    booking_id: booking.id,
    title: 'Booking Received',
    message: 'Your appointment request has been received and is pending confirmation.'
  }])

  return booking
}

const cancel = async (bookingId) => {
  const { data: booking } = await supabase
    .from('bookings').select('timeslot_id, user_id').eq('id', bookingId).single()

  const { data, error } = await supabase
    .from('bookings')
    .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
    .eq('id', bookingId).select().single()
  if (error) throw error

  // Free timeslot + notify
  await supabase.from('time_slots').update({ status: 'available' }).eq('id', booking.timeslot_id)
  await supabase.from('notifications').insert([{
    user_id: booking.user_id, booking_id: bookingId,
    title: 'Booking Cancelled', message: 'Your appointment has been cancelled.'
  }])

  return data
}

const reschedule = async (bookingId, newTimeslotId) => {
  const { data: booking } = await supabase
    .from('bookings').select('timeslot_id, user_id').eq('id', bookingId).single()

  // Free old slot
  await supabase.from('time_slots').update({ status: 'available' }).eq('id', booking.timeslot_id)

  const { data, error } = await supabase
    .from('bookings')
    .update({ timeslot_id: newTimeslotId, status: 'pending' })
    .eq('id', bookingId).select().single()
  if (error) throw error

  // Book new slot + notify
  await supabase.from('time_slots').update({ status: 'booked' }).eq('id', newTimeslotId)
  await supabase.from('notifications').insert([{
    user_id: booking.user_id, booking_id: bookingId,
    title: 'Booking Rescheduled', message: 'Your appointment has been rescheduled.'
  }])

  return data
}

const updateStatus = async (bookingId, status) => {
  const { data: booking } = await supabase
    .from('bookings').select('user_id').eq('id', bookingId).single()

  const { data, error } = await supabase
    .from('bookings').update({ status }).eq('id', bookingId).select().single()
  if (error) throw error

  const messages = {
    confirmed: 'Your appointment has been confirmed!',
    cancelled: 'Your appointment has been cancelled by the clinic.',
    done: 'Your appointment is complete. Thank you for visiting ToothTime!'
  }
  if (messages[status]) {
    await supabase.from('notifications').insert([{
      user_id: booking.user_id, booking_id: bookingId,
      title: `Booking ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      message: messages[status]
    }])
  }
  return data
}

module.exports = { getByUser, getById, getAll, create, cancel, reschedule, updateStatus }
