import * as bookingRepo from '../repositories/booking.repository.js'
import * as patientRepo from '../repositories/patient.repository.js'

export const getMyBookings = async (email) => {
  const patient = await patientRepo.findByEmail(email)
  if (!patient) throw { status: 404, message: 'Patient not found' }
  return bookingRepo.getByPatientId(patient.id)
}

export const getBookingById = async (id) => {
  const booking = await bookingRepo.getById(id)
  if (!booking) throw { status: 404, message: 'Booking not found' }
  return booking
}

export const createBooking = async (email, { dentist_id, service_ids, notes, full_name, phone, sex, date_of_birth, address, appointment_date, start_time, end_time }) => {
  const patient = await patientRepo.upsert({ email, full_name, phone, sex, date_of_birth, address })
  const booking = await bookingRepo.create({ patient_id: patient.id, dentist_id, notes, appointment_date, start_time, end_time })
  if (service_ids?.length) await bookingRepo.linkServices(booking.id, service_ids)
  return booking
}
// upsert patient info if provided, then create booking, then link services if provided
// This allows patients to update their info when booking an appointment, and also book multiple services at once
// The bookingRepo.linkServices function handles the many-to-many relationship between appointments and services

export const cancelBooking = async (id) => {
  const booking = await bookingRepo.getById(id)
  if (!booking) throw { status: 404, message: 'Booking not found' }
  if (booking.status === 'cancelled') throw { status: 400, message: 'Booking already cancelled' }
  if (booking.status === 'done') throw { status: 400, message: 'Cannot cancel a completed booking' }
  if (booking.status === 'expired') throw { status: 400, message: 'Cannot cancel an expired booking' }
  return bookingRepo.cancel(id)
}

export const getAllBookings = async ({ status } = {}) => {
  return bookingRepo.getAll({ status })
}

export const updateBookingStatus = async (id, status) => {
  const allowed = ['pending', 'confirmed', 'done', 'cancelled', 'expired']
  if (!allowed.includes(status)) throw { status: 400, message: `Invalid status. Must be one of: ${allowed.join(', ')}` }
  const booking = await bookingRepo.getById(id)
  if (!booking) throw { status: 404, message: 'Booking not found' }
  return bookingRepo.updateStatus(id, status)
}

export const expireOverdueBookings = async () => {
  return bookingRepo.expireOverdue()
}