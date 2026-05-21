import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Profile.css'

export default function Profile() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    name:      '',
    email:     '',
    phone:     '',
    dob:       '',
    gender:    '',
    address:   '',
    emergency: '',
    bloodType: '',
    allergies: '',
  })

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('userProfile') || '{}')
    setForm({
      name:      storedProfile.name      || user?.name  || '',
      email:     storedProfile.email     || user?.email || '',
      phone:     storedProfile.phone     || '',
      dob:       storedProfile.dob       || '',
      gender:    storedProfile.gender    || '',
      address:   storedProfile.address   || '',
      emergency: storedProfile.emergency || '',
      bloodType: storedProfile.bloodType || '',
      allergies: storedProfile.allergies || '',
    })
  }, [user])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(form))
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleCancel = () => {
    const storedProfile = JSON.parse(localStorage.getItem('userProfile') || '{}')
    setForm({
      name:      storedProfile.name      || user?.name  || '',
      email:     storedProfile.email     || user?.email || '',
      phone:     storedProfile.phone     || '',
      dob:       storedProfile.dob       || '',
      gender:    storedProfile.gender    || '',
      address:   storedProfile.address   || '',
      emergency: storedProfile.emergency || '',
      bloodType: storedProfile.bloodType || '',
      allergies: storedProfile.allergies || '',
    })
    setEditing(false)
  }

  const initials = form.name
    ? form.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  return (
    <div className="profile-page">

      {/* Topbar */}
      <div className="profile-topbar">
        <button className="profile-back-btn" onClick={() => navigate('/dashboard')}>← Dashboard</button>
        <div className="profile-logo">🦷 SMILLY</div>
      </div>

      <div className="profile-content">

        {/* Header */}
        <div className="profile-header">
          <h1 className="profile-title">My <span className="teal">Profile</span></h1>
          <p className="profile-sub">Manage your personal information and health details.</p>
        </div>

        {/* Hero Card */}
        <div className="profile-hero-card">
          <div className="profile-avatar">{initials}</div>
          <div className="profile-hero-info">
            <h2 className="profile-hero-name">{form.name || 'Your Name'}</h2>
            <p className="profile-hero-email">{form.email || 'your@email.com'}</p>
            <div className="profile-hero-badges">
              {form.bloodType && <span className="profile-badge blood">{form.bloodType}</span>}
              {form.gender    && <span className="profile-badge gender">{form.gender}</span>}
            </div>
          </div>
          <div className="profile-hero-actions">
            {!editing ? (
              <button className="profile-btn-edit" onClick={() => setEditing(true)}>
                ✏️ Edit Profile
              </button>
            ) : (
              <div className="profile-edit-btns">
                <button className="profile-btn-save" onClick={handleSave}>Save</button>
                <button className="profile-btn-cancel" onClick={handleCancel}>Cancel</button>
              </div>
            )}
          </div>
        </div>

        {/* Success Toast */}
        {saved && (
          <div className="profile-toast">
            ✅ Profile saved successfully!
          </div>
        )}

        {/* Sections */}
        <div className="profile-sections">

          {/* Personal Info */}
          <div className="profile-section">
            <h3 className="profile-section-title">👤 Personal Information</h3>
            <div className="profile-form-grid">

              <div className="profile-field">
                <label className="profile-label">Full Name</label>
                <input
                  className={`profile-input ${editing ? 'editable' : ''}`}
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="profile-field">
                <label className="profile-label">Email Address</label>
                <input
                  className={`profile-input ${editing ? 'editable' : ''}`}
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="Enter your email"
                />
              </div>

              <div className="profile-field">
                <label className="profile-label">Phone Number</label>
                <input
                  className={`profile-input ${editing ? 'editable' : ''}`}
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="+855 xx xxx xxx"
                />
              </div>

              <div className="profile-field">
                <label className="profile-label">Date of Birth</label>
                <input
                  className={`profile-input ${editing ? 'editable' : ''}`}
                  name="dob"
                  type="date"
                  value={form.dob}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              <div className="profile-field">
                <label className="profile-label">Gender</label>
                <select
                  className={`profile-input ${editing ? 'editable' : ''}`}
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  disabled={!editing}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="profile-field">
                <label className="profile-label">Address</label>
                <input
                  className={`profile-input ${editing ? 'editable' : ''}`}
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="Enter your address"
                />
              </div>

            </div>
          </div>

          {/* Health Info */}
          <div className="profile-section">
            <h3 className="profile-section-title">🩺 Health Information</h3>
            <div className="profile-form-grid">

              <div className="profile-field">
                <label className="profile-label">Blood Type</label>
                <select
                  className={`profile-input ${editing ? 'editable' : ''}`}
                  name="bloodType"
                  value={form.bloodType}
                  onChange={handleChange}
                  disabled={!editing}
                >
                  <option value="">Select blood type</option>
                  {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="profile-field">
                <label className="profile-label">Emergency Contact</label>
                <input
                  className={`profile-input ${editing ? 'editable' : ''}`}
                  name="emergency"
                  value={form.emergency}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="Emergency contact number"
                />
              </div>

              <div className="profile-field full-span">
                <label className="profile-label">Allergies / Medical Notes</label>
                <textarea
                  className={`profile-input profile-textarea ${editing ? 'editable' : ''}`}
                  name="allergies"
                  value={form.allergies}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="Any allergies or medical notes the dentist should know..."
                  rows={3}
                />
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Save Row */}
        {editing && (
          <div className="profile-bottom-save">
            <button className="profile-btn-save large" onClick={handleSave}>
              ✅ Save All Changes
            </button>
            <button className="profile-btn-cancel large" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        )}

      </div>
    </div>
  )
}