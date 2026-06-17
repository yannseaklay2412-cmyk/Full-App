import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../repositories/dentist.repository.js', () => ({
  getAll: vi.fn(),
  getById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
}))

import * as dentistService from '../../services/dentist.service.js'
import * as dentistRepo from '../../repositories/dentist.repository.js'

describe('dentistService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getAllDentists', () => {
    it('returns all dentists', async () => {
      dentistRepo.getAll.mockResolvedValue([
        { id: 'd1', dentist_name: 'Dr. Smith' },
        { id: 'd2', dentist_name: 'Dr. Jones' },
      ])
      const result = await dentistService.getAllDentists()
      expect(result).toHaveLength(2)
    })
  })

  describe('getDentistById', () => {
    it('returns dentist when found', async () => {
      dentistRepo.getById.mockResolvedValue({ id: 'd1', dentist_name: 'Dr. Smith' })
      const result = await dentistService.getDentistById('d1')
      expect(result.dentist_name).toBe('Dr. Smith')
    })

    it('throws 404 when dentist not found', async () => {
      dentistRepo.getById.mockResolvedValue(null)

      await expect(dentistService.getDentistById('bad'))
        .rejects.toEqual({ status: 404, message: 'Dentist not found' })
    })
  })

  describe('createDentist', () => {
    it('creates a dentist with valid data', async () => {
      const input = { dentist_name: 'Dr. New', specialty: 'Orthodontics' }
      dentistRepo.create.mockResolvedValue({ id: 'd3', ...input })

      const result = await dentistService.createDentist(input)
      expect(dentistRepo.create).toHaveBeenCalledWith(input)
      expect(result.dentist_name).toBe('Dr. New')
    })

    it('throws 400 when dentist_name is missing', async () => {
      await expect(dentistService.createDentist({ specialty: 'General' }))
        .rejects.toEqual({ status: 400, message: 'Dentist name is required' })
    })
  })

  describe('updateDentist', () => {
    it('updates when dentist exists', async () => {
      dentistRepo.getById.mockResolvedValue({ id: 'd1' })
      dentistRepo.update.mockResolvedValue({ id: 'd1', specialty: 'Updated' })

      const result = await dentistService.updateDentist('d1', { specialty: 'Updated' })
      expect(dentistRepo.update).toHaveBeenCalledWith('d1', { specialty: 'Updated' })
    })

    it('throws 404 when dentist not found', async () => {
      dentistRepo.getById.mockResolvedValue(null)

      await expect(dentistService.updateDentist('bad', {}))
        .rejects.toEqual({ status: 404, message: 'Dentist not found' })
    })
  })

  describe('deleteDentist', () => {
    it('deletes when dentist exists', async () => {
      dentistRepo.getById.mockResolvedValue({ id: 'd1' })
      dentistRepo.remove.mockResolvedValue({ message: 'Dentist deleted' })

      const result = await dentistService.deleteDentist('d1')
      expect(dentistRepo.remove).toHaveBeenCalledWith('d1')
    })

    it('throws 404 when dentist not found', async () => {
      dentistRepo.getById.mockResolvedValue(null)

      await expect(dentistService.deleteDentist('bad'))
        .rejects.toEqual({ status: 404, message: 'Dentist not found' })
    })
  })
})
