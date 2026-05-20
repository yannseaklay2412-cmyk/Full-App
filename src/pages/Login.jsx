// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import './Login.css'
// import { useAuth } from '../context/AuthContext'
// export default function Login() {
//   const navigate = useNavigate()
//   const [tab, setTab] = useState('signin')
//   const { login } = useAuth()
//   const [loginForm, setLoginForm] = useState({ email: '', password: '' })
//   const [loginError, setLoginError] = useState('')
//   const [loginLoading, setLoginLoading] = useState(false)
//   const [showLoginPass, setShowLoginPass] = useState(false)

//   const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirm: '' })
//   const [registerError, setRegisterError] = useState('')
//   const [registerSuccess, setRegisterSuccess] = useState('')
//   const [registerLoading, setRegisterLoading] = useState(false)
//   const [showRegPass, setShowRegPass] = useState(false)
//   const [showRegConfirm, setShowRegConfirm] = useState(false)

//   const handleLogin = (e) => {
//     e.preventDefault()
//     setLoginError('')
//     if (!loginForm.email || !loginForm.password) {
//       setLoginError('Please fill in all fields.'); return
//     }
//     setLoginLoading(true)
//     const users = JSON.parse(localStorage.getItem('users') || '[]')
//     const found = users.find(u => u.email === loginForm.email && u.password === loginForm.password)
//     const isAdmin = loginForm.email === 'admin@dental.com' && loginForm.password === 'admin123'
//     setTimeout(() => {
//       setLoginLoading(false)
//       if (isAdmin) {
//         login({ id: 'admin', name: 'Admin', email: loginForm.email, role: 'admin' })
//         navigate('/admin')
//       } else if (found) {
//         login({ ...found, role: 'user' })
//         navigate('/dashboard')
//       } else {
//         setLoginError('Invalid email or password.')
//       }
//     }, 800)
//   }

//   const handleRegister = (e) => {
//     e.preventDefault()
//     setRegisterError('')
//     setRegisterSuccess('')
//     if (!registerForm.name || !registerForm.email || !registerForm.password || !registerForm.confirm) {
//       setRegisterError('Please fill in all fields.'); return
//     }
//     if (registerForm.password !== registerForm.confirm) {
//       setRegisterError('Passwords do not match.'); return
//     }
//     if (registerForm.password.length < 6) {
//       setRegisterError('Password must be at least 6 characters.'); return
//     }
//     const users = JSON.parse(localStorage.getItem('users') || '[]')
//     if (users.find(u => u.email === registerForm.email)) {
//       setRegisterError('Email already registered.'); return
//     }
//     setRegisterLoading(true)
//     setTimeout(() => {
//       users.push({ id: Date.now(), name: registerForm.name, email: registerForm.email, password: registerForm.password, createdAt: new Date().toISOString() })
//       localStorage.setItem('users', JSON.stringify(users))
//       setRegisterLoading(false)
//       setRegisterSuccess('Account created! Redirecting to sign in...')
//       setRegisterForm({ name: '', email: '', password: '', confirm: '' })
//       setTimeout(() => { setTab('signin'); setRegisterSuccess('') }, 1800)
//     }, 800)
//   }

//   const EyeIcon = () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
//       <circle cx="12" cy="12" r="3"/>
//     </svg>
//   )

//   const EyeOffIcon = () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
//       <line x1="1" y1="1" x2="23" y2="23"/>
//     </svg>
//   )

//   return (
//     <div className="auth-page">

//       {/* NAVBAR */}
//       <nav className="auth-nav">
//         <div className="auth-logo" onClick={() => navigate('/')}>
//           <div className="nav-logo">
//             <span className="logo-icon">🦷</span>
//             <div style={{ marginLeft: '15px', fontFamily: 'Playfair Display' }}>SMILLY</div>
//           </div>
//         </div>
//         <ul className="auth-nav-links">
//           <li><a href="/">Home</a></li>
//           <li><a href="/#about">About</a></li>
//           <li><a href="/#appointment">Appointment</a></li>
//           <li><a href="/#contact">Contact Us</a></li>
//         </ul>
//       </nav>

//       {/* MAIN — full height split */}
//       <div className="auth-main">

//         {/* LEFT */}
//         <div className="auth-left">
//           <div className="auth-left-inner">
//             <div className="auth-badge">Dental Care</div>
//             <h1 className="auth-heading">
//               Your Perfect<br />
//               <span className="auth-heading-teal">Smile Starts</span><br />
//               Here
//             </h1>
//             <p className="auth-desc">
//               Book appointments, track your dental health, and connect with our expert specialists — all in one place.
//             </p>
//             <div className="auth-features">
//               <div className="auth-feature">
//                 <div className="auth-feature-icon">
//                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                     <polyline points="20 6 9 17 4 12"/>
//                   </svg>
//                 </div>
//                 <span>Easy online booking</span>
//               </div>
//               <div className="auth-feature">
//                 <div className="auth-feature-icon">
//                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                     <polyline points="20 6 9 17 4 12"/>
//                   </svg>
//                 </div>
//                 <span>Expert dental specialists</span>
//               </div>
//               <div className="auth-feature">
//                 <div className="auth-feature-icon">
//                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                     <polyline points="20 6 9 17 4 12"/>
//                   </svg>
//                 </div>
//                 <span>Track your appointments</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="auth-right">

//           {/* TABS at the top */}
//           <div className="auth-tabs-wrap">
//             <div className="auth-tabs">
//               <button
//                 className={`auth-tab ${tab === 'signin' ? 'active' : ''}`}
//                 onClick={() => { setTab('signin'); setLoginError('') }}
//               >
//                 Sign In
//               </button>
//               <button
//                 className={`auth-tab ${tab === 'signup' ? 'active' : ''}`}
//                 onClick={() => { setTab('signup'); setRegisterError(''); setRegisterSuccess('') }}
//               >
//                 Sign Up
//               </button>
//             </div>
//           </div>

//           {/* CARD */}
//           <div className="auth-card">

//             {/* ── SIGN IN ── */}
//             {tab === 'signin' && (
//               <div className="auth-form-wrap">
//                 <div className="auth-form-header">
//                   <h2>Welcome back</h2>
//                   <p>Sign in to access your account</p>
//                 </div>
//                 <form className="auth-form" onSubmit={handleLogin}>
//                   <div className="auth-field">
//                     <label>Email Address</label>
//                     <input
//                       type="email"
//                       placeholder="you@example.com"
//                       value={loginForm.email}
//                       onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
//                       className="auth-input"
//                     />
//                   </div>
//                   <div className="auth-field">
//                     <label>Password</label>
//                     <div className="auth-pass-wrap">
//                       <input
//                         type={showLoginPass ? 'text' : 'password'}
//                         placeholder="Enter your password"
//                         value={loginForm.password}
//                         onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
//                         className="auth-input"
//                       />
//                       <button type="button" className="pass-toggle" onClick={() => setShowLoginPass(!showLoginPass)}>
//                         {showLoginPass ? <EyeOffIcon /> : <EyeIcon />}
//                       </button>
//                     </div>
//                   </div>
//                   {loginError && <p className="auth-error">{loginError}</p>}
//                   <button type="submit" className="auth-btn" disabled={loginLoading}>
//                     {loginLoading ? <span className="auth-spinner"></span> : 'Sign In'}
//                   </button>
//                 </form>
//                 <p className="auth-switch">
//                   Don't have an account?{' '}
//                   <span onClick={() => setTab('signup')}>Create one</span>
//                 </p>
//               </div>
//             )}

//             {/* ── SIGN UP ── */}
//             {tab === 'signup' && (
//               <div className="auth-form-wrap">
//                 <div className="auth-form-header">
//                   <h2>Create account</h2>
//                   <p>Fill in your details to get started</p>
//                 </div>
//                 <form className="auth-form" onSubmit={handleRegister}>
//                   <div className="auth-field">
//                     <label>Full Name</label>
//                     <input
//                       type="text"
//                       placeholder="John Doe"
//                       value={registerForm.name}
//                       onChange={e => setRegisterForm({ ...registerForm, name: e.target.value })}
//                       className="auth-input"
//                     />
//                   </div>
//                   <div className="auth-field">
//                     <label>Email Address</label>
//                     <input
//                       type="email"
//                       placeholder="you@example.com"
//                       value={registerForm.email}
//                       onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })}
//                       className="auth-input"
//                     />
//                   </div>
//                   <div className="auth-field">
//                     <label>Password</label>
//                     <div className="auth-pass-wrap">
//                       <input
//                         type={showRegPass ? 'text' : 'password'}
//                         placeholder="Min. 6 characters"
//                         value={registerForm.password}
//                         onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })}
//                         className="auth-input"
//                       />
//                       <button type="button" className="pass-toggle" onClick={() => setShowRegPass(!showRegPass)}>
//                         {showRegPass ? <EyeOffIcon /> : <EyeIcon />}
//                       </button>
//                     </div>
//                   </div>
//                   <div className="auth-field">
//                     <label>Confirm Password</label>
//                     <div className="auth-pass-wrap">
//                       <input
//                         type={showRegConfirm ? 'text' : 'password'}
//                         placeholder="Re-enter your password"
//                         value={registerForm.confirm}
//                         onChange={e => setRegisterForm({ ...registerForm, confirm: e.target.value })}
//                         className="auth-input"
//                       />
//                       <button type="button" className="pass-toggle" onClick={() => setShowRegConfirm(!showRegConfirm)}>
//                         {showRegConfirm ? <EyeOffIcon /> : <EyeIcon />}
//                       </button>
//                     </div>
//                   </div>
//                   {registerError   && <p className="auth-error">{registerError}</p>}
//                   {registerSuccess && <p className="auth-success">{registerSuccess}</p>}
//                   <button type="submit" className="auth-btn" disabled={registerLoading}>
//                     {registerLoading ? <span className="auth-spinner"></span> : 'Create Account'}
//                   </button>
//                 </form>
//                 <p className="auth-switch">
//                   Already have an account?{' '}
//                   <span onClick={() => setTab('signin')}>Sign in</span>
//                 </p>
//               </div>
//             )}

//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { useAuth } from '../context/AuthContext'
import { DataStorage } from '../seeders/data'

export default function Login() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('signin')
  const { login } = useAuth()
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [showLoginPass, setShowLoginPass] = useState(false)

  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [registerError, setRegisterError] = useState('')
  const [registerSuccess, setRegisterSuccess] = useState('')
  const [registerLoading, setRegisterLoading] = useState(false)
  const [showRegPass, setShowRegPass] = useState(false)
  const [showRegConfirm, setShowRegConfirm] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setLoginError('')
    if (!loginForm.email || !loginForm.password) {
      setLoginError('Please fill in all fields.'); return
    }
    setLoginLoading(true)
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const found = users.find(u => u.email === loginForm.email && u.password === loginForm.password)

    // ✅ Use seeder instead of hardcoded credentials
    const isAdmin = loginForm.email === DataStorage.adminCredentials.email
                 && loginForm.password === DataStorage.adminCredentials.password

    setTimeout(() => {
      setLoginLoading(false)
      if (isAdmin) {
        login({ id: 'admin', name: 'Admin', email: loginForm.email, role: 'admin' })
        navigate('/admin')
      } else if (found) {
        login({ ...found, role: 'user' })
        navigate('/dashboard')
      } else {
        setLoginError('Invalid email or password.')
      }
    }, 800)
  }

  const handleRegister = (e) => {
    e.preventDefault()
    setRegisterError('')
    setRegisterSuccess('')
    if (!registerForm.name || !registerForm.email || !registerForm.password || !registerForm.confirm) {
      setRegisterError('Please fill in all fields.'); return
    }
    if (registerForm.password !== registerForm.confirm) {
      setRegisterError('Passwords do not match.'); return
    }
    if (registerForm.password.length < 6) {
      setRegisterError('Password must be at least 6 characters.'); return
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.find(u => u.email === registerForm.email)) {
      setRegisterError('Email already registered.'); return
    }
    setRegisterLoading(true)
    setTimeout(() => {
      users.push({ id: Date.now(), name: registerForm.name, email: registerForm.email, password: registerForm.password, createdAt: new Date().toISOString() })
      localStorage.setItem('users', JSON.stringify(users))
      setRegisterLoading(false)
      setRegisterSuccess('Account created! Redirecting to sign in...')
      setRegisterForm({ name: '', email: '', password: '', confirm: '' })
      setTimeout(() => { setTab('signin'); setRegisterSuccess('') }, 1800)
    }, 800)
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
                  <button type="submit" className="auth-btn" disabled={loginLoading}>
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
                    <label>Password</label>
                    <div className="auth-pass-wrap">
                      <input
                        type={showRegPass ? 'text' : 'password'}
                        placeholder="Min. 6 characters"
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
                  {registerError   && <p className="auth-error">{registerError}</p>}
                  {registerSuccess && <p className="auth-success">{registerSuccess}</p>}
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