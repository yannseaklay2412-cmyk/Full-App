import * as bookingRepo from '../repositories/booking.repository.js'
import * as patientRepo from '../repositories/patient.repository.js'
import { notFound, badRequest } from '../utils/errors.js'

export const getMyBookings = async (email) => {
  const patient = await patientRepo.getByEmail(email)
  if (!patient) notFound('Patient')
  return bookingRepo.getByPatientId(patient.id)
}

export const getBookingById = async (id) => {
  const booking = await bookingRepo.getById(id)
  if (!booking) notFound('Booking')
  return booking
}

export const createBooking = async (email, { dentist_id, notes, full_name, phone, sex, date_of_birth, address }) => {
  const patient = await patientRepo.upsert({ email, full_name, phone, sex, date_of_birth, address })
  return bookingRepo.create({ patient_id: patient.id, dentist_id, notes })
}

export const cancelBooking = async (id) => {
  const booking = await bookingRepo.getById(id)
  if (!booking) notFound('Booking')
  if (booking.status === 'cancelled') badRequest('Booking already cancelled')
  if (booking.status === 'done') badRequest('Cannot cancel a completed booking')
  return bookingRepo.cancel(id)
}

export const getAllBookings = async ({ status } = {}) => {
  return bookingRepo.getAll({ status })
}

export const updateBookingStatus = async (id, status) => {
  const allowed = ['pending', 'confirmed', 'done', 'cancelled']
  if (!allowed.includes(status)) badRequest(`Invalid status. Must be one of: ${allowed.join(', ')}`)
  const booking = await bookingRepo.getById(id)
  if (!booking) notFound('Booking')
  return bookingRepo.updateStatus(id, status)
}
