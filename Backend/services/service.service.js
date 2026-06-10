import * as serviceRepo from '../repositories/service.repository.js'

export const getAllServices = async (activeOnly = false) => {
  return serviceRepo.getAll(activeOnly)
}

export const getServiceById = async (id) => {
  const service = await serviceRepo.getById(id)
  if (!service) throw { status: 404, message: 'Service not found' }
  return service
}

export const createService = async (serviceData) => {
  if (!serviceData.service_name) throw { status: 400, message: 'Service name is required' }
  if (!serviceData.price) throw { status: 400, message: 'Price is required' }
  return serviceRepo.create(serviceData)
}

export const updateService = async (id, updates) => {
  const service = await serviceRepo.getById(id)
  if (!service) throw { status: 404, message: 'Service not found' }
  return serviceRepo.update(id, updates)
}

export const deleteService = async (id) => {
  const service = await serviceRepo.getById(id)
  if (!service) throw { status: 404, message: 'Service not found' }
  return serviceRepo.remove(id)
}