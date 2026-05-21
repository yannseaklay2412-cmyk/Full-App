import api from './api'

export const getDentists = () => api.get('/dentists')
export const getById = (id) => api.get(`/dentists/${id}`)
export const add = (data) => api.post('/dentists', data)
export const edit = (id, data) => api.put(`/dentists/${id}`, data)
export const remove = (id) => api.delete(`/dentists/${id}`)
