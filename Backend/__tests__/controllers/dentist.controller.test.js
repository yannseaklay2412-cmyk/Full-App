import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../services/dentist.service.js', () => ({
  getAllDentists: vi.fn(),
  getDentistById: vi.fn(),
  createDentist: vi.fn(),
  updateDentist: vi.fn(),
  deleteDentist: vi.fn(),
}))

import * as dentistController from '../../controllers/dentist.controller.js'
import * as dentistService from '../../services/dentist.service.js'

const mockRes = () => {
  const res = {}
  res.status = vi.fn().mockReturnValue(res)
  res.json = vi.fn().mockReturnValue(res)
  return res
}

describe('dentistController', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getAllDentists', () => {
    it('returns 200 with dentists', async () => {
      dentistService.getAllDentists.mockResolvedValue([{ id: 'd1' }])
      const req = {}
      const res = mockRes()
      const next = vi.fn()

      await dentistController.getAllDentists(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ success: true, data: [{ id: 'd1' }] })
    })
  })

  describe('getDentistById', () => {
    it('returns 200 with dentist', async () => {
      dentistService.getDentistById.mockResolvedValue({ id: 'd1' })
      const req = { params: { id: 'd1' } }
      const res = mockRes()
      const next = vi.fn()

      await dentistController.getDentistById(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
    })

    it('calls next on error', async () => {
      const err = { status: 404, message: 'Not found' }
      dentistService.getDentistById.mockRejectedValue(err)
      const req = { params: { id: 'bad' } }
      const res = mockRes()
      const next = vi.fn()

      await dentistController.getDentistById(req, res, next)

      expect(next).toHaveBeenCalledWith(err)
    })
  })

  describe('createDentist', () => {
    it('returns 201 on success', async () => {
      dentistService.createDentist.mockResolvedValue({ id: 'd1' })
      const req = { body: { dentist_name: 'Dr. New' } }
      const res = mockRes()
      const next = vi.fn()

      await dentistController.createDentist(req, res, next)

      expect(res.status).toHaveBeenCalledWith(201)
    })
  })

  describe('updateDentist', () => {
    it('returns 200 on success', async () => {
      dentistService.updateDentist.mockResolvedValue({ id: 'd1' })
      const req = { params: { id: 'd1' }, body: { specialty: 'Updated' } }
      const res = mockRes()
      const next = vi.fn()

      await dentistController.updateDentist(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
    })
  })

  describe('deleteDentist', () => {
    it('returns 200 on success', async () => {
      dentistService.deleteDentist.mockResolvedValue({ message: 'Dentist deleted' })
      const req = { params: { id: 'd1' } }
      const res = mockRes()
      const next = vi.fn()

      await dentistController.deleteDentist(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
    })
  })
})
