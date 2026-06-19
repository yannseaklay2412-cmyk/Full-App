import * as patientRepository from '../repositories/patient.repository.js'

export const getMyProfile = async (email) => {
  const result = await patientRepository.findByEmail(email)
  if (!result) {
    const err = new Error('Patient not found')
    err.status = 404
    throw err
  }
  return result
}

export const updateProfile = async (email, body) => {
  const result = await patientRepository.updateByEmail(email, body)
  if (!result) {
    const err = new Error('Patient not found')
    err.status = 404
    throw err
  }
  return result
}

// ── Admin ─────────────────────────────────────────────────────────────────

export const getAllPatients = async () => {
  return await patientRepository.findAll()
}

export const getPatientById = async (id) => {
  const patient = await patientRepository.findById(id)
  if (!patient) {
    const err = new Error('Patient not found')
    err.status = 404
    throw err
  }
  return patient
}

export const banPatient = async (id) => {
  const existing = await patientRepository.findById(id)
  if (!existing) {
    const err = new Error('Patient not found')
    err.status = 404
    throw err
  }
  return await patientRepository.banById(id)
}