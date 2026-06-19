import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../config/supabaseClient'
import './Book.css'

const STEPS = ['Dentist', 'Service', 'Date & Time', 'Your Info', 'Confirm']

export default function Book() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [step, setStep]               = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  const [dentists, setDentists]           = useState([])
  const [services, setServices]           = useState([])
  const [timeslots, setTimeslots]         = useState([])
  const [bookedSlotIds, setBookedSlotIds] = useState([])

  const [dentist, setDentist]   = useState(null)
  const [service, setService]   = useState(null)
  const [date, setDate]         = useState('')
  const [timeslot, setTimeslot] = useState(null)

  const [patientInfo, setPatientInfo] = useState({
    full_name: '', phone: '', sex: '',
    date_of_birth: '', address: '', notes: '',
  })

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    const fetchDentists = async () => {
      const { data } = await supabase
        .from('dentists')
        .select('id, dentist_name, specialty')
      if (data) setDentists(data)
    }
    fetchDentists()
  }, [])

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        // .select('id, service_name, description, price,duration_minutes')
        .select('*')
        // .eq('is_active', true)
        // .order('id')
      console.log('services data:', data)
      console.log('services error:', error)
      // if (error) { console.error(error); return }
      if (data) setServices(data)
    }
    fetchServices()
  }, [])

  useEffect(() => {
    if (!dentist || !date) return
    setTimeslot(null)
    const fetchTimeslots = async () => {
      // 1. Get time templates for this dentist
      const { data: slots } = await supabase
        .from('timeslots')
        .select('id, start_time, end_time')
        .eq('dentist_id', dentist.id)
        .order('start_time')
      if (slots) setTimeslots(slots)

      // 2. Get booked slot ids for selected date
      const { data: booked } = await supabase
        .from('appointment_timeslots')
        .select('timeslot_id')
        .eq('date', date)
      if (booked) setBookedSlotIds(booked.map(b => b.timeslot_id))
    }
    fetchTimeslots()
  }, [dentist, date])

  useEffect(() => { setTimeslot(null); setDate('') }, [dentist])

  const canNext = [
    !!dentist,
    !!service,
    !!date && !!timeslot,
    !!(patientInfo.full_name && patientInfo.phone && patientInfo.sex && patientInfo.date_of_birth),
    true,
  ][step]

  const handleInfoChange = (e) => {
    setPatientInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    // 1. Check if patient already exists — don't overwrite registration name ✅
    let patient
    const { data: existingPatient } = await supabase
      .from('patients')
      .select('id')
      .eq('email', user.email)
      .maybeSingle()

    if (existingPatient) {
      // Already registered — just use existing id
      patient = existingPatient
    } else {
      // New patient — insert once
      const { data: newPatient, error: insertError } = await supabase
        .from('patients')
        .insert({
          email:         user.email,
          full_name:     patientInfo.full_name,
          phone:         patientInfo.phone,
          sex:           patientInfo.sex,
          date_of_birth: patientInfo.date_of_birth,
          address:       patientInfo.address,
        })
        .select()
        .single()
      if (insertError) { console.error(insertError); return }
      patient = newPatient
    }

    // 2. Insert appointment
    const { data: appt, error: apptError } = await supabase
      .from('appointments')
      .insert({
        patient_id: patient.id,
        dentist_id: dentist.id,
        status:     'pending',
        notes:      patientInfo.notes,
      })
      .select()
      .single()
    if (apptError) { console.error(apptError); return }

    // 3. Link appointment to timeslot + date
    const { error: linkError } = await supabase
      .from('appointment_timeslots')
      .insert({
        appointment_id: appt.id,
        timeslot_id:    timeslot.id,
        date:           date,
      })
    if (linkError) { console.error(linkError); return }

    // 4. Link appointment to service
    const { error: serviceError } = await supabase
      .from('appointment_services')
      .insert({
        appointment_id: appt.id,
        service_id:     service.id,
      })
    if (serviceError) { console.error(serviceError); return }

    setShowSuccess(true)
  }

  const Avatar = ({ name, size = 56 }) => (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'linear-gradient(135deg, #0d9488, #0f766e)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 700, fontSize: size * 0.4, flexShrink: 0,
    }}>
      {name?.charAt(0).toUpperCase()}
    </div>
  )

  return (
    <div className="book-page">
      <div className="book-topbar">
        <button className="book-back-btn" onClick={() => navigate('/dashboard')}>← Dashboard</button>
        <div className="nav-logo">
          <div className="logo-icon">🦷</div>
          <div style={{ marginLeft: '15px', fontFamily: 'Poppins' }}>
            <span style={{ color: '#1e1e1e' }}>Tooth</span>
            <span style={{ color: '#2ec4b6' }}>Time</span>
          </div>
        </div>      
        </div>

      <div className="book-content">
        <div className="book-header">
          <h1 className="book-title">Book an <span className="teal">Appointment</span></h1>
          <p className="book-sub">Choose your dentist, service, and preferred time.</p>
        </div>

        {/* Stepper */}
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

        {/* Step 1 — Dentist */}
        {step === 0 && (
          <>
            <p className="book-section-label">Select a Dentist</p>
            {dentists.length === 0 ? (
              <p className="book-slot-hint">Loading dentists...</p>
            ) : (
              <div className="book-dentist-grid">
                {dentists.map(d => (
                  <div key={d.id}
                    className={`book-dentist-card ${dentist?.id === d.id ? 'selected' : ''}`}
                    onClick={() => setDentist(d)}>
                    <Avatar name={d.dentist_name} />
                    <p className="book-dentist-name">{d.dentist_name}</p>
                    <p className="book-dentist-specialty">{d.specialty}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Step 2 — Service */}
        {step === 1 && (
          <>
            <p className="book-section-label">Select a Service</p>
            {services.length === 0 ? (
              <p className="book-slot-hint">Loading services...</p>
            ) : (
              <div className="book-service-list">
                {services.map(s => (
                  <div key={s.id}
                    className={`book-service-card ${service?.id === s.id ? 'selected' : ''}`}
                    onClick={() => setService(s)}>
                    <div className="book-service-icon">{s.icon || '🦷'}</div>
                    <div>
                      <p className="book-service-name">{s.service_name}</p>
                      <p className="book-service-duration">⏱ {s.duration_minutes} min</p>
                      {s.description && <p className="book-service-duration">{s.description}</p>}
                    </div>
                    <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                      <p style={{ fontWeight: 600, color: '#0d9488' }}>${s.price}</p>
                      {service?.id === s.id && <span className="book-service-check">✓</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Step 3 — Date & Time */}
        {step === 2 && (
          <>
            <p className="book-section-label">Select a Date</p>
            <input type="date" min={today} value={date}
              onChange={e => setDate(e.target.value)} className="book-date-input" />
            <p className="book-section-label">Select a Time Slot</p>
            {!date ? (
              <p className="book-slot-hint">Please select a date first.</p>
            ) : timeslots.length === 0 ? (
              <p className="book-slot-hint">No slots available. Please try another date.</p>
            ) : (
              <div className="book-time-grid">
                {timeslots.map(t => {
                  const isBooked   = bookedSlotIds.includes(t.id)
                  const isSelected = timeslot?.id === t.id
                  return (
                    <div key={t.id}
                      className={`book-time-slot ${isBooked ? 'slot-booked' : 'slot-available'} ${isSelected ? 'selected' : ''}`}
                      onClick={() => !isBooked && setTimeslot(t)}>
                      <span className="book-slot-time">{t.start_time} – {t.end_time}</span>
                      {isBooked && <span className="book-slot-tag tag-booked">Taken</span>}
                      {isSelected && !isBooked && <span className="book-slot-tag tag-selected">✓</span>}
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}

        {/* Step 4 — Patient Info */}
        {step === 3 && (
          <>
            <p className="book-section-label">Your Information</p>
            <div className="book-info-form">
              <div className="book-info-group">
                <label>Full Name <span className="required">*</span></label>
                <input name="full_name" value={patientInfo.full_name} onChange={handleInfoChange}
                  placeholder="Enter your full name" className="book-info-input" />
              </div>
              <div className="book-info-row">
                <div className="book-info-group">
                  <label>Phone Number <span className="required">*</span></label>
                  <input name="phone" value={patientInfo.phone} onChange={handleInfoChange}
                    placeholder="+1 234 567 8900" className="book-info-input" />
                </div>
                <div className="book-info-group">
                  <label>Date of Birth <span className="required">*</span></label>
                  <input type="date" name="date_of_birth" value={patientInfo.date_of_birth}
                    onChange={handleInfoChange} className="book-info-input" />
                </div>
              </div>
              <div className="book-info-group">
                <label>Gender <span className="required">*</span></label>
                <select name="sex" value={patientInfo.sex} onChange={handleInfoChange} className="book-info-input">
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="book-info-group">
                <label>Address</label>
                <input name="address" value={patientInfo.address} onChange={handleInfoChange}
                  placeholder="Your address (optional)" className="book-info-input" />
              </div>
              <div className="book-info-group">
                <label>Notes / Special Requests</label>
                <textarea name="notes" value={patientInfo.notes} onChange={handleInfoChange}
                  placeholder="Any special requests..." className="book-info-textarea" rows={4} />
              </div>
            </div>
          </>
        )}

        {/* Step 5 — Confirm */}
        {step === 4 && (
          <>
            <p className="book-section-label">Review your Appointment</p>
            <div className="book-confirm-card">
              <div className="book-confirm-doctor">
                <Avatar name={dentist?.dentist_name} size={48} />
                <div>
                  <p className="book-confirm-doctor-name">{dentist?.dentist_name}</p>
                  <p className="book-confirm-doctor-title">{dentist?.specialty}</p>
                </div>
              </div>
              <div className="book-confirm-divider" />
              {[
                { label: 'Patient',  value: patientInfo.full_name },
                { label: 'Phone',    value: patientInfo.phone },
                { label: 'Service',  value: `${service?.icon || '🦷'} ${service?.service_name}` },
                { label: 'Duration', value: `${service?.duration_minutes} min` },
                { label: 'Price',    value: `$${service?.price}` },
                { label: 'Date',     value: date },
                { label: 'Time',     value: `${timeslot?.start_time} – ${timeslot?.end_time}` },
                { label: 'Notes',    value: patientInfo.notes || '—' },
                { label: 'Status',   value: '⏳ Pending confirmation' },
              ].map((row, i) => (
                <div key={i} className="book-confirm-row">
                  <span className="book-confirm-label">{row.label}</span>
                  <span className={`book-confirm-value ${row.label === 'Status' ? 'book-confirm-status' : ''}`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Nav Buttons */}
        <div className="book-btn-row">
          {step > 0 && (
            <button className="book-btn-back" onClick={() => setStep(step - 1)}>← Back</button>
          )}
          {step < 4 ? (
            <button className="book-btn-next" disabled={!canNext}
              onClick={() => canNext && setStep(step + 1)}>Next →</button>
          ) : (
            <button className="book-btn-next" onClick={handleSubmit}>Confirm Booking ✓</button>
          )}
        </div>

      </div>

      {/* Success Popup */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="success-icon-wrap"><span>✓</span></div>
            <p className="success-title">Booking submitted!</p>
            <p className="success-sub">Pending confirmation from our team.</p>
            <div className="success-detail">
              <div className="success-row"><span>Dentist</span><span>{dentist?.dentist_name}</span></div>
              <div className="success-row"><span>Service</span><span>{service?.service_name}</span></div>
              <div className="success-row"><span>Date</span><span>{date}</span></div>
              <div className="success-row"><span>Time</span><span>{timeslot?.start_time} – {timeslot?.end_time}</span></div>
            </div>
            <span className="success-badge">⏳ Pending confirmation</span>
            <button className="success-btn" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
            <button className="success-btn-ghost" onClick={() => navigate('/my-bookings')}>View My Bookings</button>
          </div>
        </div>
      )}

    </div>
  )
}