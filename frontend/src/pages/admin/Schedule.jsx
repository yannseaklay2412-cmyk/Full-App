import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const TIME_SLOTS = [
  '08:00 AM','08:30 AM','09:00 AM','09:30 AM',
  '10:00 AM','10:30 AM','11:00 AM','11:30 AM',
  '01:00 PM','01:30 PM','02:00 PM','02:30 PM',
  '03:00 PM','03:30 PM','04:00 PM','04:30 PM',
  '05:00 PM','05:30 PM',
]
const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

export default function Schedule() {
  const navigate = useNavigate()
  const [dentists, setDentists]       = useState([])
  const [selected, setSelected]       = useState(null)
  const [slots, setSlots]             = useState([])
  const [bookings, setBookings]       = useState([])
  const [activeTab, setActiveTab]     = useState('weekly')
  const [form, setForm]               = useState({ date: '', time: '' })
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [successMsg, setSuccessMsg]   = useState('')

  useEffect(() => {
    const dents = JSON.parse(localStorage.getItem('dentists') || '[]')
    const bks   = JSON.parse(localStorage.getItem('bookings') || '[]')
    const sls   = JSON.parse(localStorage.getItem('slots')    || '[]')
    setDentists(dents)
    setBookings(bks)
    setSlots(sls)
    if (dents.length > 0) setSelected(dents[0])
  }, [])

  const today = new Date().toISOString().split('T')[0]

  const getWeekDates = (date) => {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1)
    const monday = new Date(d.setDate(diff))
    return Array.from({ length: 7 }, (_, i) => {
      const dd = new Date(monday)
      dd.setDate(monday.getDate() + i)
      return dd.toISOString().split('T')[0]
    })
  }

  const weekDates = getWeekDates(currentWeek)

  const prevWeek = () => {
    const d = new Date(currentWeek)
    d.setDate(d.getDate() - 7)
    setCurrentWeek(d)
  }

  const nextWeek = () => {
    const d = new Date(currentWeek)
    d.setDate(d.getDate() + 7)
    setCurrentWeek(d)
  }

  const dentistSlots    = slots.filter(s => s.dentistId === selected?.id)
  const dentistBookings = bookings.filter(b => b.dentistId === selected?.id)

  const addSlot = () => {
    if (!form.date || !form.time) return
    const exists = slots.find(s => s.dentistId === selected.id && s.date === form.date && s.time === form.time)
    if (exists) {
      setSuccessMsg('This slot already exists!')
      setTimeout(() => setSuccessMsg(''), 2000)
      return
    }
    const newSlot = { id: Date.now(), dentistId: selected.id, dentistName: selected.name, date: form.date, time: form.time }
    const updated = [...slots, newSlot]
    localStorage.setItem('slots', JSON.stringify(updated))
    setSlots(updated)
    setForm({ date: '', time: '' })
    setSuccessMsg('Slot added successfully!')
    setTimeout(() => setSuccessMsg(''), 2000)
  }

  const removeSlot = (id) => {
    const updated = slots.filter(s => s.id !== id)
    localStorage.setItem('slots', JSON.stringify(updated))
    setSlots(updated)
  }

  const isBooked = (date, time) =>
    dentistBookings.some(b => b.date === date && b.time === time && b.status !== 'cancelled')

  const isSlotAdded = (date, time) =>
    dentistSlots.some(s => s.date === date && s.time === time)

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const sidebarItems = [
    { label: 'Dashboard',   path: '/admin'              },
    { label: 'Schedule',    path: '/admin/schedule'     },
    { label: 'Employees',   path: '/admin/dentists'     },
    { label: 'Appointment', path: '/admin/appointments' },
    { label: 'Record',      path: '/admin/users'        },
    { label: 'Setting',     path: '/admin/reports'      },
  ]

  const statusColor = { pending: '#f5c842', confirmed: '#4ecdc4', cancelled: '#ff6b6b' }

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
          <p style={{ fontSize: 11, color: '#4ecdc4', fontWeight: 500 }}>Home / Schedule</p>
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
            <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1b3e' }}>Home / Schedule</p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button onClick={() => navigate('/admin')}
              style={{ background: 'transparent', border: '1px solid #e0e4ea', color: '#666', padding: '7px 18px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              ← Back
            </button>
          </div>
        </div>

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '220px 1fr', overflow: 'hidden' }}>

          {/* ── LEFT — Dentist List ── */}
          <div style={{ background: '#fff', borderRight: '1px solid #e8ecf0', overflow: 'auto', padding: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Select Dentist</p>
            {dentists.length === 0 ? (
              <p style={{ fontSize: 13, color: '#8a9fc4', textAlign: 'center', padding: '20px 0' }}>No dentists found</p>
            ) : dentists.map(d => (
              <div key={d.id} onClick={() => setSelected(d)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, cursor: 'pointer', marginBottom: 6, transition: 'all 0.2s',
                  background: selected?.id === d.id ? 'rgba(78,205,196,0.08)' : 'transparent',
                  border: `1px solid ${selected?.id === d.id ? '#4ecdc4' : 'transparent'}` }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', overflow: 'hidden', background: '#f0f2f5', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {d.photo ? (
                    <img src={d.photo} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a9fc4" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: selected?.id === d.id ? '#0d1b3e' : '#333', marginBottom: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</p>
                  <p style={{ fontSize: 11, color: selected?.id === d.id ? '#4ecdc4' : '#8a9fc4' }}>{d.title}</p>
                </div>
                {selected?.id === d.id && (
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ecdc4', flexShrink: 0 }}></div>
                )}
              </div>
            ))}

            {/* Slot Stats */}
            {selected && (
              <div style={{ marginTop: 20, padding: '14px', background: '#f8f9fc', borderRadius: 10 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Stats</p>
                {[
                  { label: 'Total Slots', num: dentistSlots.length, color: '#0d1b3e' },
                  { label: 'Booked',      num: dentistBookings.filter(b => b.status !== 'cancelled').length, color: '#4ecdc4' },
                  { label: 'Pending',     num: dentistBookings.filter(b => b.status === 'pending').length,   color: '#f5c842' },
                  { label: 'Available',   num: Math.max(0, dentistSlots.length - dentistBookings.filter(b => b.status !== 'cancelled').length), color: '#7c3aed' },
                ].map(s => (
                  <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: '#8a9fc4' }}>{s.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.num}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT — Schedule Panel ── */}
          <div style={{ overflow: 'auto', padding: 24 }}>
            {!selected ? (
              <div style={{ textAlign: 'center', padding: '80px 20px', color: '#8a9fc4' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e0e4ea" strokeWidth="1.5" style={{ marginBottom: 16 }}>
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <p style={{ fontSize: 15 }}>Select a dentist to manage their schedule</p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0d1b3e', marginBottom: 4 }}>{selected.name}</h2>
                    <p style={{ fontSize: 13, color: '#8a9fc4' }}>{selected.title} · Manage availability and time slots</p>
                  </div>
                  {/* Tabs */}
                  <div style={{ display: 'flex', background: '#f0f2f5', borderRadius: 10, padding: 4, gap: 4 }}>
                    {['weekly', 'slots', 'bookings'].map(tab => (
                      <button key={tab} onClick={() => setActiveTab(tab)}
                        style={{ padding: '7px 16px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", textTransform: 'capitalize', transition: 'all 0.2s',
                          background: activeTab === tab ? '#fff' : 'transparent',
                          color: activeTab === tab ? '#0d1b3e' : '#8a9fc4',
                          boxShadow: activeTab === tab ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }}>
                        {tab === 'weekly' ? 'Weekly View' : tab === 'slots' ? 'Manage Slots' : 'Bookings'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SUCCESS MSG */}
                {successMsg && (
                  <div style={{ background: 'rgba(78,205,196,0.1)', border: '1px solid rgba(78,205,196,0.3)', borderRadius: 10, padding: '10px 16px', marginBottom: 16, fontSize: 13, color: '#4ecdc4', fontWeight: 500 }}>
                    {successMsg}
                  </div>
                )}

                {/* ── TAB: WEEKLY VIEW ── */}
                {activeTab === 'weekly' && (
                  <div>
                    {/* Week Navigation */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                      <button onClick={prevWeek}
                        style={{ background: '#fff', border: '1px solid #e0e4ea', borderRadius: 8, padding: '6px 14px', fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                        ‹ Prev
                      </button>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#0d1b3e' }}>
                        {formatDate(weekDates[0])} — {formatDate(weekDates[6])}
                      </span>
                      <button onClick={nextWeek}
                        style={{ background: '#fff', border: '1px solid #e0e4ea', borderRadius: 8, padding: '6px 14px', fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                        Next ›
                      </button>
                    </div>

                    {/* Weekly Grid */}
                    <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
                      {/* Day headers */}
                      <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(7, 1fr)', borderBottom: '1px solid #f0f2f5' }}>
                        <div style={{ padding: '12px 8px', background: '#f8f9fc' }}></div>
                        {weekDates.map((date, i) => {
                          const isToday = date === today
                          return (
                            <div key={date} style={{ padding: '12px 8px', textAlign: 'center', background: isToday ? '#0d1b3e' : '#f8f9fc', borderLeft: '1px solid #f0f2f5' }}>
                              <p style={{ fontSize: 10, fontWeight: 600, color: isToday ? '#4ecdc4' : '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.5 }}>{DAYS[i].slice(0,3)}</p>
                              <p style={{ fontSize: 14, fontWeight: 700, color: isToday ? '#fff' : '#0d1b3e', marginTop: 2 }}>{new Date(date).getDate()}</p>
                            </div>
                          )
                        })}
                      </div>

                      {/* Time rows */}
                      {TIME_SLOTS.map(time => (
                        <div key={time} style={{ display: 'grid', gridTemplateColumns: '80px repeat(7, 1fr)', borderBottom: '1px solid #f0f2f5' }}>
                          <div style={{ padding: '8px', fontSize: 11, color: '#8a9fc4', background: '#f8f9fc', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #f0f2f5' }}>
                            {time}
                          </div>
                          {weekDates.map(date => {
                            const booked  = isBooked(date, time)
                            const hasSlot = isSlotAdded(date, time)
                            const booking = dentistBookings.find(b => b.date === date && b.time === time && b.status !== 'cancelled')
                            return (
                              <div key={date}
                                onClick={() => {
                                  if (!hasSlot && !booked) {
                                    const newSlot = { id: Date.now(), dentistId: selected.id, dentistName: selected.name, date, time }
                                    const updated = [...slots, newSlot]
                                    localStorage.setItem('slots', JSON.stringify(updated))
                                    setSlots(updated)
                                    setSuccessMsg(`Slot added: ${formatDate(date)} ${time}`)
                                    setTimeout(() => setSuccessMsg(''), 2000)
                                  } else if (hasSlot && !booked) {
                                    const updated = slots.filter(s => !(s.dentistId === selected.id && s.date === date && s.time === time))
                                    localStorage.setItem('slots', JSON.stringify(updated))
                                    setSlots(updated)
                                  }
                                }}
                                style={{ padding: '6px 4px', borderLeft: '1px solid #f0f2f5', cursor: booked ? 'default' : 'pointer', transition: 'background 0.15s', minHeight: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  background: booked ? 'rgba(78,205,196,0.08)' : hasSlot ? 'rgba(124,58,237,0.06)' : 'transparent' }}
                                onMouseEnter={e => { if (!booked && !hasSlot) e.currentTarget.style.background = '#f8f9fc' }}
                                onMouseLeave={e => { if (!booked && !hasSlot) e.currentTarget.style.background = 'transparent' }}>
                                {booked ? (
                                  <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: 9, fontWeight: 700, color: '#4ecdc4', background: 'rgba(78,205,196,0.15)', padding: '2px 6px', borderRadius: 4, textTransform: 'capitalize' }}>
                                      {booking?.status || 'booked'}
                                    </div>
                                    <div style={{ fontSize: 9, color: '#8a9fc4', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 60 }}>
                                      {booking?.userName}
                                    </div>
                                  </div>
                                ) : hasSlot ? (
                                  <div style={{ fontSize: 9, fontWeight: 600, color: '#7c3aed', background: 'rgba(124,58,237,0.1)', padding: '2px 6px', borderRadius: 4 }}>Open</div>
                                ) : (
                                  <div style={{ fontSize: 14, color: '#e0e4ea' }}>+</div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      ))}
                    </div>

                    {/* Legend */}
                    <div style={{ display: 'flex', gap: 20, marginTop: 14, flexWrap: 'wrap' }}>
                      {[
                        { color: 'rgba(78,205,196,0.15)',  border: '#4ecdc4', label: 'Booked by patient' },
                        { color: 'rgba(124,58,237,0.1)',   border: '#7c3aed', label: 'Open slot' },
                        { color: 'transparent',            border: '#e0e4ea', label: 'Click + to add slot' },
                      ].map(l => (
                        <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#8a9fc4' }}>
                          <div style={{ width: 14, height: 14, borderRadius: 4, background: l.color, border: `1px solid ${l.border}` }}></div>
                          {l.label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── TAB: MANAGE SLOTS ── */}
                {activeTab === 'slots' && (
                  <div>
                    {/* Add Slot Form */}
                    <div style={{ background: '#fff', borderRadius: 14, padding: 20, marginBottom: 20, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
                      <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0d1b3e', marginBottom: 16 }}>Add New Slot</h3>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
                        <div>
                          <label style={{ fontSize: 11, fontWeight: 600, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.6, display: 'block', marginBottom: 6 }}>Date</label>
                          <input type="date" min={today} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                            style={{ background: '#f5f6fa', border: '1px solid #e0e0e0', borderRadius: 10, color: '#0d1b3e', padding: '10px 14px', fontSize: 14, outline: 'none', fontFamily: "'DM Sans', sans-serif", cursor: 'pointer' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: 11, fontWeight: 600, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.6, display: 'block', marginBottom: 6 }}>Time</label>
                          <select value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}
                            style={{ background: '#f5f6fa', border: '1px solid #e0e0e0', borderRadius: 10, color: '#0d1b3e', padding: '10px 14px', fontSize: 14, outline: 'none', fontFamily: "'DM Sans', sans-serif", cursor: 'pointer' }}>
                            <option value="">Select time</option>
                            {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                        <button onClick={addSlot}
                          style={{ background: '#0d1b3e', border: 'none', color: '#fff', padding: '10px 24px', borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                          + Add Slot
                        </button>
                      </div>
                    </div>

                    {/* Slots List */}
                    <div style={{ background: '#fff', borderRadius: 14, padding: 20, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0d1b3e' }}>
                          Available Slots <span style={{ fontSize: 12, color: '#8a9fc4', fontWeight: 400 }}>({dentistSlots.length})</span>
                        </h3>
                        {dentistSlots.length > 0 && (
                          <button
                            onClick={() => {
                              if (!window.confirm('Remove all slots for this dentist?')) return
                              const updated = slots.filter(s => s.dentistId !== selected.id)
                              localStorage.setItem('slots', JSON.stringify(updated))
                              setSlots(updated)
                            }}
                            style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.2)', color: '#ff6b6b', padding: '6px 14px', borderRadius: 8, fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                            Clear All
                          </button>
                        )}
                      </div>

                      {dentistSlots.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '32px 0', color: '#8a9fc4', fontSize: 13 }}>
                          No slots added yet. Add slots above.
                        </div>
                      ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
                          {dentistSlots.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)).map(s => {
                            const booked = isBooked(s.date, s.time)
                            const booking = dentistBookings.find(b => b.date === s.date && b.time === s.time && b.status !== 'cancelled')
                            return (
                              <div key={s.id} style={{ background: booked ? 'rgba(78,205,196,0.06)' : '#f8f9fc', border: `1px solid ${booked ? '#4ecdc440' : '#e0e4ea'}`, borderRadius: 10, padding: '12px 14px', position: 'relative' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                  <div>
                                    <p style={{ fontSize: 13, fontWeight: 700, color: '#0d1b3e', marginBottom: 2 }}>{formatDate(s.date)}</p>
                                    <p style={{ fontSize: 12, color: '#8a9fc4', marginBottom: 6 }}>{s.time}</p>
                                    {booked ? (
                                      <div>
                                        <span style={{ fontSize: 10, background: 'rgba(78,205,196,0.15)', color: '#4ecdc4', padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>Booked</span>
                                        {booking && <p style={{ fontSize: 10, color: '#8a9fc4', marginTop: 4 }}>{booking.userName}</p>}
                                      </div>
                                    ) : (
                                      <span style={{ fontSize: 10, background: 'rgba(124,58,237,0.1)', color: '#7c3aed', padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>Available</span>
                                    )}
                                  </div>
                                  {!booked && (
                                    <button onClick={() => removeSlot(s.id)}
                                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff6b6b', fontSize: 16, padding: 0, lineHeight: 1 }}>
                                      ×
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
                )}

                {/* ── TAB: BOOKINGS ── */}
                {activeTab === 'bookings' && (
                  <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0f2f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0d1b3e' }}>
                        Bookings for {selected.name}
                        <span style={{ fontSize: 12, color: '#8a9fc4', fontWeight: 400, marginLeft: 8 }}>({dentistBookings.length} total)</span>
                      </h3>
                    </div>
                    {dentistBookings.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '40px 0', color: '#8a9fc4', fontSize: 13 }}>No bookings for this dentist yet</div>
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
                          {dentistBookings.sort((a, b) => a.date.localeCompare(b.date)).map(b => (
                            <tr key={b.id} style={{ borderBottom: '1px solid #f0f2f5' }}>
                              <td style={{ padding: '12px 16px' }}>
                                <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1b3e', marginBottom: 1 }}>{b.userName}</p>
                                <p style={{ fontSize: 11, color: '#8a9fc4' }}>{b.userEmail || ''}</p>
                              </td>
                              <td style={{ padding: '12px 16px', fontSize: 13, color: '#666' }}>{b.date}</td>
                              <td style={{ padding: '12px 16px', fontSize: 13, color: '#666' }}>{b.time}</td>
                              <td style={{ padding: '12px 16px' }}>
                                <span style={{ padding: '3px 10px', borderRadius: 99, border: `1px solid ${statusColor[b.status]}`, color: statusColor[b.status], fontSize: 11, fontWeight: 600, textTransform: 'capitalize' }}>
                                  {b.status}
                                </span>
                              </td>
                              <td style={{ padding: '12px 16px' }}>
                                <div style={{ display: 'flex', gap: 6 }}>
                                  {b.status === 'pending' && (
                                    <button onClick={() => {
                                      const all = JSON.parse(localStorage.getItem('bookings') || '[]')
                                      const updated = all.map(bk => bk.id === b.id ? { ...bk, status: 'confirmed' } : bk)
                                      localStorage.setItem('bookings', JSON.stringify(updated))
                                      setBookings(updated)
                                    }}
                                      style={{ background: 'rgba(78,205,196,0.1)', border: '1px solid #4ecdc4', color: '#4ecdc4', padding: '4px 10px', borderRadius: 6, fontSize: 11, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                                      Confirm
                                    </button>
                                  )}
                                  {b.status !== 'cancelled' && (
                                    <button onClick={() => {
                                      const all = JSON.parse(localStorage.getItem('bookings') || '[]')
                                      const updated = all.map(bk => bk.id === b.id ? { ...bk, status: 'cancelled' } : bk)
                                      localStorage.setItem('bookings', JSON.stringify(updated))
                                      setBookings(updated)
                                    }}
                                      style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.3)', color: '#ff6b6b', padding: '4px 10px', borderRadius: 6, fontSize: 11, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                                      Cancel
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
