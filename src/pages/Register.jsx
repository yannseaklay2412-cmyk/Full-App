import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'

export default function Register() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleRegister = (e) => {
    e.preventDefault()

    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setError('Please fill all fields')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]')

    const exist = users.find(u => u.email === form.email)

    if (exist) {
      setError('Email already registered')
      return
    }

    users.push({
      id: Date.now(),
      name: form.username,
      email: form.email,
      password: form.password
    })

    localStorage.setItem('users', JSON.stringify(users))

    setSuccess('Account created successfully')

    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }

  return (
    <div className="register-page">

      <nav className="register-nav">
        <div className="logo">DentalCare</div>

        <div className="nav-buttons">
          <button onClick={() => navigate('/login')} className="nav-btn">
            Sign In
          </button>

          <button className="nav-btn active">
            Sign Up
          </button>
        </div>
      </nav>

      <div className="register-main">

        <div className="register-card">

          <h2>Create Account</h2>

          <form onSubmit={handleRegister} className="register-form">

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
            />

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <button type="submit" className="btn-register">
              Sign Up
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}