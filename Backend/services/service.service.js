import * as serviceRepo from '../repositories/service.repository.js'
import { notFound, badRequest } from '../utils/errors.js'

export const getAllServices = () => serviceRepo.getAll()

export const getServiceById = async (id) => {
  const service = await serviceRepo.getById(id)
  if (!service) notFound('Service')
  return service
}

export const createService = async (serviceData) => {
  if (!serviceData.service_name) badRequest('Service name is required')
  if (!serviceData.price) badRequest('Price is required')
  return serviceRepo.create(serviceData)
}

export const updateService = async (id, updates) => {
  const service = await serviceRepo.getById(id)
  if (!service) notFound('Service')
  return serviceRepo.update(id, updates)
}

export const deleteService = async (id) => {
  const service = await serviceRepo.getById(id)
  if (!service) notFound('Service')
  return serviceRepo.remove(id)
}
