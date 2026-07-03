import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import './Book.css'

const STEPS = ['Dentist', 'Service', 'Date & Time', 'Your Info', 'Confirm']

export default function Book() {
  const navigate = useNavigate()

  const [step, setStep]               = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  const [dentists, setDentists]   = useState([])
  const [services, setServices]   = useState([])
  const [timeslots, setTimeslots] = useState([])

  const [dentist, setDentist]     = useState(null)
  const [selectedServices, setSelectedServices] = useState([])
  const [date, setDate]           = useState('')
  const [timeslot, setTimeslot]   = useState(null)

  const [patientInfo, setPatientInfo] = useState({
    full_name: '', phone: '', sex: '',
    date_of_birth: '', address: '', notes: '',
  })
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting]   = useState(false)

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const { data } = await api.get('/dentists')
        setDentists(data || [])
      } catch (err) { console.error(err) }
    }
    fetchDentists()
  }, [])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await api.get('/services')
        setServices(data.data || [])
      } catch (err) { console.error(err) }
    }
    fetchServices()
  }, [])

  useEffect(() => {
    if (!dentist || !date || selectedServices.length === 0) return
    setTimeslot(null)
    setTimeslots([])
    const fetchTimeslots = async () => {
      try {
        const { data } = await api.get('/timeslots/available', {
          params: { dentist_id: dentist.id, service_id: selectedServices.map(s => s.id).join(','), date },
        })
        setTimeslots(data.data || [])
      } catch (err) { console.error(err) }
    }
    fetchTimeslots()
  }, [dentist, date, selectedServices])

  useEffect(() => { setTimeslot(null); setDate(''); setTimeslots([]) }, [dentist])
  useEffect(() => { setTimeslot(null); setTimeslots([]) }, [selectedServices])

  const canNext = [
    !!dentist,
    selectedServices.length > 0,
    !!date && !!timeslot,
    !!(patientInfo.full_name && patientInfo.phone && patientInfo.sex && patientInfo.date_of_birth),
    true,
  ][step]

  const toggleService = (s) => {
    setSelectedServices(prev =>
      prev.some(x => x.id === s.id) ? prev.filter(x => x.id !== s.id) : [...prev, s]
    )
  }

  const totalPrice    = selectedServices.reduce((sum, s) => sum + Number(s.price), 0)
  const totalDuration = selectedServices.reduce((sum, s) => sum + Number(s.duration_minutes), 0)

  const handleInfoChange = (e) => {
    setPatientInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    setSubmitError('')
    setSubmitting(true)
    try {
      await api.post('/bookings', {
        dentist_id:       dentist.id,
        service_ids:      selectedServices.map(s => s.id),
        notes:            patientInfo.notes,
        full_name:        patientInfo.full_name,
        phone:            patientInfo.phone,
        sex:              patientInfo.sex,
        date_of_birth:    patientInfo.date_of_birth,
        address:          patientInfo.address,
        appointment_date: date,
        start_time:       timeslot.slot_start,
        end_time:         timeslot.slot_end,
      })

      setShowSuccess(true)
    } catch (err) {
      console.error(err)
      setSubmitError(err.response?.data?.message || err.message)
    } finally {
      setSubmitting(false)
    }
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
            <p className="book-section-label">Select one or more Services</p>
            {services.length === 0 ? (
              <p className="book-slot-hint">Loading services...</p>
            ) : (
              <div className="book-service-list">
                {services.map(s => {
                  const isSelected = selectedServices.some(x => x.id === s.id)
                  return (
                    <div key={s.id}
                      className={`book-service-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleService(s)}>
                      <div className="book-service-icon">{s.icon || '🦷'}</div>
                      <div>
                        <p className="book-service-name">{s.service_name}</p>
                        <p className="book-service-duration">⏱ {s.duration_minutes} min</p>
                        {s.description && <p className="book-service-duration">{s.description}</p>}
                      </div>
                      <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                        <p style={{ fontWeight: 600, color: '#0d9488' }}>${s.price}</p>
                        {isSelected && <span className="book-service-check">✓</span>}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
            {selectedServices.length > 0 && (
              <div className="book-confirm-row" style={{ marginTop: 12 }}>
                <span className="book-confirm-label">{selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} selected</span>
                <span className="book-confirm-value">⏱ {totalDuration} min · ${totalPrice}</span>
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
                {timeslots.map((t, i) => {
                  const isSelected = timeslot?.slot_start === t.slot_start
                  return (
                    <div key={i}
                      className={`book-time-slot slot-available ${isSelected ? 'selected' : ''}`}
                      onClick={() => setTimeslot(t)}>
                      <span className="book-slot-time">{t.slot_start} – {t.slot_end}</span>
                      {isSelected && <span className="book-slot-tag tag-selected">✓</span>}
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
                { label: 'Services', value: selectedServices.map(s => `${s.icon || '🦷'} ${s.service_name}`).join(', ') },
                { label: 'Duration', value: `${totalDuration} min` },
                { label: 'Price',    value: `$${totalPrice}` },
                { label: 'Date',     value: date },
                { label: 'Time',     value: `${timeslot?.slot_start} – ${timeslot?.slot_end}` },
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
        {submitError && (
          <div style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.4)', borderRadius: 10, padding: '10px 16px', marginBottom: 12, fontSize: 13, color: '#cc0000', fontWeight: 500 }}>
            ✗ {submitError}
          </div>
        )}
        <div className="book-btn-row">
          {step > 0 && (
            <button className="book-btn-back" onClick={() => setStep(step - 1)}>← Back</button>
          )}
          {step < 4 ? (
            <button className="book-btn-next" disabled={!canNext}
              onClick={() => canNext && setStep(step + 1)}>Next →</button>
          ) : (
            <button className="book-btn-next" disabled={submitting} onClick={handleSubmit}>
              {submitting ? 'Submitting...' : 'Confirm Booking ✓'}
            </button>
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
              <div className="success-row"><span>Services</span><span>{selectedServices.map(s => s.service_name).join(', ')}</span></div>
              <div className="success-row"><span>Date</span><span>{date}</span></div>
              <div className="success-row"><span>Time</span><span>{timeslot?.slot_start} – {timeslot?.slot_end}</span></div>
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