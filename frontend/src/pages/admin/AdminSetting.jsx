import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../config/supabaseClient'
import './AdminSetting.css'

export default function AdminSettings() {
  const navigate = useNavigate()

  const [currentEmail, setCurrentEmail]        = useState('')
  const [currentPassword, setCurrentPassword]  = useState('')
  const [newEmail, setNewEmail]                = useState('')
  const [newPassword, setNewPassword]          = useState('')
  const [confirmPassword, setConfirmPassword]  = useState('')

  const [loading, setLoading]       = useState(false)
  const [resetLoading, setResetLoading] = useState(false)
  const [message, setMessage]       = useState(null)

  // ── Forgot Password ──────────────────────────────────────────
  const handleForgotPassword = async () => {
    setMessage(null)
    if (!currentEmail) {
      setMessage({ type: 'error', text: 'Enter your current email above first.' })
      return
    }
    setResetLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(currentEmail, {
      redirectTo: window.location.origin + '/admin/AdminSetting',
    })
    setResetLoading(false)
    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ type: 'success', text: `Password reset email sent to ${currentEmail}. Check your inbox.` })
    }
  }

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
      if (newEmail) updatePayload.email = newEmail
      if (newPassword) updatePayload.password = newPassword

      const { data: updatedUser, error: updateError } = await supabase.auth.updateUser(updatePayload)
      if (updateError) {
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
    <div className="as-wrap">
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
            {/* ── Forgot password link ── */}
            <button
              type="button"
              className="as-forgot"
              onClick={handleForgotPassword}
              disabled={resetLoading}
            >
              {resetLoading ? 'Sending...' : 'Forgot password?'}
            </button>
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
  )
}