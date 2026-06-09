

// REGISTER
const register = async (req, res) => {
  try {
    const { full_name, email, phone, sex, password } = req.body;

    // Validate inputs
    if (!full_name || !email || !phone || !sex || !password) {
      return res.status(400).json({ 
        message: 'All fields (name, email, phonenumber, sex, password) are required.' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Invalid email format.' 
      });
    }

    // Validate phone number format
    const phoneRegex = /^\d{9,10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ 
        message: 'Invalid phone number format. Please enter a 9-10 digit number.' 
      });
    }

    // Validate sex value
    const validSexes = ['male', 'female'];
    if (!validSexes.includes(sex)) {
      return res.status(400).json({ 
        message: 'Invalid sex value. Please select either "male" or "female".' 
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ 
        message: 'Password must be at least 6 characters long.' 
      });
    }

    // Step 1 - Create auth account in Supabase
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })

    // Check if email already exists
    if (error && error.message === 'User already registered') {
      return res.status(400).json({ 
        message: 'Email already registered.' 
      });
    }

    if (error) {
      return res.status(400).json({ 
        message: error.message 
      });
    }

    // Step 2 - Insert patient profile
    const { error: profileError } = await supabase
      .from('patients')
      .insert({
        id: data.user.id,
        full_name: full_name,
        email: email,
        phone: phone,
        sex: sex
      })

    if (profileError) {
      return res.status(500).json({ 
        message: 'Server error.' 
      });
    }

    // Step 3 - Success
    res.status(201).json({ 
      message: 'Account created successfully.' 
    });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// LOGIN
const login = async (req, res) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password
  })

  if (error) {
    return res.status(401).json({ message: 'Invalid email or password.' })
  }

  // Check role
  const { data: admin } = await supabase
    .from('admins')
    .select('id')
    .eq('id', data.user.id)
    .single()

  if (admin) {
    return res.status(200).json({ user: data.user, role: 'admin' })
  }

  const { data: patient } = await supabase
    .from('patients')
    .select('id')
    .eq('id', data.user.id)
    .single()

  if (patient) {
    return res.status(200).json({ user: data.user, role: 'patient' })
  }

  return res.status(404).json({ message: 'Account not found.' })
}
// LOGOUT
const logout = async (req, res) => {
  try {
    
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut()

    if (error) {
      return res.status(500).json({ 
        message: 'Server error.' 
      });
    }

    // Success
    res.json({ 
      message: 'Logged out successfully.' 
    });

  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};
// Step 1 - Send reset email
const handleForgotPassword = async () => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://yourapp.com/reset-password'
  })

  if (error) {
    alert(error.message)
    return
  }

  alert('Check your email for the reset link!')
}

// Step 2 - On reset-password page
const handleResetPassword = async () => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  })

  if (error) {
    alert(error.message)
    return
  }

  alert('Password updated successfully!')
  redirect('/login')
}

export { register, login, logout, handleForgotPassword, handleResetPassword };