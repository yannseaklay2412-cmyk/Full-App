export const notFound = (req, res, next) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` })
}

export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err)
  const status  = err.status || 500
  const message = status >= 500 && process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message || 'Internal server error'
  res.status(status).json({ success: false, message })
}