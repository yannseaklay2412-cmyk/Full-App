import { describe, it, expect, beforeEach, afterEach } from 'vitest'

describe('jwtConfig', () => {
  const originalEnv = { ...process.env }

  afterEach(() => {
    process.env = { ...originalEnv }
  })

  it('reads secret from JWT_SECRET env var', async () => {
    process.env.JWT_SECRET = 'test-secret-123'
    // Re-import to pick up new env
    const { jwtConfig } = await import('../../config/jwt.js?t=' + Date.now())
    expect(jwtConfig.secret).toBe('test-secret-123')
  })

  it('defaults expiresIn to 7d when JWT_EXPIRES_IN is not set', async () => {
    delete process.env.JWT_EXPIRES_IN
    const { jwtConfig } = await import('../../config/jwt.js?t=default' + Date.now())
    expect(jwtConfig.expiresIn).toBe('7d')
  })

  it('uses JWT_EXPIRES_IN when provided', async () => {
    process.env.JWT_EXPIRES_IN = '1h'
    const { jwtConfig } = await import('../../config/jwt.js?t=custom' + Date.now())
    expect(jwtConfig.expiresIn).toBe('1h')
  })
})
