import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './History.css'
import Logo from '../../components/common/Logo'
import { usePatientBookings } from '../../hooks/usePatientBookings'

export default function History() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { bookings: historyBookings, loading } = usePatientBookings(user, { statusFilter: 'done' })

  return (
    <div className="history-page">
      {/* Topbar */}
      <div className="mb-topbar">
        <button className="mb-back" onClick={() => navigate('/dashboard')}>← Dashboard</button>
        <Logo />      
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