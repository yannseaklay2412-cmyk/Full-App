import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import { supabase } from '../../config/supabaseClient'
import AdminSidebar from '../../components/AdminSidebar'
import './Dashboard.css'
import { uploadImage } from '../../config/uploadImage'

const TABS = ['Dentists', 'Services']

const emptyDentist = { dentist_name: '', specialty: '', phone: '', telegram: '', background: '', age: '', image_path: '', work_start: '', work_end: '' }
const emptyService = { service_name: '', description: '', price: '', duration_minutes: '', image_url: '' }

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
  const [dentistPhotoFile, setDentistPhotoFile] = useState(null)
  const [serviceImageFile, setServiceImageFile] = useState(null)
  const [error, setError] = useState('')

  const getPublicUrl = (fileName) =>
    supabase.storage.from('file_image').getPublicUrl(fileName).data.publicUrl

  // ── Fetch dentists ──
  const fetchDentists = async () => {
    try {
      const res = await api.get('/dentists')
      const data = res.data.data ?? res.data
      setDentists(Array.isArray(data) ? data : [])
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
      let { work_start, work_end, ...formToSave } = dentistForm
      if (dentistPhotoFile) {
        const fileName = await uploadImage(dentistPhotoFile)
        if (!fileName) throw new Error('Image upload failed')
        formToSave.image_path = fileName
      }
      let savedId = editingDentist
      if (editingDentist) {
        await api.put(`/dentists/${editingDentist}`, formToSave)
      } else {
        const res = await api.post('/dentists', formToSave)
        savedId = (res.data.data || res.data).id
      }
      if (savedId && work_start && work_end) {
        await api.put(`/dentists/${savedId}/schedule`, { start_time: work_start, end_time: work_end })
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

  const startEditDentist = async (d) => {
    let work_start = ''
    let work_end = ''
    try {
      const res = await api.get(`/dentists/${d.id}/schedule`)
      const sched = res.data
      if (sched) {
        work_start = sched.start_time?.slice(0, 5) || ''
        work_end   = sched.end_time?.slice(0, 5)   || ''
      }
    } catch (_) {}
    setDentistForm({
      dentist_name: d.dentist_name || '',
      specialty: d.specialty || '',
      phone: d.phone || '',
      telegram: d.telegram || '',
      background: d.background || '',
      age: d.age || '',
      image_path: d.image_path || '',
      work_start,
      work_end
    })
    setDentistPhotoFile(null)
    setEditingDentist(d.id)
    setShowDentistForm(true)
    window.scrollTo(0, 0)
  }

  const resetDentistForm = () => {
    setDentistForm(emptyDentist)
    setDentistPhotoFile(null)
    setEditingDentist(null)
    setShowDentistForm(false)
  }

  // ── Service CRUD ──
  const saveService = async () => {
    if (!serviceForm.service_name || !serviceForm.price) return setError('Service name and price are required')
    setServiceLoading(true)
    setError('')
    try {
      let formToSave = { ...serviceForm }
      if (serviceImageFile) {
        const fileName = await uploadImage(serviceImageFile)
        if (!fileName) throw new Error('Image upload failed')
        formToSave.image_url = getPublicUrl(fileName)
      }
      if (editingService) {
        await api.put(`/services/${editingService}`, formToSave)
      } else {
        await api.post('/services', formToSave)
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
      duration_minutes: s.duration_minutes || '',
      image_url: s.image_url || ''
    })
    setServiceImageFile(null)
    setEditingService(s.id)
    setShowServiceForm(true)
    window.scrollTo(0, 0)
  }

  const resetServiceForm = () => {
    setServiceForm(emptyService)
    setServiceImageFile(null)
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

  return (
    <AdminSidebar pageTitle="Dashboard" pageSubtitle="Home / Employees">
        <div style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <button
              onClick={() => { resetDentistForm(); resetServiceForm(); activeTab === 'Dentists' ? setShowDentistForm(true) : setShowServiceForm(true) }}
              style={{ background: '#0d1b3e', border: 'none', color: '#fff', padding: '8px 20px', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              + Add {activeTab === 'Dentists' ? 'Employee' : 'Service'}
            </button>
          </div>

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
                      <input required value={dentistForm.dentist_name} onChange={e => setDentistForm({ ...dentistForm, dentist_name: e.target.value })} placeholder="Dr. John Smith" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Specialty *</label>
                      <input required value={dentistForm.specialty} onChange={e => setDentistForm({ ...dentistForm, specialty: e.target.value })} placeholder="Orthodontist" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone</label>
                      <input required value={dentistForm.phone} onChange={e => setDentistForm({ ...dentistForm, phone: e.target.value })} placeholder="+855 12 345 678" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Telegram</label>
                      <input required value={dentistForm.telegram} onChange={e => setDentistForm({ ...dentistForm, telegram: e.target.value })} placeholder="@username" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Age</label>
                      <input required type="number" value={dentistForm.age} onChange={e => setDentistForm({ ...dentistForm, age: e.target.value })} placeholder="35" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Work Start Hour</label>
                      <input type="time" value={dentistForm.work_start} onChange={e => setDentistForm({ ...dentistForm, work_start: e.target.value })} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Work End Hour</label>
                      <input type="time" value={dentistForm.work_end} onChange={e => setDentistForm({ ...dentistForm, work_end: e.target.value })} style={inputStyle} />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={labelStyle}>Background / About</label>
                      <textarea value={dentistForm.background} onChange={e => setDentistForm({ ...dentistForm, background: e.target.value })} placeholder="Specializing in braces and aligner therapy..." rows={3}
                        style={{ ...inputStyle, resize: 'vertical' }} />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={labelStyle}>Photo</label>
                      <input type="file" accept="image/*" onChange={e => setDentistPhotoFile(e.target.files[0])} style={inputStyle} />
                      {(dentistPhotoFile || dentistForm.image_path) && (
                        <img
                          src={dentistPhotoFile ? URL.createObjectURL(dentistPhotoFile) : getPublicUrl(dentistForm.image_path)}
                          alt="preview"
                          style={{ marginTop: 10, width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid #4ecdc4' }}
                        />
                      )}
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
                {dentists.map(d => (
                  <div key={d.id} style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.10)', display: 'flex', flexDirection: 'column' }}>

                    {/* Large photo area */}
                    <div style={{ position: 'relative', height: 220, background: 'linear-gradient(135deg, #0d1b3e 0%, #1a3566 100%)', overflow: 'hidden', flexShrink: 0 }}>
                      {d.image_path ? (
                        <img
                          src={getPublicUrl(d.image_path)}
                          alt={d.dentist_name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                          onError={e => { e.target.style.display = 'none' }}
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72, color: '#4ecdc4', fontWeight: 700, opacity: 0.6 }}>
                          {d.dentist_name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                      )}
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to top, rgba(13,27,62,0.85), transparent)' }} />
                      {d.specialty && (
                        <div style={{ position: 'absolute', top: 12, right: 12, background: '#4ecdc4', color: '#0d1b3e', padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 0.3 }}>
                          {d.specialty}
                        </div>
                      )}
                      <div style={{ position: 'absolute', bottom: 14, left: 16 }}>
                        <p style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0, textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>{d.dentist_name}</p>
                      </div>
                    </div>

                    {/* Info section */}
                    <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {d.phone && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(78,205,196,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ecdc4" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .93h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                          </div>
                          <span style={{ fontSize: 12, color: '#4a5568', fontWeight: 500 }}>{d.phone}</span>
                        </div>
                      )}
                      {d.telegram && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(78,205,196,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ecdc4" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                          </div>
                          <span style={{ fontSize: 12, color: '#4a5568', fontWeight: 500 }}>{d.telegram}</span>
                        </div>
                      )}
                      {d.age && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(124,58,237,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                          </div>
                          <span style={{ fontSize: 12, color: '#4a5568', fontWeight: 500 }}>Age {d.age}</span>
                        </div>
                      )}
                      {d.work_start && d.work_end && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(251,146,60,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          </div>
                          <span style={{ fontSize: 12, color: '#4a5568', fontWeight: 500 }}>{d.work_start} – {d.work_end}</span>
                        </div>
                      )}
                      {d.background && (
                        <p style={{ fontSize: 11, color: '#8a9fc4', lineHeight: 1.6, marginTop: 4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {d.background}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: 8, padding: '0 18px 16px' }}>
                      <button onClick={() => startEditDentist(d)}
                        style={{ flex: 1, background: 'transparent', border: '1px solid #e0e4ea', color: '#0d1b3e', padding: '9px', borderRadius: 9, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                        Edit
                      </button>
                      <button onClick={() => deleteDentist(d.id)}
                        style={{ flex: 1, background: '#ff6b6b', border: 'none', color: '#fff', padding: '9px', borderRadius: 9, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                        Delete
                      </button>
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
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={labelStyle}>Service Image</label>
                      <input type="file" accept="image/*" onChange={e => setServiceImageFile(e.target.files[0])} style={inputStyle} />
                      {(serviceImageFile || serviceForm.image_url) && (
                        <img
                          src={serviceImageFile ? URL.createObjectURL(serviceImageFile) : serviceForm.image_url}
                          alt="preview"
                          style={{ marginTop: 10, width: 80, height: 80, borderRadius: 12, objectFit: 'cover', border: '3px solid #4ecdc4' }}
                        />
                      )}
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
        </div>
    </AdminSidebar>
  )
}