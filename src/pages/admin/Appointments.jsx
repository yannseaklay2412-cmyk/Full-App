import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Appointments() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [filter, setFilter]     = useState('All')
  const [search, setSearch]     = useState('')

  const loadData = () => {
    setBookings(JSON.parse(localStorage.getItem('bookings') || '[]'))
  }

  useEffect(() => {
    loadData()
    window.addEventListener('storage', loadData)
    return () => window.removeEventListener('storage', loadData)
  }, [])

  const updateStatus = (id, status) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b)
    localStorage.setItem('bookings', JSON.stringify(updated))
    setBookings(updated)
  }

  // ✅ FIX: All status checks now use Capital letters
  const filtered = bookings
    .filter(b => filter === 'All' || b.status === filter)
    .filter(b =>
      b.userName?.toLowerCase().includes(search.toLowerCase()) ||
      b.dentistName?.toLowerCase().includes(search.toLowerCase())
    )

  const statusColor = {
    Pending:   '#f5c842',
    Confirmed: '#4ecdc4',
    Cancelled: '#ff6b6b',
  }

  const sidebarItems = [
    { label: 'Dashboard',   path: '/admin'              },
    { label: 'Schedule',    path: '/admin/schedule'     },
    { label: 'Employees',   path: '/admin/dentists'     },
    { label: 'Appointment', path: '/admin/appointments' },
    { label: 'Record',      path: '/admin/users'        },
    { label: 'Setting',     path: '/admin/reports'      },
  ]

  // ✅ FIX: Stats now use Capital letters
  const stats = {
    total:     bookings.length,
    pending:   bookings.filter(b => b.status === 'Pending').length,
    confirmed: bookings.filter(b => b.status === 'Confirmed').length,
    cancelled: bookings.filter(b => b.status === 'Cancelled').length,
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", background: '#f0f2f5' }}>

      {/* ── SIDEBAR ── */}
      <aside style={{ width: 180, background: '#0d1b3e', display: 'flex', flexDirection: 'column', flexShrink: 0, paddingBottom: 24 }}>
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #243560' }}>
          <div style={{ background: '#4ecdc4', borderRadius: 10, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0d1b3e' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8 2 5 5 5 9c0 2 .5 4 1.5 5.5L8 20h8l1.5-5.5C18.5 13 19 11 19 9c0-4-3-7-7-7z"/>
            </svg>
          </div>
        </div>
        <div style={{ padding: '14px 20px 10px', borderBottom: '1px solid #243560' }}>
          <p style={{ fontSize: 10, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>Dashboard</p>
          <p style={{ fontSize: 11, color: '#4ecdc4', fontWeight: 500 }}>Home / Appointment</p>
        </div>
        {sidebarItems.map(item => (
          <div key={item.path} onClick={() => navigate(item.path)}
            style={{ padding: '11px 20px', fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
              background: window.location.pathname === item.path ? 'rgba(78,205,196,0.1)' : 'transparent',
              borderLeft: window.location.pathname === item.path ? '3px solid #4ecdc4' : '3px solid transparent',
              color: window.location.pathname === item.path ? '#4ecdc4' : '#8a9fc4' }}>
            {item.label}
          </div>
        ))}
        <div style={{ marginTop: 'auto', padding: '0 16px' }}>
          <button onClick={() => { localStorage.removeItem('currentUser'); navigate('/login') }}
            style={{ width: '100%', background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.25)', color: '#ff6b6b', padding: 9, borderRadius: 8, fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
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
            <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1b3e' }}>Home / Appointment</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={loadData}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f5f6fa', border: '1px solid #e0e4ea', color: '#0d1b3e', padding: '7px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10"/>
                <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
              </svg>
              Refresh
            </button>
            <button onClick={() => navigate('/admin')}
              style={{ background: '#0d1b3e', border: 'none', color: '#fff', padding: '7px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              ← Back
            </button>
          </div>
        </div>

        <div style={{ flex: 1, padding: 24, overflow: 'auto' }}>

          {/* STAT CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
            {[
              { label: 'Total',     num: stats.total,     color: '#7c3aed' },
              { label: 'Pending',   num: stats.pending,   color: '#f5c842' },
              { label: 'Confirmed', num: stats.confirmed, color: '#4ecdc4' },
              { label: 'Cancelled', num: stats.cancelled, color: '#ff6b6b' },
            ].map((s, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '16px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', background: s.color }}></div>
                </div>
                <div>
                  <p style={{ fontSize: 11, color: '#8a9fc4', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.label}</p>
                  <h3 style={{ fontSize: 24, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.num}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* SEARCH + FILTER */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #e0e4ea', borderRadius: 10, padding: '9px 14px', flex: 1, minWidth: 200 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8a9fc4" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search patient or dentist..."
                style={{ background: 'none', border: 'none', outline: 'none', fontSize: 13, color: '#0d1b3e', width: '100%', fontFamily: "'DM Sans', sans-serif" }}
              />
            </div>
            {/* ✅ FIX: Filter tabs now use Capital letters */}
            <div style={{ display: 'flex', background: '#fff', border: '1px solid #e0e4ea', borderRadius: 10, padding: 4, gap: 4 }}>
              {['All', 'Pending', 'Confirmed', 'Cancelled'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  style={{ padding: '7px 16px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", textTransform: 'capitalize', transition: 'all 0.2s',
                    background: filter === f ? '#0d1b3e' : 'transparent',
                    color: filter === f ? '#fff' : '#8a9fc4' }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* TABLE */}
          <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fc' }}>
                  {['#', 'Patient', 'Dentist', 'Date', 'Time', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '13px 16px', textAlign: 'left', fontSize: 11, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: 48, textAlign: 'center', color: '#8a9fc4', fontSize: 14 }}>
                      {search || filter !== 'All' ? 'No results found' : 'No appointments yet'}
                    </td>
                  </tr>
                ) : filtered.map((b, i) => (
                  <tr key={b.id} style={{ borderBottom: '1px solid #f0f2f5', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#fafbfc'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '13px 16px', fontSize: 12, color: '#8a9fc4' }}>{i + 1}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#0d1b3e', flexShrink: 0 }}>
                          {b.userName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1b3e', marginBottom: 1 }}>{b.userName}</p>
                          <p style={{ fontSize: 11, color: '#8a9fc4' }}>{b.userEmail || ''}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <p style={{ fontSize: 13, color: '#0d1b3e', fontWeight: 500, marginBottom: 1 }}>{b.dentistName}</p>
                      <p style={{ fontSize: 11, color: '#8a9fc4' }}>{b.dentistTitle || ''}</p>
                    </td>
                    <td style={{ padding: '13px 16px', fontSize: 13, color: '#666' }}>{b.date}</td>
                    <td style={{ padding: '13px 16px', fontSize: 13, color: '#666' }}>{b.time}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ padding: '4px 12px', borderRadius: 99, border: `1px solid ${statusColor[b.status] || '#8a9fc4'}`, color: statusColor[b.status] || '#8a9fc4', fontSize: 11, fontWeight: 600 }}>
                        {b.status}
                      </span>
                    </td>
                    {/* ✅ FIX: Action buttons now use Capital letters */}
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {b.status === 'Pending' && (
                          <button onClick={() => updateStatus(b.id, 'Confirmed')}
                            style={{ background: 'rgba(78,205,196,0.1)', border: '1px solid #4ecdc4', color: '#4ecdc4', padding: '5px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
                            Confirm ✓
                          </button>
                        )}
                        {b.status === 'Confirmed' && (
                          <button onClick={() => updateStatus(b.id, 'Pending')}
                            style={{ background: 'rgba(245,200,66,0.1)', border: '1px solid #f5c842', color: '#f5c842', padding: '5px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
                            Pending
                          </button>
                        )}
                        {b.status !== 'Cancelled' && (
                          <button onClick={() => updateStatus(b.id, 'Cancelled')}
                            style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.3)', color: '#ff6b6b', padding: '5px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
                            Cancel
                          </button>
                        )}
                        {b.status === 'Cancelled' && (
                          <button onClick={() => updateStatus(b.id, 'Pending')}
                            style={{ background: '#f8f9fc', border: '1px solid #e0e4ea', color: '#666', padding: '5px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
                            Restore
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* TABLE FOOTER */}
            {filtered.length > 0 && (
              <div style={{ padding: '12px 16px', background: '#f8f9fc', borderTop: '1px solid #f0f2f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: 12, color: '#8a9fc4' }}>
                  Showing <span style={{ fontWeight: 600, color: '#0d1b3e' }}>{filtered.length}</span> of <span style={{ fontWeight: 600, color: '#0d1b3e' }}>{bookings.length}</span> appointments
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[
                    { label: 'Confirmed', count: stats.confirmed, color: '#4ecdc4' },
                    { label: 'Pending',   count: stats.pending,   color: '#f5c842' },
                    { label: 'Cancelled', count: stats.cancelled, color: '#ff6b6b' },
                  ].map(s => (
                    <span key={s.label} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, border: `1px solid ${s.color}40`, color: s.color, fontWeight: 600 }}>
                      {s.label}: {s.count}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}