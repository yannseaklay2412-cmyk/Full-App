import * as patientRepo from '../repositories/patient.repository.js'
import { notFound } from '../utils/errors.js'

export const getMyProfile = async (email) => {
  const patient = await patientRepo.getByEmail(email)
  if (!patient) notFound('Patient')
  return patient
}

export const getAllPatients = () => patientRepo.getAll()

export const getPatientById = async (id) => {
  const patient = await patientRepo.getById(id)
  if (!patient) notFound('Patient')
  return patient
}

export const updateProfile = async (email, updates) => {
  const patient = await patientRepo.getByEmail(email)
  if (!patient) notFound('Patient')

  const { id, email: _email, ...safeUpdates } = updates
  return patientRepo.update(patient.id, safeUpdates)
}
