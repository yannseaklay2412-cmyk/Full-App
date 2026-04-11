import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'  // ✅ FIX: Import useAuth
import './MyBookings.css'

const STATUS_COLORS = {
  Confirmed: { bg: 'rgba(78,205,196,0.12)', color: '#4ecdc4', border: '#4ecdc4' },
  Pending:   { bg: 'rgba(245,200,66,0.12)',  color: '#f5c842', border: '#f5c842' },
  Cancelled: { bg: 'rgba(255,99,99,0.12)',   color: '#ff6363', border: '#ff6363' },
}

export default function MyBookings() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()  // ✅ FIX: Get current logged in user

  // Accept a new booking passed from Book.jsx via navigate state
  const incoming = location.state?.appointment

  const [bookings, setBookings] = useState(() => {
    const all = JSON.parse(localStorage.getItem('bookings') || '[]')

    // ✅ FIX: Filter only current user's bookings
    const saved = all.filter(b => b.email === user?.email)

    if (incoming) {
      const exists = saved.find(
        (b) => b.date === incoming.date && b.time === incoming.time && b.doctorName === incoming.doctorName
      )
      if (!exists) {
        const newBooking = { ...incoming, id: Date.now(), status: 'Confirmed' }
        const updatedAll = [newBooking, ...all]
        localStorage.setItem('bookings', JSON.stringify(updatedAll))
        return [newBooking, ...saved]
      }
    }
    return saved
  })

  const [filter, setFilter] = useState('All')

  const handleCancel = (id) => {
    // ✅ FIX: Update only in local state
    const updatedLocal = bookings.map((b) =>
      b.id === id ? { ...b, status: 'Cancelled' } : b
    )
    setBookings(updatedLocal)

    // ✅ FIX: Merge with ALL bookings (other users stay untouched)
    const all = JSON.parse(localStorage.getItem('bookings') || '[]')
    const merged = all.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b)
    localStorage.setItem('bookings', JSON.stringify(merged))
  }

  const filtered = filter === 'All' ? bookings : bookings.filter((b) => b.status === filter)

  return (
    <div className="mybookings-page">

      {/* Top bar */}
      <div className="mb-topbar">
        <button className="mb-back" onClick={() => navigate('/dashboard')}>← Dashboard</button>
        <div className="mb-logo">🦷 SMILLY</div>
      </div>

      <div className="mb-content">
        <div className="mb-header">
          <div>
            <h1 className="mb-title">My <span className="teal">Bookings</span></h1>
            <p className="mb-sub">Track and manage your dental appointments.</p>
          </div>
          <button className="btn-newbook" onClick={() => navigate('/book')}>
            + New Appointment
          </button>
        </div>

        {/* Filter tabs */}
        <div className="mb-filters">
          {['All', 'Confirmed', 'Pending', 'Cancelled'].map((f) => (
            <button
              key={f}
              className={`mb-filter ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
              <span className="mb-filter-count">
                {f === 'All' ? bookings.length : bookings.filter((b) => b.status === f).length}
              </span>
            </button>
          ))}
        </div>

        {/* Booking list */}
        {filtered.length === 0 ? (
          <div className="mb-empty">
            <span className="mb-empty-icon">🦷</span>
            <p>No {filter !== 'All' ? filter.toLowerCase() : ''} appointments found.</p>
            <button className="btn-newbook" onClick={() => navigate('/book')}>
              Book Now
            </button>
          </div>
        ) : (
          <div className="mb-list">
            {filtered.map((b) => {
              const style = STATUS_COLORS[b.status] || STATUS_COLORS.Pending
              return (
                <div className="mb-card" key={b.id}>
                  <div className="mb-card-left">
                    <div className="mb-card-icon">🦷</div>
                    <div className="mb-card-info">
                      <p className="mb-doctor">{b.doctorName || b.doctor}</p>
                      <p className="mb-service">{b.service}</p>
                      <div className="mb-meta">
                        <span>📅 {b.date}</span>
                        <span>🕐 {b.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-card-right">
                    <span
                      className="mb-status"
                      style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}` }}
                    >
                      {b.status}
                    </span>
                    {b.status !== 'Cancelled' && (
                      <button className="btn-cancel" onClick={() => handleCancel(b.id)}>
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}