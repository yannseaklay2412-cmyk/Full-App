import * as concernService from '../services/concern.service.js'

export const submitConcern = async (req, res, next) => {
  try {
    const data = await concernService.submitConcern(req.body.message)
    res.status(201).json({ success: true, data })
  } catch (err) { next(err) }
}

export const getAllConcerns = async (req, res, next) => {
  try {
    const data = await concernService.getAllConcerns()
    res.status(200).json({ success: true, data })
  } catch (err) { next(err) }
}
