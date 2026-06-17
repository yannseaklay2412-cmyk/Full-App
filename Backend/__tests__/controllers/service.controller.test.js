import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../services/service.service.js', () => ({
  getAllServices: vi.fn(),
  getServiceById: vi.fn(),
  createService: vi.fn(),
  updateService: vi.fn(),
  deleteService: vi.fn(),
}))

import * as serviceController from '../../controllers/service.controller.js'
import * as serviceService from '../../services/service.service.js'

const mockRes = () => {
  const res = {}
  res.status = vi.fn().mockReturnValue(res)
  res.json = vi.fn().mockReturnValue(res)
  return res
}

describe('serviceController', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getAllServices', () => {
    it('returns 200 with services', async () => {
      serviceService.getAllServices.mockResolvedValue([{ id: 's1' }])
      const req = {}
      const res = mockRes()
      const next = vi.fn()

      await serviceController.getAllServices(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ success: true, data: [{ id: 's1' }] })
    })
  })

  describe('getServiceById', () => {
    it('returns 200 with service', async () => {
      serviceService.getServiceById.mockResolvedValue({ id: 's1' })
      const req = { params: { id: 's1' } }
      const res = mockRes()
      const next = vi.fn()

      await serviceController.getServiceById(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
    })

    it('calls next on error', async () => {
      const err = { status: 404, message: 'Not found' }
      serviceService.getServiceById.mockRejectedValue(err)
      const req = { params: { id: 'bad' } }
      const res = mockRes()
      const next = vi.fn()

      await serviceController.getServiceById(req, res, next)

      expect(next).toHaveBeenCalledWith(err)
    })
  })

  describe('createService', () => {
    it('returns 201 on success', async () => {
      serviceService.createService.mockResolvedValue({ id: 's1' })
      const req = { body: { service_name: 'Cleaning', price: 50 } }
      const res = mockRes()
      const next = vi.fn()

      await serviceController.createService(req, res, next)

      expect(res.status).toHaveBeenCalledWith(201)
    })
  })

  describe('updateService', () => {
    it('returns 200 on success', async () => {
      serviceService.updateService.mockResolvedValue({ id: 's1' })
      const req = { params: { id: 's1' }, body: { price: 75 } }
      const res = mockRes()
      const next = vi.fn()

      await serviceController.updateService(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
    })
  })

  describe('deleteService', () => {
    it('returns 200 on success', async () => {
      serviceService.deleteService.mockResolvedValue({ message: 'Service deleted' })
      const req = { params: { id: 's1' } }
      const res = mockRes()
      const next = vi.fn()

      await serviceController.deleteService(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
    })
  })
})
