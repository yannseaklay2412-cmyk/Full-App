import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import './Dashboard.css'
import { useAuth } from '../../context/AuthContext'
import ConcernBox from '../../components/ConcernBox'
import { LOGO_URL } from '../../constants'

// Convert "08:00:00" (DB time) → "08:00 AM" (display)
const formatTime = (t) => {
  if (!t) return ''
  const [hStr, mStr] = t.split(':')
  let h = parseInt(hStr, 10)
  const m   = mStr
  const ampm = h >= 12 ? 'PM' : 'AM'
  if (h > 12) h -= 12
  if (h === 0) h = 12
  return `${String(h).padStart(2, '0')}:${m} ${ampm}`
}

const iconProps = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }

const IconCalendarCheck = ({ size = 18, className }) => (
  <svg {...iconProps} width={size} height={size} className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    <polyline points="8.5 15 10.5 17 15.5 13" />
  </svg>
)
const IconBell = ({ size = 18, className }) => (
  <svg {...iconProps} width={size} height={size} className={className}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)
const IconXCircle = ({ size = 18, className }) => (
  <svg {...iconProps} width={size} height={size} className={className}>
    <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
  </svg>
)
const IconCalendar = ({ size = 18, className }) => (
  <svg {...iconProps} width={size} height={size} className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)
const IconClock = ({ size = 18, className }) => (
  <svg {...iconProps} width={size} height={size} className={className}>
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
)
const IconUser = ({ size = 18, className }) => (
  <svg {...iconProps} width={size} height={size} className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
)
const IconCheckCircle = ({ size = 18, className }) => (
  <svg {...iconProps} width={size} height={size} className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)
const IconFolder = ({ size = 18, className }) => (
  <svg {...iconProps} width={size} height={size} className={className}>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
)

export default function Dashboard() {
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  const [userName,        setUserName]        = useState('')
  const [bookings,        setBookings]        = useState([])
  const [historyBookings, setHistoryBookings] = useState([])
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [loadError,       setLoadError]       = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const notifRef = useRef(null)

  const [editingName, setEditingName] = useState(false)
  const [nameInput,   setNameInput]   = useState('')
  const [nameSaving,  setNameSaving]  = useState(false)
  const [nameError,   setNameError]   = useState('')

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const confirmed = bookings.filter(b => b.status === 'confirmed').length
  const pending   = bookings.filter(b => b.status === 'pending').length
  const cancelled = bookings.filter(b => b.status === 'cancelled').length

  const upcoming = bookings
    .filter(b => b.status === 'confirmed')
    .slice(0, 3)

  const serviceNames    = (b) => b.appointment_services?.map(as => as.services?.service_name).filter(Boolean).join(', ') || '—'
  const serviceTotal    = (b) => b.appointment_services?.reduce((sum, as) => sum + (as.services?.price || 0), 0) || 0
  const durationTotal   = (b) => b.appointment_services?.reduce((sum, as) => sum + (as.services?.duration_minutes || 0), 0) || 0

  const startEditingName = () => {
    setNameInput(userName)
    setNameError('')
    setEditingName(true)
  }

  const cancelEditingName = () => {
    setEditingName(false)
    setNameError('')
  }

  const handleSaveName = async () => {
    const trimmed = nameInput.trim()
    if (!trimmed) return
    setNameSaving(true)
    setNameError('')
    try {
      await api.put('/patients/me', { full_name: trimmed })
      setUserName(trimmed)
      setEditingName(false)
    } catch (err) {
      setNameError(err.response?.data?.message || 'Could not update name. Please try again.')
    } finally {
      setNameSaving(false)
    }
  }

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
          <img src={LOGO_URL} alt="ToothTime logo" className="logo-icon" style={{ width: 48, height: 48, objectFit: 'contain', background: 'none' }} />
          <div style={{ marginLeft: '8px', fontFamily: 'Poppins', fontSize: '22px', fontWeight: 600 }}>
            <span style={{ color: '#1e1e1e' }}>Tooth</span>
            <span style={{ color: '#2ec4b6' }}>Time</span>
          </div>
        </div>            <div className="dash-nav">
          <button className="dash-nav-btn" onClick={() => navigate('/')}>Home</button>
          <button className="dash-nav-btn" onClick={() => navigate('/book')}>Book</button>
          <button className="dash-nav-btn" onClick={() => navigate('/my-bookings')}>My Bookings</button>

          <div className="dash-notif-wrap" ref={notifRef}>
            <button className="dash-notif-bell" onClick={() => setShowNotifications(v => !v)}>
              🔔
              {upcoming.length > 0 && <span className="dash-notif-badge">{upcoming.length}</span>}
            </button>

            {showNotifications && (
              <div className="dash-notif-dropdown">
                <div className="dash-notif-header">Notifications</div>
                {upcoming.length === 0 ? (
                  <div className="dash-empty">
                    <p>No new notifications.</p>
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
                            <span>🕐 {b.start_time ? `${formatTime(b.start_time)}${b.end_time ? ` – ${formatTime(b.end_time)}` : ''}` : '—'}</span>
                            <span>📌 {b.status}</span>
                          </div>
                        </div>
                        <button className="dash-cancel-btn" onClick={() => handleCancel(b.id)}>Cancel</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

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
            {editingName ? (
              <div className="dash-name-edit-row">
                <input
                  className="dash-name-input"
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  autoFocus
                  disabled={nameSaving}
                />
                <button className="dash-name-save-btn" onClick={handleSaveName} disabled={nameSaving || !nameInput.trim()}>
                  {nameSaving ? '...' : '✓'}
                </button>
                <button className="dash-name-cancel-btn" onClick={cancelEditingName} disabled={nameSaving}>✕</button>
              </div>
            ) : (
              <h1 className="dash-welcome-name">
                {userName}
                <button className="dash-name-edit-btn" onClick={startEditingName} title="Edit name">✏️</button>
              </h1>
            )}
            {nameError && <p className="dash-name-error">{nameError}</p>}
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
          <div className="dash-stat-card">
            <div className="dash-stat-text">
              <span className="dash-stat-num">{confirmed}</span>
              <span className="dash-stat-label">Confirmed</span>
            </div>
            <IconCalendarCheck className="dash-stat-icon" />
          </div>
          <div className="dash-stat-card">
            <div className="dash-stat-text">
              <span className="dash-stat-num">{pending}</span>
              <span className="dash-stat-label">Pending</span>
            </div>
            <IconBell className="dash-stat-icon" />
          </div>
          <div className="dash-stat-card">
            <div className="dash-stat-text">
              <span className="dash-stat-num">{cancelled}</span>
              <span className="dash-stat-label">Cancelled</span>
            </div>
            <IconXCircle className="dash-stat-icon" />
          </div>
          <div className="dash-stat-card">
            <div className="dash-stat-text">
              <span className="dash-stat-num">{bookings.length}</span>
              <span className="dash-stat-label">Total</span>
            </div>
            <IconCalendar className="dash-stat-icon" />
          </div>
        </div>

        <div className="dash-grid">
          {/* Upcoming Appointments */}
          <div className="dash-card full-width">
            <div className="dash-card-header">
              <h2 className="dash-card-title"><IconCalendar size={18} /> Upcoming Appointments</h2>
              <button className="dash-view-all" onClick={() => navigate('/my-bookings')}>View all →</button>
            </div>
            {upcoming.length === 0 ? (
              <div className="dash-empty">
                <p>No upcoming appointments.</p>
                <button className="dash-btn-primary small" onClick={() => navigate('/book')}>Book Now</button>
              </div>
            ) : (
              <div className="dash-upcoming-grid">
                {upcoming.map(b => (
                  <div className="dash-upcoming-card" key={b.id}>
                    <div className="dash-upcoming-header">
                      <span className="dash-upcoming-title"><IconCalendar size={15} /> {serviceNames(b)}</span>
                      <button className="dash-upcoming-action" onClick={() => handleCancel(b.id)}>Cancel</button>
                    </div>
                    <div className="dash-upcoming-row"><IconCalendar size={14} /> <strong>Date:</strong> {b.appointment_date ? new Date(b.appointment_date).toLocaleDateString() : '—'}</div>
                    <div className="dash-upcoming-row"><IconClock size={14} /> <strong>Time:</strong> {b.start_time && b.end_time ? `${b.start_time} – ${b.end_time}` : '—'}</div>
                    <div className="dash-upcoming-row"><IconUser size={14} /> <strong>Doctor:</strong> {b.dentists?.dentist_name || '—'}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Appointment History */}
          <div className="dash-card full-width">
            <div className="dash-card-header">
              <h2 className="dash-card-title"><IconFolder size={18} /> Appointment History</h2>
              <button className="dash-view-all" onClick={() => navigate('/history')}>View all →</button>
            </div>
            {historyBookings.length === 0 ? (
              <div className="dash-empty">
                <p>No appointment history yet.</p>
              </div>
            ) : (
              <div className="dash-history-list">
                {historyBookings.map(b => (
                  <div className="dash-history-row" key={b.id} onClick={() => setSelectedBooking(b)}>
                    <span className="dash-history-left"><IconCheckCircle size={16} className="dash-history-check" /> {serviceNames(b)}</span>
                    <span className="dash-history-date"><IconCalendar size={13} /> Date: {b.appointment_date ? new Date(b.appointment_date).toLocaleDateString() : '—'}</span>
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