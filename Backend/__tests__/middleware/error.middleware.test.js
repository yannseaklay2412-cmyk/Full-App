import { describe, it, expect, vi } from 'vitest'
import { notFound, errorHandler } from '../../middleware/error.middleware.js'

const mockRes = () => {
  const res = {}
  res.status = vi.fn().mockReturnValue(res)
  res.json = vi.fn().mockReturnValue(res)
  return res
}

describe('notFound middleware', () => {
  it('responds with 404 and includes the original URL', () => {
    const req = { originalUrl: '/api/unknown' }
    const res = mockRes()
    const next = vi.fn()

    notFound(req, res, next)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Route not found: /api/unknown',
    })
  })
})

describe('errorHandler middleware', () => {
  it('uses error status and message when provided', () => {
    const err = { status: 422, message: 'Validation failed' }
    const req = {}
    const res = mockRes()
    const next = vi.fn()

    errorHandler(err, req, res, next)

    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Validation failed',
    })
  })

  it('defaults to 500 and generic message when not provided', () => {
    const err = {}
    const req = {}
    const res = mockRes()
    const next = vi.fn()

    errorHandler(err, req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Internal server error',
    })
  })

  it('logs the error to console', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const err = new Error('test error')
    const res = mockRes()

    errorHandler(err, {}, res, vi.fn())

    expect(spy).toHaveBeenCalledWith('Error:', err)
    spy.mockRestore()
  })
})
