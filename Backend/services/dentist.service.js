import * as dentistRepo from '../repositories/dentist.repository.js'

export const getAllDentists = async () => {
  const dentists = await dentistRepo.getAll()
  return dentists.map(d => ({
    ...d,                  // keep ALL original fields, untouched
    name: d.dentist_name,  // add alias for frontend compatibility
    title: d.specialty,    // adjust to your actual column name
  }))
}

export const getDentistById = async (id) => {
  const dentist = await dentistRepo.getById(id)
  if (!dentist) throw { status: 404, message: 'Dentist not found' }
  return dentist
}

export const createDentist = async (dentistData) => {
  if (!dentistData.dentist_name) throw { status: 400, message: 'Dentist name is required' }
  return dentistRepo.create(dentistData)
}

export const updateDentist = async (id, updates) => {
  const dentist = await dentistRepo.getById(id)
  if (!dentist) throw { status: 404, message: 'Dentist not found' }
  return dentistRepo.update(id, updates)
}

export const deleteDentist = async (id) => {
  const dentist = await dentistRepo.getById(id)
  if (!dentist) throw { status: 404, message: 'Dentist not found' }
  return dentistRepo.remove(id)
}