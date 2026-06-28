import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../config/supabaseClient'
import AdminSidebar from '../../components/AdminSidebar'
import './Dashboard.css'

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

// ── Helpers ───────────────────────────────────────────────────────────────
const apiFetch = async (path, options = {}) => {
  const { data: { session } } = await supabase.auth.getSession()
  const token = session?.access_token

  const res = await fetch(`${API}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

// Convert "08:00:00" (DB time) → "08:00 AM" (display)
const formatTime = (t) => {
  if (!t) return ''
  const [hStr, mStr] = t.split(':')
  let h = parseInt(hStr, 10)
  const m   = mStr
  const ampm = h >= 12 ? 'PM' : 'AM'
  if (h > 12) h -= 12
  if (h === 0) h = 12
  return `${String(h).padStart(2, '0')}:${m} ${ampm}`
}


const getWeekDates = (date) => {
  const d    = new Date(date)
  const day  = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  const mon  = new Date(d.setDate(diff))
  return Array.from({ length: 7 }, (_, i) => {
    const dd = new Date(mon)
    dd.setDate(mon.getDate() + i)
    return dd.toISOString().split('T')[0]
  })
}

// ── Component ─────────────────────────────────────────────────────────────
export default function Schedule() {
  const navigate = useNavigate()

  const [dentists,    setDentists]    = useState([])
  const [selected,    setSelected]    = useState(null)
  const [timeslots,   setTimeslots]   = useState([])   // [{ id, start_time, end_time }]
  const [bookings,    setBookings]    = useState([])
  const [activeTab,   setActiveTab]   = useState('weekly')
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [successMsg,  setSuccessMsg]  = useState('')
  const [errorMsg,    setErrorMsg]    = useState('')
  const [loading,     setLoading]     = useState(false)

  const today     = new Date().toISOString().split('T')[0]
  const weekDates = getWeekDates(currentWeek)

  // ── Load on mount ────────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const [dents, slots, bks] = await Promise.all([
          apiFetch('/dentists'),       // GET /api/dentists
          apiFetch('/timeslots'),      // GET /api/timeslots
          apiFetch('/bookings'),       // GET /api/bookings
        ])
        setDentists(dents)
        setTimeslots(slots)
        setBookings(bks)
        if (dents.length > 0) setSelected(dents[0])
      } catch (e) {
        flash('error', 'Failed to load data from server.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const dentistBookings = bookings.filter(b =>
    b.dentist_id === selected?.id ||
    b.dentistId  === selected?.id ||
    b.dentists?.id === selected?.id
  )

  // ── Update booking status ────────────────────────────────────────────────
  const updateBookingStatus = async (bookingId, status) => {
    try {
      await apiFetch(`/bookings/${bookingId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      })
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b))
      flash('success', `Appointment ${status}.`)
    } catch (e) {
      flash('error', 'Failed to update appointment.')
    }
  }

  // ── Weekly view: selected dentist's bookings at a date + slot ─────────────
  // Tries exact slot match first; falls back to distributing day bookings by slot index
  const getBookingsAt = (date, slot, slotIdx) => {
    const exact = dentistBookings.filter(b => {
      const bDate = b.date || b.created_at?.split('T')[0]
      return (
        bDate === date &&
        b.status !== 'cancelled' &&
        (b.timeslotId === slot.id || b.timeslot_id === slot.id || b.start_time === slot.start_time)
      )
    })
    if (exact.length > 0) return exact
    const dayAll = dentistBookings.filter(b => {
      const bDate = b.date || b.created_at?.split('T')[0]
      return bDate === date && b.status !== 'cancelled'
    })
    return dayAll[slotIdx] ? [dayAll[slotIdx]] : []
  }

  const flash = (type, msg) => {
    if (type === 'success') { setSuccessMsg(msg); setTimeout(() => setSuccessMsg(''), 2500) }
    else                    { setErrorMsg(msg);   setTimeout(() => setErrorMsg(''), 2500)   }
  }

  const statusColor = { pending: '#f5c842', confirmed: '#4ecdc4', cancelled: '#ff6b6b' }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <AdminSidebar pageTitle="Dashboard" pageSubtitle="Home / Schedule">
        {loading ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a9fc4', fontSize: 14 }}>Loading…</div>
        ) : (
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '220px 1fr', overflow: 'hidden' }}>

            {/* LEFT — Dentist List */}
            <div style={{ background: '#fff', borderRight: '1px solid #e8ecf0', overflow: 'auto', padding: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Select Dentist</p>
              {dentists.length === 0 ? (
                <p style={{ fontSize: 13, color: '#8a9fc4', textAlign: 'center', padding: '20px 0' }}>No dentists found</p>
              ) : dentists.map(d => (
                <div key={d.id} onClick={() => setSelected(d)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, cursor: 'pointer', marginBottom: 6,
                    background: selected?.id === d.id ? 'rgba(78,205,196,0.08)' : 'transparent',
                    border: `1px solid ${selected?.id === d.id ? '#4ecdc4' : 'transparent'}` }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', overflow: 'hidden', background: '#f0f2f5', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {d.photo
                      ? <img src={d.photo} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a9fc4" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    }
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: selected?.id === d.id ? '#0d1b3e' : '#333', marginBottom: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</p>
                    <p style={{ fontSize: 11, color: selected?.id === d.id ? '#4ecdc4' : '#8a9fc4' }}>{d.title}</p>
                  </div>
                  {selected?.id === d.id && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ecdc4', flexShrink: 0 }}></div>}
                </div>
              ))}

              {/* Stats */}
              {selected && (
                <div style={{ marginTop: 20, padding: 14, background: '#f8f9fc', borderRadius: 10 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Stats</p>
                  {[
                    { label: 'Time Slots', num: timeslots.length,                                                           color: '#0d1b3e' },
                    { label: 'Booked',     num: dentistBookings.filter(b => b.status !== 'cancelled').length,               color: '#4ecdc4' },
                    { label: 'Pending',    num: dentistBookings.filter(b => b.status === 'pending').length,                  color: '#f5c842' },
                    { label: 'Confirmed',  num: dentistBookings.filter(b => b.status === 'confirmed').length,                color: '#7c3aed' },
                  ].map(s => (
                    <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: '#8a9fc4' }}>{s.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.num}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT — Schedule Panel */}
            <div style={{ overflow: 'auto', padding: 24 }}>
              {!selected ? (
                <div style={{ textAlign: 'center', padding: '80px 20px', color: '#8a9fc4' }}>
                  <p style={{ fontSize: 15 }}>Select a dentist to view their schedule</p>
                </div>
              ) : (
                <>
                  {/* Header + Tabs */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <div>
                      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0d1b3e', marginBottom: 4 }}>{selected.name}</h2>
                      <p style={{ fontSize: 13, color: '#8a9fc4' }}>{selected.title} · Schedule & Appointments</p>
                    </div>
                    <div style={{ display: 'flex', background: '#f0f2f5', borderRadius: 10, padding: 4, gap: 4 }}>
                      {['weekly', 'bookings'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)}
                          style={{ padding: '7px 16px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", textTransform: 'capitalize',
                            background: activeTab === tab ? '#fff' : 'transparent',
                            color: activeTab === tab ? '#0d1b3e' : '#8a9fc4',
                            boxShadow: activeTab === tab ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }}>
                          {tab === 'weekly' ? 'Weekly View' : 'Bookings'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Flash */}
                  {successMsg && (
                    <div style={{ background: 'rgba(78,205,196,0.1)', border: '1px solid rgba(78,205,196,0.3)', borderRadius: 10, padding: '10px 16px', marginBottom: 16, fontSize: 13, color: '#4ecdc4', fontWeight: 500 }}>
                      ✓ {successMsg}
                    </div>
                  )}
                  {errorMsg && (
                    <div style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', borderRadius: 10, padding: '10px 16px', marginBottom: 16, fontSize: 13, color: '#ff6b6b', fontWeight: 500 }}>
                      ✗ {errorMsg}
                    </div>
                  )}

                  {/* ══ TAB: WEEKLY VIEW ══ */}
                  {activeTab === 'weekly' && (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                        <button onClick={() => { const d = new Date(currentWeek); d.setDate(d.getDate() - 7); setCurrentWeek(d) }}
                          style={{ background: '#fff', border: '1px solid #e0e4ea', borderRadius: 8, padding: '6px 14px', fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                          ‹ Prev
                        </button>
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#0d1b3e' }}>
                          {formatDate(weekDates[0])} — {formatDate(weekDates[6])}
                        </span>
                        <button onClick={() => { const d = new Date(currentWeek); d.setDate(d.getDate() + 7); setCurrentWeek(d) }}
                          style={{ background: '#fff', border: '1px solid #e0e4ea', borderRadius: 8, padding: '6px 14px', fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                          Next ›
                        </button>
                      </div>

                      {timeslots.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '48px 0', color: '#8a9fc4', fontSize: 13 }}>
                          No time slots configured.
                        </div>
                      ) : (
                        <>
                          <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
                            {/* Day headers */}
                            <div style={{ display: 'grid', gridTemplateColumns: '110px repeat(7, 1fr)', borderBottom: '1px solid #f0f2f5' }}>
                              <div style={{ padding: '12px 8px', background: '#f8f9fc' }}></div>
                              {weekDates.map((date, i) => {
                                const isToday = date === today
                                return (
                                  <div key={date} style={{ padding: '12px 8px', textAlign: 'center', background: isToday ? '#0d1b3e' : '#f8f9fc', borderLeft: '1px solid #f0f2f5' }}>
                                    <p style={{ fontSize: 10, fontWeight: 600, color: isToday ? '#4ecdc4' : '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.5 }}>{DAYS[i].slice(0, 3)}</p>
                                    <p style={{ fontSize: 14, fontWeight: 700, color: isToday ? '#fff' : '#0d1b3e', marginTop: 2 }}>{new Date(date).getDate()}</p>
                                  </div>
                                )
                              })}
                            </div>

                            {/* Time slot rows */}
                            {timeslots.map((slot, slotIdx) => (
                              <div key={slot.id} style={{ display: 'grid', gridTemplateColumns: '110px repeat(7, 1fr)', borderBottom: '1px solid #f0f2f5' }}>
                                {/* Time label */}
                                <div style={{ padding: '8px 6px', fontSize: 10, color: '#8a9fc4', background: '#f8f9fc', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #f0f2f5', textAlign: 'center', lineHeight: 1.4 }}>
                                  <span>{formatTime(slot.start_time)}<br/>–<br/>{formatTime(slot.end_time)}</span>
                                </div>

                                {weekDates.map(date => {
                                  const cellBookings = getBookingsAt(date, slot, slotIdx)
                                  return (
                                    <div key={date} style={{ padding: '4px', borderLeft: '1px solid #f0f2f5', minHeight: 56, display: 'flex', flexDirection: 'column', gap: 3 }}>
                                      {cellBookings.length === 0 ? (
                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                          <span style={{ fontSize: 11, color: '#d0d5dd' }}>—</span>
                                        </div>
                                      ) : cellBookings.map(b => {
                                        const color = statusColor[b.status] || '#8a9fc4'
                                        const dentistName = b.dentists?.dentist_name || b.dentistName || '—'
                                        const patientName = b.patients?.full_name   || b.userName    || '—'
                                        return (
                                          <div key={b.id} style={{ background: `${color}18`, border: `1px solid ${color}44`, borderLeft: `3px solid ${color}`, borderRadius: 5, padding: '3px 6px' }}>
                                            <div style={{ fontSize: 9, fontWeight: 700, color: '#0d1b3e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                              {dentistName}
                                            </div>
                                            <div style={{ fontSize: 9, color: '#8a9fc4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                              {patientName}
                                            </div>
                                            <div style={{ fontSize: 8, fontWeight: 600, color, textTransform: 'capitalize', marginTop: 1 }}>
                                              {b.status}
                                            </div>
                                          </div>
                                        )
                                      })}
                                    </div>
                                  )
                                })}
                              </div>
                            ))}
                          </div>

                          {/* Legend */}
                          <div style={{ display: 'flex', gap: 20, marginTop: 14, flexWrap: 'wrap' }}>
                            {[
                              { color: 'rgba(78,205,196,0.15)',  border: '#4ecdc4', label: 'Confirmed' },
                              { color: 'rgba(245,200,66,0.15)',  border: '#f5c842', label: 'Pending'   },
                              { color: 'transparent',            border: '#e0e4ea', label: 'Available' },
                            ].map(l => (
                              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#8a9fc4' }}>
                                <div style={{ width: 14, height: 14, borderRadius: 4, background: l.color, border: `1px solid ${l.border}` }}></div>
                                {l.label}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* ══ TAB: BOOKINGS ══ */}
                  {activeTab === 'bookings' && (
                    <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
                      <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0f2f5' }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0d1b3e' }}>
                          Bookings for {selected.name}
                          <span style={{ fontSize: 12, color: '#8a9fc4', fontWeight: 400, marginLeft: 8 }}>({dentistBookings.length} total)</span>
                        </h3>
                      </div>
                      {dentistBookings.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px 0', color: '#8a9fc4', fontSize: 13 }}>No bookings for this dentist yet.</div>
                      ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr style={{ background: '#f8f9fc' }}>
                              {['Patient', 'Date', 'Time', 'Status', 'Actions'].map(h => (
                                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {dentistBookings
                              .slice()
                              .sort((a, b) => (a.date || a.created_at || '').localeCompare(b.date || b.created_at || ''))
                              .map(b => {
                                const patientName = b.patients?.full_name || b.userName   || '—'
                                const patientEmail = b.patients?.email    || b.userEmail  || ''
                                const bookingDate  = b.date || b.created_at?.split('T')[0] || '—'
                                return (
                                  <tr key={b.id} style={{ borderBottom: '1px solid #f0f2f5' }}>
                                    <td style={{ padding: '12px 16px' }}>
                                      <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1b3e', marginBottom: 1 }}>{patientName}</p>
                                      <p style={{ fontSize: 11, color: '#8a9fc4' }}>{patientEmail}</p>
                                    </td>
                                    <td style={{ padding: '12px 16px', fontSize: 13, color: '#666' }}>{bookingDate}</td>
                                    <td style={{ padding: '12px 16px', fontSize: 13, color: '#666' }}>
                                      {b.start_time ? `${formatTime(b.start_time)} – ${formatTime(b.end_time)}` : b.time || '—'}
                                    </td>
                                    <td style={{ padding: '12px 16px' }}>
                                      <span style={{ padding: '3px 10px', borderRadius: 99, border: `1px solid ${statusColor[b.status] || '#8a9fc4'}`, color: statusColor[b.status] || '#8a9fc4', fontSize: 11, fontWeight: 600, textTransform: 'capitalize' }}>
                                        {b.status}
                                      </span>
                                    </td>
                                    <td style={{ padding: '12px 16px' }}>
                                      <div style={{ display: 'flex', gap: 6 }}>
                                        {b.status === 'pending' && (
                                          <button onClick={() => updateBookingStatus(b.id, 'confirmed')}
                                            style={{ background: 'rgba(78,205,196,0.1)', border: '1px solid #4ecdc4', color: '#4ecdc4', padding: '4px 10px', borderRadius: 6, fontSize: 11, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                                            Confirm
                                          </button>
                                        )}
                                        {b.status !== 'cancelled' && (
                                          <button onClick={() => updateBookingStatus(b.id, 'cancelled')}
                                            style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.3)', color: '#ff6b6b', padding: '4px 10px', borderRadius: 6, fontSize: 11, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                                            Cancel
                                          </button>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                )
                              })}
                          </tbody>
                        </table>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
    </AdminSidebar>
  )
}