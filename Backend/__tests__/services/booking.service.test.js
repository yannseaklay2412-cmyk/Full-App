import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../repositories/booking.repository.js', () => ({
  getByPatientId: vi.fn(),
  getById: vi.fn(),
  getAll: vi.fn(),
  create: vi.fn(),
  cancel: vi.fn(),
  updateStatus: vi.fn(),
}))

vi.mock('../../repositories/patient.repository.js', () => ({
  getByEmail: vi.fn(),
  upsert: vi.fn(),
}))

import * as bookingService from '../../services/booking.service.js'
import * as bookingRepo from '../../repositories/booking.repository.js'
import * as patientRepo from '../../repositories/patient.repository.js'

describe('bookingService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getMyBookings', () => {
    it('returns bookings for a valid patient', async () => {
      patientRepo.getByEmail.mockResolvedValue({ id: 'p1' })
      bookingRepo.getByPatientId.mockResolvedValue([{ id: 'b1' }])

      const result = await bookingService.getMyBookings('test@test.com')
      expect(patientRepo.getByEmail).toHaveBeenCalledWith('test@test.com')
      expect(bookingRepo.getByPatientId).toHaveBeenCalledWith('p1')
      expect(result).toEqual([{ id: 'b1' }])
    })

    it('throws 404 when patient not found', async () => {
      patientRepo.getByEmail.mockResolvedValue(null)

      await expect(bookingService.getMyBookings('unknown@test.com'))
        .rejects.toEqual({ status: 404, message: 'Patient not found' })
    })
  })

  describe('getBookingById', () => {
    it('returns booking when found', async () => {
      const booking = { id: 'b1', status: 'pending' }
      bookingRepo.getById.mockResolvedValue(booking)

      const result = await bookingService.getBookingById('b1')
      expect(result).toEqual(booking)
    })

    it('throws 404 when booking not found', async () => {
      bookingRepo.getById.mockResolvedValue(null)

      await expect(bookingService.getBookingById('bad-id'))
        .rejects.toEqual({ status: 404, message: 'Booking not found' })
    })
  })

  describe('createBooking', () => {
    it('upserts patient and creates booking', async () => {
      const patient = { id: 'p1' }
      const booking = { id: 'b1', patient_id: 'p1', dentist_id: 'd1' }
      patientRepo.upsert.mockResolvedValue(patient)
      bookingRepo.create.mockResolvedValue(booking)

      const result = await bookingService.createBooking('test@test.com', {
        dentist_id: 'd1',
        notes: 'Checkup',
        full_name: 'Test User',
        phone: '123456789',
        sex: 'male',
        date_of_birth: '1990-01-01',
        address: '123 St',
      })

      expect(patientRepo.upsert).toHaveBeenCalledWith({
        email: 'test@test.com',
        full_name: 'Test User',
        phone: '123456789',
        sex: 'male',
        date_of_birth: '1990-01-01',
        address: '123 St',
      })
      expect(bookingRepo.create).toHaveBeenCalledWith({
        patient_id: 'p1',
        dentist_id: 'd1',
        notes: 'Checkup',
      })
      expect(result).toEqual(booking)
    })
  })

  describe('cancelBooking', () => {
    it('cancels a pending booking', async () => {
      bookingRepo.getById.mockResolvedValue({ id: 'b1', status: 'pending' })
      bookingRepo.cancel.mockResolvedValue({ id: 'b1', status: 'cancelled' })

      const result = await bookingService.cancelBooking('b1')
      expect(bookingRepo.cancel).toHaveBeenCalledWith('b1')
      expect(result.status).toBe('cancelled')
    })

    it('throws 404 when booking not found', async () => {
      bookingRepo.getById.mockResolvedValue(null)

      await expect(bookingService.cancelBooking('bad'))
        .rejects.toEqual({ status: 404, message: 'Booking not found' })
    })

    it('throws 400 when booking already cancelled', async () => {
      bookingRepo.getById.mockResolvedValue({ id: 'b1', status: 'cancelled' })

      await expect(bookingService.cancelBooking('b1'))
        .rejects.toEqual({ status: 400, message: 'Booking already cancelled' })
    })

    it('throws 400 when booking is done', async () => {
      bookingRepo.getById.mockResolvedValue({ id: 'b1', status: 'done' })

      await expect(bookingService.cancelBooking('b1'))
        .rejects.toEqual({ status: 400, message: 'Cannot cancel a completed booking' })
    })
  })

  describe('getAllBookings', () => {
    it('returns all bookings with optional status filter', async () => {
      bookingRepo.getAll.mockResolvedValue([{ id: 'b1' }])

      const result = await bookingService.getAllBookings({ status: 'pending' })
      expect(bookingRepo.getAll).toHaveBeenCalledWith({ status: 'pending' })
      expect(result).toEqual([{ id: 'b1' }])
    })

    it('works without arguments', async () => {
      bookingRepo.getAll.mockResolvedValue([])
      const result = await bookingService.getAllBookings()
      expect(bookingRepo.getAll).toHaveBeenCalledWith({ status: undefined })
      expect(result).toEqual([])
    })
  })

  describe('updateBookingStatus', () => {
    it('updates status with a valid value', async () => {
      bookingRepo.getById.mockResolvedValue({ id: 'b1', status: 'pending' })
      bookingRepo.updateStatus.mockResolvedValue({ id: 'b1', status: 'confirmed' })

      const result = await bookingService.updateBookingStatus('b1', 'confirmed')
      expect(bookingRepo.updateStatus).toHaveBeenCalledWith('b1', 'confirmed')
      expect(result.status).toBe('confirmed')
    })

    it('throws 400 for invalid status', async () => {
      await expect(bookingService.updateBookingStatus('b1', 'invalid'))
        .rejects.toEqual({
          status: 400,
          message: 'Invalid status. Must be one of: pending, confirmed, done, cancelled',
        })
    })

    it('throws 404 when booking not found', async () => {
      bookingRepo.getById.mockResolvedValue(null)

      await expect(bookingService.updateBookingStatus('bad', 'pending'))
        .rejects.toEqual({ status: 404, message: 'Booking not found' })
    })
  })
})
