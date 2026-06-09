// controllers/service.controller.js
const ServiceModel = require('../models/service.model')

// GET /api/services
const getAllServices = async (req, res, next) => {
  try {
    const data = await ServiceModel.getAll()
    res.status(200).json({ success: true, data })
  } catch (err) { next(err) }
}

// GET /api/services/:id
const getServiceById = async (req, res, next) => {
  try {
    const data = await ServiceModel.getById(req.params.id)
    res.status(200).json({ success: true, data })
  } catch (err) { next(err) }
}

// POST /api/services (Admin)
const createService = async (req, res, next) => {
  try {
    const { name, description, price, duration_min, image_url } = req.body
    const data = await ServiceModel.create({ name, description, price, duration_min, image_url })
    res.status(201).json({ success: true, message: 'Service created', data })
  } catch (err) { next(err) }
}

// PUT /api/services/:id (Admin)
const updateService = async (req, res, next) => {
  try {
    const data = await ServiceModel.update(req.params.id, req.body)
    res.status(200).json({ success: true, message: 'Service updated', data })
  } catch (err) { next(err) }
}

// DELETE /api/services/:id (Admin)
const deleteService = async (req, res, next) => {
  try {
    await ServiceModel.remove(req.params.id)
    res.status(200).json({ success: true, message: 'Service deleted' })
  } catch (err) { next(err) }
}

module.exports = { getAllServices, getServiceById, createService, updateService, deleteService }
