import * as patientRepo from '../repositories/patient.repository.js'

export const getMyProfile = async (email) => {
  const patient = await patientRepo.getByEmail(email)
  if (!patient) throw { status: 404, message: 'Patient not found' }
  return patient
}

export const getAllPatients = async () => {
  return patientRepo.getAll()
}

export const getPatientById = async (id) => {
  const patient = await patientRepo.getById(id)
  if (!patient) throw { status: 404, message: 'Patient not found' }
  return patient
}

export const updateProfile = async (email, updates) => {
  const patient = await patientRepo.getByEmail(email)
  if (!patient) throw { status: 404, message: 'Patient not found' }

  // Prevent updating email or id
  const { id, email: _email, ...safeUpdates } = updates
  return patientRepo.update(patient.id, safeUpdates)
}