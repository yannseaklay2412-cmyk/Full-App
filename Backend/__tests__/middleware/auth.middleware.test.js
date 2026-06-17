import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock supabase before importing the middleware
vi.mock('../../config/supabase.js', () => ({
  supabase: {
    auth: { getUser: vi.fn() },
    from: vi.fn(),
  },
}))

import { protect, adminOnly, patientOnly } from '../../middleware/auth.middleware.js'
import { supabase } from '../../config/supabase.js'

const mockRes = () => {
  const res = {}
  res.status = vi.fn().mockReturnValue(res)
  res.json = vi.fn().mockReturnValue(res)
  return res
}

describe('protect middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 401 when no authorization header', async () => {
    const req = { headers: {} }
    const res = mockRes()
    const next = vi.fn()

    await protect(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'No token provided',
    })
    expect(next).not.toHaveBeenCalled()
  })

  it('returns 401 when authorization header does not start with Bearer', async () => {
    const req = { headers: { authorization: 'Basic abc123' } }
    const res = mockRes()
    const next = vi.fn()

    await protect(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(next).not.toHaveBeenCalled()
  })

  it('returns 401 when supabase returns an error', async () => {
    supabase.auth.getUser.mockResolvedValue({ data: {}, error: new Error('bad token') })
    const req = { headers: { authorization: 'Bearer badtoken' } }
    const res = mockRes()
    const next = vi.fn()

    await protect(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Invalid or expired token',
    })
  })

  it('returns 401 when supabase returns no user', async () => {
    supabase.auth.getUser.mockResolvedValue({ data: { user: null }, error: null })
    const req = { headers: { authorization: 'Bearer nouser' } }
    const res = mockRes()
    const next = vi.fn()

    await protect(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
  })

  it('sets req.user and calls next on valid token', async () => {
    const fakeUser = { id: '1', email: 'test@test.com' }
    supabase.auth.getUser.mockResolvedValue({ data: { user: fakeUser }, error: null })
    const req = { headers: { authorization: 'Bearer validtoken' } }
    const res = mockRes()
    const next = vi.fn()

    await protect(req, res, next)

    expect(req.user).toEqual(fakeUser)
    expect(next).toHaveBeenCalled()
  })
})

describe('adminOnly middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockQuery = (role) => {
    const chain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: role ? { role } : null }),
    }
    // Make select return the chain
    supabase.from.mockReturnValue(chain)
    return chain
  }

  it('calls next when user is admin', async () => {
    mockQuery('admin')
    const req = { user: { email: 'admin@test.com' } }
    const res = mockRes()
    const next = vi.fn()

    await adminOnly(req, res, next)

    expect(next).toHaveBeenCalled()
  })

  it('returns 403 when user is not admin', async () => {
    mockQuery('patient')
    const req = { user: { email: 'patient@test.com' } }
    const res = mockRes()
    const next = vi.fn()

    await adminOnly(req, res, next)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Admin access required',
    })
    expect(next).not.toHaveBeenCalled()
  })

  it('returns 403 when profile is not found', async () => {
    mockQuery(null)
    const req = { user: { email: 'nobody@test.com' } }
    const res = mockRes()
    const next = vi.fn()

    await adminOnly(req, res, next)

    expect(res.status).toHaveBeenCalledWith(403)
  })
})

describe('patientOnly middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockQuery = (role) => {
    const chain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: role ? { role } : null }),
    }
    supabase.from.mockReturnValue(chain)
    return chain
  }

  it('calls next when user is patient', async () => {
    mockQuery('patient')
    const req = { user: { email: 'patient@test.com' } }
    const res = mockRes()
    const next = vi.fn()

    await patientOnly(req, res, next)

    expect(next).toHaveBeenCalled()
  })

  it('returns 403 when user is admin', async () => {
    mockQuery('admin')
    const req = { user: { email: 'admin@test.com' } }
    const res = mockRes()
    const next = vi.fn()

    await patientOnly(req, res, next)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Patient access required',
    })
  })
})
