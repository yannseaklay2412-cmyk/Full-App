import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'

export default function Users() {
  const navigate = useNavigate()
  const [users, setUsers]     = useState([])
  const [bookings, setBookings] = useState([])
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('all')

  useEffect(() => {
    const savedUsers    = JSON.parse(localStorage.getItem('users')    || '[]')
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    setUsers(savedUsers)
    setBookings(savedBookings)
  }, [])

  const getUserBookings = (email) =>
    bookings.filter(b => b.userEmail === email || b.email === email)

  const getUserStatus = (email) => {
    const userBookings = getUserBookings(email)
    if (userBookings.length === 0) return 'inactive'
    const hasUpcoming = userBookings.some(
      b => b.date >= new Date().toISOString().split('T')[0] && b.status !== 'Cancelled'
    )
    return hasUpcoming ? 'active' : 'inactive'
  }

  const filtered = users
    .filter(u => {
      if (filter === 'active')   return getUserStatus(u.email) === 'active'
      if (filter === 'inactive') return getUserStatus(u.email) === 'inactive'
      return true
    })
    .filter(u =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
    )

  const stats = {
    total:    users.length,
    active:   users.filter(u => getUserStatus(u.email) === 'active').length,
    inactive: users.filter(u => getUserStatus(u.email) === 'inactive').length,
  }

  const topBarRight = (
    <button onClick={() => navigate('/admin')}
      style={{ background: '#0d1b3e', border: 'none', color: '#fff', padding: '7px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
      ← Back
    </button>
  )

  return (
    <AdminLayout pageLabel="Record" topBarRight={topBarRight}>

      {/* STAT CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Patients', num: stats.total,    color: '#7c3aed' },
          { label: 'Active',         num: stats.active,   color: '#4ecdc4' },
          { label: 'Inactive',       num: stats.inactive, color: '#8a9fc4' },
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
        <div style={{ display: 'flex', background: '#fff', border: '1px solid #e0e4ea', borderRadius: 10, padding: 4, gap: 4 }}>
          {['all', 'active', 'inactive'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: '7px 16px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", textTransform: 'capitalize', transition: 'all 0.2s',
                background: filter === f ? '#0d1b3e' : 'transparent',
                color:      filter === f ? '#fff'    : '#8a9fc4' }}>
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
              const userBookings = getUserBookings(u.email)
              const status       = getUserStatus(u.email)
              return (
                <tr key={u.id} style={{ borderBottom: '1px solid #f0f2f5', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fafbfc'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>

                  <td style={{ padding: '13px 16px', fontSize: 12, color: '#8a9fc4' }}>{i + 1}</td>

                  <td style={{ padding: '13px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#0d1b3e', flexShrink: 0 }}>
                        {u.name?.charAt(0).toUpperCase()}
                      </div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1b3e' }}>{u.name}</p>
                    </div>
                  </td>

                  <td style={{ padding: '13px 16px', fontSize: 13, color: '#666' }}>{u.email}</td>

                  <td style={{ padding: '13px 16px' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#0d1b3e' }}>{userBookings.length}</span>
                    <span style={{ fontSize: 11, color: '#8a9fc4', marginLeft: 4 }}>
                      {userBookings.length === 1 ? 'visit' : 'visits'}
                    </span>
                  </td>

                  <td style={{ padding: '13px 16px' }}>
                    <span style={{
                      padding: '4px 12px', borderRadius: 99, fontSize: 11, fontWeight: 600,
                      border: `1px solid ${status === 'active' ? '#4ecdc4' : '#e0e4ea'}`,
                      color:      status === 'active' ? '#4ecdc4' : '#8a9fc4',
                      background: status === 'active' ? 'rgba(78,205,196,0.08)' : '#f8f9fc',
                    }}>
                      {status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>

                  <td style={{ padding: '13px 16px' }}>
                    <button onClick={() => navigate(`/admin/users/${u.id}`)}
                      style={{ background: 'rgba(78,205,196,0.1)', border: '1px solid #4ecdc4', color: '#4ecdc4', padding: '5px 14px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
                      View
                    </button>
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
                Active: {stats.active}
              </span>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, border: '1px solid #e0e4ea', color: '#8a9fc4', fontWeight: 600 }}>
                Inactive: {stats.inactive}
              </span>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
