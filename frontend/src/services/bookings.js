import api from './api'

export const getBookings = () => api.get('/bookings')
export const getBookingById = (id) => api.get(`/bookings/${id}`)
export const create = (data) => api.post('/bookings', data)
export const cancel = (id) => api.delete(`/bookings/${id}`)
export const update = (id, data) => api.put(`/bookings/${id}`, data)
