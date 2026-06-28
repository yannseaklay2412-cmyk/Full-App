import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import './Login.css'
import './ResetPassword.css'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const navigate = useNavigate()

  const [password, setPassword]     = useState('')
  const [confirm, setConfirm]       = useState('')
  const [showPass, setShowPass]     = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState('')
  const [success, setSuccess]       = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!password || !confirm) {
      setError('Please fill in both fields.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      await api.post('/auth/reset-password', { token, password })
      setSuccess(true)
      setTimeout(() => navigate('/login'), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Reset link is invalid or has expired.')
    } finally {
      setLoading(false)
    }
  }

  const EyeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )

  const EyeOffIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )

  // No token in URL — someone navigated here directly
  if (!token) {
    return (
      <div className="auth-page">
        <div className="rp-center">
          <div className="auth-card rp-card">
            <div className="rp-icon">⚠️</div>
            <h2>Invalid Link</h2>
            <p>This password reset link is missing or broken. Please request a new one.</p>
            <button className="auth-btn" onClick={() => navigate('/login')}>
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Success state
  if (success) {
    return (
      <div className="auth-page">
        <div className="rp-center">
          <div className="auth-card rp-card">
            <div className="rp-icon">✅</div>
            <h2>Password Updated!</h2>
            <p>Your password has been reset successfully. Redirecting you to sign in...</p>
            <button className="auth-btn" onClick={() => navigate('/login')}>
              Sign In Now
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <div className="rp-center">
        <div className="rp-logo" onClick={() => navigate('/')}>
          <span className="logo-icon">🦷</span>
          <span className="rp-logo-text">
            <span style={{ color: '#1e1e1e' }}>Tooth</span>
            <span style={{ color: '#2ec4b6' }}>Time</span>
          </span>
        </div>

        <div className="auth-card rp-card">
          <div className="auth-form-wrap">
            <div className="auth-form-header">
              <h2>Set new password</h2>
              <p>Must be at least 6 characters</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-field">
                <label>New Password</label>
                <div className="auth-pass-wrap">
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="auth-input"
                    autoFocus
                  />
                  <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              <div className="auth-field">
                <label>Confirm Password</label>
                <div className="auth-pass-wrap">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Re-enter new password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    className="auth-input"
                  />
                  <button type="button" className="pass-toggle" onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              {error && <p className="auth-error">{error}</p>}

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? <span className="auth-spinner"></span> : 'Reset Password'}
              </button>
            </form>

            <p className="auth-switch">
              Remember it?{' '}
              <span onClick={() => navigate('/login')}>Back to Sign In</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
