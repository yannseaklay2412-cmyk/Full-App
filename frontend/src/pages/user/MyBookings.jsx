import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../config/supabaseClient'
import './MyBookings.css'

const STATUS_COLORS = {
  confirmed: { bg: 'rgba(78,205,196,0.12)', color: '#4ecdc4', border: '#4ecdc4' },
  pending:   { bg: 'rgba(245,200,66,0.12)',  color: '#f5c842', border: '#f5c842' },
  cancelled: { bg: 'rgba(255,99,99,0.12)',   color: '#ff6363', border: '#ff6363' },
  done:      { bg: 'rgba(100,200,100,0.12)', color: '#64c864', border: '#64c864' },
}

export default function MyBookings() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [bookings, setBookings] = useState([])
  const [filter, setFilter]     = useState('All')
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    if (!user) return
    const fetchBookings = async () => {
      setLoading(true)

      // Step 1 — get patient by email
      const { data: patient } = await supabase
        .from('patients')
        .select('id')
        .eq('email', user.email)
        .maybeSingle()

      if (!patient) { setLoading(false); return }

      // Step 2 — fetch appointments using patient_id
      const { data } = await supabase
        .from('appointments')
        .select(`
          id,
          status,
          notes,
          created_at,
          dentists ( dentist_name, specialty ),
          services:appointment_services ( services ( service_name, price ) )
        `)
        .eq('patient_id', patient.id)
        .order('created_at', { ascending: false })

      if (data) setBookings(data)
      setLoading(false)
    }
    fetchBookings()
  }, [user])

  const handleCancel = async (id) => {
    const { error } = await supabase
      .from('appointments')
      .update({ status: 'cancelled' })
      .eq('id', id)

    if (!error) {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b))
    }
  }

  const filtered = filter === 'All'
    ? bookings
    : bookings.filter(b => b.status === filter.toLowerCase())

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

        {/* Loading */}
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
              const serviceName = b.services?.[0]?.services?.service_name || '—'
              const servicePrice = b.services?.[0]?.services?.price || '—'
              return (
                <div className="mb-card" key={b.id}>
                  <div className="mb-card-left">
                    <div className="mb-card-icon">🦷</div>
                    <div className="mb-card-info">
                      <p className="mb-doctor">{b.dentists?.dentist_name || '—'}</p>
                      <p className="mb-service">{serviceName}</p>
                      <div className="mb-meta">
                        <span>💰 ${servicePrice}</span>
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