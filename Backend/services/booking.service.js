import * as bookingRepo from '../repositories/booking.repository.js'
import * as patientRepo from '../repositories/patient.repository.js'

export const getMyBookings = async (email) => {
  const patient = await patientRepo.getByEmail(email)
  if (!patient) throw { status: 404, message: 'Patient not found' }
  return bookingRepo.getByPatientId(patient.id)
}

export const getBookingById = async (id) => {
  const booking = await bookingRepo.getById(id)
  if (!booking) throw { status: 404, message: 'Booking not found' }
  return booking
}

export const createBooking = async (email, { dentist_id, notes, full_name, phone, sex, date_of_birth, address, appointment_date, start_time, end_time }) => {
  const patient = await patientRepo.upsert({ email, full_name, phone, sex, date_of_birth, address })
  const booking = await bookingRepo.create({ patient_id: patient.id, dentist_id, notes, appointment_date, start_time, end_time })
  return booking
}

export const cancelBooking = async (id) => {
  const booking = await bookingRepo.getById(id)
  if (!booking) throw { status: 404, message: 'Booking not found' }
  if (booking.status === 'cancelled') throw { status: 400, message: 'Booking already cancelled' }
  if (booking.status === 'done') throw { status: 400, message: 'Cannot cancel a completed booking' }
  return bookingRepo.cancel(id)
}

export const getAllBookings = async ({ status } = {}) => {
  return bookingRepo.getAll({ status })
}

export const updateBookingStatus = async (id, status) => {
  const allowed = ['pending', 'confirmed', 'done', 'cancelled']
  if (!allowed.includes(status)) throw { status: 400, message: `Invalid status. Must be one of: ${allowed.join(', ')}` }
  const booking = await bookingRepo.getById(id)
  if (!booking) throw { status: 404, message: 'Booking not found' }
  return bookingRepo.updateStatus(id, status)
}