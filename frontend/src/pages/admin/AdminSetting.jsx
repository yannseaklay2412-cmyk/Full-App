import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../config/supabaseClient'
import './AdminSetting.css'

const sidebarItems = [
  { label: 'Dashboard',   path: '/admin'               },
  { label: 'Schedule',    path: '/admin/schedule'      },
  { label: 'Employees',   path: '/admin/dentists'      },
  { label: 'Appointment', path: '/admin/appointments'  },
  { label: 'Record',      path: '/admin/users'         },
  { label: 'Setting',     path: '/admin/AdminSetting'  },
]

export default function AdminSettings() {
  const navigate = useNavigate()

  const [currentEmail, setCurrentEmail]        = useState('')
  const [currentPassword, setCurrentPassword]  = useState('')
  const [newEmail, setNewEmail]                = useState('')
  const [newPassword, setNewPassword]          = useState('')
  const [confirmPassword, setConfirmPassword]  = useState('')

  const [loading, setLoading]   = useState(false)
  const [message, setMessage]   = useState(null)

  // ── Save Changes ─────────────────────────────────────────────
  const handleUpdate = async (e) => {
    e.preventDefault()
    setMessage(null)

    if (!currentEmail) {
      setMessage({ type: 'error', text: 'Please enter your current email.' })
      return
    }
    if (!currentPassword) {
      setMessage({ type: 'error', text: 'Please enter your current password to confirm changes.' })
      return
    }
    if (!newEmail && !newPassword) {
      setMessage({ type: 'error', text: 'Enter a new email or new password to update.' })
      return
    }
    if (newPassword && newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New password and confirmation do not match.' })
      return
    }
    if (newPassword && newPassword.length < 6) {
      setMessage({ type: 'error', text: 'New password must be at least 6 characters.' })
      return
    }

    setLoading(true)
    try {
      // Step 1: re-authenticate using the current email + password they typed
      const { error: reauthError } = await supabase.auth.signInWithPassword({
        email: currentEmail,
        password: currentPassword,
      })
      if (reauthError) {
        setMessage({ type: 'error', text: 'Current email or password is incorrect.' })
        setLoading(false)
        return
      }

      // Step 2: build update payload
      const updatePayload = {}
      if (newEmail && newEmail !== currentEmail) updatePayload.email = newEmail
      if (newPassword) updatePayload.password = newPassword

      if (Object.keys(updatePayload).length === 0) {
        setMessage({ type: 'error', text: 'No changes to save. Enter a new email or new password.' })
        setLoading(false)
        return
      }

      const { data: updatedUser, error: updateError } = await supabase.auth.updateUser(updatePayload)
      if (updateError) {
        console.error('updateUser error:', updateError)
        setMessage({ type: 'error', text: updateError.message })
        setLoading(false)
        return
      }

      // Step 3: sync profiles table if email changed
      if (newEmail) {
        await supabase
          .from('profiles')
          .update({ email: newEmail })
          .eq('id', updatedUser.user.id)
      }

      setMessage({
        type: 'success',
        text: newEmail
          ? 'Email updated! Check your new inbox to confirm the change.'
          : 'Password updated successfully.',
      })
      setCurrentEmail('')
      setCurrentPassword('')
      setNewEmail('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", background: '#f0f2f5' }}>

      {/* SIDEBAR */}
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
          <p style={{ fontSize: 11, color: '#4ecdc4', fontWeight: 500 }}>Home / Setting</p>
        </div>
        {sidebarItems.map(item => (
          <div key={item.path} onClick={() => navigate(item.path)}
            style={{
              padding: '11px 20px', fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
              background: window.location.pathname === item.path ? 'rgba(78,205,196,0.1)' : 'transparent',
              borderLeft: window.location.pathname === item.path ? '3px solid #4ecdc4' : '3px solid transparent',
              color: window.location.pathname === item.path ? '#4ecdc4' : '#8a9fc4',
            }}>
            {item.label}
          </div>
        ))}
        <div style={{ marginTop: 'auto', padding: '0 16px' }}>
          <button onClick={() => { navigate('/login') }}
            style={{ width: '100%', background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.25)', color: '#ff6b6b', padding: 9, borderRadius: 8, fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* TOP BAR */}
        <div style={{ background: '#fff', borderBottom: '1px solid #e8ecf0', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <p style={{ fontSize: 11, color: '#8a9fc4' }}>Dashboard</p>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1b3e' }}>Home / Setting</p>
          </div>
          <button onClick={() => navigate('/admin')}
            style={{ background: '#0d1b3e', border: 'none', color: '#fff', padding: '7px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            ← Back
          </button>
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div className="as-wrap" style={{ position: 'relative', minHeight: 'unset', padding: 0, background: 'transparent' }}>
      <div className="as-blob1"></div>
      <div className="as-blob2"></div>
      <div className="as-card">
        <div className="as-header">
          <div className="as-avatar">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div>
            <h2 className="as-title">Admin Settings</h2>
            <p className="as-subtitle">Update your login email or password</p>
          </div>
        </div>

        {message && (
          <div className={`as-message ${message.type === 'error' ? 'as-message-error' : 'as-message-success'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleUpdate} className="as-form">

          {/* ── Current credentials ── */}
          <div className="as-field">
            <label className="as-label">Current Email</label>
            <div className="as-input-wrap">
              <i className="ti ti-mail as-icon" aria-hidden="true"></i>
              <input
                type="email"
                className="as-input"
                placeholder="Your current email"
                value={currentEmail}
                onChange={e => setCurrentEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="as-field">
            <label className="as-label">Current Password</label>
            <div className="as-input-wrap">
              <i className="ti ti-lock as-icon" aria-hidden="true"></i>
              <input
                type="password"
                className="as-input"
                placeholder="Your current password"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
          </div>

          <div className="as-divider" />

          {/* ── New credentials ── */}
          <div className="as-field">
            <label className="as-label">New Email</label>
            <div className="as-input-wrap">
              <i className="ti ti-mail as-icon" aria-hidden="true"></i>
              <input
                type="email"
                className="as-input"
                placeholder="Leave blank to keep current email"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="as-field">
            <label className="as-label">New Password</label>
            <div className="as-input-wrap">
              <i className="ti ti-lock as-icon" aria-hidden="true"></i>
              <input
                type="password"
                className="as-input"
                placeholder="Leave blank to keep current password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
          </div>

          <div className="as-field">
            <label className="as-label">Confirm New Password</label>
            <div className="as-input-wrap">
              <i className="ti ti-lock as-icon" aria-hidden="true"></i>
              <input
                type="password"
                className="as-input"
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
          </div>

          <div className="as-actions">
            <button
              type="button"
              className="as-btn as-btn-secondary"
              onClick={() => navigate('/admin')}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="as-btn as-btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
      </div>
        </div>
      </div>
    </div>
  )
}