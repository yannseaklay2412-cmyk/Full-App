import * as dentistRepo from '../repositories/dentist.repository.js'
import { notFound, badRequest } from '../utils/errors.js'

export const getAllDentists = () => dentistRepo.getAll()

export const getDentistById = async (id) => {
  const dentist = await dentistRepo.getById(id)
  if (!dentist) notFound('Dentist')
  return dentist
}

export const createDentist = async (dentistData) => {
  if (!dentistData.dentist_name) badRequest('Dentist name is required')
  return dentistRepo.create(dentistData)
}

export const updateDentist = async (id, updates) => {
  const dentist = await dentistRepo.getById(id)
  if (!dentist) notFound('Dentist')
  return dentistRepo.update(id, updates)
}

export const deleteDentist = async (id) => {
  const dentist = await dentistRepo.getById(id)
  if (!dentist) notFound('Dentist')
  return dentistRepo.remove(id)
}
