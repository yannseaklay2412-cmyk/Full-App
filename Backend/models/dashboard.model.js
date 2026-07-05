import { supabase } from '../config/supabase.js'

const getStats = async () => {
  const [
    { count: totalPatients, error: patientsError },
    { count: totalServices, error: servicesError },
    { data: appointments, error: appointmentsError },
    { data: revenueRows, error: revenueError },
  ] = await Promise.all([
    supabase.from('patients').select('*', { count: 'exact', head: true }),
    supabase.from('services').select('*', { count: 'exact', head: true }),
    supabase.from('appointments').select('status'),
    supabase
      .from('appointments')
      .select('appointment_services ( services ( price ) )')
      .in('status', ['confirmed', 'done']),
  ])

  if (patientsError) throw patientsError
  if (servicesError) throw servicesError
  if (appointmentsError) throw appointmentsError
  if (revenueError) throw revenueError

  const totalRevenue = revenueRows.reduce((sum, a) =>
    sum + (a.appointment_services?.reduce((s, as) => s + (as.services?.price || 0), 0) || 0), 0)

  return {
    totalPatients: totalPatients || 0,
    totalServices: totalServices || 0,
    totalRevenue,
    appointments: {
      total: appointments.length,
      pending: appointments.filter(a => a.status === 'pending').length,
      confirmed: appointments.filter(a => a.status === 'confirmed').length,
      cancelled: appointments.filter(a => a.status === 'cancelled').length,
      done: appointments.filter(a => a.status === 'done').length,
      expired: appointments.filter(a => a.status === 'expired').length,
    }
  }
}

export default { getStats }
