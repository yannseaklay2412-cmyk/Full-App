import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'
import './MyBookings.css'

const STATUS_COLORS = {
  confirmed: { bg: 'rgba(78,205,196,0.12)', color: '#4ecdc4', border: '#4ecdc4' },
  pending:   { bg: 'rgba(245,200,66,0.12)',  color: '#f5c842', border: '#f5c842' },
  cancelled: { bg: 'rgba(255,99,99,0.12)',   color: '#ff6363', border: '#ff6363' },
  done:      { bg: 'rgba(100,200,100,0.12)', color: '#64c864', border: '#64c864' },
}

const STATUS_LABEL = {
  pending:   '⏳ Pending confirmation',
  confirmed: '✓ Confirmed',
  done:      '✅ Done',
  cancelled: '✗ Cancelled',
}

export default function MyBookings() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [bookings, setBookings]           = useState([])
  const [filter, setFilter]               = useState('All')
  const [loading, setLoading]             = useState(true)
  const [selectedBooking, setSelectedBooking] = useState(null)

  useEffect(() => {
    if (!user) return
    const fetchBookings = async () => {
      setLoading(true)
      try {
        const { data } = await api.get('/bookings/mine')
        setBookings(data.data || [])
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }
    fetchBookings()
  }, [user])

  const serviceNames  = (b) => b.appointment_services?.map(as => as.services?.service_name).filter(Boolean).join(', ') || '—'
  const serviceTotal  = (b) => b.appointment_services?.reduce((sum, as) => sum + (as.services?.price || 0), 0) || 0
  const durationTotal = (b) => b.appointment_services?.reduce((sum, as) => sum + (as.services?.duration_minutes || 0), 0) || 0

  const handleCancel = async (id) => {
    try {
      await api.put(`/bookings/${id}/cancel`)
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b))
      if (selectedBooking?.id === id) setSelectedBooking(prev => ({ ...prev, status: 'cancelled' }))
    } catch (err) {
      console.error(err)
    }
  }

  const filtered = filter === 'All'
    ? bookings
    : bookings.filter(b => b.status === filter.toLowerCase())

  const Avatar = ({ name, size = 48 }) => (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'linear-gradient(135deg, #0d9488, #0f766e)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 700, fontSize: size * 0.4, flexShrink: 0,
    }}>
      {name?.charAt(0).toUpperCase()}
    </div>
  )

  return (
    <div className="mybookings-page">

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
          {['All', 'Pending', 'Confirmed', 'Done', 'Cancelled'].map(f => (
            <button
              key={f}
              className={`mb-filter ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
              <span className="mb-filter-count">
                {f === 'All'
                  ? bookings.length
                  : bookings.filter(b => b.status === f.toLowerCase()).length}
              </span>
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="mb-empty"><p>Loading appointments...</p></div>
        ) : filtered.length === 0 ? (
          <div className="mb-empty">
            <span className="mb-empty-icon">🦷</span>
            <p>No {filter !== 'All' ? filter.toLowerCase() : ''} appointments found.</p>
            <button className="btn-newbook" onClick={() => navigate('/book')}>Book Now</button>
          </div>
        ) : (
          <div className="mb-list">
            {filtered.map(b => {
              const style = STATUS_COLORS[b.status] || STATUS_COLORS.pending
              return (
                <div className="mb-card" key={b.id} onClick={() => setSelectedBooking(b)} style={{ cursor: 'pointer' }}>
                  <div className="mb-card-left">
                    <div className="mb-card-icon">🦷</div>
                    <div className="mb-card-info">
                      <p className="mb-doctor">{b.dentists?.dentist_name || '—'}</p>
                      <p className="mb-service">{serviceNames(b)}</p>
                      <div className="mb-meta">
                        <span>💰 ${serviceTotal(b)}</span>
                        <span>📝 {b.notes || 'No notes'}</span>
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
                    {b.status !== 'cancelled' && b.status !== 'done' && (
                      <button className="btn-cancel" onClick={e => { e.stopPropagation(); handleCancel(b.id) }}>
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

      {/* Detail Modal */}
      {selectedBooking && (
        <div className="mb-modal-overlay" onClick={() => setSelectedBooking(null)}>
          <div className="mb-modal" onClick={e => e.stopPropagation()}>

            <button className="mb-modal-close" onClick={() => setSelectedBooking(null)}>✕</button>

            <p className="mb-modal-heading">REVIEW YOUR APPOINTMENT</p>

            <div className="mb-modal-doctor">
              <Avatar name={selectedBooking.dentists?.dentist_name} />
              <div>
                <p className="mb-modal-doctor-name">{selectedBooking.dentists?.dentist_name || '—'}</p>
                <p className="mb-modal-doctor-title">{selectedBooking.dentists?.specialty || '—'}</p>
              </div>
            </div>

            <div className="mb-modal-divider" />

            {[
              { label: 'Patient',  value: selectedBooking.patients?.full_name || '—' },
              { label: 'Phone',    value: selectedBooking.patients?.phone || '—' },
              { label: 'Services', value: `🦷 ${serviceNames(selectedBooking)}` },
              { label: 'Duration', value: `${durationTotal(selectedBooking)} min` },
              { label: 'Price',    value: `$${serviceTotal(selectedBooking)}` },
              { label: 'Date',     value: selectedBooking.appointment_date || '—' },
              { label: 'Time',     value: selectedBooking.start_time && selectedBooking.end_time ? `${selectedBooking.start_time} – ${selectedBooking.end_time}` : '—' },
              { label: 'Notes',    value: selectedBooking.notes || '—' },
              { label: 'Status',   value: STATUS_LABEL[selectedBooking.status] || selectedBooking.status },
            ].map((row, i) => (
              <div key={i} className="mb-modal-row">
                <span className="mb-modal-label">{row.label}</span>
                <span className={`mb-modal-value ${row.label === 'Status' ? 'mb-modal-status' : ''}`}>
                  {row.value}
                </span>
              </div>
            ))}

          </div>
        </div>
      )}

    </div>
  )
}
