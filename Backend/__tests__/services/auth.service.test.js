import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../config/supabase.js', () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
      resetPasswordForEmail: vi.fn(),
      updateUser: vi.fn(),
    },
    from: vi.fn(),
  },
}))

vi.mock('../../repositories/patient.repository.js', () => ({
  getByEmail: vi.fn(),
  upsert: vi.fn(),
}))

vi.mock('jsonwebtoken', () => ({
  default: { sign: vi.fn().mockReturnValue('mock-jwt-token') },
}))

vi.mock('../../config/jwt.js', () => ({
  jwtConfig: { secret: 'test-secret', expiresIn: '7d' },
}))

import * as authService from '../../services/auth.service.js'
import { supabase } from '../../config/supabase.js'

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('register', () => {
    const validData = {
      full_name: 'Test User',
      email: 'test@example.com',
      phone: '123456789',
      sex: 'male',
      password: 'password123',
    }

    it('throws 400 when fields are missing', async () => {
      await expect(authService.register({ email: 'test@example.com' }))
        .rejects.toEqual({ status: 400, message: 'All fields are required' })
    })

    it('throws 400 for invalid email format', async () => {
      await expect(authService.register({ ...validData, email: 'not-an-email' }))
        .rejects.toEqual({ status: 400, message: 'Invalid email format' })
    })

    it('throws 400 for invalid phone number', async () => {
      await expect(authService.register({ ...validData, phone: '123' }))
        .rejects.toEqual({ status: 400, message: 'Invalid phone number' })
    })

    it('throws 400 for invalid sex value', async () => {
      await expect(authService.register({ ...validData, sex: 'unknown' }))
        .rejects.toEqual({ status: 400, message: 'Invalid sex value' })
    })

    it('throws 400 for short password', async () => {
      await expect(authService.register({ ...validData, password: '12345' }))
        .rejects.toEqual({ status: 400, message: 'Password must be at least 6 characters' })
    })

    it('throws 400 when email already registered', async () => {
      supabase.auth.signUp.mockResolvedValue({
        data: {},
        error: { message: 'User already registered' },
      })

      await expect(authService.register(validData))
        .rejects.toEqual({ status: 400, message: 'Email already registered' })
    })

    it('throws on supabase signUp error', async () => {
      supabase.auth.signUp.mockResolvedValue({
        data: {},
        error: { message: 'Some other error' },
      })

      await expect(authService.register(validData))
        .rejects.toEqual({ status: 400, message: 'Some other error' })
    })

    it('creates account successfully', async () => {
      supabase.auth.signUp.mockResolvedValue({
        data: { user: { id: 'u1' } },
        error: null,
      })

      const insertChain = {
        insert: vi.fn().mockReturnValue({ error: null }),
      }
      supabase.from.mockReturnValue(insertChain)
      insertChain.insert.mockReturnValue({ error: null })

      const result = await authService.register(validData)
      expect(result).toEqual({ message: 'Account created successfully' })
    })

    it('throws 500 when profile creation fails', async () => {
      supabase.auth.signUp.mockResolvedValue({
        data: { user: { id: 'u1' } },
        error: null,
      })

      const insertChain = {
        insert: vi.fn().mockReturnValue({ error: { message: 'insert error' } }),
      }
      supabase.from.mockReturnValue(insertChain)

      await expect(authService.register(validData))
        .rejects.toEqual({ status: 500, message: 'Failed to create profile' })
    })
  })

  describe('login', () => {
    it('throws 400 when email or password missing', async () => {
      await expect(authService.login({ email: 'test@test.com' }))
        .rejects.toEqual({ status: 400, message: 'Email and password are required' })

      await expect(authService.login({ password: 'pass' }))
        .rejects.toEqual({ status: 400, message: 'Email and password are required' })
    })

    it('throws 401 on invalid credentials', async () => {
      supabase.auth.signInWithPassword.mockResolvedValue({
        data: {},
        error: { message: 'Invalid login' },
      })

      await expect(authService.login({ email: 'a@b.com', password: 'wrong' }))
        .rejects.toEqual({ status: 401, message: 'Invalid email or password' })
    })

    it('returns token and role on successful login', async () => {
      supabase.auth.signInWithPassword.mockResolvedValue({
        data: { user: { id: 'u1', email: 'test@test.com' } },
        error: null,
      })

      const chain = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        maybeSingle: vi.fn().mockResolvedValue({ data: { role: 'patient' } }),
      }
      supabase.from.mockReturnValue(chain)

      const result = await authService.login({ email: 'test@test.com', password: 'pass123' })
      expect(result).toHaveProperty('token')
      expect(result.role).toBe('patient')
      expect(result.user.email).toBe('test@test.com')
    })

    it('returns admin role when profile says admin', async () => {
      supabase.auth.signInWithPassword.mockResolvedValue({
        data: { user: { id: 'u1', email: 'admin@test.com' } },
        error: null,
      })

      const chain = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        maybeSingle: vi.fn().mockResolvedValue({ data: { role: 'admin' } }),
      }
      supabase.from.mockReturnValue(chain)

      const result = await authService.login({ email: 'admin@test.com', password: 'pass' })
      expect(result.role).toBe('admin')
    })
  })

  describe('logout', () => {
    it('logs out successfully', async () => {
      supabase.auth.signOut.mockResolvedValue({ error: null })

      const result = await authService.logout()
      expect(result).toEqual({ message: 'Logged out successfully' })
    })

    it('throws 500 on logout failure', async () => {
      supabase.auth.signOut.mockResolvedValue({ error: new Error('fail') })

      await expect(authService.logout())
        .rejects.toEqual({ status: 500, message: 'Logout failed' })
    })
  })

  describe('forgotPassword', () => {
    it('throws 400 when email is missing', async () => {
      await expect(authService.forgotPassword())
        .rejects.toEqual({ status: 400, message: 'Email is required' })
    })

    it('sends reset email successfully', async () => {
      supabase.auth.resetPasswordForEmail.mockResolvedValue({ error: null })

      const result = await authService.forgotPassword('test@test.com')
      expect(result).toEqual({ message: 'Password reset email sent' })
    })

    it('throws 400 on supabase error', async () => {
      supabase.auth.resetPasswordForEmail.mockResolvedValue({
        error: { message: 'Rate limit exceeded' },
      })

      await expect(authService.forgotPassword('test@test.com'))
        .rejects.toEqual({ status: 400, message: 'Rate limit exceeded' })
    })
  })

  describe('resetPassword', () => {
    it('throws 400 for short password', async () => {
      await expect(authService.resetPassword('12345'))
        .rejects.toEqual({ status: 400, message: 'Password must be at least 6 characters' })
    })

    it('throws 400 for missing password', async () => {
      await expect(authService.resetPassword())
        .rejects.toEqual({ status: 400, message: 'Password must be at least 6 characters' })
    })

    it('resets password successfully', async () => {
      supabase.auth.updateUser.mockResolvedValue({ error: null })

      const result = await authService.resetPassword('newpassword123')
      expect(result).toEqual({ message: 'Password updated successfully' })
    })

    it('throws 400 on supabase error', async () => {
      supabase.auth.updateUser.mockResolvedValue({
        error: { message: 'Token expired' },
      })

      await expect(authService.resetPassword('newpassword123'))
        .rejects.toEqual({ status: 400, message: 'Token expired' })
    })
  })
})
