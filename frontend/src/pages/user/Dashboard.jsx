import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../config/supabaseClient'
import './Dashboard.css'
import { useAuth } from '../../context/AuthContext'
import Logo from '../../components/common/Logo'

export default function Dashboard() {
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  const [userName,        setUserName]        = useState('')
  const [bookings,        setBookings]        = useState([])
  const [historyBookings, setHistoryBookings] = useState([])

  useEffect(() => {
    if (!user) return
    const fetchData = async () => {

      // 1. Get patient name + id
      const { data: patient } = await supabase
        .from('patients')
        .select('id, full_name')
        .eq('email', user.email)
        .maybeSingle()

      if (!patient) return
      setUserName(patient.full_name)

      // 2. Fetch all appointments
      const { data: apptData } = await supabase
        .from('appointments')
        .select(`
          id, status, notes, created_at,
          dentists ( dentist_name ),
          appointment_services ( services ( service_name, price ) )
        `)
        .eq('patient_id', patient.id)
        .order('created_at', { ascending: false })

      if (apptData) setBookings(apptData)

      // 3. Fetch history (done only, last 2)
      const { data: historyData } = await supabase
        .from('appointments')
        .select(`
          id, status, created_at,
          dentists ( dentist_name ),
          appointment_services ( services ( service_name, price ) )
        `)
        .eq('patient_id', patient.id)
        .eq('status', 'done')
        .order('created_at', { ascending: false })
        .limit(2)

      if (historyData) setHistoryBookings(historyData)
    }
    fetchData()
  }, [user])

  const confirmed = bookings.filter(b => b.status === 'confirmed').length
  const pending   = bookings.filter(b => b.status === 'pending').length
  const cancelled = bookings.filter(b => b.status === 'cancelled').length

  const upcoming = bookings
    .filter(b => b.status === 'confirmed')
    .slice(0, 3)

  const handleCancel = async (id) => {
    const { error } = await supabase
      .from('appointments')
      .update({ status: 'cancelled' })
      .eq('id', id)
    if (!error) {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b))
    }
  }

  return (
    <div className="dash-page">

      {/* Topbar */}
      <div className="dash-topbar">
        <Logo />            <div className="dash-nav">
          <button className="dash-nav-btn" onClick={() => navigate('/')}>Home</button>
          <button className="dash-nav-btn" onClick={() => navigate('/book')}>Book</button>
          <button className="dash-nav-btn" onClick={() => navigate('/my-bookings')}>My Bookings</button>
          <button className="dash-nav-btn signout" onClick={() => { logout(); navigate('/') }}>Sign Out</button>
        </div>
      </div>

      <div className="dash-content">

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

        {/* Upcoming Appointments */}
        <div className="dash-card">
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
                    <p className="dash-appt-service">{b.appointment_services?.[0]?.services?.service_name}</p>
                    <div className="dash-appt-meta">
                      <span>🗓 {new Date(b.created_at).toLocaleDateString()}</span>
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
        <div className="dash-grid">
          <div className="dash-card">
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
                  <div className="dash-appt-card" key={b.id}>
                    <div className="dash-appt-info">
                      <p className="dash-appt-doctor">{b.dentists?.dentist_name}</p>
                      <p className="dash-appt-service">{b.appointment_services?.[0]?.services?.service_name}</p>
                      <div className="dash-appt-meta">
                        <span>🗓 {new Date(b.created_at).toLocaleDateString()}</span>
                        <span>💰 ${b.appointment_services?.[0]?.services?.price}</span>
                      </div>
                    </div>
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