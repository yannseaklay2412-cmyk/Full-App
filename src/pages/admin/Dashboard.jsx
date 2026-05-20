// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import './Dashboard.css'

// export default function AdminDashboard() {
//   const navigate = useNavigate()
//   const [stats, setStats]       = useState({ users: 0, total: 0, pending: 0, confirmed: 0, cancelled: 0 })
//   const [upcoming, setUpcoming] = useState([])
//   const [dentists, setDentists] = useState([])
//   const [bookings, setBookings] = useState([])
//   const [currentMonth, setCurrentMonth] = useState(new Date())

//   useEffect(() => {
//     const users    = JSON.parse(localStorage.getItem('users')    || '[]')
//     const bks      = JSON.parse(localStorage.getItem('bookings') || '[]')
//     const dents    = JSON.parse(localStorage.getItem('dentists') || '[]')

//     if (dents.length === 0) {
//       const defaults = [
//         { id: 1, name: 'Dr. Yoo Rii',   title: 'Orthodontist',     exp: '12+ years specializing in braces and aligner therapy for all ages.' },
//         { id: 2, name: 'Dr. Jean Rill',  title: 'General Dentist',  exp: '12+ years specializing in braces and aligner therapy for all ages.' },
//         { id: 3, name: 'Dr. Yeon Rill',  title: 'Cosmetic Dentist', exp: '12+ years specializing in braces and aligner therapy for all ages.' },
//       ]
//       localStorage.setItem('dentists', JSON.stringify(defaults))
//       setDentists(defaults)
//     } else {
//       setDentists(dents)
//     }

//     setBookings(bks)
//     setStats({
//       users:     users.length,
//       total:     bks.length,
//       pending:   bks.filter(b => b.status === 'pending').length,
//       confirmed: bks.filter(b => b.status === 'confirmed').length,
//       cancelled: bks.filter(b => b.status === 'cancelled').length,
//     })

//     const today = new Date().toISOString().split('T')[0]
//     setUpcoming(
//       [...bks]
//         .filter(b => b.date >= today && b.status !== 'cancelled')
//         .sort((a, b) => a.date.localeCompare(b.date))
//         .slice(0, 4)
//     )
//   }, [])

//   // Calendar
//   const year        = currentMonth.getFullYear()
//   const month       = currentMonth.getMonth()
//   const firstDay    = new Date(year, month, 1).getDay()
//   const daysInMonth = new Date(year, month + 1, 0).getDate()
//   const monthName   = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })
//   const todayDate   = new Date().getDate()
//   const todayMonth  = new Date().getMonth()
//   const todayYear   = new Date().getFullYear()
//   const bookedDates = bookings.map(b => b.date)
//   const calendarDays = []
//   for (let i = 0; i < firstDay; i++) calendarDays.push(null)
//   for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d)

//   const statusColor = { pending: '#f5c842', confirmed: '#4ecdc4', cancelled: '#ff6b6b' }

//   const sidebarItems = [
//     { label: 'Dashboard',   path: '/admin'              },
//     { label: 'Schedule',    path: '/admin/schedule'     },
//     { label: 'Employees',   path: '/admin/dentists'     },
//     { label: 'Appointment', path: '/admin/appointments' },
//     { label: 'Record',      path: '/admin/users'        },
//     { label: 'Setting',     path: '/admin/reports'      },
//   ]

//   return (
//     <div className="ad-wrap">

//       {/* ── SIDEBAR ── */}
//       <aside className="ad-sidebar">
//         <div className="ad-sidebar-logo">
//           <div className="ad-logo-icon">
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path d="M12 2C8 2 5 5 5 9c0 2 .5 4 1.5 5.5L8 20h8l1.5-5.5C18.5 13 19 11 19 9c0-4-3-7-7-7z"/>
//             </svg>
//           </div>
//         </div>
//         <div className="ad-sidebar-label">
//           <p className="ad-sidebar-top">Dashboard</p>
//           <p className="ad-sidebar-sub">Home / Overview</p>
//         </div>
//         <nav className="ad-sidebar-nav">
//           {sidebarItems.map(item => (
//             <div
//               key={item.path}
//               className={`ad-nav-item ${window.location.pathname === item.path ? 'active' : ''}`}
//               onClick={() => navigate(item.path)}
//             >
//               {item.label}
//             </div>
//           ))}
//         </nav>
//         <button className="ad-logout-btn" onClick={() => { localStorage.removeItem('currentUser'); navigate('/login') }}>
//           Logout
//         </button>
//       </aside>

//       {/* ── CONTENT ── */}
//       <div className="ad-content">

//         {/* TOP BAR */}
//         <div className="ad-topbar">
//           <div className="ad-topbar-left">
//             <p className="ad-topbar-title">Dashboard</p>
//             <p className="ad-topbar-sub">Home / Overview</p>
//           </div>
//           <div className="ad-topbar-right">
//             <div className="ad-search">
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
//               </svg>
//               <input placeholder="Search..." />
//             </div>
//             <div className="ad-avatar">
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
//               </svg>
//             </div>
//             <button className="ad-signin-btn" onClick={() => { localStorage.removeItem('currentUser'); navigate('/login') }}>
//               Sign Out
//             </button>
//           </div>
//         </div>

//         {/* STAT CARDS ROW */}
//         <div className="ad-stat-row">
//           {[
//             { label: 'Total Patients',   num: stats.users,     color: '#4ecdc4', icon: (
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
//             )},
//             { label: 'Total Bookings',   num: stats.total,     color: '#7c3aed', icon: (
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
//             )},
//             { label: 'Pending',          num: stats.pending,   color: '#f5c842', icon: (
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
//             )},
//             { label: 'Confirmed',        num: stats.confirmed, color: '#4ecdc4', icon: (
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
//             )},
//             { label: 'Active Doctors',   num: dentists.length, color: '#ff6b6b', icon: (
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8 2 5 5 5 9c0 2 .5 4 1.5 5.5L8 20h8l1.5-5.5C18.5 13 19 11 19 9c0-4-3-7-7-7z"/></svg>
//             )},
//           ].map((s, i) => (
//             <div key={i} className="ad-stat-top-card">
//               <div className="ad-stat-top-icon" style={{ background: s.color + '18', color: s.color }}>{s.icon}</div>
//               <div>
//                 <p className="ad-stat-top-label">{s.label}</p>
//                 <h3 className="ad-stat-top-num" style={{ color: s.color }}>{s.num}</h3>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* MAIN GRID */}
//         <div className="ad-grid">

//           {/* ── COL LEFT ── */}
//           <div className="ad-col-left">

//             {/* Upcoming Appointments */}
//             <div className="ad-card">
//               <div className="ad-card-header">
//                 <h3>Upcoming Appointments</h3>
//                 <span className="ad-view-all" onClick={() => navigate('/admin/appointments')}>View All</span>
//               </div>
//               <div className="ad-appt-list">
//                 {upcoming.length === 0 ? (
//                   <div className="ad-empty">No upcoming appointments</div>
//                 ) : upcoming.map(b => (
//                   <div key={b.id} className="ad-appt-row">
//                     <div className="ad-appt-avatar">
//                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
//                       </svg>
//                     </div>
//                     <div className="ad-appt-info">
//                       <p className="ad-appt-name">{b.userName}</p>
//                       <p className="ad-appt-time">{b.date} · {b.time}</p>
//                     </div>
//                     <span className="ad-appt-type">{b.dentistTitle || 'Check Up'}</span>
//                     <span className="ad-appt-status" style={{ color: statusColor[b.status], borderColor: statusColor[b.status] }}>
//                       {b.status}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Booking Status Progress */}
//             <div className="ad-card">
//               <div className="ad-card-header">
//                 <h3>Booking Status</h3>
//                 <span className="ad-view-all" onClick={() => navigate('/admin/appointments')}>Details</span>
//               </div>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//                 {[
//                   { label: 'Confirmed', count: stats.confirmed, color: '#4ecdc4' },
//                   { label: 'Pending',   count: stats.pending,   color: '#f5c842' },
//                   { label: 'Cancelled', count: stats.cancelled, color: '#ff6b6b' },
//                 ].map(s => (
//                   <div key={s.label}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
//                       <span style={{ fontSize: 13, color: '#0d1b3e', fontWeight: 500 }}>{s.label}</span>
//                       <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.count} <span style={{ color: '#8a9fc4', fontWeight: 400 }}>/ {stats.total}</span></span>
//                     </div>
//                     <div style={{ height: 8, background: '#f0f2f5', borderRadius: 99, overflow: 'hidden' }}>
//                       <div style={{ height: '100%', width: stats.total > 0 ? `${Math.round((s.count / stats.total) * 100)}%` : '0%', background: s.color, borderRadius: 99, transition: 'width 0.8s ease' }}></div>
//                     </div>
//                     <p style={{ fontSize: 11, color: '#8a9fc4', marginTop: 4 }}>
//                       {stats.total > 0 ? Math.round((s.count / stats.total) * 100) : 0}% of total bookings
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Recent Activity */}
//             <div className="ad-card">
//               <div className="ad-card-header">
//                 <h3>Recent Activity</h3>
//               </div>
//               {bookings.length === 0 ? (
//                 <div className="ad-empty">No activity yet</div>
//               ) : (
//                 <div style={{ display: 'flex', flexDirection: 'column' }}>
//                   {[...bookings].sort((a,b) => b.id - a.id).slice(0,5).map((b, i, arr) => (
//                     <div key={b.id} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px solid #f0f2f5' : 'none' }}>
//                       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
//                         <div style={{ width: 10, height: 10, borderRadius: '50%', background: statusColor[b.status], marginTop: 3 }}></div>
//                         {i < arr.length - 1 && <div style={{ width: 2, height: '100%', minHeight: 24, background: '#f0f2f5', marginTop: 4 }}></div>}
//                       </div>
//                       <div style={{ flex: 1 }}>
//                         <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1b3e', marginBottom: 2 }}>
//                           {b.userName} booked with {b.dentistName}
//                         </p>
//                         <p style={{ fontSize: 11, color: '#8a9fc4' }}>{b.date} · {b.time}</p>
//                       </div>
//                       <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 99, border: `1px solid ${statusColor[b.status]}`, color: statusColor[b.status], fontWeight: 600, textTransform: 'capitalize', alignSelf: 'flex-start', flexShrink: 0 }}>
//                         {b.status}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Quick Actions */}
//             <div className="ad-card">
//               <div className="ad-card-header">
//                 <h3>Quick Actions</h3>
//               </div>
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
//                 {[
//                   { label: 'Appointments', sub: `${stats.pending} pending`,   path: '/admin/appointments', color: '#4ecdc4' },
//                   { label: 'Dentists',     sub: `${dentists.length} doctors`, path: '/admin/dentists',     color: '#7c3aed' },
//                   { label: 'Patients',     sub: `${stats.users} registered`,  path: '/admin/users',        color: '#f5c842' },
//                   { label: 'Schedule',     sub: 'Manage slots',               path: '/admin/schedule',     color: '#ff6b6b' },
//                   { label: 'Reports',      sub: 'View stats',                 path: '/admin/reports',      color: '#4ecdc4' },
//                 ].map((q, i) => (
//                   <div key={i} onClick={() => navigate(q.path)}
//                     style={{ background: '#f8f9fc', borderRadius: 10, padding: 14, cursor: 'pointer', transition: 'all 0.2s', border: '1px solid #f0f2f5' }}
//                     onMouseEnter={e => { e.currentTarget.style.background = '#f0f2f5'; e.currentTarget.style.borderColor = q.color + '60' }}
//                     onMouseLeave={e => { e.currentTarget.style.background = '#f8f9fc'; e.currentTarget.style.borderColor = '#f0f2f5' }}>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
//                       <div style={{ width: 8, height: 8, borderRadius: '50%', background: q.color }}></div>
//                       <span style={{ fontSize: 12, fontWeight: 700, color: '#0d1b3e' }}>{q.label}</span>
//                     </div>
//                     <p style={{ fontSize: 11, color: '#8a9fc4', paddingLeft: 14 }}>{q.sub}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//           </div>

//           {/* ── COL MID — Calendar ── */}
//           <div className="ad-col-mid">
//             <div className="ad-card ad-card-full">
//               <div className="ad-calendar-title">Calendar</div>
//               <div className="ad-cal-nav">
//                 <button onClick={() => setCurrentMonth(new Date(year, month - 1, 1))} className="ad-cal-arrow">‹</button>
//                 <span className="ad-cal-month">{monthName}</span>
//                 <button onClick={() => setCurrentMonth(new Date(year, month + 1, 1))} className="ad-cal-arrow">›</button>
//               </div>
//               <div className="ad-cal-grid">
//                 {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
//                   <div key={d} className="ad-cal-day-label">{d}</div>
//                 ))}
//                 {calendarDays.map((day, i) => {
//                   if (!day) return <div key={i}></div>
//                   const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
//                   const hasBooking = bookedDates.includes(dateStr)
//                   const isToday = day === todayDate && month === todayMonth && year === todayYear
//                   return (
//                     <div key={i} className={`ad-cal-day ${isToday ? 'today' : ''} ${hasBooking ? 'booked' : ''}`}>
//                       {day}
//                       {hasBooking && !isToday && <span className="ad-cal-dot"></span>}
//                     </div>
//                   )
//                 })}
//               </div>
//               <div className="ad-cal-legend">
//                 <div className="ad-legend-item">
//                   <div className="ad-legend-dot" style={{ background: '#0d1b3e' }}></div>
//                   <span>Today</span>
//                 </div>
//                 <div className="ad-legend-item">
//                   <div className="ad-legend-dot" style={{ background: '#4ecdc4' }}></div>
//                   <span>Booked</span>
//                 </div>
//               </div>
//             </div>

//             {/* Top Dentist */}
//             <div className="ad-card" style={{ marginTop: 20 }}>
//               <div className="ad-card-header">
//                 <h3>Top Dentist</h3>
//               </div>
//               {(() => {
//                 const byDentist = bookings.reduce((acc, b) => {
//                   acc[b.dentistName] = (acc[b.dentistName] || 0) + 1
//                   return acc
//                 }, {})
//                 const sorted = Object.entries(byDentist).sort((a,b) => b[1]-a[1]).slice(0,3)
//                 if (sorted.length === 0) return <div className="ad-empty">No data yet</div>
//                 return sorted.map(([name, count], i) => (
//                   <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < sorted.length - 1 ? '1px solid #f0f2f5' : 'none' }}>
//                     <div style={{ width: 28, height: 28, borderRadius: '50%', background: ['#4ecdc420','#7c3aed20','#f5c84220'][i], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: ['#4ecdc4','#7c3aed','#f5c842'][i], flexShrink: 0 }}>
//                       {i + 1}
//                     </div>
//                     <div style={{ flex: 1 }}>
//                       <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1b3e' }}>{name}</p>
//                       <p style={{ fontSize: 11, color: '#8a9fc4' }}>{count} appointments</p>
//                     </div>
//                     <div style={{ textAlign: 'right' }}>
//                       <span style={{ fontSize: 13, fontWeight: 700, color: '#4ecdc4' }}>{count}</span>
//                     </div>
//                   </div>
//                 ))
//               })()}
//             </div>

//           </div>

//           {/* ── COL RIGHT — Employees ── */}
//           <div className="ad-col-right">
//             <div className="ad-card ad-card-full">
//               <div className="ad-card-header">
//                 <h3>Employees</h3>
//                 <span className="ad-view-all" onClick={() => navigate('/admin/dentists')}>View All</span>
//               </div>
//               <div className="ad-emp-list">
//                 {dentists.slice(0, 3).map((d, i) => (
//                   <div key={d.id} className={`ad-emp-card ${i % 2 === 0 ? 'dark' : 'light'}`}>
//                     <div className="ad-emp-avatar">
//                       {d.photo ? (
//                         <img src={d.photo} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10 }} />
//                       ) : (
//                         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
//                           <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
//                         </svg>
//                       )}
//                     </div>
//                     <div className="ad-emp-info">
//                       <p className="ad-emp-name">{d.name}</p>
//                       <p className="ad-emp-title">{d.title}</p>
//                       <p className="ad-emp-desc">{d.exp}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Today Summary */}
//             <div className="ad-card" style={{ marginTop: 20 }}>
//               <div className="ad-card-header">
//                 <h3>Today</h3>
//               </div>
//               {(() => {
//                 const today = new Date().toISOString().split('T')[0]
//                 const todayBookings = bookings.filter(b => b.date === today)
//                 if (todayBookings.length === 0) return <div className="ad-empty">No appointments today</div>
//                 return todayBookings.map(b => (
//                   <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #f0f2f5' }}>
//                     <div style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor[b.status], flexShrink: 0 }}></div>
//                     <div style={{ flex: 1 }}>
//                       <p style={{ fontSize: 12, fontWeight: 600, color: '#0d1b3e' }}>{b.userName}</p>
//                       <p style={{ fontSize: 11, color: '#8a9fc4' }}>{b.time}</p>
//                     </div>
//                     <span style={{ fontSize: 10, color: statusColor[b.status], fontWeight: 600, textTransform: 'capitalize' }}>{b.status}</span>
//                   </div>
//                 ))
//               })()}
//             </div>

//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import { DataStorage } from '../../seeders/data' // ✅ seeder import

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [stats, setStats]       = useState({ users: 0, total: 0, pending: 0, confirmed: 0, cancelled: 0 })
  const [upcoming, setUpcoming] = useState([])
  const [dentists, setDentists] = useState([])
  const [bookings, setBookings] = useState([])
  const [currentMonth, setCurrentMonth] = useState(new Date())

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')    || '[]')
    const bks   = JSON.parse(localStorage.getItem('bookings') || '[]')
    const dents = JSON.parse(localStorage.getItem('dentists') || '[]')

    if (dents.length === 0) {
      // ✅ use seeder instead of hardcoded defaults
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
        .filter(b => b.date >= today && b.status !== 'cancelled')
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, 4)
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
    { label: 'Setting',     path: '/admin/reports'      },
  ]

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
                <h3>Upcoming Appointments</h3>
                <span className="ad-view-all" onClick={() => navigate('/admin/appointments')}>View All</span>
              </div>
              <div className="ad-appt-list">
                {upcoming.length === 0 ? (
                  <div className="ad-empty">No upcoming appointments</div>
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
              <div className="ad-card-header">
                <h3>Booking Status</h3>
                <span className="ad-view-all" onClick={() => navigate('/admin/appointments')}>Details</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: 'Confirmed', count: stats.confirmed, color: '#4ecdc4' },
                  { label: 'Pending',   count: stats.pending,   color: '#f5c842' },
                  { label: 'Cancelled', count: stats.cancelled, color: '#ff6b6b' },
                ].map(s => (
                  <div key={s.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 13, color: '#0d1b3e', fontWeight: 500 }}>{s.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.count} <span style={{ color: '#8a9fc4', fontWeight: 400 }}>/ {stats.total}</span></span>
                    </div>
                    <div style={{ height: 8, background: '#f0f2f5', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: stats.total > 0 ? `${Math.round((s.count / stats.total) * 100)}%` : '0%', background: s.color, borderRadius: 99, transition: 'width 0.8s ease' }}></div>
                    </div>
                    <p style={{ fontSize: 11, color: '#8a9fc4', marginTop: 4 }}>
                      {stats.total > 0 ? Math.round((s.count / stats.total) * 100) : 0}% of total bookings
                    </p>
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

            <div className="ad-card">
              <div className="ad-card-header"><h3>Quick Actions</h3></div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
                {[
                  { label: 'Appointments', sub: `${stats.pending} pending`,   path: '/admin/appointments', color: '#4ecdc4' },
                  { label: 'Dentists',     sub: `${dentists.length} doctors`, path: '/admin/dentists',     color: '#7c3aed' },
                  { label: 'Patients',     sub: `${stats.users} registered`,  path: '/admin/users',        color: '#f5c842' },
                  { label: 'Schedule',     sub: 'Manage slots',               path: '/admin/schedule',     color: '#ff6b6b' },
                  { label: 'Reports',      sub: 'View stats',                 path: '/admin/reports',      color: '#4ecdc4' },
                ].map((q, i) => (
                  <div key={i} onClick={() => navigate(q.path)}
                    style={{ background: '#f8f9fc', borderRadius: 10, padding: 14, cursor: 'pointer', transition: 'all 0.2s', border: '1px solid #f0f2f5' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#f0f2f5'; e.currentTarget.style.borderColor = q.color + '60' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#f8f9fc'; e.currentTarget.style.borderColor = '#f0f2f5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: q.color }}></div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#0d1b3e' }}>{q.label}</span>
                    </div>
                    <p style={{ fontSize: 11, color: '#8a9fc4', paddingLeft: 14 }}>{q.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="ad-col-mid">
            <div className="ad-card ad-card-full">
              <div className="ad-calendar-title">Calendar</div>
              <div className="ad-cal-nav">
                <button onClick={() => setCurrentMonth(new Date(year, month - 1, 1))} className="ad-cal-arrow">‹</button>
                <span className="ad-cal-month">{monthName}</span>
                <button onClick={() => setCurrentMonth(new Date(year, month + 1, 1))} className="ad-cal-arrow">›</button>
              </div>
              <div className="ad-cal-grid">
                {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                  <div key={d} className="ad-cal-day-label">{d}</div>
                ))}
                {calendarDays.map((day, i) => {
                  if (!day) return <div key={i}></div>
                  const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
                  const hasBooking = bookedDates.includes(dateStr)
                  const isToday = day === todayDate && month === todayMonth && year === todayYear
                  return (
                    <div key={i} className={`ad-cal-day ${isToday ? 'today' : ''} ${hasBooking ? 'booked' : ''}`}>
                      {day}
                      {hasBooking && !isToday && <span className="ad-cal-dot"></span>}
                    </div>
                  )
                })}
              </div>
              <div className="ad-cal-legend">
                <div className="ad-legend-item"><div className="ad-legend-dot" style={{ background: '#0d1b3e' }}></div><span>Today</span></div>
                <div className="ad-legend-item"><div className="ad-legend-dot" style={{ background: '#4ecdc4' }}></div><span>Booked</span></div>
              </div>
            </div>

            <div className="ad-card" style={{ marginTop: 20 }}>
              <div className="ad-card-header"><h3>Top Dentist</h3></div>
              {(() => {
                const byDentist = bookings.reduce((acc, b) => { acc[b.dentistName] = (acc[b.dentistName] || 0) + 1; return acc }, {})
                const sorted = Object.entries(byDentist).sort((a,b) => b[1]-a[1]).slice(0,3)
                if (sorted.length === 0) return <div className="ad-empty">No data yet</div>
                return sorted.map(([name, count], i) => (
                  <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < sorted.length - 1 ? '1px solid #f0f2f5' : 'none' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: ['#4ecdc420','#7c3aed20','#f5c84220'][i], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: ['#4ecdc4','#7c3aed','#f5c842'][i], flexShrink: 0 }}>{i + 1}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1b3e' }}>{name}</p>
                      <p style={{ fontSize: 11, color: '#8a9fc4' }}>{count} appointments</p>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#4ecdc4' }}>{count}</span>
                  </div>
                ))
              })()}
            </div>
          </div>

          <div className="ad-col-right">
            <div className="ad-card ad-card-full">
              <div className="ad-card-header">
                <h3>Employees</h3>
                <span className="ad-view-all" onClick={() => navigate('/admin/dentists')}>View All</span>
              </div>
              <div className="ad-emp-list">
                {dentists.slice(0, 3).map((d, i) => (
                  <div key={d.id} className={`ad-emp-card ${i % 2 === 0 ? 'dark' : 'light'}`}>
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
                      <p className="ad-emp-desc">{d.exp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ad-card" style={{ marginTop: 20 }}>
              <div className="ad-card-header"><h3>Today</h3></div>
              {(() => {
                const today = new Date().toISOString().split('T')[0]
                const todayBookings = bookings.filter(b => b.date === today)
                if (todayBookings.length === 0) return <div className="ad-empty">No appointments today</div>
                return todayBookings.map(b => (
                  <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #f0f2f5' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor[b.status], flexShrink: 0 }}></div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: '#0d1b3e' }}>{b.userName}</p>
                      <p style={{ fontSize: 11, color: '#8a9fc4' }}>{b.time}</p>
                    </div>
                    <span style={{ fontSize: 10, color: statusColor[b.status], fontWeight: 600, textTransform: 'capitalize' }}>{b.status}</span>
                  </div>
                ))
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}