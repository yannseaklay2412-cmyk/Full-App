import * as serviceService from '../services/service.service.js'
import asyncHandler from '../utils/asyncHandler.js'

export const getAllServices = asyncHandler(async (req, res) => {
  const data = await serviceService.getAllServices()
  res.status(200).json({ success: true, data })
})

export const getServiceById = asyncHandler(async (req, res) => {
  const data = await serviceService.getServiceById(req.params.id)
  res.status(200).json({ success: true, data })
})

export const createService = asyncHandler(async (req, res) => {
  const data = await serviceService.createService(req.body)
  res.status(201).json({ success: true, message: 'Service created', data })
})

export const updateService = asyncHandler(async (req, res) => {
  const data = await serviceService.updateService(req.params.id, req.body)
  res.status(200).json({ success: true, message: 'Service updated', data })
})

export const deleteService = asyncHandler(async (req, res) => {
  const data = await serviceService.deleteService(req.params.id)
  res.status(200).json({ success: true, ...data })
})
