// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../../context/AuthContext'
// import './Book.css'

// const SERVICES = [
//   { id: 1, label: 'General Check-up',    icon: '🔍', duration: '30 min' },
//   { id: 2, label: 'Teeth Cleaning',      icon: '🦷', duration: '45 min' },
//   { id: 3, label: 'Teeth Whitening',     icon: '✨', duration: '60 min' },
//   { id: 4, label: 'Braces Consultation', icon: '📋', duration: '45 min' },
//   { id: 5, label: 'Root Canal',          icon: '🩺', duration: '90 min' },
//   { id: 6, label: 'Tooth Extraction',    icon: '⚕️',  duration: '60 min' },
// ]

// const ALL_TIME_SLOTS = [
//   '08:00 AM','08:30 AM','09:00 AM','09:30 AM',
//   '10:00 AM','10:30 AM','11:00 AM','11:30 AM',
//   '01:00 PM','01:30 PM','02:00 PM','02:30 PM',
//   '03:00 PM','03:30 PM','04:00 PM','04:30 PM',
//   '05:00 PM','05:30 PM',
// ]

// const DEFAULT_DENTISTS = [
//   { id: 1, name: 'Dr. Yoo Rii',   title: 'Orthodontist' },
//   { id: 2, name: 'Dr. Jean Rill', title: 'General Dentist' },
//   { id: 3, name: 'Dr. Yeon Rill', title: 'Cosmetic Dentist' },
// ]

// const STEPS = ['Dentist', 'Service', 'Date & Time', 'Confirm']

// export default function Book() {
//   const navigate = useNavigate()
//   const { user } = useAuth()

//   const [step, setStep]               = useState(0)
//   const [dentists, setDentists]       = useState([])
//   const [dentist, setDentist]         = useState(null)
//   const [service, setService]         = useState(null)
//   const [date, setDate]               = useState('')
//   const [time, setTime]               = useState(null)
//   const [submitted, setSubmitted]     = useState(false)
//   const [allSlots, setAllSlots]       = useState([])
//   const [allBookings, setAllBookings] = useState([])

//   useEffect(() => {
//     const savedDentists = JSON.parse(localStorage.getItem('dentists') || '[]')
//     const savedSlots    = JSON.parse(localStorage.getItem('slots')    || '[]')
//     const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
//     setDentists(savedDentists.length > 0 ? savedDentists : DEFAULT_DENTISTS)
//     setAllSlots(savedSlots)
//     setAllBookings(savedBookings)
//   }, [])

//   useEffect(() => { setTime(null) }, [dentist, date])

//   const today   = new Date().toISOString().split('T')[0]
//   const canNext = [!!dentist, !!service, !!date && !!time, true][step]

//   const isAvailable = (t) => {
//   if (!dentist || !date) return false
//   return !isBooked(t)
// }

//   const isBooked = (t) => {
//     if (!dentist || !date) return false
//     return allBookings.some(
//       b => b.dentistId === dentist.id && b.date === date && b.time === t && b.status !== 'Cancelled'
//     )
//   }

//   const getSlotState = (t) => {
//     if (isBooked(t))    return 'booked'
//     if (isAvailable(t)) return 'available'
//     return 'unavailable'
//   }

//   const hasAnyAvailable = date && ALL_TIME_SLOTS.some(t => isAvailable(t))

//   const handleSubmit = () => {
//    const appointment = {
//   id:           Date.now(),
//   dentistId:    dentist.id,
//   dentistName:  dentist.name,
//   doctorName:   dentist.name,
//   dentistTitle: dentist.title || '',
//   service:      service.label,
//   date,
//   time,
//   status:       'Pending',  
//   userName:     user?.name  || '',
//   userEmail:    user?.email || '',
//   email:        user?.email || '',
// }
//     const existing = JSON.parse(localStorage.getItem('bookings') || '[]')
//     localStorage.setItem('bookings', JSON.stringify([appointment, ...existing]))
//     setSubmitted(true)
//   }

//   /* ── SUCCESS ── */
//   if (submitted) {
//     return (
//       <div className="book-page">
//         <div className="book-topbar">
//           <div className="book-logo">🦷 SMILLY</div>
//         </div>
//         <div className="book-content book-success">
//           <div className="book-success-icon">🎉</div>
//           <h2 className="book-success-title">
//             Appointment <span className="teal">Confirmed!</span>
//           </h2>
//           <p className="book-success-sub">
//             Your appointment with {dentist.name} has been booked for {date} at {time}.
//           </p>
//           <div className="book-btn-row">
//             <button className="book-btn-back" onClick={() => navigate('/dashboard')}>Dashboard</button>
//             <button className="book-btn-next" onClick={() => navigate('/my-bookings')}>View My Bookings</button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="book-page">

//       <div className="book-topbar">
//         <button className="book-back-btn" onClick={() => navigate('/dashboard')}>← Dashboard</button>
//         <div className="book-logo">🦷 SMILLY</div>
//       </div>

//       <div className="book-content">

//         <div className="book-header">
//           <h1 className="book-title">Book an <span className="teal">Appointment</span></h1>
//           <p className="book-sub">Choose your dentist, service, and preferred time.</p>
//         </div>

//         {/* Stepper */}
//         <div className="book-stepper">
//           {STEPS.map((label, i) => (
//             <div key={i} className="book-step-item">
//               <div className={`book-step-circle ${i < step ? 'done' : i === step ? 'active' : ''}`}>
//                 {i < step ? '✓' : i + 1}
//               </div>
//               <span className={`book-step-label ${i < step ? 'done' : i === step ? 'active' : ''}`}>
//                 {label}
//               </span>
//               {i < STEPS.length - 1 && (
//                 <div className={`book-step-line ${i < step ? 'done' : ''}`} />
//               )}
//             </div>
//           ))}
//         </div>

//         {/* ── Step 0: Pick Dentist ── */}
//         {step === 0 && (
//           <>
//             <p className="book-section-label">Select a Dentist</p>
//             {dentists.length === 0 ? (
//               <p className="book-slot-hint">No dentists available. Please check back later.</p>
//             ) : (
//               <div className="book-dentist-grid">
//                 {dentists.map((d) => (
//                   <div
//                     key={d.id}
//                     className={`book-dentist-card ${dentist?.id === d.id ? 'selected' : ''}`}
//                     onClick={() => setDentist(d)}
//                   >
//                     <div className="book-dentist-avatar-wrap">
//                       {d.photo ? (
//                         <img
//                           src={d.photo}
//                           alt={d.name}
//                           className="book-dentist-avatar"
//                         />
//                       ) : (
//                         <div className="book-dentist-avatar-placeholder">
//                           {d.name?.charAt(0).toUpperCase()}
//                         </div>
//                       )}
//                     </div>
//                     <p className="book-dentist-name">{d.name}</p>
//                     <p className="book-dentist-specialty">{d.title}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </>
//         )}

//         {/* ── Step 1: Pick Service ── */}
//         {step === 1 && (
//           <>
//             <p className="book-section-label">Select a Service</p>
//             <div className="book-service-list">
//               {SERVICES.map((s) => (
//                 <div
//                   key={s.id}
//                   className={`book-service-card ${service?.id === s.id ? 'selected' : ''}`}
//                   onClick={() => setService(s)}
//                 >
//                   <div className="book-service-icon">{s.icon}</div>
//                   <div>
//                     <p className="book-service-name">{s.label}</p>
//                     <p className="book-service-duration">⏱ {s.duration}</p>
//                   </div>
//                   {service?.id === s.id && <span className="book-service-check">✓</span>}
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {/* ── Step 2: Pick Date & Time ── */}
//         {step === 2 && (
//           <>
//             <p className="book-section-label">Select a Date</p>
//             <input
//               type="date"
//               min={today}
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="book-date-input"
//             />

//             <p className="book-section-label">Select a Time Slot</p>

//             <div className="book-slot-legend">
//               <div className="book-slot-legend-item">
//                 <div className="book-slot-legend-dot dot-available" />
//                 <span>Available</span>
//               </div>
//               <div className="book-slot-legend-item">
//                 <div className="book-slot-legend-dot dot-booked" />
//                 <span>Already Booked</span>
//               </div>
//               <div className="book-slot-legend-item">
//                 <div className="book-slot-legend-dot dot-unavailable" />
//                 <span>Unavailable</span>
//               </div>
//             </div>

//             {!date ? (
//               <p className="book-slot-hint">Please select a date first to see available slots.</p>
//             ) : (
//               <>
//                 <div className="book-time-grid">
//                   {ALL_TIME_SLOTS.map((t) => {
//                     const state      = getSlotState(t)
//                     const isSelected = time === t
//                     return (
//                       <div
//                         key={t}
//                         className={`book-time-slot slot-${state} ${isSelected ? 'selected' : ''}`}
//                         onClick={() => state === 'available' && setTime(t)}
//                         title={
//                           state === 'booked'      ? 'Already booked' :
//                           state === 'unavailable' ? 'Not available on this date' :
//                           'Click to select'
//                         }
//                       >
//                         <span className="book-slot-time">{t}</span>
//                         {state === 'booked'      && <span className="book-slot-tag tag-booked">Taken</span>}
//                         {state === 'unavailable' && <span className="book-slot-tag tag-unavailable">–</span>}
//                         {state === 'available' && isSelected && <span className="book-slot-tag tag-selected">✓</span>}
//                       </div>
//                     )
//                   })}
//                 </div>
//                 {!hasAnyAvailable && (
//                   <p className="book-slot-hint">
//                     No slots available on this date for {dentist?.name}. Please try another date.
//                   </p>
//                 )}
//               </>
//             )}
//           </>
//         )}

//         {/* ── Step 3: Confirm ── */}
//         {step === 3 && (
//           <>
//             <p className="book-section-label">Review your Appointment</p>
//             <div className="book-confirm-card">
//               <div className="book-confirm-doctor">
//                 {dentist?.photo ? (
//                   <img src={dentist.photo} alt={dentist.name} className="book-confirm-avatar" />
//                 ) : (
//                   <div className="book-confirm-avatar-placeholder">
//                     {dentist?.name?.charAt(0).toUpperCase()}
//                   </div>
//                 )}
//                 <div>
//                   <p className="book-confirm-doctor-name">{dentist?.name}</p>
//                   <p className="book-confirm-doctor-title">{dentist?.title}</p>
//                 </div>
//               </div>
//               <div className="book-confirm-divider" />
//               {[
//                 { label: 'Patient',  value: user?.name || 'You' },
//                 { label: 'Service',  value: `${service?.icon} ${service?.label}` },
//                 { label: 'Duration', value: service?.duration },
//                 { label: 'Date',     value: date },
//                 { label: 'Time',     value: time },
//                 { label: 'Status',   value: 'Confirmed' },
//               ].map((row, i) => (
//                 <div key={i} className="book-confirm-row">
//                   <span className="book-confirm-label">{row.label}</span>
//                   <span className={`book-confirm-value ${row.label === 'Status' ? 'book-confirm-status' : ''}`}>
//                     {row.value}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {/* Navigation */}
//         <div className="book-btn-row">
//           {step > 0 && (
//             <button className="book-btn-back" onClick={() => setStep(step - 1)}>← Back</button>
//           )}
//           {step < 3 ? (
//             <button
//               className="book-btn-next"
//               disabled={!canNext}
//               onClick={() => canNext && setStep(step + 1)}
//             >
//               Next →
//             </button>
//           ) : (
//             <button className="book-btn-next" onClick={handleSubmit}>
//               Confirm Booking ✓
//             </button>
//           )}
//         </div>

//       </div>
//     </div>
//   )
// }

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Book.css'
import { DataStorage } from '../../seeders/data' // ✅ seeder import

const SERVICES = [
  { id: 1, label: 'General Check-up',    icon: '🔍', duration: '30 min' },
  { id: 2, label: 'Teeth Cleaning',      icon: '🦷', duration: '45 min' },
  { id: 3, label: 'Teeth Whitening',     icon: '✨', duration: '60 min' },
  { id: 4, label: 'Braces Consultation', icon: '📋', duration: '45 min' },
  { id: 5, label: 'Root Canal',          icon: '🩺', duration: '90 min' },
  { id: 6, label: 'Tooth Extraction',    icon: '⚕️',  duration: '60 min' },
]

const ALL_TIME_SLOTS = [
  '08:00 AM','08:30 AM','09:00 AM','09:30 AM',
  '10:00 AM','10:30 AM','11:00 AM','11:30 AM',
  '01:00 PM','01:30 PM','02:00 PM','02:30 PM',
  '03:00 PM','03:30 PM','04:00 PM','04:30 PM',
  '05:00 PM','05:30 PM',
]

// ✅ use seeder instead of hardcoded defaults
const DEFAULT_DENTISTS = DataStorage.dentists

const STEPS = ['Dentist', 'Service', 'Date & Time', 'Confirm']

export default function Book() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [step, setStep]               = useState(0)
  const [dentists, setDentists]       = useState([])
  const [dentist, setDentist]         = useState(null)
  const [service, setService]         = useState(null)
  const [date, setDate]               = useState('')
  const [time, setTime]               = useState(null)
  const [submitted, setSubmitted]     = useState(false)
  const [allSlots, setAllSlots]       = useState([])
  const [allBookings, setAllBookings] = useState([])

  useEffect(() => {
    const savedDentists = JSON.parse(localStorage.getItem('dentists') || '[]')
    const savedSlots    = JSON.parse(localStorage.getItem('slots')    || '[]')
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    setDentists(savedDentists.length > 0 ? savedDentists : DEFAULT_DENTISTS)
    setAllSlots(savedSlots)
    setAllBookings(savedBookings)
  }, [])

  useEffect(() => { setTime(null) }, [dentist, date])

  const today   = new Date().toISOString().split('T')[0]
  const canNext = [!!dentist, !!service, !!date && !!time, true][step]

  const isAvailable = (t) => {
    if (!dentist || !date) return false
    return !isBooked(t)
  }

  const isBooked = (t) => {
    if (!dentist || !date) return false
    return allBookings.some(
      b => b.dentistId === dentist.id && b.date === date && b.time === t && b.status !== 'Cancelled'
    )
  }

  const getSlotState = (t) => {
    if (isBooked(t))    return 'booked'
    if (isAvailable(t)) return 'available'
    return 'unavailable'
  }

  const hasAnyAvailable = date && ALL_TIME_SLOTS.some(t => isAvailable(t))

  const handleSubmit = () => {
    const appointment = {
      id:           Date.now(),
      dentistId:    dentist.id,
      dentistName:  dentist.name,
      doctorName:   dentist.name,
      dentistTitle: dentist.title || '',
      service:      service.label,
      date,
      time,
      status:       'Pending',
      userName:     user?.name  || '',
      userEmail:    user?.email || '',
      email:        user?.email || '',
    }
    const existing = JSON.parse(localStorage.getItem('bookings') || '[]')
    localStorage.setItem('bookings', JSON.stringify([appointment, ...existing]))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="book-page">
        <div className="book-topbar">
          <div className="book-logo">🦷 SMILLY</div>
        </div>
        <div className="book-content book-success">
          <div className="book-success-icon">🎉</div>
          <h2 className="book-success-title">Appointment <span className="teal">Confirmed!</span></h2>
          <p className="book-success-sub">Your appointment with {dentist.name} has been booked for {date} at {time}.</p>
          <div className="book-btn-row">
            <button className="book-btn-back" onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button className="book-btn-next" onClick={() => navigate('/my-bookings')}>View My Bookings</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="book-page">
      <div className="book-topbar">
        <button className="book-back-btn" onClick={() => navigate('/dashboard')}>← Dashboard</button>
        <div className="book-logo">🦷 SMILLY</div>
      </div>

      <div className="book-content">
        <div className="book-header">
          <h1 className="book-title">Book an <span className="teal">Appointment</span></h1>
          <p className="book-sub">Choose your dentist, service, and preferred time.</p>
        </div>

        <div className="book-stepper">
          {STEPS.map((label, i) => (
            <div key={i} className="book-step-item">
              <div className={`book-step-circle ${i < step ? 'done' : i === step ? 'active' : ''}`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`book-step-label ${i < step ? 'done' : i === step ? 'active' : ''}`}>{label}</span>
              {i < STEPS.length - 1 && <div className={`book-step-line ${i < step ? 'done' : ''}`} />}
            </div>
          ))}
        </div>

        {step === 0 && (
          <>
            <p className="book-section-label">Select a Dentist</p>
            {dentists.length === 0 ? (
              <p className="book-slot-hint">No dentists available. Please check back later.</p>
            ) : (
              <div className="book-dentist-grid">
                {dentists.map((d) => (
                  <div key={d.id} className={`book-dentist-card ${dentist?.id === d.id ? 'selected' : ''}`} onClick={() => setDentist(d)}>
                    <div className="book-dentist-avatar-wrap">
                      {d.photo ? (
                        <img src={d.photo} alt={d.name} className="book-dentist-avatar" />
                      ) : (
                        <div className="book-dentist-avatar-placeholder">{d.name?.charAt(0).toUpperCase()}</div>
                      )}
                    </div>
                    <p className="book-dentist-name">{d.name}</p>
                    <p className="book-dentist-specialty">{d.title}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {step === 1 && (
          <>
            <p className="book-section-label">Select a Service</p>
            <div className="book-service-list">
              {SERVICES.map((s) => (
                <div key={s.id} className={`book-service-card ${service?.id === s.id ? 'selected' : ''}`} onClick={() => setService(s)}>
                  <div className="book-service-icon">{s.icon}</div>
                  <div>
                    <p className="book-service-name">{s.label}</p>
                    <p className="book-service-duration">⏱ {s.duration}</p>
                  </div>
                  {service?.id === s.id && <span className="book-service-check">✓</span>}
                </div>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p className="book-section-label">Select a Date</p>
            <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className="book-date-input" />
            <p className="book-section-label">Select a Time Slot</p>
            <div className="book-slot-legend">
              <div className="book-slot-legend-item"><div className="book-slot-legend-dot dot-available" /><span>Available</span></div>
              <div className="book-slot-legend-item"><div className="book-slot-legend-dot dot-booked" /><span>Already Booked</span></div>
              <div className="book-slot-legend-item"><div className="book-slot-legend-dot dot-unavailable" /><span>Unavailable</span></div>
            </div>
            {!date ? (
              <p className="book-slot-hint">Please select a date first to see available slots.</p>
            ) : (
              <>
                <div className="book-time-grid">
                  {ALL_TIME_SLOTS.map((t) => {
                    const state      = getSlotState(t)
                    const isSelected = time === t
                    return (
                      <div key={t} className={`book-time-slot slot-${state} ${isSelected ? 'selected' : ''}`}
                        onClick={() => state === 'available' && setTime(t)}
                        title={state === 'booked' ? 'Already booked' : state === 'unavailable' ? 'Not available on this date' : 'Click to select'}>
                        <span className="book-slot-time">{t}</span>
                        {state === 'booked'                    && <span className="book-slot-tag tag-booked">Taken</span>}
                        {state === 'unavailable'               && <span className="book-slot-tag tag-unavailable">–</span>}
                        {state === 'available' && isSelected   && <span className="book-slot-tag tag-selected">✓</span>}
                      </div>
                    )
                  })}
                </div>
                {!hasAnyAvailable && (
                  <p className="book-slot-hint">No slots available on this date for {dentist?.name}. Please try another date.</p>
                )}
              </>
            )}
          </>
        )}

        {step === 3 && (
          <>
            <p className="book-section-label">Review your Appointment</p>
            <div className="book-confirm-card">
              <div className="book-confirm-doctor">
                {dentist?.photo ? (
                  <img src={dentist.photo} alt={dentist.name} className="book-confirm-avatar" />
                ) : (
                  <div className="book-confirm-avatar-placeholder">{dentist?.name?.charAt(0).toUpperCase()}</div>
                )}
                <div>
                  <p className="book-confirm-doctor-name">{dentist?.name}</p>
                  <p className="book-confirm-doctor-title">{dentist?.title}</p>
                </div>
              </div>
              <div className="book-confirm-divider" />
              {[
                { label: 'Patient',  value: user?.name || 'You' },
                { label: 'Service',  value: `${service?.icon} ${service?.label}` },
                { label: 'Duration', value: service?.duration },
                { label: 'Date',     value: date },
                { label: 'Time',     value: time },
                { label: 'Status',   value: 'Confirmed' },
              ].map((row, i) => (
                <div key={i} className="book-confirm-row">
                  <span className="book-confirm-label">{row.label}</span>
                  <span className={`book-confirm-value ${row.label === 'Status' ? 'book-confirm-status' : ''}`}>{row.value}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="book-btn-row">
          {step > 0 && <button className="book-btn-back" onClick={() => setStep(step - 1)}>← Back</button>}
          {step < 3 ? (
            <button className="book-btn-next" disabled={!canNext} onClick={() => canNext && setStep(step + 1)}>Next →</button>
          ) : (
            <button className="book-btn-next" onClick={handleSubmit}>Confirm Booking ✓</button>
          )}
        </div>
      </div>
    </div>
  )
}