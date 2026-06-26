import * as slotRepo from '../repositories/timeslot.repository.js'

const toMinutes = (t) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

const toTime = (mins) => {
  const h = Math.floor(mins / 60).toString().padStart(2, '0')
  const m = (mins % 60).toString().padStart(2, '0')
  return `${h}:${m}:00`
}

export const getAvailableSlots = async (dentistId, serviceId, date) => {
  const [duration, schedule, booked] = await Promise.all([
    slotRepo.getServiceDuration(serviceId),
    slotRepo.getDentistSchedule(dentistId),
    slotRepo.getBookedSlots(dentistId, date),
  ])

  if (!duration || !schedule) return []

  const workStart = toMinutes(schedule.start_time)
  const workEnd   = toMinutes(schedule.end_time)

  const blocked = booked
    .filter(b => b.start_time && b.end_time)
    .map(b => ({ start: toMinutes(b.start_time), end: toMinutes(b.end_time) }))
    .sort((a, b) => a.start - b.start)

  const slots = []
  let cursor = workStart

  for (const block of blocked) {
    while (cursor + duration <= block.start) {
      slots.push({ slot_start: toTime(cursor), slot_end: toTime(cursor + duration) })
      cursor += duration
    }
    if (block.end > cursor) cursor = block.end
  }

  while (cursor + duration <= workEnd) {
    slots.push({ slot_start: toTime(cursor), slot_end: toTime(cursor + duration) })
    cursor += duration
  }

  return slots
}
