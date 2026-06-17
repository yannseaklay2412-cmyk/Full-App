import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../services/booking.service.js', () => ({
  getMyBookings: vi.fn(),
  getBookingById: vi.fn(),
  createBooking: vi.fn(),
  cancelBooking: vi.fn(),
  getAllBookings: vi.fn(),
  updateBookingStatus: vi.fn(),
}))

import * as bookingController from '../../controllers/booking.controller.js'
import * as bookingService from '../../services/booking.service.js'

const mockRes = () => {
  const res = {}
  res.status = vi.fn().mockReturnValue(res)
  res.json = vi.fn().mockReturnValue(res)
  return res
}

describe('bookingController', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getMyBookings', () => {
    it('returns 200 with bookings', async () => {
      bookingService.getMyBookings.mockResolvedValue([{ id: 'b1' }])
      const req = { user: { email: 'test@test.com' } }
      const res = mockRes()
      const next = vi.fn()

      await bookingController.getMyBookings(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ success: true, data: [{ id: 'b1' }] })
    })

    it('calls next on error', async () => {
      const err = { status: 404, message: 'Not found' }
      bookingService.getMyBookings.mockRejectedValue(err)
      const req = { user: { email: 'a@b.com' } }
      const res = mockRes()
      const next = vi.fn()

      await bookingController.getMyBookings(req, res, next)

      expect(next).toHaveBeenCalledWith(err)
    })
  })

  describe('getBookingById', () => {
    it('returns 200 with booking', async () => {
      bookingService.getBookingById.mockResolvedValue({ id: 'b1' })
      const req = { params: { id: 'b1' } }
      const res = mockRes()
      const next = vi.fn()

      await bookingController.getBookingById(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
    })
  })

  describe('createBooking', () => {
    it('returns 201 on success', async () => {
      bookingService.createBooking.mockResolvedValue({ id: 'b1' })
      const req = { user: { email: 'test@test.com' }, body: { dentist_id: 'd1' } }
      const res = mockRes()
      const next = vi.fn()

      await bookingController.createBooking(req, res, next)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Booking created',
        data: { id: 'b1' },
      })
    })
  })

  describe('cancelBooking', () => {
    it('returns 200 on success', async () => {
      bookingService.cancelBooking.mockResolvedValue({ id: 'b1', status: 'cancelled' })
      const req = { params: { id: 'b1' } }
      const res = mockRes()
      const next = vi.fn()

      await bookingController.cancelBooking(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
    })
  })

  describe('getAllBookings', () => {
    it('returns 200 with all bookings', async () => {
      bookingService.getAllBookings.mockResolvedValue([])
      const req = { query: {} }
      const res = mockRes()
      const next = vi.fn()

      await bookingController.getAllBookings(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
    })
  })

  describe('updateBookingStatus', () => {
    it('returns 200 on success', async () => {
      bookingService.updateBookingStatus.mockResolvedValue({ id: 'b1', status: 'confirmed' })
      const req = { params: { id: 'b1' }, body: { status: 'confirmed' } }
      const res = mockRes()
      const next = vi.fn()

      await bookingController.updateBookingStatus(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Booking marked as confirmed',
        data: { id: 'b1', status: 'confirmed' },
      })
    })
  })
})
