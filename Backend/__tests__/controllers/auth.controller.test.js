import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../services/auth.service.js', () => ({
  register: vi.fn(),
  login: vi.fn(),
  logout: vi.fn(),
  forgotPassword: vi.fn(),
  resetPassword: vi.fn(),
}))

import * as authController from '../../controllers/auth.controller.js'
import * as authService from '../../services/auth.service.js'

const mockRes = () => {
  const res = {}
  res.status = vi.fn().mockReturnValue(res)
  res.json = vi.fn().mockReturnValue(res)
  return res
}

describe('authController', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('register', () => {
    it('returns 201 on success', async () => {
      authService.register.mockResolvedValue({ message: 'Account created successfully' })
      const req = { body: { email: 'test@test.com' } }
      const res = mockRes()
      const next = vi.fn()

      await authController.register(req, res, next)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Account created successfully',
      })
    })

    it('calls next on error', async () => {
      const err = { status: 400, message: 'Error' }
      authService.register.mockRejectedValue(err)
      const req = { body: {} }
      const res = mockRes()
      const next = vi.fn()

      await authController.register(req, res, next)

      expect(next).toHaveBeenCalledWith(err)
    })
  })

  describe('login', () => {
    it('returns 200 with token on success', async () => {
      authService.login.mockResolvedValue({ token: 'abc', role: 'patient' })
      const req = { body: { email: 'a@b.com', password: 'pass' } }
      const res = mockRes()
      const next = vi.fn()

      await authController.login(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        token: 'abc',
        role: 'patient',
      })
    })

    it('calls next on error', async () => {
      const err = { status: 401, message: 'Invalid' }
      authService.login.mockRejectedValue(err)
      const req = { body: {} }
      const res = mockRes()
      const next = vi.fn()

      await authController.login(req, res, next)

      expect(next).toHaveBeenCalledWith(err)
    })
  })

  describe('logout', () => {
    it('returns 200 on success', async () => {
      authService.logout.mockResolvedValue({ message: 'Logged out successfully' })
      const req = {}
      const res = mockRes()
      const next = vi.fn()

      await authController.logout(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
    })
  })

  describe('forgotPassword', () => {
    it('returns 200 on success', async () => {
      authService.forgotPassword.mockResolvedValue({ message: 'Password reset email sent' })
      const req = { body: { email: 'a@b.com' } }
      const res = mockRes()
      const next = vi.fn()

      await authController.forgotPassword(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
    })
  })

  describe('resetPassword', () => {
    it('returns 200 on success', async () => {
      authService.resetPassword.mockResolvedValue({ message: 'Password updated successfully' })
      const req = { body: { password: 'newpass123' } }
      const res = mockRes()
      const next = vi.fn()

      await authController.resetPassword(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
    })
  })
})
