import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../config/supabaseClient.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check role from database
  const checkRole = async (userEmail) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('email', userEmail)
    .maybeSingle()

  if (error || !data) {
    setRole(null)
    return null
  }

  setRole(data.role)
  return data.role
}

  useEffect(() => {
    // Step 1 - Get current session on app load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user)
        checkRole(session.user.email)
      }
      setLoading(false)
    })

    // Step 2 - Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setUser(session.user)
          await checkRole(session.user.email)
        } else {
          setUser(null)
          setRole(null)
        }
        setLoading(false)
      }
    )

    // Step 3 - Cleanup listener
    return () => subscription.unsubscribe()
  }, [])

  // Login
 const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }

  const role = await checkRole(data.user.email)

  const apiBase = import.meta.env.VITE_API_BASE_URL || '/api'
  const res = await fetch(`${apiBase}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  const backendData = await res.json()

  localStorage.setItem('token', backendData.token)

  return { data, role }
}

  // Logout
  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setRole(null)
  }

  // Role checks
  const isAdmin = role === 'admin'
  const isPatient = role === 'patient'
  const isAuthenticated = !!user

  const hasRole = (requiredRole) => role === requiredRole

  return (
    <AuthContext.Provider value={{
      user,
      role,
      loading,
      login,
      logout,
      isAdmin,
      isPatient,
      isAuthenticated,
      hasRole
    }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)