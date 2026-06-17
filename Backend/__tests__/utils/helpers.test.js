import { describe, it, expect } from 'vitest'
import { formatDate } from '../../utils/helpers.js'

describe('formatDate', () => {
  it('formats a Date object to YYYY-MM-DD', () => {
    const date = new Date('2025-03-15T10:30:00Z')
    expect(formatDate(date)).toBe('2025-03-15')
  })

  it('formats an ISO string to YYYY-MM-DD', () => {
    expect(formatDate('2024-12-25T00:00:00Z')).toBe('2024-12-25')
  })

  it('formats a date-only string', () => {
    expect(formatDate('2024-01-01')).toBe('2024-01-01')
  })

  it('formats a timestamp number', () => {
    const ts = new Date('2024-06-15T12:00:00Z').getTime()
    expect(formatDate(ts)).toBe('2024-06-15')
  })

  it('throws RangeError for invalid input', () => {
    expect(() => formatDate('not-a-date')).toThrow(RangeError)
  })
})
