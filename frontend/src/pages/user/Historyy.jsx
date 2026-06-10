import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../config/supabaseClient'
import { useAuth } from '../../context/AuthContext'
import './History.css'

export default function History() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [historyBookings, setHistoryBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const fetchHistory = async () => {
      setLoading(true)

      // Step 1 — get patient id
      const { data: patient } = await supabase
        .from('patients')
        .select('id')
        .eq('email', user.email)
        .maybeSingle()

      if (!patient) { setLoading(false); return }

      // Step 2 — fetch done appointments
      const { data } = await supabase
        .from('appointments')
        .select(`
          id, status, created_at,
          dentists ( dentist_name ),
          appointment_services ( services ( service_name, price ) )
        `)
        .eq('patient_id', patient.id)
        .eq('status', 'done')
        .order('created_at', { ascending: false })

      if (data) setHistoryBookings(data)
      setLoading(false)
    }
    fetchHistory()
  }, [user])

  return (
    <div className="history-page">

      {/* Topbar */}
      <div className="dash-topbar">
        <div className="dash-logo">🦷 SMILLY</div>
        <div className="dash-nav">
          <button className="dash-nav-btn" onClick={() => navigate('/')}>Home</button>
          <button className="dash-nav-btn" onClick={() => navigate('/book')}>Book</button>
          <button className="dash-nav-btn" onClick={() => navigate('/my-bookings')}>My Bookings</button>
          <button className="dash-nav-btn" onClick={() => navigate('/dashboard')}>Dashboard</button>
        </div>
      </div>

      <div className="history-content">
        <h2 className="history-title">📝 Appointment History</h2>

        {loading ? (
          <p>Loading...</p>
        ) : historyBookings.length === 0 ? (
          <div className="history-empty">
            <p>No completed appointments yet.</p>
            <button onClick={() => navigate('/book')}>Book Now</button>
          </div>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Dentist</th>
                <th>Service</th>
                <th>Date</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {historyBookings.map(b => (
                <tr key={b.id}>
                  <td>#{b.id.slice(0, 8)}</td>
                  <td>{b.dentists?.dentist_name}</td>
                  <td>{b.appointment_services?.[0]?.services?.service_name}</td>
                  <td>{new Date(b.created_at).toLocaleDateString()}</td>
                  <td>${b.appointment_services?.[0]?.services?.price}</td>
                  <td><span className="history-badge">✅ Done</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}