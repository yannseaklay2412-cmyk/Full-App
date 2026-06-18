import * as dentistService from '../services/dentist.service.js'
import asyncHandler from '../utils/asyncHandler.js'

export const getAllDentists = asyncHandler(async (req, res) => {
  const data = await dentistService.getAllDentists()
  res.status(200).json({ success: true, data })
})

export const getDentistById = asyncHandler(async (req, res) => {
  const data = await dentistService.getDentistById(req.params.id)
  res.status(200).json({ success: true, data })
})

export const createDentist = asyncHandler(async (req, res) => {
  const data = await dentistService.createDentist(req.body)
  res.status(201).json({ success: true, message: 'Dentist created', data })
})

export const updateDentist = asyncHandler(async (req, res) => {
  const data = await dentistService.updateDentist(req.params.id, req.body)
  res.status(200).json({ success: true, message: 'Dentist updated', data })
})

export const deleteDentist = asyncHandler(async (req, res) => {
  const data = await dentistService.deleteDentist(req.params.id)
  res.status(200).json({ success: true, ...data })
})
