import * as slotService from '../services/timeslot.service.js'

export const getAllTimeslots = async (req, res, next) => {
  try {
    const slots = await slotService.getAllTimeslots()
    res.json(slots)
  } catch (err) { next(err) }
}

export const getAvailableSlots = async (req, res, next) => {
  try {
    const { dentist_id, service_id, date } = req.query
    if (!dentist_id || !service_id || !date)
      return res.status(400).json({ error: 'dentist_id, service_id, and date are required' })
    const serviceIds = String(service_id).split(',').filter(Boolean)
    const slots = await slotService.getAvailableSlots(dentist_id, serviceIds, date)
    res.json({ success: true, data: slots })
  } catch (err) { next(err) }
}
