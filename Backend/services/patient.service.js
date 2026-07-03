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
  if (result) return result
  // No patient row yet (e.g. user hasn't booked before) — create one now
  return patientRepository.upsert({ email, ...body })
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

  // 1. Delete all appointments (and their service records)
  await patientRepository.deleteAppointmentsByPatientId(id)

  // 2. Mark as banned — the protect middleware will block all future API calls
  return await patientRepository.banById(id)
}