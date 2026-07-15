import * as patientService from '../services/patient.service.js'

// ── Admin ─────────────────────────────────────────────────────────────────

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