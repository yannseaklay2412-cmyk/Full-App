import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../services/timeslot.service.js', () => ({
  getTimeslots: vi.fn(),
  getAllTimeslots: vi.fn(),
  createTimeslot: vi.fn(),
  updateTimeslot: vi.fn(),
  deleteTimeslot: vi.fn(),
}))

import * as timeslotController from '../../controllers/timeslot.controller.js'
import * as timeslotService from '../../services/timeslot.service.js'

const mockRes = () => {
  const res = {}
  res.status = vi.fn().mockReturnValue(res)
  res.json = vi.fn().mockReturnValue(res)
  return res
}

describe('timeslotController', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getTimeslots', () => {
    it('returns 200 with timeslots', async () => {
      timeslotService.getTimeslots.mockResolvedValue([{ id: 't1' }])
      const req = { query: { dentist_id: 'd1', date: '2025-01-15' } }
      const res = mockRes()
      const next = vi.fn()

      await timeslotController.getTimeslots(req, res, next)

      expect(timeslotService.getTimeslots).toHaveBeenCalledWith('d1', '2025-01-15')
      expect(res.status).toHaveBeenCalledWith(200)
    })
  })

  describe('getAllTimeslots', () => {
    it('returns 200 with all timeslots', async () => {
      timeslotService.getAllTimeslots.mockResolvedValue([])
      const req = {}
      const res = mockRes()
      const next = vi.fn()

      await timeslotController.getAllTimeslots(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
    })
  })

  describe('createTimeslot', () => {
    it('returns 201 on success', async () => {
      timeslotService.createTimeslot.mockResolvedValue({ id: 't1' })
      const req = { body: { dentist_id: 'd1', date: '2025-01-15' } }
      const res = mockRes()
      const next = vi.fn()

      await timeslotController.createTimeslot(req, res, next)

      expect(res.status).toHaveBeenCalledWith(201)
    })
  })

  describe('updateTimeslot', () => {
    it('returns 200 on success', async () => {
      timeslotService.updateTimeslot.mockResolvedValue({ id: 't1' })
      const req = { params: { id: 't1' }, body: { status: 'booked' } }
      const res = mockRes()
      const next = vi.fn()

      await timeslotController.updateTimeslot(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
    })
  })

  describe('deleteTimeslot', () => {
    it('returns 200 on success', async () => {
      timeslotService.deleteTimeslot.mockResolvedValue({ message: 'Timeslot deleted' })
      const req = { params: { id: 't1' } }
      const res = mockRes()
      const next = vi.fn()

      await timeslotController.deleteTimeslot(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
    })
  })
})
