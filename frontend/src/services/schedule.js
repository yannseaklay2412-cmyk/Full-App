import api from './api'

export const getSlots = (dentistId) => api.get(`/schedule/${dentistId}`)
export const addSlot = (data) => api.post('/schedule', data)
export const removeSlot = (id) => api.delete(`/schedule/${id}`)
