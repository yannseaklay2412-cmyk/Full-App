import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css' 
import { DataStorage } from '../../seeders/data' 
export default function AdminDashboard() {
  const navigate = useNavigate()
  const [stats, setStats]       = useState({ users: 0, total: 0, pending: 0, confirmed: 0, cancelled: 0 })
  const [upcoming, setUpcoming] = useState([])
  const [dentists, setDentists] = useState([])
  const [bookings, setBookings] = useState([])
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDentist, setSelectedDentist] = useState(null)

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')    || '[]')
    const bks   = JSON.parse(localStorage.getItem('bookings') || '[]')
    const dents = JSON.parse(localStorage.getItem('dentists') || '[]')

    if (dents.length === 0) {
    
      const defaults = DataStorage.dentists
      localStorage.setItem('dentists', JSON.stringify(defaults))
      setDentists(defaults)
    } else {
      setDentists(dents)
    }
    setBookings(bks)
    setStats({
      users:     users.length,
      total:     bks.length,
      pending:   bks.filter(b => b.status === 'pending').length,
      confirmed: bks.filter(b => b.status === 'confirmed').length,
      cancelled: bks.filter(b => b.status === 'cancelled').length,
    })

    const today = new Date().toISOString().split('T')[0]
setUpcoming(
  [...bks]
    .filter(b => b.date === today && b.status !== 'cancelled')
    .sort((a, b) => a.time.localeCompare(b.time))
)
  }, [])

  const year        = currentMonth.getFullYear()
  const month       = currentMonth.getMonth()
  const firstDay    = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const monthName   = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })
  const todayDate   = new Date().getDate()
  const todayMonth  = new Date().getMonth()
  const todayYear   = new Date().getFullYear()
  const bookedDates = bookings.map(b => b.date)
  const calendarDays = []
  for (let i = 0; i < firstDay; i++) calendarDays.push(null)
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d)

  const statusColor = { pending: '#f5c842', confirmed: '#4ecdc4', cancelled: '#ff6b6b' }

  const sidebarItems = [
    { label: 'Dashboard',   path: '/admin'              },
    { label: 'Schedule',    path: '/admin/schedule'     },
    { label: 'Employees',   path: '/admin/dentists'     },
    { label: 'Appointment', path: '/admin/appointments' },
    { label: 'Record',      path: '/admin/users'        },
    { label: 'Setting',     path: '/admin/AdminSetting'      },
  ]

  const dentistAppointments = selectedDentist
    ? bookings.filter(b => b.dentistId === selectedDentist.id)
    : []

  const sortedDentists = [...dentists].sort((a, b) => {
    const countA = bookings.filter(bk => bk.dentistId === a.id).length
    const countB = bookings.filter(bk => bk.dentistId === b.id).length
    return countB - countA
  })

  return (
    <div className="ad-wrap">
      <aside className="ad-sidebar">
        <div className="ad-sidebar-logo">
          <div className="ad-logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8 2 5 5 5 9c0 2 .5 4 1.5 5.5L8 20h8l1.5-5.5C18.5 13 19 11 19 9c0-4-3-7-7-7z"/>
            </svg>
          </div>
        </div>
        <div className="ad-sidebar-label">
          <p className="ad-sidebar-top">Dashboard</p>
          <p className="ad-sidebar-sub">Home / Overview</p>
        </div>
        <nav className="ad-sidebar-nav">
          {sidebarItems.map(item => (
            <div key={item.path} className={`ad-nav-item ${window.location.pathname === item.path ? 'active' : ''}`} onClick={() => navigate(item.path)}>
              {item.label}
            </div>
          ))}
        </nav>
        <button className="ad-logout-btn" onClick={() => { localStorage.removeItem('currentUser'); navigate('/login') }}>
          Logout
        </button>
      </aside>

      <div className="ad-content">
        <div className="ad-topbar">
          <div className="ad-topbar-left">
            <p className="ad-topbar-title">Dashboard</p>
            <p className="ad-topbar-sub">Home / Overview</p>
          </div>
          <div className="ad-topbar-right">
            <div className="ad-search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input placeholder="Search..." />
            </div>
            <div className="ad-avatar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <button className="ad-signin-btn" onClick={() => { localStorage.removeItem('currentUser'); navigate('/login') }}>
              Sign Out
            </button>
          </div>
        </div>

        <div className="ad-stat-row">
          {[
            { label: 'Total Patients', num: stats.users,     color: '#4ecdc4', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>) },
            { label: 'Total Bookings', num: stats.total,     color: '#7c3aed', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>) },
            { label: 'Pending',        num: stats.pending,   color: '#f5c842', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>) },
            { label: 'Confirmed',      num: stats.confirmed, color: '#4ecdc4', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>) },
            { label: 'Active Doctors', num: dentists.length, color: '#ff6b6b', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8 2 5 5 5 9c0 2 .5 4 1.5 5.5L8 20h8l1.5-5.5C18.5 13 19 11 19 9c0-4-3-7-7-7z"/></svg>) },
          ].map((s, i) => (
            <div key={i} className="ad-stat-top-card">
              <div className="ad-stat-top-icon" style={{ background: s.color + '18', color: s.color }}>{s.icon}</div>
              <div>
                <p className="ad-stat-top-label">{s.label}</p>
                <h3 className="ad-stat-top-num" style={{ color: s.color }}>{s.num}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="ad-grid">
          <div className="ad-col-left">
            <div className="ad-card">
              <div className="ad-card-header">
                <h3>Today Appointments</h3>
                <span className="ad-view-all" onClick={() => navigate('/admin/appointments')}>View All</span>
              </div>
              <div className="ad-appt-list">
                {upcoming.length === 0 ? (
                  <div className="ad-empty">Today appointments</div>
                ) : upcoming.map(b => (
                  <div key={b.id} className="ad-appt-row">
                    <div className="ad-appt-avatar">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <div className="ad-appt-info">
                      <p className="ad-appt-name">{b.userName}</p>
                      <p className="ad-appt-time">{b.date} · {b.time}</p>
                    </div>
                    <span className="ad-appt-type">{b.dentistTitle || 'Check Up'}</span>
                    <span className="ad-appt-status" style={{ color: statusColor[b.status], borderColor: statusColor[b.status] }}>{b.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ad-card">
              <div className="ad-card-header"><h3>Recent Activity</h3></div>
              {bookings.length === 0 ? (
                <div className="ad-empty">No activity yet</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {[...bookings].sort((a,b) => b.id - a.id).slice(0,5).map((b, i, arr) => (
                    <div key={b.id} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px solid #f0f2f5' : 'none' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: statusColor[b.status], marginTop: 3 }}></div>
                        {i < arr.length - 1 && <div style={{ width: 2, height: '100%', minHeight: 24, background: '#f0f2f5', marginTop: 4 }}></div>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1b3e', marginBottom: 2 }}>{b.userName} booked with {b.dentistName}</p>
                        <p style={{ fontSize: 11, color: '#8a9fc4' }}>{b.date} · {b.time}</p>
                      </div>
                      <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 99, border: `1px solid ${statusColor[b.status]}`, color: statusColor[b.status], fontWeight: 600, textTransform: 'capitalize', alignSelf: 'flex-start', flexShrink: 0 }}>
                        {b.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>


          <div className="ad-col-right">
            <div className="ad-card ad-card-full">
              <div className="ad-card-header">
                <h3>Employees</h3>
                <span className="ad-view-all" onClick={() => navigate('/admin/dentists')}>View All</span>
              </div>
              <div className="ad-emp-list" style={{ maxHeight: 420, overflowY: 'auto' }}>
                {sortedDentists.map((d, i) => (
                  <div
                    key={d.id}
                    className={`ad-emp-card ${i % 2 === 0 ? 'dark' : 'light'}`}
                    onClick={() => setSelectedDentist(d)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="ad-emp-avatar">
                      {d.photo ? (
                        <img src={d.photo} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10 }} />
                      ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                        </svg>
                      )}
                    </div>
                    <div className="ad-emp-info">
                        <p className="ad-emp-name">{d.name}</p>
                        <p className="ad-emp-title">{d.title}</p>
                        <p className="ad-emp-desc">
                          {bookings.filter(b => b.dentistId === d.id).length} appointments
                        </p>
                      </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── DOCTOR APPOINTMENTS MODAL ── */}
      {selectedDentist && (
        <div
          onClick={() => setSelectedDentist(null)}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(13,27,62,0.45)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: 14, width: '100%', maxWidth: 480,
              maxHeight: '80vh', display: 'flex', flexDirection: 'column',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)', overflow: 'hidden'
            }}
          >
            <div style={{ padding: '18px 22px', borderBottom: '1px solid #f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d1b3e', marginBottom: 2 }}>{selectedDentist.name}</h3>
                <p style={{ fontSize: 12, color: '#8a9fc4' }}>{selectedDentist.title}</p>
              </div>
              <button
                onClick={() => setSelectedDentist(null)}
                style={{ background: '#f5f6fa', border: 'none', borderRadius: 8, width: 30, height: 30, cursor: 'pointer', fontSize: 16, color: '#8a9fc4' }}
              >
                ×
              </button>
            </div>

            <div style={{ padding: '12px 22px', overflow: 'auto', flex: 1 }}>
              {dentistAppointments.length === 0 ? (
                <div style={{ padding: '32px 0', textAlign: 'center', color: '#8a9fc4', fontSize: 13 }}>
                  No appointments for this doctor yet
                </div>
              ) : (
                [...dentistAppointments]
                  .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
                  .map((b, i, arr) => (
                    <div
                      key={b.id}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '12px 0', borderBottom: i < arr.length - 1 ? '1px solid #f0f2f5' : 'none'
                      }}
                    >
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1b3e', marginBottom: 2 }}>{b.userName}</p>
                        <p style={{ fontSize: 11, color: '#8a9fc4' }}>{b.date} · {b.time}</p>
                      </div>
                      <span
                        style={{
                          fontSize: 11, padding: '3px 10px', borderRadius: 99,
                          border: `1px solid ${statusColor[b.status] || '#8a9fc4'}`,
                          color: statusColor[b.status] || '#8a9fc4', fontWeight: 600, textTransform: 'capitalize'
                        }}
                      >
                        {b.status}
                      </span>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}