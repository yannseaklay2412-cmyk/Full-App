import * as dentistService from '../services/dentist.service.js'

export const getAllDentists = async (req, res, next) => {
  try {
    const data = await dentistService.getAllDentists()
    res.json(data)
  } catch (err) { next(err) }
}

export const getDentistById = async (req, res, next) => {
  try {
    const data = await dentistService.getDentistById(req.params.id)
    res.json(data)
  } catch (err) { next(err) }
}

export const createDentist = async (req, res, next) => {
  try {
    const data = await dentistService.createDentist(req.body)
    res.status(201).json(data)
  } catch (err) { next(err) }
}

export const updateDentist = async (req, res, next) => {
  try {
    const data = await dentistService.updateDentist(req.params.id, req.body)
    res.json(data)
  } catch (err) { next(err) }
}

export const deleteDentist = async (req, res, next) => {
  try {
    const data = await dentistService.deleteDentist(req.params.id)
    res.json({ deleted: req.params.id, ...data })
  } catch (err) { next(err) }
}