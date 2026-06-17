import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../services/patient.service.js', () => ({
  getMyProfile: vi.fn(),
  updateProfile: vi.fn(),
  getAllPatients: vi.fn(),
  getPatientById: vi.fn(),
}))

import * as userController from '../../controllers/user.controller.js'
import * as patientService from '../../services/patient.service.js'

const mockRes = () => {
  const res = {}
  res.status = vi.fn().mockReturnValue(res)
  res.json = vi.fn().mockReturnValue(res)
  return res
}

describe('userController', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getMyProfile', () => {
    it('returns 200 with profile', async () => {
      patientService.getMyProfile.mockResolvedValue({ id: 'p1', full_name: 'Test' })
      const req = { user: { email: 'test@test.com' } }
      const res = mockRes()
      const next = vi.fn()

      await userController.getMyProfile(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: { id: 'p1', full_name: 'Test' },
      })
    })

    it('calls next on error', async () => {
      const err = { status: 404, message: 'Patient not found' }
      patientService.getMyProfile.mockRejectedValue(err)
      const req = { user: { email: 'bad@test.com' } }
      const res = mockRes()
      const next = vi.fn()

      await userController.getMyProfile(req, res, next)

      expect(next).toHaveBeenCalledWith(err)
    })
  })

  describe('updateMyProfile', () => {
    it('returns 200 on success', async () => {
      patientService.updateProfile.mockResolvedValue({ id: 'p1', full_name: 'Updated' })
      const req = { user: { email: 'test@test.com' }, body: { full_name: 'Updated' } }
      const res = mockRes()
      const next = vi.fn()

      await userController.updateMyProfile(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Profile updated',
        data: { id: 'p1', full_name: 'Updated' },
      })
    })
  })

  describe('getAllPatients', () => {
    it('returns 200 with all patients', async () => {
      patientService.getAllPatients.mockResolvedValue([{ id: 'p1' }])
      const req = {}
      const res = mockRes()
      const next = vi.fn()

      await userController.getAllPatients(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
    })
  })

  describe('getPatientById', () => {
    it('returns 200 with patient', async () => {
      patientService.getPatientById.mockResolvedValue({ id: 'p1' })
      const req = { params: { id: 'p1' } }
      const res = mockRes()
      const next = vi.fn()

      await userController.getPatientById(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
    })
  })
})
