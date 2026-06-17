import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../repositories/patient.repository.js', () => ({
  getByEmail: vi.fn(),
  getAll: vi.fn(),
  getById: vi.fn(),
  update: vi.fn(),
}))

import * as patientService from '../../services/patient.service.js'
import * as patientRepo from '../../repositories/patient.repository.js'

describe('patientService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getMyProfile', () => {
    it('returns the patient profile', async () => {
      const patient = { id: 'p1', email: 'test@test.com', full_name: 'Test' }
      patientRepo.getByEmail.mockResolvedValue(patient)

      const result = await patientService.getMyProfile('test@test.com')
      expect(result).toEqual(patient)
    })

    it('throws 404 when patient not found', async () => {
      patientRepo.getByEmail.mockResolvedValue(null)

      await expect(patientService.getMyProfile('unknown@test.com'))
        .rejects.toEqual({ status: 404, message: 'Patient not found' })
    })
  })

  describe('getAllPatients', () => {
    it('returns all patients', async () => {
      patientRepo.getAll.mockResolvedValue([{ id: 'p1' }, { id: 'p2' }])

      const result = await patientService.getAllPatients()
      expect(result).toHaveLength(2)
    })
  })

  describe('getPatientById', () => {
    it('returns patient when found', async () => {
      patientRepo.getById.mockResolvedValue({ id: 'p1' })

      const result = await patientService.getPatientById('p1')
      expect(result.id).toBe('p1')
    })

    it('throws 404 when patient not found', async () => {
      patientRepo.getById.mockResolvedValue(null)

      await expect(patientService.getPatientById('bad'))
        .rejects.toEqual({ status: 404, message: 'Patient not found' })
    })
  })

  describe('updateProfile', () => {
    it('updates profile without id or email fields', async () => {
      const patient = { id: 'p1', email: 'test@test.com' }
      patientRepo.getByEmail.mockResolvedValue(patient)
      patientRepo.update.mockResolvedValue({ id: 'p1', full_name: 'Updated' })

      const result = await patientService.updateProfile('test@test.com', {
        id: 'should-be-stripped',
        email: 'should-be-stripped',
        full_name: 'Updated',
        phone: '987654321',
      })

      expect(patientRepo.update).toHaveBeenCalledWith('p1', {
        full_name: 'Updated',
        phone: '987654321',
      })
      expect(result.full_name).toBe('Updated')
    })

    it('throws 404 when patient not found', async () => {
      patientRepo.getByEmail.mockResolvedValue(null)

      await expect(patientService.updateProfile('unknown@test.com', {}))
        .rejects.toEqual({ status: 404, message: 'Patient not found' })
    })
  })
})
