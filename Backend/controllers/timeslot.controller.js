// controllers/timeslot.controller.js
import * as slotService from '../services/timeslot.service.js'

export const getAllSlots = async (req, res) => {
  try {
    const slots = await slotService.getAllSlots()
    res.json(slots)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const addSlot = async (req, res) => {
  try {
    const { start_time, end_time } = req.body
    const slot = await slotService.addSlot(start_time, end_time)
    res.status(201).json(slot)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const deleteSlot = async (req, res) => {
  try {
    const { id } = req.params
    await slotService.deleteSlot(id)
    res.json({ deleted: id })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}