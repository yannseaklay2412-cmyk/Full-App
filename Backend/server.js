import 'dotenv/config'
import app from './app.js'
import { startExpireBookingsJob } from './jobs/expireBookings.job.js'

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🦷 Smilly API running on http://localhost:${PORT}`)
  startExpireBookingsJob()
})
