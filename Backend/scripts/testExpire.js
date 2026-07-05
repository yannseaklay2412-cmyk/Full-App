import 'dotenv/config'
import * as bookingService from '../services/booking.service.js'

const expired = await bookingService.expireOverdueBookings()
console.log(`Expired ${expired.length} appointment(s):`, expired)
