import { createRepository } from './baseRepository.js'

const selectFields = 'id, service_name, description, price, duration_minutes'

const base = createRepository('services', {
  selectFields,
  orderBy: 'service_name',
})

export const getAll = base.getAll
export const getById = base.getById
export const create = base.create
export const update = base.update
export const remove = base.remove
