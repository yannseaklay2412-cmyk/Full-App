import * as serviceService from '../services/service.service.js'

export const getAllServices = async (req, res, next) => {
  try {
    const data = await serviceService.getAllServices()
    res.status(200).json({ success: true, data })
  } catch (err) { next(err) }
}

export const getServiceById = async (req, res, next) => {
  try {
    const data = await serviceService.getServiceById(req.params.id)
    res.status(200).json({ success: true, data })
  } catch (err) { next(err) }
}

export const createService = async (req, res, next) => {
  try {
    const data = await serviceService.createService(req.body)
    res.status(201).json({ success: true, message: 'Service created', data })
  } catch (err) { next(err) }
}

export const updateService = async (req, res, next) => {
  try {
    const data = await serviceService.updateService(req.params.id, req.body)
    res.status(200).json({ success: true, message: 'Service updated', data })
  } catch (err) { next(err) }
}

export const deleteService = async (req, res, next) => {
  try {
    const data = await serviceService.deleteService(req.params.id)
    res.status(200).json({ success: true, ...data })
  } catch (err) { next(err) }
}