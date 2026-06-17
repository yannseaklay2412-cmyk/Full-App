import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import AdminLayout from '../../components/admin/AdminLayout'

const TABS = ['Dentists', 'Services']

const emptyDentist = { dentist_name: '', specialty: '', phone: '', telegram: '', background: '', age: '' }
const emptyService = { service_name: '', description: '', price: '', duration_minutes: '' }

export default function Dentists() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Dentists')

  // Dentists state
  const [dentists, setDentists] = useState([])
  const [dentistForm, setDentistForm] = useState(emptyDentist)
  const [editingDentist, setEditingDentist] = useState(null)
  const [showDentistForm, setShowDentistForm] = useState(false)
  const [dentistLoading, setDentistLoading] = useState(false)

  // Services state
  const [services, setServices] = useState([])
  const [serviceForm, setServiceForm] = useState(emptyService)
  const [editingService, setEditingService] = useState(null)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [serviceLoading, setServiceLoading] = useState(false)

  const [error, setError] = useState('')

  // ── Fetch dentists ──
  const fetchDentists = async () => {
    try {
      const res = await api.get('/dentists')
      setDentists(res.data.data || res.data)
    } catch (e) {
      setError('Failed to load dentists')
    }
  }

  // ── Fetch services ──
  const fetchServices = async () => {
    try {
      const res = await api.get('/services')
      setServices(res.data.data || res.data)
    } catch (e) {
      setError('Failed to load services')
    }
  }

  useEffect(() => {
    fetchDentists()
    fetchServices()
  }, [])

  // ── Dentist CRUD ──
  const saveDentist = async () => {
    if (!dentistForm.dentist_name || !dentistForm.specialty) return setError('Name and specialty are required')
    setDentistLoading(true)
    setError('')
    try {
      if (editingDentist) {
        await api.put(`/dentists/${editingDentist}`, dentistForm)
      } else {
        await api.post('/dentists', dentistForm)
      }
      await fetchDentists()
      resetDentistForm()
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to save dentist')
    } finally {
      setDentistLoading(false)
    }
  }

  const deleteDentist = async (id) => {
    if (!window.confirm('Delete this dentist?')) return
    try {
      await api.delete(`/dentists/${id}`)
      await fetchDentists()
    } catch (e) {
      setError('Failed to delete dentist')
    }
  }

  const startEditDentist = (d) => {
    setDentistForm({
      dentist_name: d.dentist_name || '',
      specialty: d.specialty || '',
      phone: d.phone || '',
      telegram: d.telegram || '',
      background: d.background || '',
      age: d.age || ''
    })
    setEditingDentist(d.id)
    setShowDentistForm(true)
    window.scrollTo(0, 0)
  }

  const resetDentistForm = () => {
    setDentistForm(emptyDentist)
    setEditingDentist(null)
    setShowDentistForm(false)
  }

  // ── Service CRUD ──
  const saveService = async () => {
    if (!serviceForm.service_name || !serviceForm.price) return setError('Service name and price are required')
    setServiceLoading(true)
    setError('')
    try {
      if (editingService) {
        await api.put(`/services/${editingService}`, serviceForm)
      } else {
        await api.post('/services', serviceForm)
      }
      await fetchServices()
      resetServiceForm()
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to save service')
    } finally {
      setServiceLoading(false)
    }
  }

  const deleteService = async (id) => {
    if (!window.confirm('Delete this service?')) return
    try {
      await api.delete(`/services/${id}`)
      await fetchServices()
    } catch (e) {
      setError('Failed to delete service')
    }
  }

  const startEditService = (s) => {
    setServiceForm({
      service_name: s.service_name || '',
      description: s.description || '',
      price: s.price || '',
      duration_minutes: s.duration_minutes || ''
    })
    setEditingService(s.id)
    setShowServiceForm(true)
    window.scrollTo(0, 0)
  }

  const resetServiceForm = () => {
    setServiceForm(emptyService)
    setEditingService(null)
    setShowServiceForm(false)
  }

  const inputStyle = {
    width: '100%', background: '#f5f6fa', border: '1px solid #e0e0e0',
    borderRadius: 10, color: '#0d1b3e', padding: '11px 14px',
    fontSize: 14, outline: 'none', fontFamily: "'DM Sans', sans-serif",
    boxSizing: 'border-box'
  }
  const labelStyle = {
    fontSize: 11, fontWeight: 600, color: '#8a9fc4',
    textTransform: 'uppercase', letterSpacing: 0.6,
    display: 'block', marginBottom: 6
  }

  const topBarRight = (
    <div style={{ display: 'flex', gap: 10 }}>
      <button
        onClick={() => { resetDentistForm(); resetServiceForm(); activeTab === 'Dentists' ? setShowDentistForm(true) : setShowServiceForm(true) }}
        style={{ background: '#0d1b3e', border: 'none', color: '#fff', padding: '8px 20px', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
        + Add {activeTab === 'Dentists' ? 'Employee' : 'Service'}
      </button>
      <button onClick={() => navigate('/admin')}
        style={{ background: 'transparent', border: '1px solid #e0e4ea', color: '#666', padding: '8px 18px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
        ← Back
      </button>
    </div>
  )

  return (
    <AdminLayout pageLabel={activeTab} topBarRight={topBarRight}>

          {/* ERROR */}
          {error && (
            <div style={{ background: '#fff0f0', border: '1px solid #ffcccc', color: '#cc0000', padding: '10px 16px', borderRadius: 10, marginBottom: 16, fontSize: 13 }}>
              {error}
            </div>
          )}

          {/* TABS */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{
                  padding: '8px 24px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", border: 'none',
                  background: activeTab === tab ? '#0d1b3e' : '#fff',
                  color: activeTab === tab ? '#fff' : '#8a9fc4',
                  boxShadow: activeTab === tab ? 'none' : '0 1px 4px rgba(0,0,0,0.08)'
                }}>
                {tab}
              </button>
            ))}
          </div>

          {/* ── DENTISTS TAB ── */}
          {activeTab === 'Dentists' && (
            <>
              {/* Dentist Form */}
              {showDentistForm && (
                <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #e0e4ea' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d1b3e', marginBottom: 24 }}>
                    {editingDentist ? 'Edit Employee' : 'Add New Employee'}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input value={dentistForm.dentist_name} onChange={e => setDentistForm({ ...dentistForm, dentist_name: e.target.value })} placeholder="Dr. John Smith" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Specialty *</label>
                      <input value={dentistForm.specialty} onChange={e => setDentistForm({ ...dentistForm, specialty: e.target.value })} placeholder="Orthodontist" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone</label>
                      <input value={dentistForm.phone} onChange={e => setDentistForm({ ...dentistForm, phone: e.target.value })} placeholder="+855 12 345 678" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Telegram</label>
                      <input value={dentistForm.telegram} onChange={e => setDentistForm({ ...dentistForm, telegram: e.target.value })} placeholder="@username" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Age</label>
                      <input type="number" value={dentistForm.age} onChange={e => setDentistForm({ ...dentistForm, age: e.target.value })} placeholder="35" style={inputStyle} />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={labelStyle}>Background / About</label>
                      <textarea value={dentistForm.background} onChange={e => setDentistForm({ ...dentistForm, background: e.target.value })} placeholder="Specializing in braces and aligner therapy..." rows={3}
                        style={{ ...inputStyle, resize: 'vertical' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                    <button onClick={saveDentist} disabled={dentistLoading}
                      style={{ background: '#0d1b3e', border: 'none', color: '#fff', padding: '11px 28px', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", opacity: dentistLoading ? 0.7 : 1 }}>
                      {dentistLoading ? 'Saving...' : editingDentist ? 'Save Changes' : 'Add Employee'}
                    </button>
                    <button onClick={resetDentistForm}
                      style={{ background: '#f5f6fa', border: '1px solid #e0e0e0', color: '#666', padding: '11px 20px', borderRadius: 10, fontSize: 14, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Dentist Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
                {dentists.map(d => (
                  <div key={d.id} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                    <div style={{ background: 'linear-gradient(135deg, #0d1b3e, #1a3566)', padding: '24px 20px 20px', textAlign: 'center' }}>
                      <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#4ecdc4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 22, color: '#0d1b3e', fontWeight: 700 }}>
                        {d.dentist_name?.charAt(0) || '?'}
                      </div>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{d.dentist_name}</h3>
                      <p style={{ fontSize: 12, color: '#4ecdc4', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{d.specialty}</p>
                    </div>
                    <div style={{ padding: '16px 18px' }}>
                      {d.phone && <p style={{ fontSize: 12, color: '#8a9fc4', marginBottom: 4 }}>📞 {d.phone}</p>}
                      {d.telegram && <p style={{ fontSize: 12, color: '#8a9fc4', marginBottom: 4 }}>✈️ {d.telegram}</p>}
                      {d.age && <p style={{ fontSize: 12, color: '#8a9fc4', marginBottom: 4 }}>🎂 Age: {d.age}</p>}
                      {d.background && <p style={{ fontSize: 12, color: '#8a9fc4', lineHeight: 1.6, marginTop: 8, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{d.background}</p>}
                      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                        <button onClick={() => startEditDentist(d)}
                          style={{ flex: 1, background: '#f0f2f5', border: 'none', color: '#0d1b3e', padding: '8px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                          Edit
                        </button>
                        <button onClick={() => deleteDentist(d.id)}
                          style={{ flex: 1, background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.2)', color: '#ff6b6b', padding: '8px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {dentists.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#8a9fc4' }}>
                  <p style={{ fontSize: 16, marginBottom: 8 }}>No employees yet</p>
                  <p style={{ fontSize: 13 }}>Click "Add Employee" to get started</p>
                </div>
              )}
            </>
          )}

          {/* ── SERVICES TAB ── */}
          {activeTab === 'Services' && (
            <>
              {/* Service Form */}
              {showServiceForm && (
                <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #e0e4ea' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d1b3e', marginBottom: 24 }}>
                    {editingService ? 'Edit Service' : 'Add New Service'}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={labelStyle}>Service Name *</label>
                      <input value={serviceForm.service_name} onChange={e => setServiceForm({ ...serviceForm, service_name: e.target.value })} placeholder="Teeth Cleaning" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Price (USD) *</label>
                      <input type="number" value={serviceForm.price} onChange={e => setServiceForm({ ...serviceForm, price: e.target.value })} placeholder="50" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Duration (minutes)</label>
                      <input type="number" value={serviceForm.duration_minutes} onChange={e => setServiceForm({ ...serviceForm, duration_minutes: e.target.value })} placeholder="30" style={inputStyle} />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={labelStyle}>Description</label>
                      <textarea value={serviceForm.description} onChange={e => setServiceForm({ ...serviceForm, description: e.target.value })} placeholder="Professional teeth cleaning to remove plaque..." rows={3}
                        style={{ ...inputStyle, resize: 'vertical' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                    <button onClick={saveService} disabled={serviceLoading}
                      style={{ background: '#0d1b3e', border: 'none', color: '#fff', padding: '11px 28px', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", opacity: serviceLoading ? 0.7 : 1 }}>
                      {serviceLoading ? 'Saving...' : editingService ? 'Save Changes' : 'Add Service'}
                    </button>
                    <button onClick={resetServiceForm}
                      style={{ background: '#f5f6fa', border: '1px solid #e0e0e0', color: '#666', padding: '11px 20px', borderRadius: 10, fontSize: 14, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Services Table */}
              <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f8f9fc' }}>
                      {['Service', 'Description', 'Price', 'Duration', 'Actions'].map(h => (
                        <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.6 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((s, i) => (
                      <tr key={s.id} style={{ borderTop: '1px solid #f0f2f5', background: i % 2 === 0 ? '#fff' : '#fafbfc' }}>
                        <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600, color: '#0d1b3e' }}>{s.service_name}</td>
                        <td style={{ padding: '14px 16px', fontSize: 13, color: '#8a9fc4', maxWidth: 220 }}>
                          <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{s.description || '—'}</span>
                        </td>
                        <td style={{ padding: '14px 16px', fontSize: 14, color: '#4ecdc4', fontWeight: 700 }}>${s.price}</td>
                        <td style={{ padding: '14px 16px', fontSize: 13, color: '#8a9fc4' }}>{s.duration_minutes ? `${s.duration_minutes} min` : '—'}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={() => startEditService(s)}
                              style={{ background: '#f0f2f5', border: 'none', color: '#0d1b3e', padding: '6px 14px', borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                              Edit
                            </button>
                            <button onClick={() => deleteService(s.id)}
                              style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.2)', color: '#ff6b6b', padding: '6px 14px', borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {services.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '60px 20px', color: '#8a9fc4' }}>
                    <p style={{ fontSize: 16, marginBottom: 8 }}>No services yet</p>
                    <p style={{ fontSize: 13 }}>Click "Add Service" to get started</p>
                  </div>
                )}
              </div>
            </>
          )}
    </AdminLayout>
  )
}