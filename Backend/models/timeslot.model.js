// models/timeslot.model.js
const { supabase } = require('../config/supabase')

const getByDate = async (date) => {
  const query = supabase
    .from('time_slots')
    .select('*')
    .order('start_time', { ascending: true })
  if (date) query.eq('date', date)
  const { data, error } = await query
  if (error) throw error
  return data
}

const getAvailable = async (date) => {
  const query = supabase
    .from('time_slots')
    .select('*')
    .eq('status', 'available')
    .order('start_time', { ascending: true })
  if (date) query.eq('date', date)
  const { data, error } = await query
  if (error) throw error
  return data
}

const getById = async (slotId) => {
  const { data, error } = await supabase
    .from('time_slots')
    .select('*')
    .eq('id', slotId)
    .single()
  if (error) throw error
  return data
}

const create = async ({ date, start_time, end_time, status = 'available' }) => {
  const { data, error } = await supabase
    .from('time_slots')
    .insert([{ date, start_time, end_time, status }])
    .select()
    .single()
  if (error) throw error
  return data
}

// Auto-generate 30-min slots, skip lunch 12:00-13:00
const generateForDay = async (date, startHour = '08:00', endHour = '17:30') => {
  const slots = []
  let current = new Date(`${date}T${startHour}:00`)
  const end = new Date(`${date}T${endHour}:00`)

  while (current < end) {
    const slotStart = new Date(current)
    const slotEnd = new Date(current.getTime() + 30 * 60000)
    const hour = slotStart.getHours()

    if (hour < 12 || hour >= 13) {
      slots.push({
        date,
        start_time: slotStart.toISOString(),
        end_time: slotEnd.toISOString(),
        status: 'available'
      })
    }
    current = slotEnd
  }

  const { data, error } = await supabase
    .from('time_slots')
    .insert(slots)
    .select()
  if (error) throw error
  return data
}

const update = async (slotId, updates) => {
  const { data, error } = await supabase
    .from('time_slots')
    .update(updates)
    .eq('id', slotId)
    .select()
    .single()
  if (error) throw error
  return data
}

const remove = async (slotId) => {
  const { error } = await supabase
    .from('time_slots')
    .delete()
    .eq('id', slotId)
  if (error) throw error
}

module.exports = { getByDate, getAvailable, getById, create, generateForDay, update, remove }
