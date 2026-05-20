import api from './api'

export const getUsers = () => api.get('/users')
export const getById = (id) => api.get(`/users/${id}`)
export const update = (id, data) => api.put(`/users/${id}`, data)
