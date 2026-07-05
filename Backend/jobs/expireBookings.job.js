import cron from 'node-cron'
import * as bookingService from '../services/booking.service.js'

export const startExpireBookingsJob = () => {
  // Runs at the top of every hour
  cron.schedule('0 * * * *', async () => {
    try {
      const expired = await bookingService.expireOverdueBookings()
      if (expired.length) console.log(` Expired ${expired.length} overdue appointment(s)`)
    } catch (err) {
      console.error('Failed to expire overdue appointments:', err.message)
    }
  })
}
