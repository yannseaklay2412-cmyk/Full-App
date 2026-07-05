import { useState, useEffect } from 'react'
import { supabase } from '../../config/supabaseClient'
import AdminSidebar from '../../components/AdminSidebar'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const apiFetch = async (path) => {
  const { data: { session } } = await supabase.auth.getSession()
  const token = session?.access_token
  const res = await fetch(`${API}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })

export default function Concerns() {
  const [concerns, setConcerns] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiFetch('/concerns')
        setConcerns(data.data || [])
      } catch (e) {
        console.error('Failed to load concerns', e)
      }
      setLoading(false)
    }
    load()
  }, [])

  return (
    <AdminSidebar pageTitle="Dashboard" pageSubtitle="Home / Concerns">
      <div style={{ padding: 24 }}>
        <div className="ad-card">
          <div className="ad-card-header">
            <h3>Submitted Concerns</h3>
          </div>

          {loading ? (
            <div className="ad-empty">Loading…</div>
          ) : concerns.length === 0 ? (
            <div className="ad-empty">No concerns submitted yet</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {concerns.map((c, i, arr) => (
                <div key={c.id} style={{ padding: '14px 4px', borderBottom: i < arr.length - 1 ? '1px solid #f0f2f5' : 'none' }}>
                  <p style={{ fontSize: 13, color: '#0d1b3e', lineHeight: 1.6, marginBottom: 6, whiteSpace: 'pre-wrap' }}>{c.message}</p>
                  <p style={{ fontSize: 11, color: '#8a9fc4' }}>{formatDate(c.created_at)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminSidebar>
  )
}
