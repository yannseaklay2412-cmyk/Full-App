// services/timeslot.service.js
import * as slotRepo from '../repositories/timeslot.repository.js'

export const getAllSlots = async () => {
  return await slotRepo.getAllSlots()
}

export const addSlot = async (start_time, end_time) => {
  if (!start_time || !end_time) throw new Error('start_time and end_time are required')
  return await slotRepo.addSlot(start_time, end_time)
}

export const deleteSlot = async (id) => {
  if (!id) throw new Error('id is required')
  await slotRepo.deleteSlot(id)
}