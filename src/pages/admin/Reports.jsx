import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const sidebarItems = [
  { label: 'Dashboard',   path: '/admin'              },
  { label: 'Schedule',    path: '/admin/schedule'     },
  { label: 'Employees',   path: '/admin/dentists'     },
  { label: 'Appointment', path: '/admin/appointments' },
  { label: 'Record',      path: '/admin/users'        },
  { label: 'Setting',     path: '/admin/reports'      },
]

const SIDEBAR = {
  wrap:    { width: 180, background: '#0d1b3e', display: 'flex', flexDirection: 'column', flexShrink: 0, paddingBottom: 24 },
  logo:    { padding: '20px 20px 16px', borderBottom: '1px solid #243560' },
  logoBox: { background: '#4ecdc4', borderRadius: 10, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0d1b3e' },
  sub:     { padding: '14px 20px 10px', borderBottom: '1px solid #243560' },
  subTop:  { fontSize: 10, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 },
  subBot:  { fontSize: 11, color: '#4ecdc4', fontWeight: 500 },
  logout:  { marginTop: 'auto', padding: '0 16px' },
  logBtn:  { width: '100%', background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.25)', color: '#ff6b6b', padding: 9, borderRadius: 8, fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" },
}

export default function Reports() {
  const navigate = useNavigate()
  const [bookings, setBookings]   = useState([])
  const [users, setUsers]         = useState([])
  const [dentists, setDentists]   = useState([])

  useEffect(() => {
    setBookings(JSON.parse(localStorage.getItem('bookings') || '[]'))
    setUsers(JSON.parse(localStorage.getItem('users')    || '[]'))
    setDentists(JSON.parse(localStorage.getItem('dentists') || '[]'))
  }, [])

  const navItem = (item) => ({
    padding: '11px 20px', fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
    background: window.location.pathname === item.path ? 'rgba(78,205,196,0.1)' : 'transparent',
    borderLeft: window.location.pathname === item.path ? '3px solid #4ecdc4' : '3px solid transparent',
    color:      window.location.pathname === item.path ? '#4ecdc4' : '#8a9fc4',
  })

  const today     = new Date().toISOString().split('T')[0]
  const thisMonth = today.slice(0, 7) // 'YYYY-MM'

  // ── Summary stats ──
  const stats = {
    totalBookings:   bookings.length,
    totalPatients:   users.length,
    totalDentists:   dentists.length,
    todayBookings:   bookings.filter(b => b.date === today).length,
    confirmed:       bookings.filter(b => ['Confirmed','confirmed'].includes(b.status)).length,
    pending:         bookings.filter(b => ['Pending','pending'].includes(b.status)).length,
    cancelled:       bookings.filter(b => ['Cancelled','cancelled'].includes(b.status)).length,
    monthBookings:   bookings.filter(b => b.date?.startsWith(thisMonth)).length,
  }

  // ── Bookings per dentist ──
  const byDentist = dentists.map(d => {
    const count = bookings.filter(b => b.dentistId === d.id || b.dentistName === d.name).length
    return { name: d.name, title: d.title, count }
  }).sort((a, b) => b.count - a.count)

  // ── Bookings per service ──
  const serviceMap = {}
  bookings.forEach(b => {
    if (!b.service) return
    serviceMap[b.service] = (serviceMap[b.service] || 0) + 1
  })
  const byService = Object.entries(serviceMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)

  // ── Last 6 months breakdown ──
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date()
    d.setMonth(d.getMonth() - (5 - i))
    const key   = d.toISOString().slice(0, 7)
    const label = d.toLocaleString('default', { month: 'short', year: '2-digit' })
    const count = bookings.filter(b => b.date?.startsWith(key)).length
    return { key, label, count }
  })
  const maxMonth = Math.max(...last6Months.map(m => m.count), 1)

  // ── Status rate ──
  const total = stats.totalBookings || 1
  const confirmRate  = Math.round((stats.confirmed / total) * 100)
  const pendingRate  = Math.round((stats.pending   / total) * 100)
  const cancelRate   = Math.round((stats.cancelled / total) * 100)

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
          <p style={SIDEBAR.subBot}>Home / Setting</p>
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
            <p style={{ fontSize: 11, color: '#8a9fc4' }}>Dashboard</p>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1b3e' }}>Home / Reports & Settings</p>
          </div>
          <button onClick={() => navigate('/admin')}
            style={{ background: '#0d1b3e', border: 'none', color: '#fff', padding: '7px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            ← Back
          </button>
        </div>

        <div style={{ flex: 1, padding: 24, overflow: 'auto' }}>

          {/* ── TOP STAT CARDS ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
            {[
              { label: 'Total Bookings',  num: stats.totalBookings, color: '#7c3aed', icon: '📅' },
              { label: 'Total Patients',  num: stats.totalPatients, color: '#4ecdc4', icon: '👤' },
              { label: 'Total Dentists',  num: stats.totalDentists, color: '#f5c842', icon: '🦷' },
              { label: 'Today\'s Visits', num: stats.todayBookings, color: '#ff6b6b', icon: '📆' },
            ].map((s, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '16px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                  {s.icon}
                </div>
                <div>
                  <p style={{ fontSize: 11, color: '#8a9fc4', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.label}</p>
                  <h3 style={{ fontSize: 26, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.num}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* ── MAIN GRID ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>

            {/* Booking Status Breakdown */}
            <div style={{ background: '#fff', borderRadius: 14, padding: '20px 24px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0d1b3e', marginBottom: 20 }}>Booking Status</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[
                  { label: 'Confirmed', count: stats.confirmed, rate: confirmRate, color: '#4ecdc4' },
                  { label: 'Pending',   count: stats.pending,   rate: pendingRate, color: '#f5c842' },
                  { label: 'Cancelled', count: stats.cancelled, rate: cancelRate,  color: '#ff6b6b' },
                ].map(s => (
                  <div key={s.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 13, color: '#0d1b3e', fontWeight: 500 }}>{s.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>
                        {s.count} <span style={{ color: '#8a9fc4', fontWeight: 400 }}>({s.rate}%)</span>
                      </span>
                    </div>
                    <div style={{ height: 8, background: '#f0f2f5', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${s.rate}%`, background: s.color, borderRadius: 99, transition: 'width 0.8s ease' }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary row */}
              <div style={{ display: 'flex', gap: 10, marginTop: 20, paddingTop: 16, borderTop: '1px solid #f0f2f5' }}>
                <div style={{ flex: 1, textAlign: 'center', padding: '10px 0', background: '#f8f9fc', borderRadius: 10 }}>
                  <p style={{ fontSize: 18, fontWeight: 700, color: '#4ecdc4' }}>{stats.confirmed}</p>
                  <p style={{ fontSize: 11, color: '#8a9fc4' }}>Confirmed</p>
                </div>
                <div style={{ flex: 1, textAlign: 'center', padding: '10px 0', background: '#f8f9fc', borderRadius: 10 }}>
                  <p style={{ fontSize: 18, fontWeight: 700, color: '#f5c842' }}>{stats.pending}</p>
                  <p style={{ fontSize: 11, color: '#8a9fc4' }}>Pending</p>
                </div>
                <div style={{ flex: 1, textAlign: 'center', padding: '10px 0', background: '#f8f9fc', borderRadius: 10 }}>
                  <p style={{ fontSize: 18, fontWeight: 700, color: '#ff6b6b' }}>{stats.cancelled}</p>
                  <p style={{ fontSize: 11, color: '#8a9fc4' }}>Cancelled</p>
                </div>
              </div>
            </div>

            {/* Monthly Bookings Bar Chart */}
            <div style={{ background: '#fff', borderRadius: 14, padding: '20px 24px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0d1b3e' }}>Monthly Bookings</h3>
                <span style={{ fontSize: 12, color: '#8a9fc4' }}>Last 6 months</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 120 }}>
                {last6Months.map((m, i) => {
                  const isCurrentMonth = m.key === thisMonth
                  const heightPct = maxMonth > 0 ? (m.count / maxMonth) * 100 : 0
                  return (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: isCurrentMonth ? '#4ecdc4' : '#8a9fc4' }}>{m.count}</span>
                      <div style={{ width: '100%', borderRadius: '4px 4px 0 0', transition: 'height 0.6s ease',
                        height: m.count === 0 ? 4 : `${Math.max(heightPct, 8)}%`,
                        background: isCurrentMonth
                          ? 'linear-gradient(180deg, #4ecdc4, #2bb5ac)'
                          : 'linear-gradient(180deg, #e0e4ea, #d0d4dc)' }}
                      />
                      <span style={{ fontSize: 10, color: '#8a9fc4', whiteSpace: 'nowrap' }}>{m.label}</span>
                    </div>
                  )
                })}
              </div>
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #f0f2f5', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 11, color: '#8a9fc4' }}>This Month</p>
                  <p style={{ fontSize: 18, fontWeight: 700, color: '#4ecdc4' }}>{stats.monthBookings}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 11, color: '#8a9fc4' }}>All Time</p>
                  <p style={{ fontSize: 18, fontWeight: 700, color: '#0d1b3e' }}>{stats.totalBookings}</p>
                </div>
              </div>
            </div>

          </div>

          {/* ── BOTTOM GRID ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

            {/* Top Dentists */}
            <div style={{ background: '#fff', borderRadius: 14, padding: '20px 24px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0d1b3e', marginBottom: 16 }}>Dentist Performance</h3>
              {byDentist.length === 0 ? (
                <p style={{ color: '#8a9fc4', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>No data yet</p>
              ) : byDentist.map((d, i) => {
                const pct = Math.round((d.count / (stats.totalBookings || 1)) * 100)
                const colors = ['#4ecdc4', '#7c3aed', '#f5c842', '#ff6b6b', '#8a9fc4']
                const color  = colors[i % colors.length]
                return (
                  <div key={d.name} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                      <div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#0d1b3e' }}>{d.name}</span>
                        <span style={{ fontSize: 11, color: '#8a9fc4', marginLeft: 6 }}>{d.title}</span>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color }}>
                        {d.count} <span style={{ color: '#8a9fc4', fontWeight: 400, fontSize: 11 }}>({pct}%)</span>
                      </span>
                    </div>
                    <div style={{ height: 6, background: '#f0f2f5', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 99, transition: 'width 0.8s ease' }} />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Popular Services */}
            <div style={{ background: '#fff', borderRadius: 14, padding: '20px 24px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0d1b3e', marginBottom: 16 }}>Popular Services</h3>
              {byService.length === 0 ? (
                <p style={{ color: '#8a9fc4', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>No data yet</p>
              ) : byService.map((s, i) => {
                const pct   = Math.round((s.count / (stats.totalBookings || 1)) * 100)
                const colors = ['#4ecdc4', '#7c3aed', '#f5c842', '#ff6b6b', '#8a9fc4', '#2bb5ac']
                const color  = colors[i % colors.length]
                return (
                  <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: i < byService.length - 1 ? '1px solid #f0f2f5' : 'none' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: 13, color: '#0d1b3e', fontWeight: 500 }}>{s.name}</span>
                    <div style={{ width: 80, height: 6, background: '#f0f2f5', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 99 }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color, minWidth: 28, textAlign: 'right' }}>{s.count}</span>
                  </div>
                )
              })}
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}