import * as timeslotRepo from '../repositories/timeslot.repository.js'

export const getTimeslots = async (dentistId, date) => {
  if (!dentistId || !date) throw { status: 400, message: 'dentist_id and date are required' }
  return timeslotRepo.getByDentistAndDate(dentistId, date)
}

export const getAllTimeslots = async () => {
  return timeslotRepo.getAll()
}

export const createTimeslot = async (slotData) => {
  if (!slotData.dentist_id) throw { status: 400, message: 'dentist_id is required' }
  if (!slotData.date)       throw { status: 400, message: 'date is required' }
  if (!slotData.start_time) throw { status: 400, message: 'start_time is required' }
  if (!slotData.end_time)   throw { status: 400, message: 'end_time is required' }
  return timeslotRepo.create({ ...slotData, status: 'available' })
}

export const updateTimeslot = async (id, updates) => {
  const slot = await timeslotRepo.getById(id)
  if (!slot) throw { status: 404, message: 'Timeslot not found' }
  return timeslotRepo.update(id, updates)
}

export const deleteTimeslot = async (id) => {
  const slot = await timeslotRepo.getById(id)
  if (!slot) throw { status: 404, message: 'Timeslot not found' }
  return timeslotRepo.remove(id)
}