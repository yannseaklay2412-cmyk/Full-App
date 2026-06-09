import { supabase } from './config/supabase.js'

// REGISTER
const register = async (req, res) => {
  try {
    const { full_name, email, phone, sex, password } = req.body

    // Validate inputs
    if (!full_name || !email || !phone || !sex || !password) {
      return res.status(400).json({ message: 'All fields are required.' })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' })
    }

    // Validate phone
    const phoneRegex = /^\d{9,10}$/
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: 'Invalid phone number.' })
    }

    // Validate sex
    if (!['male', 'female'].includes(sex)) {
      return res.status(400).json({ message: 'Invalid sex value.' })
    }

    // Validate password
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' })
    }

    // Step 1 - Create auth account
    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
      if (error.message === 'User already registered') {
        return res.status(400).json({ message: 'Email already registered.' })
      }
      return res.status(400).json({ message: error.message })
    }

    // Step 2 - Insert patient profile
    const { error: profileError } = await supabase
      .from('patients')
      .insert({
        id: data.user.id,
        full_name,
        email,
        phone,
        sex
      })

    if (profileError) {
      return res.status(500).json({ message: 'Failed to create profile.' })
    }

    // Step 3 - Success
    res.status(201).json({ message: 'Account created successfully.' })

  } catch (err) {
    console.error('Registration error:', err)
    res.status(500).json({ message: 'Server error.' })
  }
}

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' })
    }

    // Sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    // Check if admin
    const { data: admin } = await supabase
      .from('admins')
      .select('id')
      .eq('id', data.user.id)
      .single()

    if (admin) {
      return res.status(200).json({ user: data.user, role: 'admin' })
    }

    // Check if patient
    const { data: patient } = await supabase
      .from('patients')
      .select('id')
      .eq('id', data.user.id)
      .single()

    if (patient) {
      return res.status(200).json({ user: data.user, role: 'patient' })
    }

    // No role found
    await supabase.auth.signOut()
    return res.status(404).json({ message: 'Account not found.' })

  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: 'Server error.' })
  }
}

// LOGOUT
const logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return res.status(500).json({ message: 'Logout failed.' })
    }

    res.json({ message: 'Logged out successfully.' })

  } catch (err) {
    console.error('Logout error:', err)
    res.status(500).json({ message: 'Server error.' })
  }
}

// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: 'Email is required.' })
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.FRONTEND_URL}/reset-password`
    })

    if (error) {
      return res.status(400).json({ message: error.message })
    }

    res.json({ message: 'Password reset email sent.' })

  } catch (err) {
    console.error('Forgot password error:', err)
    res.status(500).json({ message: 'Server error.' })
  }
}

// RESET PASSWORD
const resetPassword = async (req, res) => {
  try {
    const { password } = req.body

    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' })
    }

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      return res.status(400).json({ message: error.message })
    }

    res.json({ message: 'Password updated successfully.' })

  } catch (err) {
    console.error('Reset password error:', err)
    res.status(500).json({ message: 'Server error.' })
  }
}

export { register, login, logout, forgotPassword, resetPassword }