import { useState, useEffect } from 'react'
import { supabase } from '../config/supabaseClient'

export function usePatientBookings(user, { statusFilter = null, limit = null } = {}) {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    if (!user) return
    const fetch = async () => {
      setLoading(true)

      const { data: patient } = await supabase
        .from('patients')
        .select('id')
        .eq('email', user.email)
        .maybeSingle()

      if (!patient) { setLoading(false); return }

      let query = supabase
        .from('appointments')
        .select(`
          id, status, notes, created_at,
          dentists ( dentist_name, specialty ),
          appointment_services ( services ( service_name, price ) )
        `)
        .eq('patient_id', patient.id)
        .order('created_at', { ascending: false })

      if (statusFilter) query = query.eq('status', statusFilter)
      if (limit) query = query.limit(limit)

      const { data } = await query
      if (data) setBookings(data)
      setLoading(false)
    }
    fetch()
  }, [user, statusFilter, limit])

  const updateLocalStatus = (id, status) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
  }

  return { bookings, loading, setBookings, updateLocalStatus }
}
