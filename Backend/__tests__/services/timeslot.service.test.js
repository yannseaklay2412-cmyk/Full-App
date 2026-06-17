import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../repositories/timeslot.repository.js', () => ({
  getByDentistAndDate: vi.fn(),
  getAll: vi.fn(),
  getById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
}))

import * as timeslotService from '../../services/timeslot.service.js'
import * as timeslotRepo from '../../repositories/timeslot.repository.js'

describe('timeslotService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getTimeslots', () => {
    it('returns timeslots for a dentist and date', async () => {
      timeslotRepo.getByDentistAndDate.mockResolvedValue([{ id: 't1' }])

      const result = await timeslotService.getTimeslots('d1', '2025-01-15')
      expect(timeslotRepo.getByDentistAndDate).toHaveBeenCalledWith('d1', '2025-01-15')
      expect(result).toEqual([{ id: 't1' }])
    })

    it('throws 400 when dentist_id is missing', async () => {
      await expect(timeslotService.getTimeslots(null, '2025-01-15'))
        .rejects.toEqual({ status: 400, message: 'dentist_id and date are required' })
    })

    it('throws 400 when date is missing', async () => {
      await expect(timeslotService.getTimeslots('d1', null))
        .rejects.toEqual({ status: 400, message: 'dentist_id and date are required' })
    })
  })

  describe('getAllTimeslots', () => {
    it('returns all timeslots', async () => {
      timeslotRepo.getAll.mockResolvedValue([{ id: 't1' }, { id: 't2' }])
      const result = await timeslotService.getAllTimeslots()
      expect(result).toHaveLength(2)
    })
  })

  describe('createTimeslot', () => {
    it('creates a timeslot with valid data', async () => {
      const slot = { dentist_id: 'd1', date: '2025-01-15', start_time: '09:00', end_time: '10:00' }
      timeslotRepo.create.mockResolvedValue({ id: 't1', ...slot, status: 'available' })

      const result = await timeslotService.createTimeslot(slot)
      expect(timeslotRepo.create).toHaveBeenCalledWith({ ...slot, status: 'available' })
      expect(result.status).toBe('available')
    })

    it('throws 400 when dentist_id is missing', async () => {
      await expect(timeslotService.createTimeslot({ date: '2025-01-15', start_time: '09:00', end_time: '10:00' }))
        .rejects.toEqual({ status: 400, message: 'dentist_id is required' })
    })

    it('throws 400 when date is missing', async () => {
      await expect(timeslotService.createTimeslot({ dentist_id: 'd1', start_time: '09:00', end_time: '10:00' }))
        .rejects.toEqual({ status: 400, message: 'date is required' })
    })

    it('throws 400 when start_time is missing', async () => {
      await expect(timeslotService.createTimeslot({ dentist_id: 'd1', date: '2025-01-15', end_time: '10:00' }))
        .rejects.toEqual({ status: 400, message: 'start_time is required' })
    })

    it('throws 400 when end_time is missing', async () => {
      await expect(timeslotService.createTimeslot({ dentist_id: 'd1', date: '2025-01-15', start_time: '09:00' }))
        .rejects.toEqual({ status: 400, message: 'end_time is required' })
    })
  })

  describe('updateTimeslot', () => {
    it('updates when timeslot exists', async () => {
      timeslotRepo.getById.mockResolvedValue({ id: 't1' })
      timeslotRepo.update.mockResolvedValue({ id: 't1', status: 'booked' })

      const result = await timeslotService.updateTimeslot('t1', { status: 'booked' })
      expect(timeslotRepo.update).toHaveBeenCalledWith('t1', { status: 'booked' })
      expect(result.status).toBe('booked')
    })

    it('throws 404 when timeslot not found', async () => {
      timeslotRepo.getById.mockResolvedValue(null)

      await expect(timeslotService.updateTimeslot('bad', {}))
        .rejects.toEqual({ status: 404, message: 'Timeslot not found' })
    })
  })

  describe('deleteTimeslot', () => {
    it('deletes when timeslot exists', async () => {
      timeslotRepo.getById.mockResolvedValue({ id: 't1' })
      timeslotRepo.remove.mockResolvedValue({ message: 'Timeslot deleted' })

      const result = await timeslotService.deleteTimeslot('t1')
      expect(timeslotRepo.remove).toHaveBeenCalledWith('t1')
      expect(result.message).toBe('Timeslot deleted')
    })

    it('throws 404 when timeslot not found', async () => {
      timeslotRepo.getById.mockResolvedValue(null)

      await expect(timeslotService.deleteTimeslot('bad'))
        .rejects.toEqual({ status: 404, message: 'Timeslot not found' })
    })
  })
})
