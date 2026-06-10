import * as patientService from '../services/patient.service.js'

export const getMyProfile = async (req, res, next) => {
  try {
    const data = await patientService.getMyProfile(req.user.email)
    res.status(200).json({ success: true, data })
  } catch (err) { next(err) }
}

export const updateMyProfile = async (req, res, next) => {
  try {
    const data = await patientService.updateProfile(req.user.email, req.body)
    res.status(200).json({ success: true, message: 'Profile updated', data })
  } catch (err) { next(err) }
}

// Admin
export const getAllPatients = async (req, res, next) => {
  try {
    const data = await patientService.getAllPatients()
    res.status(200).json({ success: true, data })
  } catch (err) { next(err) }
}

export const getPatientById = async (req, res, next) => {
  try {
    const data = await patientService.getPatientById(req.params.id)
    res.status(200).json({ success: true, data })
  } catch (err) { next(err) }
}