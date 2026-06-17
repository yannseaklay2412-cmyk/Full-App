import * as timeslotRepo from '../repositories/timeslot.repository.js'
import { notFound, badRequest } from '../utils/errors.js'

export const getTimeslots = async (dentistId, date) => {
  if (!dentistId || !date) badRequest('dentist_id and date are required')
  return timeslotRepo.getByDentistAndDate(dentistId, date)
}

export const getAllTimeslots = () => timeslotRepo.getAll()

export const createTimeslot = async (slotData) => {
  if (!slotData.dentist_id) badRequest('dentist_id is required')
  if (!slotData.date)       badRequest('date is required')
  if (!slotData.start_time) badRequest('start_time is required')
  if (!slotData.end_time)   badRequest('end_time is required')
  return timeslotRepo.create({ ...slotData, status: 'available' })
}

export const updateTimeslot = async (id, updates) => {
  const slot = await timeslotRepo.getById(id)
  if (!slot) notFound('Timeslot')
  return timeslotRepo.update(id, updates)
}

export const deleteTimeslot = async (id) => {
  const slot = await timeslotRepo.getById(id)
  if (!slot) notFound('Timeslot')
  return timeslotRepo.remove(id)
}
