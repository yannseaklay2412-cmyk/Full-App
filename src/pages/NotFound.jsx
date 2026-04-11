// export default function NotFound() {
//   return (
//     <div style={{ padding: '40px', color: '#fff', background: '#0d1b3e', minHeight: '100vh' }}>
//       <h2>NotFound — coming soon</h2>
//     </div>
//   )
// }


import React, { useState } from 'react'
import './NotFound.css'

export default function Appointment() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: 'Anytime',
    service: 'Tooth Decay Treatment',
    branch: 'Exchange Square Branch',
    notes: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Appointment submitted!') // Here you can replace with real API call
  }

  return (
    <div className="appointment-page">
      <div className="appointment-container">
        <h2 className="appointment-title">Make an Appointment</h2>
        <form className="appointment-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
            <input type="date" name="date" value={form.date} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <select name="time" value={form.time} onChange={handleChange}>
              <option>Anytime</option>
              <option>9:00 AM</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>2:00 PM</option>
              <option>3:00 PM</option>
              <option>4:00 PM</option>
            </select>
            <select name="service" value={form.service} onChange={handleChange}>
              <option>Tooth Decay Treatment</option>
              <option>Periodontal Disease</option>
              <option>Pediatric Dentistry</option>
              <option>Preventive Dentistry</option>
              <option>Dental Whitening</option>
              <option>Dental Implants</option>
            </select>
          </div>
          <div className="form-row">
            <select name="branch" value={form.branch} onChange={handleChange}>
              <option>Exchange Square Branch</option>
              <option>Downtown Branch</option>
            </select>
          </div>
          <textarea
            name="notes"
            placeholder="Any special requests or preferred dentist..."
            value={form.notes}
            onChange={handleChange}
          ></textarea>
          <button type="submit" className="btn-submit">Make a Reservation</button>
        </form>
      </div>
    </div>
  )
}
