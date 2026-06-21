
import { supabase } from '../config/supabaseClient'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

export default function Login() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('signin')
  const { login } = useAuth()
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [loginSuccess, setLoginSuccess] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [showLoginPass, setShowLoginPass] = useState(false)

  const [registerForm, setRegisterForm] = useState({ name: '', email: '', phonenumber: '', sex: '', password: '', confirm: '' })
  const [registerError, setRegisterError] = useState('')
  const [registerSuccess, setRegisterSuccess] = useState('')
  const [registerLoading, setRegisterLoading] = useState(false)
  const [showRegPass, setShowRegPass] = useState(false)
  const [showRegConfirm, setShowRegConfirm] = useState(false)

const handleLogin = async (e) => {
  e.preventDefault()
  setLoginError('')
  setLoginLoading(true)

  try {
    // Validate inputs
    if (!loginForm.email || !loginForm.password) {
      setLoginError('Please fill in all fields.')
      return
    }

    // Attempt login
    const result = await login(
      loginForm.email,
      loginForm.password
    )

    // Login failed
    if (result.error) {
      setLoginError(result.error)
      return
    }
    if (result.role === 'admin') {
      setLoginSuccess('Welcome back, Admin! Taking you to your dashboard...')
      setTimeout(() => navigate('/admin'), 1500)
    } else if (result.role === 'patient') {
      setLoginSuccess('Welcome back! Taking you to your account...')
      setTimeout(() => navigate('/dashboard'), 1500)
    } else {
      setLoginError('No role assigned.')
    }
    // Wait a moment for role state to update
    

  } catch (error) {
    console.error('Login Error:', error)
    setLoginError(error.message || 'Login failed.')
  } finally {
    setLoginLoading(false)
  }
}

const handleRegister = async (e) => {
  e.preventDefault()

  setRegisterError('')
  setRegisterSuccess('')

  // Validate inputs
  if (
    !registerForm.name ||
    !registerForm.email ||
    !registerForm.phonenumber ||
    !registerForm.sex ||
    !registerForm.password ||
    !registerForm.confirm
  ) {
    setRegisterError('Please fill in all fields.')
    return
  }

  // Check passwords match
  if (registerForm.password !== registerForm.confirm) {
    setRegisterError('Passwords do not match.')
    return
  }

  // Check password length
  if (registerForm.password.length < 6) {
    setRegisterError('Password must be at least 6 characters.')
    return
  }

  setRegisterLoading(true)

  try {
    // Step 1 - Create auth account
    const { data, error } = await supabase.auth.signUp({
      email: registerForm.email,
      password: registerForm.password
    })

    if (error) {
      setRegisterError(error.message)
      return
    }

    const userId = data.user.id

    // Step 2 - Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        email: registerForm.email,
        role: 'patient'
      })

    if (profileError) {
      setRegisterError(profileError.message)
      return
    }

    // Step 3 - Create patient record
    const { error: patientError } = await supabase
      .from('patients')
      .insert({
        id: userId,
        full_name: registerForm.name,
        email: registerForm.email,
        phone: registerForm.phonenumber,
        sex: registerForm.sex
      })

    if (patientError) {
      setRegisterError(patientError.message)
      return
    }

    // Step 4 - Success
    setRegisterSuccess(
      `Welcome, ${registerForm.name.split(' ')[0]}! Your account is ready. Please check your email to verify it.`
    )

    setRegisterForm({
      name: '',
      email: '',
      phonenumber: '',
      sex: '',
      password: '',
      confirm: ''
    })

    setTimeout(() => {
      setTab('signin')
      setRegisterSuccess('')
    }, 2000)

  } catch (error) {
    console.error('Registration Error:', error)
    setRegisterError(error.message || 'Registration failed.')
  } finally {
    setRegisterLoading(false)
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

  return (
    <div className="auth-page">

      {/* NAVBAR */}
      <nav className="auth-nav">
        <div className="auth-logo" onClick={() => navigate('/')}>
          <div className="nav-logo">
            <span className="logo-icon">🦷</span>
            <div style={{ marginLeft: '15px', fontFamily: 'Playfair Display' }}>SMILLY</div>
          </div>
        </div>
        <ul className="auth-nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/#about">About</a></li>
          <li><a href="/#appointment">Appointment</a></li>
          <li><a href="/#contact">Contact Us</a></li>
        </ul>
      </nav>

      {/* MAIN — full height split */}
      <div className="auth-main">

        {/* LEFT */}
        <div className="auth-left">
          <div className="auth-left-inner">
            <div className="auth-badge">Dental Care</div>
            <h1 className="auth-heading">
              Your Perfect<br />
              <span className="auth-heading-teal">Smile Starts</span><br />
              Here
            </h1>
            <p className="auth-desc">
              Book appointments, track your dental health, and connect with our expert specialists — all in one place.
            </p>
            <div className="auth-features">
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <span>Easy online booking</span>
              </div>
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <span>Expert dental specialists</span>
              </div>
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <span>Track your appointments</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="auth-right">

          {/* TABS at the top */}
          <div className="auth-tabs-wrap">
            <div className="auth-tabs">
              <button
                className={`auth-tab ${tab === 'signin' ? 'active' : ''}`}
                onClick={() => { setTab('signin'); setLoginError('') }}
              >
                Sign In
              </button>
              <button
                className={`auth-tab ${tab === 'signup' ? 'active' : ''}`}
                onClick={() => { setTab('signup'); setRegisterError(''); setRegisterSuccess('') }}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* CARD */}
          <div className="auth-card">

            {/* ── SIGN IN ── */}
            {tab === 'signin' && (
              <div className="auth-form-wrap">
                <div className="auth-form-header">
                  <h2>Welcome back</h2>
                  <p>Sign in to access your account</p>
                </div>
                <form className="auth-form" onSubmit={handleLogin}>
                  <div className="auth-field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={loginForm.email}
                      onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
                      className="auth-input"
                    />
                  </div>
                  <div className="auth-field">
                    <label>Password</label>
                    <div className="auth-pass-wrap">
                      <input
                        type={showLoginPass ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                        className="auth-input"
                      />
                      <button type="button" className="pass-toggle" onClick={() => setShowLoginPass(!showLoginPass)}>
                        {showLoginPass ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </div>
                  {loginError && <p className="auth-error">{loginError}</p>}
                  {loginSuccess && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: 'rgba(78,205,196,0.1)', border: '1px solid rgba(78,205,196,0.3)', borderRadius: 10 }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#2ec4b6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <p style={{ fontSize: 13, color: '#2ec4b6', fontWeight: 500, margin: 0 }}>{loginSuccess}</p>
                    </div>
                  )}
                  <button type="submit" className="auth-btn" disabled={loginLoading || !!loginSuccess}>
                    {loginLoading ? <span className="auth-spinner"></span> : 'Sign In'}
                  </button>
                </form>
                <p className="auth-switch">
                  Don't have an account?{' '}
                  <span onClick={() => setTab('signup')}>Create one</span>
                </p>
              </div>
            )}

            {/* ── SIGN UP ── */}
            {tab === 'signup' && (
              <div className="auth-form-wrap">
                <div className="auth-form-header">
                  <h2>Create account</h2>
                  <p>Fill in your details to get started</p>
                </div>
                <form className="auth-form" onSubmit={handleRegister}>
                  <div className="auth-field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={registerForm.name}
                      onChange={e => setRegisterForm({ ...registerForm, name: e.target.value })}
                      className="auth-input"
                    />
                  </div>
                    <div className="auth-field">
                      <label>Email Address</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={registerForm.email}
                        onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })}
                        className="auth-input"
                      />
                    </div>
                    <div className="auth-field">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={registerForm.phonenumber}
                        onChange={e => setRegisterForm({ ...registerForm, phonenumber: e.target.value })}
                        className="auth-input"
                      />
                    </div>
                    
                  <div className="auth-field">
                    <label>Sex</label>
                    <select
                      name="sex"
                      placeholder="Select your sex"
                      value={registerForm.sex}
                      onChange={e => setRegisterForm({ ...registerForm, sex: e.target.value })}
                      className="auth-input"
                    >  
                      <option value="">Select your sex</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  
                  <div className="auth-field">
                    <label>Password</label>
                    <div className="auth-pass-wrap">
                      <input
                        type={showRegPass ? 'text' : 'password'}
                        placeholder="Min. 4 characters"
                        value={registerForm.password}
                        onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })}
                        className="auth-input"
                      />
                      <button type="button" className="pass-toggle" onClick={() => setShowRegPass(!showRegPass)}>
                        {showRegPass ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </div>
                  <div className="auth-field">
                    <label>Confirm Password</label>
                    <div className="auth-pass-wrap">
                      <input
                        type={showRegConfirm ? 'text' : 'password'}
                        placeholder="Re-enter your password"
                        value={registerForm.confirm}
                        onChange={e => setRegisterForm({ ...registerForm, confirm: e.target.value })}
                        className="auth-input"
                      />
                      <button type="button" className="pass-toggle" onClick={() => setShowRegConfirm(!showRegConfirm)}>
                        {showRegConfirm ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </div>
                  {registerError && <p className="auth-error">{registerError}</p>}
                  {registerSuccess && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: 'rgba(78,205,196,0.1)', border: '1px solid rgba(78,205,196,0.3)', borderRadius: 10 }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#2ec4b6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <p style={{ fontSize: 13, color: '#2ec4b6', fontWeight: 500, margin: 0 }}>{registerSuccess}</p>
                    </div>
                  )}
                  <button type="submit" className="auth-btn" disabled={registerLoading}>
                    {registerLoading ? <span className="auth-spinner"></span> : 'Create Account'}
                  </button>
                </form>
                <p className="auth-switch">
                  Already have an account?{' '}
                  <span onClick={() => setTab('signin')}>Sign in</span>
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}