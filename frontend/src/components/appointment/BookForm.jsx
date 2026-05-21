import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './BookForm.css'

const doctors = [
  'Dr. Jean Rill - Orthodontist',
  'Dr. Yoo Rii - Orthodontist',
  'Dr. Yeon Rill - Orthodontist',
]

const services = [
  'Whitening',
  'Check Up',
  'Braces',
  'Dental Implants',
  'Cleaning',
  'Emergency',
]

export default function BookForm() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    doctor: '',
    service: '',
    date: '',
    time: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Send data to AppointmentCard page
    navigate('/appointment', { state: { appointment: formData } })
  }

  return (
    <div className="bookform-wrapper">
      <div className="bookform-container">
        <h2 className="bookform-title">🦷 Book Appointment</h2>
        <p className="bookform-sub">Fill in the details below to schedule your visit</p>

        <form onSubmit={handleSubmit} className="bookform">

          {/* Name */}
          <div className="form-group">
            <label>👤 Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>📞 Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Doctor */}
          <div className="form-group">
            <label>👨‍⚕️ Select Doctor</label>
            <select name="doctor" value={formData.doctor} onChange={handleChange} required>
              <option value="">-- Choose a doctor --</option>
              {doctors.map((d, i) => (
                <option key={i} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Service */}
          <div className="form-group">
            <label>🦷 Select Service</label>
            <select name="service" value={formData.service} onChange={handleChange} required>
              <option value="">-- Choose a service --</option>
              {services.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="form-group">
            <label>📅 Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Time */}
          <div className="form-group">
            <label>🕐 Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit */}
          <button type="submit" className="btn-submit">
            Confirm Appointment ✅
          </button>

        </form>
      </div>
    </div>
  )
}
