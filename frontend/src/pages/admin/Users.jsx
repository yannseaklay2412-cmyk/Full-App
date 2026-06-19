import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../config/supabaseClient.js'


const API = 'http://localhost:5000'

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

export default function Users() {
  const navigate = useNavigate()
  const [users, setUsers]       = useState([])
  const [search, setSearch]     = useState('')
  const [filter, setFilter]     = useState('all') // all | banned
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [deleting, setDeleting] = useState(null) // user id being deleted
  const [confirmId, setConfirmId] = useState(null) // user id pending confirm

  // ── Fetch users from backend ──────────────────────────────────────────────
   const fetchUsers = async () => {
  setLoading(true)
  setError(null)
  try {
    const { data: { session } } = await supabase.auth.getSession()
    const token = session?.access_token

    const res = await fetch(`${API}/api/patients`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) throw new Error(`Server error: ${res.status}`)
    const data = await res.json()
    setUsers(Array.isArray(data) ? data : (data.data ?? []))
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

  useEffect(() => { fetchUsers() }, [])

const handleBan = async (userId) => {
  setDeleting(userId)
  try {
    const { data: { session } } = await supabase.auth.getSession()
    const token = session?.access_token

    const res = await fetch(`${API}/api/patients/${userId}/ban`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) throw new Error(`Failed to ban: ${res.status}`)

    // Update status locally — no need to refetch
    setUsers(prev => prev.map(u =>
      u.id === userId ? { ...u, is_banned: true } : u
    ))
  } catch (err) {
    alert(err.message)
  } finally {
    setDeleting(null)
    setConfirmId(null)
  }
}

  // ── Filtering ─────────────────────────────────────────────────────────────
  const filtered = users
    .filter(u => {
      if (filter === 'banned') return u.is_banned === true || u.status === 'banned'
      return true // 'all' shows every user including banned
    })
    .filter(u =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
    )

  const stats = {
    total:  users.length,
    banned: users.filter(u => u.is_banned === true || u.status === 'banned').length,
  }

  const navItem = (item) => ({
    padding: '11px 20px',
    fontSize: 13,
    cursor: 'pointer',
    transition: 'all 0.2s',
    background: window.location.pathname === item.path ? 'rgba(78,205,196,0.1)' : 'transparent',
    borderLeft: window.location.pathname === item.path ? '3px solid #4ecdc4' : '3px solid transparent',
    color: window.location.pathname === item.path ? '#4ecdc4' : '#8a9fc4',
  })

  // ── Confirm dialog ────────────────────────────────────────────────────────
  const ConfirmModal = ({ userId, userName }) => (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', width: 340, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', textAlign: 'center' }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,107,107,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="2">
  <circle cx="12" cy="12" r="10"/>
  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
</svg>
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d1b3e', marginBottom: 8 }}>Ban Patient?</h3>
        <p style={{ fontSize: 13, color: '#8a9fc4', marginBottom: 24, lineHeight: 1.5 }}>
              You are about to ban <strong style={{ color: '#0d1b3e' }}>{userName}</strong>. They will no longer be able to log in.
            </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => setConfirmId(null)}
            style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: '1px solid #e0e4ea', background: '#f8f9fc', color: '#0d1b3e', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            Cancel
          </button>
          <button onClick={() => handleBan(userId)} disabled={deleting === userId}
            style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: 'none', background: '#ff6b6b', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", opacity: deleting === userId ? 0.7 : 1 }}>
            {deleting === userId ? 'Banning…' : 'Yes,Ban'}
          </button>
        </div>
      </div>
    </div>
  )

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
          <p style={SIDEBAR.subBot}>Home / Record</p>
        </div>
        {sidebarItems.map(item => (
          <div key={item.path} onClick={() => navigate(item.path)} style={navItem(item)}>
            {item.label}
          </div>
        ))}
        <div style={SIDEBAR.logout}>
          <button onClick={() => { localStorage.removeItem('token'); navigate('/login') }} style={SIDEBAR.logBtn}>
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
            <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1b3e' }}>Home / Record</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={fetchUsers}
              style={{ background: 'rgba(78,205,196,0.1)', border: '1px solid #4ecdc4', color: '#4ecdc4', padding: '7px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              ↻ Refresh
            </button>
            <button onClick={() => navigate('/admin')}
              style={{ background: '#0d1b3e', border: 'none', color: '#fff', padding: '7px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              ← Back
            </button>
          </div>
        </div>

        <div style={{ flex: 1, padding: 24, overflow: 'auto' }}>

          {/* STAT CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
            {[
              { label: 'Total Patients', num: stats.total,               color: '#7c3aed' },
              { label: 'All Users',      num: stats.total - stats.banned, color: '#4ecdc4' },
              { label: 'Banned',         num: stats.banned,              color: '#ff6b6b' },
            ].map((s, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '16px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', background: s.color }} />
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
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name or email..."
                style={{ background: 'none', border: 'none', outline: 'none', fontSize: 13, color: '#0d1b3e', width: '100%', fontFamily: "'DM Sans', sans-serif" }}
              />
            </div>
            {/* Filter tabs: All Users | Banned */}
            <div style={{ display: 'flex', background: '#fff', border: '1px solid #e0e4ea', borderRadius: 10, padding: 4, gap: 4 }}>
              {[
                { key: 'all',    label: 'All Users' },
                { key: 'banned', label: 'Banned'    },
              ].map(f => (
                <button key={f.key} onClick={() => setFilter(f.key)}
                  style={{
                    padding: '7px 16px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
                    background: filter === f.key ? (f.key === 'banned' ? '#ff6b6b' : '#0d1b3e') : 'transparent',
                    color:      filter === f.key ? '#fff' : '#8a9fc4',
                  }}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* LOADING / ERROR */}
          {loading && (
            <div style={{ background: '#fff', borderRadius: 14, padding: 48, textAlign: 'center', color: '#8a9fc4', fontSize: 14 }}>
              Loading patients…
            </div>
          )}
          {error && !loading && (
            <div style={{ background: '#fff', borderRadius: 14, padding: 24, textAlign: 'center', color: '#ff6b6b', fontSize: 14 }}>
              ⚠ {error} — <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={fetchUsers}>Retry</span>
            </div>
          )}

          {/* TABLE */}
          {!loading && !error && (
            <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8f9fc' }}>
                    {['#', 'Patient', 'Email', 'Appointments', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '13px 16px', textAlign: 'left', fontSize: 11, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: 48, textAlign: 'center', color: '#8a9fc4', fontSize: 14 }}>
                        {users.length === 0 ? 'No registered patients yet' : 'No results found'}
                      </td>
                    </tr>
                  ) : filtered.map((u, i) => {
                    const isBanned     = u.is_banned === true || u.status === 'banned'
                    const appointCount = u.appointment_count ?? u.appointments?.length ?? 0
                    return (
                      <tr key={u.id} style={{ borderBottom: '1px solid #f0f2f5', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#fafbfc'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>

                        <td style={{ padding: '13px 16px', fontSize: 12, color: '#8a9fc4' }}>{i + 1}</td>

                        {/* Name + initials */}
                        <td style={{ padding: '13px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 34, height: 34, borderRadius: '50%', background: isBanned ? 'rgba(255,107,107,0.1)' : '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: isBanned ? '#ff6b6b' : '#0d1b3e', flexShrink: 0 }}>
                              {u.name?.charAt(0).toUpperCase()}
                            </div>
                            <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1b3e' }}>{u.name}</p>
                          </div>
                        </td>

                        {/* Email */}
                        <td style={{ padding: '13px 16px', fontSize: 13, color: '#666' }}>{u.email}</td>

                        {/* Appointment count */}
                        <td style={{ padding: '13px 16px' }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#0d1b3e' }}>{appointCount}</span>
                          <span style={{ fontSize: 11, color: '#8a9fc4', marginLeft: 4 }}>
                            {appointCount === 1 ? 'visit' : 'visits'}
                          </span>
                        </td>

                        {/* Status */}
                        <td style={{ padding: '13px 16px' }}>
                          <span style={{
                            padding: '4px 12px', borderRadius: 99, fontSize: 11, fontWeight: 600,
                            border:      `1px solid ${isBanned ? 'rgba(255,107,107,0.4)' : '#4ecdc4'}`,
                            color:       isBanned ? '#ff6b6b' : '#4ecdc4',
                            background:  isBanned ? 'rgba(255,107,107,0.08)' : 'rgba(78,205,196,0.08)',
                          }}>
                            {isBanned ? 'Banned' : 'Active'}
                          </span>
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '13px 16px' }}>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={() => navigate(`/admin/users/${u.id}`)}
                              style={{ background: 'rgba(78,205,196,0.1)', border: '1px solid #4ecdc4', color: '#4ecdc4', padding: '5px 14px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
                              View
                            </button>
                            <button onClick={() => setConfirmId(u.id)}
                              style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.4)', color: '#ff6b6b', padding: '5px 14px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
                              Delete
                            </button>
                          </div>
                        </td>

                      </tr>
                    )
                  })}
                </tbody>
              </table>

              {/* TABLE FOOTER */}
              {filtered.length > 0 && (
                <div style={{ padding: '12px 16px', background: '#f8f9fc', borderTop: '1px solid #f0f2f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: 12, color: '#8a9fc4' }}>
                    Showing <span style={{ fontWeight: 600, color: '#0d1b3e' }}>{filtered.length}</span> of <span style={{ fontWeight: 600, color: '#0d1b3e' }}>{users.length}</span> patients
                  </p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, border: '1px solid rgba(78,205,196,0.4)', color: '#4ecdc4', fontWeight: 600 }}>
                      All: {stats.total - stats.banned}
                    </span>
                    <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, border: '1px solid rgba(255,107,107,0.4)', color: '#ff6b6b', fontWeight: 600 }}>
                      Banned: {stats.banned}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* ── CONFIRM DELETE MODAL ── */}
      {confirmId && (() => {
        const u = users.find(x => x.id === confirmId)
        return u ? <ConfirmModal userId={u.id} userName={u.name} /> : null
      })()}

    </div>
  )
}