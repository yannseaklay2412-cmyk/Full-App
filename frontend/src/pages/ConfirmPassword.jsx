import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import './Login.css'
import './ResetPassword.css'

export default function ConfirmPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const navigate = useNavigate()

  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('This confirmation link is invalid or broken.')
      return
    }

    api.post('/auth/confirm-password', { token })
      .then(() => setStatus('success'))
      .catch(err => {
        setStatus('error')
        setMessage(err.response?.data?.message || 'This link is invalid or has expired.')
      })
  }, [token])

  return (
    <div className="auth-page">
      <div className="rp-center">

        <div className="rp-logo" onClick={() => navigate('/')}>
          <span className="logo-icon">🦷</span>
          <span className="rp-logo-text">
            <span style={{ color: '#13a3ab' }}>Tooth</span>
            <span style={{ color: '#2ec4b6' }}>Time</span>
          </span>
        </div>

        <div className="auth-card rp-card">
          {status === 'loading' && (
            <div className="forgot-sent-wrap">
              <span className="auth-spinner" style={{ width: 32, height: 32, borderWidth: 3 }}></span>
              <h2>Confirming...</h2>
              <p>Please wait while we update your password.</p>
            </div>
          )}

          {status === 'success' && (
            <div className="forgot-sent-wrap">
              <div className="rp-icon">✅</div>
              <h2>Password Updated!</h2>
              <p>Your password has been changed successfully. You can now sign in with your new password.</p>
              <button className="auth-btn" onClick={() => navigate('/login')}>
                Sign In Now
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="forgot-sent-wrap">
              <div className="rp-icon">❌</div>
              <h2>Link Expired</h2>
              <p>{message}</p>
              <button className="auth-btn" onClick={() => navigate('/login')}>
                Try Again
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
