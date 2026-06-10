import * as dentistRepo from '../repositories/dentist.repository.js'

export const getAllDentists = async () => {
  return dentistRepo.getAll()
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