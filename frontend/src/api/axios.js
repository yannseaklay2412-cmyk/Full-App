import axios from 'axios'

const api = axios.create({
  baseURL: 'https://full-app-9w8w.onrender.com/api',
})

api.interceptors.request.use((config) => {
  const session = JSON.parse(localStorage.getItem('sb-jospdlqridyaiuhhaqpl-auth-token') || '{}')
  const token = session?.access_token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api