import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import './Dashboard.css'
import { useAuth } from '../../context/AuthContext'
import ConcernBox from '../../components/ConcernBox'

export default function Dashboard() {
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  const [userName,        setUserName]        = useState('')
  const [bookings,        setBookings]        = useState([])
  const [historyBookings, setHistoryBookings] = useState([])
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [loadError,       setLoadError]       = useState('')

  useEffect(() => {
    if (!user) return
    const fetchData = async () => {
      setLoadError('')
      const [profileResult, bookingsResult] = await Promise.allSettled([
        api.get('/patients/me'),
        api.get('/bookings/mine'),
      ])

      if (profileResult.status === 'fulfilled') {
        setUserName(profileResult.value.data.data.full_name)
      } else {
        console.error(profileResult.reason)
        setLoadError(prev => prev || `Couldn't load your profile: ${profileResult.reason.response?.data?.message || profileResult.reason.message}`)
      }

      if (bookingsResult.status === 'fulfilled') {
        const apptData = bookingsResult.value.data.data || []
        setBookings(apptData)
        setHistoryBookings(apptData.filter(b => b.status === 'done').slice(0, 2))
      } else {
        console.error(bookingsResult.reason)
        setLoadError(prev => prev || `Couldn't load your bookings: ${bookingsResult.reason.response?.data?.message || bookingsResult.reason.message}`)
      }
    }
    fetchData()
  }, [user])

  const confirmed = bookings.filter(b => b.status === 'confirmed').length
  const pending   = bookings.filter(b => b.status === 'pending').length
  const cancelled = bookings.filter(b => b.status === 'cancelled').length

  const upcoming = bookings
    .filter(b => b.status === 'confirmed')
    .slice(0, 3)

  const serviceNames    = (b) => b.appointment_services?.map(as => as.services?.service_name).filter(Boolean).join(', ') || '—'
  const serviceTotal    = (b) => b.appointment_services?.reduce((sum, as) => sum + (as.services?.price || 0), 0) || 0
  const durationTotal   = (b) => b.appointment_services?.reduce((sum, as) => sum + (as.services?.duration_minutes || 0), 0) || 0

  const handleCancel = async (id) => {
    try {
      await api.put(`/bookings/${id}/cancel`)
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="dash-page">

      {/* Topbar */}
      <div className="dash-topbar">
        <div className="nav-logo">
          <span className="logo-icon">🦷</span>
          <div style={{ marginLeft: '15px', fontFamily: 'Poppins' }}>
            <span style={{ color: '#1e1e1e' }}>Tooth</span>
            <span style={{ color: '#2ec4b6' }}>Time</span>
          </div>
        </div>            <div className="dash-nav">
          <button className="dash-nav-btn" onClick={() => navigate('/')}>Home</button>
          <button className="dash-nav-btn" onClick={() => navigate('/book')}>Book</button>
          <button className="dash-nav-btn" onClick={() => navigate('/my-bookings')}>My Bookings</button>
          <button className="dash-nav-btn signout" onClick={() => { logout(); navigate('/') }}>Sign Out</button>
        </div>
      </div>

      <div className="dash-content">

        {loadError && (
          <div style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.4)', borderRadius: 10, padding: '10px 16px', marginBottom: 16, fontSize: 13, color: '#cc0000', fontWeight: 500 }}>
            ✗ {loadError}
          </div>
        )}

        {/* Welcome Banner */}
        <div className="dash-banner">
          <div className="dash-banner-left">
            <p className="dash-welcome-sub">Welcome 👋</p>
            <h1 className="dash-welcome-name">{userName}</h1>
            <p className="dash-welcome-desc">Ready for your next visit? Book an appointment or check your upcoming schedule.</p>
            <div className="dash-banner-btns">
              <button className="dash-btn-primary" onClick={() => navigate('/book')}>+ Book Appointment</button>
              <button className="dash-btn-secondary" onClick={() => navigate('/my-bookings')}>My Bookings</button>
            </div>
          </div>
          <div className="dash-banner-icon">🦷</div>
        </div>

        {/* Concern Box */}
        <div style={{ marginBottom: 20 }}>
          <ConcernBox />
        </div>

        {/* Stats */}
        <div className="dash-stats">
          <div className="dash-stat-card confirmed">
            <span className="dash-stat-num">{confirmed}</span>
            <span className="dash-stat-label">Confirmed</span>
          </div>
          <div className="dash-stat-card pending">
            <span className="dash-stat-num">{pending}</span>
            <span className="dash-stat-label">Pending</span>
          </div>
          <div className="dash-stat-card cancelled">
            <span className="dash-stat-num">{cancelled}</span>
            <span className="dash-stat-label">Cancelled</span>
          </div>
          <div className="dash-stat-card total">
            <span className="dash-stat-num">{bookings.length}</span>
            <span className="dash-stat-label">Total</span>
          </div>
        </div>

        <div className="dash-grid">
          {/* Upcoming Appointments */}
          <div className="dash-card full-width">
            <div className="dash-card-header">
              <h2 className="dash-card-title">📅 Upcoming Appointments</h2>
              <button className="dash-view-all" onClick={() => navigate('/my-bookings')}>View all →</button>
            </div>
            {upcoming.length === 0 ? (
              <div className="dash-empty">
                <p>No upcoming appointments.</p>
                <button className="dash-btn-primary small" onClick={() => navigate('/book')}>Book Now</button>
              </div>
            ) : (
              <div className="dash-appt-list">
                {upcoming.map(b => (
                  <div className="dash-appt-card" key={b.id}>
                    <div className="dash-appt-icon">🦷</div>
                    <div className="dash-appt-info">
                      <p className="dash-appt-doctor">{b.dentists?.dentist_name}</p>
                      <p className="dash-appt-service">{serviceNames(b)}</p>
                      <div className="dash-appt-meta">
                        <span>🗓 {b.appointment_date ? new Date(b.appointment_date).toLocaleDateString() : '—'}</span>
                        <span>📌 {b.status}</span>
                      </div>
                    </div>
                    <button className="dash-cancel-btn" onClick={() => handleCancel(b.id)}>Cancel</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Appointment History */}
          <div className="dash-card full-width">
            <div className="dash-card-header">
              <h2 className="dash-card-title">📝 Appointment History</h2>
              <button className="dash-view-all" onClick={() => navigate('/history')}>View all →</button>
            </div>
            {historyBookings.length === 0 ? (
              <div className="dash-empty">
                <p>No appointment history yet.</p>
              </div>
            ) : (
              <div className="dash-appt-list">
                {historyBookings.map(b => (
                  <div className="dash-appt-card" key={b.id} onClick={() => setSelectedBooking(b)} style={{ cursor: 'pointer' }}>
                    <div className="dash-appt-icon">🦷</div>
                    <div className="dash-appt-info">
                      <p className="dash-appt-doctor">{b.dentists?.dentist_name}</p>
                      <p className="dash-appt-service">{serviceNames(b)}</p>
                      <div className="dash-appt-meta">
                        <span>🗓 {b.appointment_date ? new Date(b.appointment_date).toLocaleDateString() : '—'}</span>
                        <span>💰 ${serviceTotal(b)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* History Detail Modal */}
      {selectedBooking && (
        <div className="dash-modal-overlay" onClick={() => setSelectedBooking(null)}>
          <div className="dash-modal" onClick={e => e.stopPropagation()}>

            <button className="dash-modal-close" onClick={() => setSelectedBooking(null)}>✕</button>

            <p className="dash-modal-heading">REVIEW YOUR APPOINTMENT</p>

            <div className="dash-modal-doctor">
              <div className="dash-modal-avatar">
                {selectedBooking.dentists?.dentist_name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="dash-modal-doctor-name">{selectedBooking.dentists?.dentist_name || '—'}</p>
                <p className="dash-modal-doctor-title">{selectedBooking.dentists?.specialty || '—'}</p>
              </div>
            </div>

            <div className="dash-modal-divider" />

            {[
              { label: 'Patient',  value: selectedBooking.patients?.full_name || '—' },
              { label: 'Phone',    value: selectedBooking.patients?.phone || '—' },
              { label: 'Services', value: `🦷 ${serviceNames(selectedBooking)}` },
              { label: 'Duration', value: `${durationTotal(selectedBooking)} min` },
              { label: 'Price',    value: `$${serviceTotal(selectedBooking)}` },
              { label: 'Date',     value: selectedBooking.appointment_date || '—' },
              { label: 'Time',     value: selectedBooking.start_time && selectedBooking.end_time ? `${selectedBooking.start_time} – ${selectedBooking.end_time}` : '—' },
              { label: 'Notes',    value: selectedBooking.notes || '—' },
              { label: 'Status',   value: '✅ Done' },
            ].map((row, i) => (
              <div key={i} className="dash-modal-row">
                <span className="dash-modal-label">{row.label}</span>
                <span className="dash-modal-value">{row.value}</span>
              </div>
            ))}

          </div>
        </div>
      )}

    </div>
  )
}