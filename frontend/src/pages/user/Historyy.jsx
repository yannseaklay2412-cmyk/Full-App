import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
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
      try {
        const { data } = await api.get('/bookings/mine')
        setHistoryBookings((data.data || []).filter(b => b.status === 'done'))
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }
    fetchHistory()
  }, [user])

  const serviceNames = (b) => b.appointment_services?.map(as => as.services?.service_name).filter(Boolean).join(', ') || '—'
  const serviceTotal = (b) => b.appointment_services?.reduce((sum, as) => sum + (as.services?.price || 0), 0) || 0

  return (
    <div className="history-page">
      {/* Topbar */}
      <div className="mb-topbar">
        <button className="mb-back" onClick={() => navigate('/dashboard')}>← Dashboard</button>
        <div className="nav-logo">
          <span className="logo-icon">🦷</span>
          <div style={{ marginLeft: '15px', fontFamily: 'Poppins' }}>
            <span style={{ color: '#1e1e1e' }}>Tooth</span>
            <span style={{ color: '#2ec4b6' }}>Time</span>
          </div>
        </div>      
      </div>
      <div className="history-content">
        <h2 className="history-title">📝 Appointment History</h2>

        {loading ? (
          <p>Loading...</p>
        ) : historyBookings.length === 0 ? (
          <div className="history-empty">
            <p>No completed appointments yet.</p>
            <button className="mb-back" onClick={() => navigate('/book')}>Book Now</button>
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
                  <td>{serviceNames(b)}</td>
                  <td>{new Date(b.created_at).toLocaleDateString()}</td>
                  <td>${serviceTotal(b)}</td>
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