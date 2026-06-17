import * as patientService from '../services/patient.service.js'
import asyncHandler from '../utils/asyncHandler.js'

export const getMyProfile = asyncHandler(async (req, res) => {
  const data = await patientService.getMyProfile(req.user.email)
  res.status(200).json({ success: true, data })
})

export const updateMyProfile = asyncHandler(async (req, res) => {
  const data = await patientService.updateProfile(req.user.email, req.body)
  res.status(200).json({ success: true, message: 'Profile updated', data })
})

export const getAllPatients = asyncHandler(async (req, res) => {
  const data = await patientService.getAllPatients()
  res.status(200).json({ success: true, data })
})

export const getPatientById = asyncHandler(async (req, res) => {
  const data = await patientService.getPatientById(req.params.id)
  res.status(200).json({ success: true, data })
})
