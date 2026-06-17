import * as timeslotService from '../services/timeslot.service.js'
import asyncHandler from '../utils/asyncHandler.js'

export const getTimeslots = asyncHandler(async (req, res) => {
  const { dentist_id, date } = req.query
  const data = await timeslotService.getTimeslots(dentist_id, date)
  res.status(200).json({ success: true, data })
})

export const getAllTimeslots = asyncHandler(async (req, res) => {
  const data = await timeslotService.getAllTimeslots()
  res.status(200).json({ success: true, data })
})

export const createTimeslot = asyncHandler(async (req, res) => {
  const data = await timeslotService.createTimeslot(req.body)
  res.status(201).json({ success: true, message: 'Timeslot created', data })
})

export const updateTimeslot = asyncHandler(async (req, res) => {
  const data = await timeslotService.updateTimeslot(req.params.id, req.body)
  res.status(200).json({ success: true, message: 'Timeslot updated', data })
})

export const deleteTimeslot = asyncHandler(async (req, res) => {
  const data = await timeslotService.deleteTimeslot(req.params.id)
  res.status(200).json({ success: true, ...data })
})
