import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import { useAuth } from '../../context/AuthContext'

export default function Dashboard() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [userName, setUserName] = useState('User')
  const { logout } = useAuth()

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bookings') || '[]')
    setBookings(saved)
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}')
    if (user?.name) setUserName(user.name)
  }, [])

  const confirmed  = bookings.filter(b => b.status === 'Confirmed').length
  const pending    = bookings.filter(b => b.status === 'Pending').length
  const cancelled  = bookings.filter(b => b.status === 'Cancelled').length

  const upcoming = bookings
    .filter(b => b.status === 'Confirmed' && b.date >= new Date().toISOString().split('T')[0])
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2)

  const tips = [
    { icon: '🪥', tip: 'Brush twice a day for 2 minutes each time.' },
    { icon: '🧵', tip: 'Floss daily to remove plaque between teeth.' },
    { icon: '💧', tip: 'Drink plenty of water to keep your mouth clean.' },
    { icon: '🍎', tip: 'Eat crunchy fruits & veggies to clean teeth naturally.' },
  ]

  const handleCancel = (id) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b)
    setBookings(updated)
    localStorage.setItem('bookings', JSON.stringify(updated))
  }

  return (
    <div className="dash-page">

      {/* Topbar */}
      <div className="dash-topbar">
        <div className="dash-logo">🦷 SMILLY</div>
        <div className="dash-nav">
           <button className="dash-nav-btn" onClick={() => navigate('/')}>Home</button>
          <button className="dash-nav-btn" onClick={() => navigate('/book')}>Book</button>
          <button className="dash-nav-btn" onClick={() => navigate('/my-bookings')}>My Bookings</button>
          <button className="dash-nav-btn signout" onClick={() =>  { logout(); navigate('/') }}>Sign Out</button>
        </div>
      </div>

      <div className="dash-content">

        {/* Welcome Banner */}
        <div className="dash-banner">
          <div className="dash-banner-left">
            <p className="dash-welcome-sub">Welcome back 👋</p>
            <h1 className="dash-welcome-name">{userName}</h1>
            <p className="dash-welcome-desc">Ready for your next visit? Book an appointment or check your upcoming schedule.</p>
            <div className="dash-banner-btns">
              <button className="dash-btn-primary" onClick={() => navigate('/book')}>
                + Book Appointment
              </button>
              <button className="dash-btn-secondary" onClick={() => navigate('/my-bookings')}>
                My Bookings
              </button>
            </div>
          </div>
          <div className="dash-banner-icon">🦷</div>
        </div>

        {/* Stats Row */}
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

        {/* Main Grid */}
        <div className="dash-grid">

          {/* Upcoming Appointments */}
          <div className="dash-card">
            <div className="dash-card-header">
              <h2 className="dash-card-title">📅 Upcoming Appointments</h2>
              <button className="dash-view-all" onClick={() => navigate('/my-bookings')}>View all →</button>
            </div>

            {upcoming.length === 0 ? (
              <div className="dash-empty">
                <p>No upcoming appointments.</p>
                <button className="dash-btn-primary small" onClick={() => navigate('/book')}>
                  Book Now
                </button>
              </div>
            ) : (
              <div className="dash-appt-list">
                {upcoming.map(b => (
                  <div className="dash-appt-card" key={b.id}>
                    <div className="dash-appt-icon">🦷</div>
                    <div className="dash-appt-info">
                      <p className="dash-appt-doctor">{b.doctorName}</p>
                      <p className="dash-appt-service">{b.service}</p>
                      <div className="dash-appt-meta">
                        <span>📅 {b.date}</span>
                        <span>🕐 {b.time}</span>
                      </div>
                    </div>
                    <button className="dash-cancel-btn" onClick={() => handleCancel(b.id)}>
                      Cancel
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}