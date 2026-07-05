import * as concernRepo from '../repositories/concern.repository.js'

export const submitConcern = async (message) => {
  if (!message || !message.trim()) throw { status: 400, message: 'Please write a message before submitting' }
  if (message.length > 2000) throw { status: 400, message: 'Message is too long' }

  return concernRepo.create(message.trim())
}

export const getAllConcerns = async () => {
  return concernRepo.getAll()
}
