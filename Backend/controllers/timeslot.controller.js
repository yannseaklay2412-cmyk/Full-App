// controllers/timeslot.controller.js
const TimeslotModel = require('../models/timeslot.model')

// GET /api/timeslots?date=YYYY-MM-DD
const getAllSlots = async (req, res, next) => {
  try {
    const { date } = req.query
    const data = await TimeslotModel.getByDate(date)
    res.status(200).json({ success: true, data })
  } catch (err) { next(err) }
}

// GET /api/timeslots/available?date=YYYY-MM-DD
const getAvailableSlots = async (req, res, next) => {
  try {
    const { date } = req.query
    const data = await TimeslotModel.getAvailable(date)
    res.status(200).json({ success: true, data })
  } catch (err) { next(err) }
}

// GET /api/timeslots/:id
const getSlotById = async (req, res, next) => {
  try {
    const data = await TimeslotModel.getById(req.params.id)
    res.status(200).json({ success: true, data })
  } catch (err) { next(err) }
}

// POST /api/timeslots (Admin)
const createSlot = async (req, res, next) => {
  try {
    const { date, start_time, end_time, status } = req.body
    const data = await TimeslotModel.create({ date, start_time, end_time, status })
    res.status(201).json({ success: true, message: 'Time slot created', data })
  } catch (err) { next(err) }
}

// POST /api/timeslots/generate (Admin)
const generateSlots = async (req, res, next) => {
  try {
    const { date, start_hour, end_hour } = req.body
    const data = await TimeslotModel.generateForDay(date, start_hour, end_hour)
    res.status(201).json({ success: true, message: `${data.length} slots generated`, data })
  } catch (err) { next(err) }
}

// PUT /api/timeslots/:id (Admin)
const updateSlot = async (req, res, next) => {
  try {
    const data = await TimeslotModel.update(req.params.id, req.body)
    res.status(200).json({ success: true, message: 'Time slot updated', data })
  } catch (err) { next(err) }
}

// DELETE /api/timeslots/:id (Admin)
const deleteSlot = async (req, res, next) => {
  try {
    await TimeslotModel.remove(req.params.id)
    res.status(200).json({ success: true, message: 'Time slot deleted' })
  } catch (err) { next(err) }
}

module.exports = { getAllSlots, getAvailableSlots, getSlotById, createSlot, generateSlots, updateSlot, deleteSlot }
