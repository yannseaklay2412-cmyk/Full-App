import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../config/supabaseClient.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [role, setRole]       = useState(null)
  const [loading, setLoading] = useState(true)

  // Check role from database based on email
  const checkRole = async (userEmail) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('email', userEmail)
      .maybeSingle()

    if (error || !data) { setRole(null); return null }
    setRole(data.role)
    return data
  }

  useEffect(() => {
    // Step 1 — get current session on load
    supabase.auth.getSession().then(async({ data: { session } }) => {
      if (session) {
        setUser(session.user)
        await checkRole(session.user.email)
      }
      setLoading(false)
    })

    // Step 2 — listen for auth changes
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

    // Step 3 — cleanup
    return () => subscription.unsubscribe()
  }, [])

  // ── Login ──────────────────────────────────────────────────────────────
const login = async (email, password) => {
  // 1. Sign in with Supabase
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }

  // 2. Check role / ban status — guarded against checkRole throwing
  let profile
  try {
    profile = await checkRole(data.user.email)
  } catch (err) {
    console.error('Role check failed:', err.message)
    return { error: 'Could not verify account. Please try again.' }
  }

  if (profile?.is_banned) {
    await supabase.auth.signOut()
    setUser(null)
    setRole(null)
    return { error: 'Your account has been banned. Please contact support.' }
  }

  const userRole = profile?.role
  setUser(data.user)
  setRole(userRole)

  // 3. Get JWT from backend — with proper error handling
  try {
    const res = await fetch('https://full-app-9w8w.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      console.error('Backend login failed:', errData.message || res.status)
      // Still return success — Supabase login worked, JWT just failed
      return { data, role: userRole }
    }

    const backendData = await res.json()

    if (backendData.token) {
      localStorage.setItem('token', backendData.token)
    } else {
      console.warn('Backend did not return a token')
    }
  } catch (fetchErr) {
    // Backend unreachable — don't block the user from logging in
    console.warn('Could not reach backend for JWT:', fetchErr.message)
  }

  return { data, role: userRole }
}

  // ── Logout ─────────────────────────────────────────────────────────────
  const logout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('token')
    setUser(null)
    setRole(null)
  }

  const isAdmin        = role === 'admin'
  const isPatient      = role === 'patient'
  const isAuthenticated = !!user
  const hasRole        = (requiredRole) => role === requiredRole

  return (
    <AuthContext.Provider value={{
      user, role, loading,
      login, logout,
      isAdmin, isPatient, isAuthenticated, hasRole,
    }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)