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

  // 2. Check role — guarded against checkRole throwing
  let profile
  try {
    profile = await checkRole(data.user.email)
  } catch (err) {
    console.error('Role check failed:', err.message)
    return { error: 'Could not verify account. Please try again.' }
  }

  // 2b. Check ban status — lives on the patients table, not profiles
  const { data: patientRow } = await supabase
    .from('patients')
    .select('is_banned')
    .eq('email', email)
    .maybeSingle()

  if (patientRow?.is_banned) {
    await supabase.auth.signOut()
    setUser(null)
    setRole(null)
    return { error: 'Your account has been banned. Please contact support.' }
  }

  const userRole = profile?.role
  setUser(data.user)
  setRole(userRole)

  return { data, role: userRole }
}

  // ── Logout ─────────────────────────────────────────────────────────────
  const logout = async () => {
    await supabase.auth.signOut()
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