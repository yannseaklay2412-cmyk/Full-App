import pool from '../config/db.js'

const getStats = async () => {
  // Total patients
  const patientsResult = await pool.query(
    `SELECT COUNT(*) FROM patients`
  )
  const totalPatients = parseInt(patientsResult.rows[0].count)

  // Total services
  const servicesResult = await pool.query(
    `SELECT COUNT(*) FROM services`
  )
  const totalServices = parseInt(servicesResult.rows[0].count)

  // All appointments with their status
  const appointmentsResult = await pool.query(
    `SELECT status FROM appointments`
  )
  const counts = appointmentsResult.rows

  // Revenue: appointments -> appointment_services -> services
  const revenueResult = await pool.query(
    `SELECT s.price
     FROM appointments a
     JOIN appointment_services aps ON a.id = aps.appointment_id
     JOIN services s ON aps.service_id = s.id
     WHERE a.status IN ('confirmed', 'done')`
  )
  const totalRevenue = revenueResult.rows.reduce((sum, row) => sum + (parseFloat(row.price) || 0), 0)

  return {
    totalPatients,
    totalServices,
    totalRevenue,
    appointments: {
      total: counts.length,
      pending: counts.filter(a => a.status === 'pending').length,
      confirmed: counts.filter(a => a.status === 'confirmed').length,
      cancelled: counts.filter(a => a.status === 'cancelled').length,
      done: counts.filter(a => a.status === 'done').length,
    }
  }
}

export default { getStats }