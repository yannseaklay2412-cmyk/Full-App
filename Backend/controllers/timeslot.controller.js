import * as timeslotService from '../services/timeslot.service.js'

export const getTimeslots = async (req, res, next) => {
  try {
    const { dentist_id, date } = req.query
    const data = await timeslotService.getTimeslots(dentist_id, date)
    res.status(200).json({ success: true, data })
  } catch (err) { next(err) }
}

export const getAllTimeslots = async (req, res, next) => {
  try {
    const data = await timeslotService.getAllTimeslots()
    res.status(200).json({ success: true, data })
  } catch (err) { next(err) }
}

export const createTimeslot = async (req, res, next) => {
  try {
    const data = await timeslotService.createTimeslot(req.body)
    res.status(201).json({ success: true, message: 'Timeslot created', data })
  } catch (err) { next(err) }
}

export const updateTimeslot = async (req, res, next) => {
  try {
    const data = await timeslotService.updateTimeslot(req.params.id, req.body)
    res.status(200).json({ success: true, message: 'Timeslot updated', data })
  } catch (err) { next(err) }
}

export const deleteTimeslot = async (req, res, next) => {
  try {
    const data = await timeslotService.deleteTimeslot(req.params.id)
    res.status(200).json({ success: true, ...data })
  } catch (err) { next(err) }
}