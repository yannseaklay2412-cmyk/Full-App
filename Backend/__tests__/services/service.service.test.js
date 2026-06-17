import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../repositories/service.repository.js', () => ({
  getAll: vi.fn(),
  getById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
}))

import * as serviceService from '../../services/service.service.js'
import * as serviceRepo from '../../repositories/service.repository.js'

describe('serviceService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getAllServices', () => {
    it('returns all services', async () => {
      serviceRepo.getAll.mockResolvedValue([{ id: 's1', service_name: 'Cleaning' }])
      const result = await serviceService.getAllServices()
      expect(result).toEqual([{ id: 's1', service_name: 'Cleaning' }])
    })
  })

  describe('createService', () => {
    it('creates a service with valid data', async () => {
      const input = { service_name: 'Cleaning', price: 100 }
      serviceRepo.create.mockResolvedValue({ id: 's1', ...input })

      const result = await serviceService.createService(input)
      expect(serviceRepo.create).toHaveBeenCalledWith(input)
      expect(result.service_name).toBe('Cleaning')
    })

    it('throws 400 when service_name is missing', async () => {
      await expect(serviceService.createService({ price: 100 }))
        .rejects.toEqual({ status: 400, message: 'Service name is required' })
    })

    it('throws 400 when price is missing', async () => {
      await expect(serviceService.createService({ service_name: 'Cleaning' }))
        .rejects.toEqual({ status: 400, message: 'Price is required' })
    })
  })

  describe('updateService', () => {
    it('updates when service exists', async () => {
      serviceRepo.getById.mockResolvedValue({ id: 's1' })
      serviceRepo.update.mockResolvedValue({ id: 's1', price: 150 })

      const result = await serviceService.updateService('s1', { price: 150 })
      expect(serviceRepo.update).toHaveBeenCalledWith('s1', { price: 150 })
      expect(result.price).toBe(150)
    })

    it('throws 404 when service not found', async () => {
      serviceRepo.getById.mockResolvedValue(null)

      await expect(serviceService.updateService('bad', {}))
        .rejects.toEqual({ status: 404, message: 'Service not found' })
    })
  })

  describe('deleteService', () => {
    it('deletes when service exists', async () => {
      serviceRepo.getById.mockResolvedValue({ id: 's1' })
      serviceRepo.remove.mockResolvedValue({ message: 'Service deleted' })

      const result = await serviceService.deleteService('s1')
      expect(serviceRepo.remove).toHaveBeenCalledWith('s1')
    })

    it('throws 404 when service not found', async () => {
      serviceRepo.getById.mockResolvedValue(null)

      await expect(serviceService.deleteService('bad'))
        .rejects.toEqual({ status: 404, message: 'Service not found' })
    })
  })
})
