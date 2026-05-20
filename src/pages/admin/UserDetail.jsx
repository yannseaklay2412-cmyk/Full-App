import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const sidebarItems = [
  { label: 'Dashboard',   path: '/admin'              },
  { label: 'Schedule',    path: '/admin/schedule'     },
  { label: 'Employees',   path: '/admin/dentists'     },
  { label: 'Appointment', path: '/admin/appointments' },
  { label: 'Record',      path: '/admin/users'        },
  { label: 'Setting',     path: '/admin/reports'      },
]

const STATUS_COLOR = {
  Confirmed: { color: '#4ecdc4', bg: 'rgba(78,205,196,0.08)',  border: '#4ecdc4' },
  confirmed: { color: '#4ecdc4', bg: 'rgba(78,205,196,0.08)',  border: '#4ecdc4' },
  Pending:   { color: '#f5c842', bg: 'rgba(245,200,66,0.08)',  border: '#f5c842' },
  pending:   { color: '#f5c842', bg: 'rgba(245,200,66,0.08)',  border: '#f5c842' },
  Cancelled: { color: '#ff6b6b', bg: 'rgba(255,107,107,0.08)', border: '#ff6b6b' },
  cancelled: { color: '#ff6b6b', bg: 'rgba(255,107,107,0.08)', border: '#ff6b6b' },
}

const SIDEBAR = {
  wrap:   { width: 180, background: '#0d1b3e', display: 'flex', flexDirection: 'column', flexShrink: 0, paddingBottom: 24 },
  logo:   { padding: '20px 20px 16px', borderBottom: '1px solid #243560' },
  logoBox:{ background: '#4ecdc4', borderRadius: 10, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0d1b3e' },
  sub:    { padding: '14px 20px 10px', borderBottom: '1px solid #243560' },
  subTop: { fontSize: 10, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 },
  subBot: { fontSize: 11, color: '#4ecdc4', fontWeight: 500 },
  logout: { marginTop: 'auto', padding: '0 16px' },
  logBtn: { width: '100%', background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.25)', color: '#ff6b6b', padding: 9, borderRadius: 8, fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" },
}

export default function UserDetail() {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const [user, setUser]         = useState(null)
  const [bookings, setBookings] = useState([])
  const [filter, setFilter]     = useState('all')
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const users    = JSON.parse(localStorage.getItem('users')    || '[]')
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    const found    = users.find(u => String(u.id) === String(id))
    if (!found) { setNotFound(true); return }
    setUser(found)
    const userBookings = allBookings.filter(
      b => b.userEmail === found.email || b.email === found.email
    )
    setBookings(userBookings)
  }, [id])

  const navItem = (item) => ({
    padding: '11px 20px', fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
    background: window.location.pathname === item.path ? 'rgba(78,205,196,0.1)' : 'transparent',
    borderLeft: window.location.pathname === item.path ? '3px solid #4ecdc4' : '3px solid transparent',
    color:      window.location.pathname === item.path ? '#4ecdc4' : '#8a9fc4',
  })

  const today    = new Date().toISOString().split('T')[0]
  const upcoming = bookings.filter(b => b.date >= today && b.status !== 'Cancelled' && b.status !== 'cancelled')
  const past     = bookings.filter(b => b.date <  today || b.status === 'Cancelled' || b.status === 'cancelled')

  const stats = {
    total:     bookings.length,
    confirmed: bookings.filter(b => b.status === 'Confirmed' || b.status === 'confirmed').length,
    pending:   bookings.filter(b => b.status === 'Pending'   || b.status === 'pending').length,
    cancelled: bookings.filter(b => b.status === 'Cancelled' || b.status === 'cancelled').length,
  }

  const filtered = filter === 'all'      ? bookings
    : filter === 'upcoming' ? upcoming
    : filter === 'past'     ? past
    : bookings.filter(b => b.status?.toLowerCase() === filter)

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  // ── NOT FOUND ──
  if (notFound) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", background: '#f0f2f5' }}>
        <aside style={SIDEBAR.wrap}>
          <div style={SIDEBAR.logo}><div style={SIDEBAR.logoBox}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8 2 5 5 5 9c0 2 .5 4 1.5 5.5L8 20h8l1.5-5.5C18.5 13 19 11 19 9c0-4-3-7-7-7z"/>
            </svg>
          </div></div>
          {sidebarItems.map(item => (
            <div key={item.path} onClick={() => navigate(item.path)} style={navItem(item)}>{item.label}</div>
          ))}
        </aside>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#0d1b3e' }}>Patient not found</p>
          <button onClick={() => navigate('/admin/users')}
            style={{ background: '#0d1b3e', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>
            ← Back to Records
          </button>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", background: '#f0f2f5' }}>

      {/* ── SIDEBAR ── */}
      <aside style={SIDEBAR.wrap}>
        <div style={SIDEBAR.logo}>
          <div style={SIDEBAR.logoBox}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8 2 5 5 5 9c0 2 .5 4 1.5 5.5L8 20h8l1.5-5.5C18.5 13 19 11 19 9c0-4-3-7-7-7z"/>
            </svg>
          </div>
        </div>
        <div style={SIDEBAR.sub}>
          <p style={SIDEBAR.subTop}>Dashboard</p>
          <p style={SIDEBAR.subBot}>Record / Detail</p>
        </div>
        {sidebarItems.map(item => (
          <div key={item.path} onClick={() => navigate(item.path)} style={navItem(item)}>
            {item.label}
          </div>
        ))}
        <div style={SIDEBAR.logout}>
          <button onClick={() => { localStorage.removeItem('currentUser'); navigate('/login') }} style={SIDEBAR.logBtn}>
            Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* TOP BAR */}
        <div style={{ background: '#fff', borderBottom: '1px solid #e8ecf0', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <p style={{ fontSize: 11, color: '#8a9fc4' }}>Dashboard / Record</p>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1b3e' }}>Patient Detail</p>
          </div>
          <button onClick={() => navigate('/admin/users')}
            style={{ background: '#0d1b3e', border: 'none', color: '#fff', padding: '7px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            ← Back to Records
          </button>
        </div>

        <div style={{ flex: 1, padding: 24, overflow: 'auto' }}>

          {/* PROFILE CARD */}
          <div style={{ background: '#fff', borderRadius: 16, padding: '24px 28px', marginBottom: 20, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>

            {/* Avatar */}
            <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'linear-gradient(135deg, #4ecdc4, #2bb5ac)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: '#0d1b3e', flexShrink: 0 }}>
              {initials}
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0d1b3e', marginBottom: 4 }}>{user.name}</h2>
              <p style={{ fontSize: 13, color: '#8a9fc4', marginBottom: 10 }}>{user.email}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, padding: '3px 12px', borderRadius: 99, background: 'rgba(78,205,196,0.08)', border: '1px solid rgba(78,205,196,0.3)', color: '#4ecdc4', fontWeight: 600 }}>
                  {stats.total} {stats.total === 1 ? 'Visit' : 'Visits'}
                </span>
                {upcoming.length > 0 && (
                  <span style={{ fontSize: 11, padding: '3px 12px', borderRadius: 99, background: 'rgba(78,205,196,0.08)', border: '1px solid #4ecdc4', color: '#4ecdc4', fontWeight: 600 }}>
                    Active Patient
                  </span>
                )}
              </div>
            </div>

            {/* Joined date */}
            {user.createdAt && (
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <p style={{ fontSize: 11, color: '#8a9fc4', marginBottom: 4 }}>Member Since</p>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1b3e' }}>
                  {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
              </div>
            )}
          </div>

          {/* STAT CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
            {[
              { label: 'Total',     num: stats.total,     color: '#7c3aed' },
              { label: 'Confirmed', num: stats.confirmed, color: '#4ecdc4' },
              { label: 'Pending',   num: stats.pending,   color: '#f5c842' },
              { label: 'Cancelled', num: stats.cancelled, color: '#ff6b6b' },
            ].map((s, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '14px 18px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color }} />
                </div>
                <div>
                  <p style={{ fontSize: 10, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.label}</p>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.num}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* FILTER TABS */}
          <div style={{ display: 'flex', gap: 4, background: '#fff', border: '1px solid #e0e4ea', borderRadius: 10, padding: 4, marginBottom: 16, width: 'fit-content' }}>
            {[
              { key: 'all',       label: 'All' },
              { key: 'upcoming',  label: 'Upcoming' },
              { key: 'confirmed', label: 'Confirmed' },
              { key: 'pending',   label: 'Pending' },
              { key: 'past',      label: 'Past' },
            ].map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)}
                style={{ padding: '7px 14px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
                  background: filter === f.key ? '#0d1b3e' : 'transparent',
                  color:      filter === f.key ? '#fff'    : '#8a9fc4' }}>
                {f.label}
              </button>
            ))}
          </div>

          {/* BOOKING TABLE */}
          <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fc' }}>
                  {['#', 'Dentist', 'Service', 'Date', 'Time', 'Status'].map(h => (
                    <th key={h} style={{ padding: '13px 16px', textAlign: 'left', fontSize: 11, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: 48, textAlign: 'center', color: '#8a9fc4', fontSize: 14 }}>
                      No appointments found
                    </td>
                  </tr>
                ) : [...filtered].sort((a, b) => b.id - a.id).map((b, i) => {
                  const sc = STATUS_COLOR[b.status] || STATUS_COLOR.pending
                  return (
                    <tr key={b.id} style={{ borderBottom: '1px solid #f0f2f5', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#fafbfc'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ padding: '13px 16px', fontSize: 12, color: '#8a9fc4' }}>{i + 1}</td>
                      <td style={{ padding: '13px 16px' }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1b3e', marginBottom: 1 }}>{b.dentistName || b.doctorName}</p>
                        <p style={{ fontSize: 11, color: '#8a9fc4' }}>{b.dentistTitle || ''}</p>
                      </td>
                      <td style={{ padding: '13px 16px', fontSize: 13, color: '#666' }}>{b.service}</td>
                      <td style={{ padding: '13px 16px', fontSize: 13, color: '#666' }}>{b.date}</td>
                      <td style={{ padding: '13px 16px', fontSize: 13, color: '#666' }}>{b.time}</td>
                      <td style={{ padding: '13px 16px' }}>
                        <span style={{ padding: '4px 12px', borderRadius: 99, border: `1px solid ${sc.border}`, color: sc.color, background: sc.bg, fontSize: 11, fontWeight: 600, textTransform: 'capitalize' }}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {filtered.length > 0 && (
              <div style={{ padding: '12px 16px', background: '#f8f9fc', borderTop: '1px solid #f0f2f5' }}>
                <p style={{ fontSize: 12, color: '#8a9fc4' }}>
                  Showing <span style={{ fontWeight: 600, color: '#0d1b3e' }}>{filtered.length}</span> of <span style={{ fontWeight: 600, color: '#0d1b3e' }}>{bookings.length}</span> appointments
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}