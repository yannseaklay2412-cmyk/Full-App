import { createRepository } from './baseRepository.js'

const selectFields = 'id, dentist_name, specialty, phone, background, age'

const base = createRepository('dentists', {
  selectFields,
  orderBy: 'dentist_name',
})

export const getAll = base.getAll
export const getById = base.getById
export const create = base.create
export const update = base.update
export const remove = base.remove
