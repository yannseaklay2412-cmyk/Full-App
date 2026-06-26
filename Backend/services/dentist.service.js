import * as dentistRepo from '../repositories/dentist.repository.js'

export const getAllDentists = async () => {
  const dentists = await dentistRepo.getAll()
  return dentists.map(({ dentist_schedules, ...d }) => ({
    ...d,
    name: d.dentist_name,
    title: d.specialty,
    work_start: dentist_schedules?.[0]?.start_time?.slice(0, 5) || null,
    work_end:   dentist_schedules?.[0]?.end_time?.slice(0, 5)   || null,
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

export const getDentistSchedule = async (id) => {
  return dentistRepo.getSchedule(id)
}

export const upsertDentistSchedule = async (id, start_time, end_time) => {
  const dentist = await dentistRepo.getById(id)
  if (!dentist) throw { status: 404, message: 'Dentist not found' }
  return dentistRepo.upsertSchedule(id, start_time, end_time)
}