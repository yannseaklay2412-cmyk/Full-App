import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../config/supabaseClient'
import AdminSidebar from '../../components/AdminSidebar'
import Toast from '../../components/ui/Toast'
import './AdminSetting.css'

export default function AdminSettings() {
  const navigate = useNavigate()

  const [currentEmail, setCurrentEmail]       = useState('')
  const [newEmail, setNewEmail]               = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword]         = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading]                 = useState(false)
  const [toast, setToast]                     = useState(null)

  const showToast = (text, type = 'success') => setToast({ text, type })
  const clearToast = () => setToast(null)

  const handleUpdate = async (e) => {
    e.preventDefault()

    if (!currentEmail) return showToast('Please enter your current email.', 'error')
    if (!currentPassword) return showToast('Please enter your current password.', 'error')
    if (!newEmail && !newPassword) return showToast('Enter a new email or new password to update.', 'error')
    if (newPassword && newPassword !== confirmPassword) return showToast('Passwords do not match.', 'error')
    if (newPassword && newPassword.length < 8) return showToast('New password must be at least 8 characters.', 'error')

    setLoading(true)
    try {
      const { error: reauthError } = await supabase.auth.signInWithPassword({
        email: currentEmail,
        password: currentPassword,
      })
      if (reauthError) {
        showToast('Current email or password is incorrect.', 'error')
        setLoading(false)
        return
      }

      const updatePayload = {}
      if (newEmail && newEmail !== currentEmail) updatePayload.email = newEmail
      if (newPassword) updatePayload.password = newPassword

      if (Object.keys(updatePayload).length === 0) {
        showToast('No changes to save.', 'error')
        setLoading(false)
        return
      }

      const { data: updatedUser, error: updateError } = await supabase.auth.updateUser(updatePayload)
      if (updateError) {
        showToast(updateError.message, 'error')
        setLoading(false)
        return
      }

      if (newEmail) {
        await supabase.from('profiles').update({ email: newEmail }).eq('id', updatedUser.user.id)
      }

      showToast(newEmail ? 'Email updated! Check your inbox to confirm.' : 'Password updated successfully.')
      setCurrentEmail(''); setCurrentPassword('')
      setNewEmail(''); setNewPassword(''); setConfirmPassword('')
    } catch {
      showToast('Something went wrong. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminSidebar pageTitle="Account Settings" pageSubtitle="Home / Setting">
      <Toast message={toast?.text} type={toast?.type} onClose={clearToast} />

      <div className="as-page">
        <form onSubmit={handleUpdate} className="as-grid">

          {/* ── Change Email ── */}
          <div className="as-card">
            <div className="as-card-header">
              <div className="as-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                  <line x1="18" y1="8" x2="23" y2="13"/>
                  <line x1="23" y1="8" x2="18" y2="13"/>
                </svg>
              </div>
              <h2 className="as-card-title">CHANGE EMAIL</h2>
            </div>

            <div className="as-field">
              <label className="as-label">Current Email</label>
              <div className="as-input-wrap">
                <svg className="as-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                <input type="email" className="as-input" placeholder="current.user@email.com"
                  value={currentEmail} onChange={e => setCurrentEmail(e.target.value)} />
              </div>
            </div>

            <div className="as-field">
              <label className="as-label">New Email</label>
              <div className="as-input-wrap">
                <svg className="as-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <input type="email" className="as-input" placeholder="Enter new email address"
                  value={newEmail} onChange={e => setNewEmail(e.target.value)} />
              </div>
              <p className="as-hint">Verify your email address before saving.</p>
            </div>
          </div>

          {/* ── Update Password ── */}
          <div className="as-card">
            <div className="as-card-header">
              <div className="as-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h2 className="as-card-title">UPDATE PASSWORD</h2>
            </div>

            <div className="as-field">
              <label className="as-label">Current Password</label>
              <div className="as-input-wrap">
                <svg className="as-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                </svg>
                <input type="password" className="as-input" placeholder="Enter current password"
                  value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
              </div>
              <p className="as-hint">Required to make changes.</p>
            </div>

            <div className="as-field">
              <label className="as-label">New Password</label>
              <div className="as-input-wrap">
                <svg className="as-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                <input type="password" className="as-input" placeholder="Enter complex new password"
                  value={newPassword} onChange={e => setNewPassword(e.target.value)} />
              </div>
              <p className="as-hint">Must be at least 8 characters.</p>
            </div>

            <div className="as-field">
              <label className="as-label">Confirm New Password</label>
              <div className="as-input-wrap">
                <svg className="as-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                <input type="password" className="as-input" placeholder="Re-enter new password to confirm"
                  value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              </div>
              <p className="as-hint">Passwords must match.</p>
            </div>
          </div>

          {/* ── Actions ── */}
          <div className="as-actions">
            <button type="button" className="as-btn as-btn-cancel"
              onClick={() => navigate('/admin')} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="as-btn as-btn-save" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

        </form>
      </div>
    </AdminSidebar>
  )
}
