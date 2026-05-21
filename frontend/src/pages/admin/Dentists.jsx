// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import doctor1 from '../../assets/images/download (2).png'
// import doctor2 from '../../assets/images/download (3).png'
// import doctor3 from '../../assets/images/download.png'

// export default function Dentists() {
//   const navigate = useNavigate()
//   const [dentists, setDentists] = useState([])
//   const [form, setForm] = useState({
//     name: '', title: '', exp: '', gender: '', photo: '',
//     about: '', education: '', specialties: '', schedule: ''
//   })
//   const [editing, setEditing] = useState(null)
//   const [showForm, setShowForm] = useState(false)
//   const [preview, setPreview] = useState('')

//   useEffect(() => {
//     const defaults = [
//       { id: 1, name: 'Dr. Yoo Rii',  title: 'Orthodontist',     exp: '12+ years specializing in braces and aligner therapy for all ages.', gender: 'Female', photo: doctor1, about: '', education: '', specialties: [], schedule: '' },
//       { id: 2, name: 'Dr. Jean Rill', title: 'General Dentist',  exp: '12+ years specializing in braces and aligner therapy for all ages.', gender: 'Male',   photo: doctor2, about: '', education: '', specialties: [], schedule: '' },
//       { id: 3, name: 'Dr. Yeon Rill', title: 'Cosmetic Dentist', exp: '12+ years specializing in braces and aligner therapy for all ages.', gender: 'Female', photo: doctor3, about: '', education: '', specialties: [], schedule: '' },
//     ]
//     const saved = JSON.parse(localStorage.getItem('dentists') || '[]')
//     if (saved.length === 0) {
//       localStorage.setItem('dentists', JSON.stringify(defaults))
//       setDentists(defaults)
//     } else {
//       const merged = saved.map(d => {
//         if (d.id === 1 && !d.photo?.startsWith('data:')) return { ...d, photo: doctor1 }
//         if (d.id === 2 && !d.photo?.startsWith('data:')) return { ...d, photo: doctor2 }
//         if (d.id === 3 && !d.photo?.startsWith('data:')) return { ...d, photo: doctor3 }
//         return d
//       })
//       setDentists(merged)
//     }
//   }, [])

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0]
//     if (!file) return
//     const reader = new FileReader()
//     reader.onload = (ev) => {
//       setPreview(ev.target.result)
//       setForm(f => ({ ...f, photo: ev.target.result }))
//     }
//     reader.readAsDataURL(file)
//   }

//   const getDefaultPhoto = (gender) => {
//     if (gender === 'Male') return doctor2
//     return doctor1
//   }

//   // ✅ FIX: Convert specialties string to array before saving
//   const save = () => {
//     if (!form.name || !form.title) return

//     const specialtiesArray = form.specialties
//       ? form.specialties.split(',').map(s => s.trim()).filter(Boolean)
//       : []

//     const formToSave = { ...form, specialties: specialtiesArray }

//     let updated
//     if (editing !== null) {
//       updated = dentists.map(d => d.id === editing ? { ...d, ...formToSave } : d)
//     } else {
//       updated = [...dentists, { id: Date.now(), ...formToSave }]
//     }

//     localStorage.setItem('dentists', JSON.stringify(updated))
//     setDentists(updated)
//     resetForm()
//   }

//   const deleteDentist = (id) => {
//     if (!window.confirm('Delete this dentist?')) return
//     const updated = dentists.filter(d => d.id !== id)
//     localStorage.setItem('dentists', JSON.stringify(updated))
//     setDentists(updated)
//   }

//   const startEdit = (d) => {
//     setForm({
//       name: d.name,
//       title: d.title,
//       exp: d.exp,
//       gender: d.gender || '',
//       photo: d.photo || '',
//       // ✅ FIX: Convert specialties array back to string for editing
//       about: d.about || '',
//       education: d.education || '',
//       specialties: Array.isArray(d.specialties) ? d.specialties.join(', ') : (d.specialties || ''),
//       schedule: d.schedule || ''
//     })
//     setPreview(d.photo || '')
//     setEditing(d.id)
//     setShowForm(true)
//     window.scrollTo(0, 0)
//   }

//   // ✅ FIX: resetForm now includes all fields
//   const resetForm = () => {
//     setShowForm(false)
//     setEditing(null)
//     setForm({
//       name: '', title: '', exp: '', gender: '', photo: '',
//       about: '', education: '', specialties: '', schedule: ''
//     })
//     setPreview('')
//   }

//   const sidebarItems = [
//     { label: 'Dashboard',   path: '/admin'              },
//     { label: 'Schedule',    path: '/admin/schedule'     },
//     { label: 'Employees',   path: '/admin/dentists'     },
//     { label: 'Appointment', path: '/admin/appointments' },
//     { label: 'Record',      path: '/admin/users'        },
//     { label: 'Setting',     path: '/admin/reports'      },
//   ]

//   return (
//     <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", background: '#f0f2f5' }}>

//       {/* SIDEBAR */}
//       <aside style={{ width: 180, background: '#0d1b3e', display: 'flex', flexDirection: 'column', flexShrink: 0, paddingBottom: 24 }}>
//         <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #243560' }}>
//           <div style={{ background: '#4ecdc4', borderRadius: 10, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0d1b3e' }}>
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path d="M12 2C8 2 5 5 5 9c0 2 .5 4 1.5 5.5L8 20h8l1.5-5.5C18.5 13 19 11 19 9c0-4-3-7-7-7z"/>
//             </svg>
//           </div>
//         </div>
//         <div style={{ padding: '14px 20px 10px', borderBottom: '1px solid #243560' }}>
//           <p style={{ fontSize: 10, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>Dashboard</p>
//           <p style={{ fontSize: 11, color: '#4ecdc4', fontWeight: 500 }}>Home / Employees</p>
//         </div>
//         {sidebarItems.map(item => (
//           <div key={item.path} onClick={() => navigate(item.path)}
//             style={{ padding: '11px 20px', fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
//               background: window.location.pathname === item.path ? 'rgba(78,205,196,0.1)' : 'transparent',
//               borderLeft: window.location.pathname === item.path ? '3px solid #4ecdc4' : '3px solid transparent',
//               color: window.location.pathname === item.path ? '#4ecdc4' : '#8a9fc4' }}>
//             {item.label}
//           </div>
//         ))}
//         <div style={{ marginTop: 'auto', padding: '0 16px' }}>
//           <button onClick={() => { localStorage.removeItem('currentUser'); navigate('/login') }}
//             style={{ width: '100%', background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.25)', color: '#ff6b6b', padding: 9, borderRadius: 8, fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* MAIN */}
//       <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

//         {/* TOP BAR */}
//         <div style={{ background: '#fff', borderBottom: '1px solid #e8ecf0', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <div>
//             <p style={{ fontSize: 11, color: '#8a9fc4' }}>Dashboard</p>
//             <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1b3e' }}>Home / Employees</p>
//           </div>
//           <div style={{ display: 'flex', gap: 10 }}>
//             <button onClick={() => { resetForm(); setShowForm(true) }}
//               style={{ background: '#0d1b3e', border: 'none', color: '#fff', padding: '8px 20px', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
//               + Add Employee
//             </button>
//             <button onClick={() => navigate('/admin')}
//               style={{ background: 'transparent', border: '1px solid #e0e4ea', color: '#666', padding: '8px 18px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
//               ← Back
//             </button>
//           </div>
//         </div>

//         <div style={{ padding: 24 }}>

//           {/* FORM */}
//           {showForm && (
//             <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #e0e4ea' }}>
//               <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d1b3e', marginBottom: 24 }}>
//                 {editing !== null ? 'Edit Employee' : 'Add New Employee'}
//               </h3>

//               <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 28, alignItems: 'start' }}>

//                 {/* PHOTO */}
//                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
//                   <div style={{ width: 140, height: 160, borderRadius: 14, overflow: 'hidden', border: '2px dashed #e0e4ea', background: '#f8f9fc' }}>
//                     <img
//                       src={preview || getDefaultPhoto(form.gender)}
//                       alt="preview"
//                       style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
//                     />
//                   </div>
//                   <label style={{ background: '#f0f2f5', border: '1px solid #e0e4ea', borderRadius: 8, padding: '7px 16px', fontSize: 12, fontWeight: 600, color: '#0d1b3e', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", textAlign: 'center', width: '100%' }}>
//                     Upload Photo
//                     <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
//                   </label>
//                   {preview && (
//                     <button onClick={() => { setPreview(''); setForm(f => ({ ...f, photo: '' })) }}
//                       style={{ background: 'none', border: 'none', color: '#ff6b6b', fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
//                       Remove photo
//                     </button>
//                   )}
//                 </div>

//                 {/* FIELDS */}
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
//                     <div>
//                       <label style={{ fontSize: 11, fontWeight: 600, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.6, display: 'block', marginBottom: 6 }}>Full Name *</label>
//                       <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Dr. John Smith"
//                         style={{ width: '100%', background: '#f5f6fa', border: '1px solid #e0e0e0', borderRadius: 10, color: '#0d1b3e', padding: '11px 14px', fontSize: 14, outline: 'none', fontFamily: "'DM Sans', sans-serif" }} />
//                     </div>
//                     <div>
//                       <label style={{ fontSize: 11, fontWeight: 600, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.6, display: 'block', marginBottom: 6 }}>Specialty *</label>
//                       <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Orthodontist"
//                         style={{ width: '100%', background: '#f5f6fa', border: '1px solid #e0e0e0', borderRadius: 10, color: '#0d1b3e', padding: '11px 14px', fontSize: 14, outline: 'none', fontFamily: "'DM Sans', sans-serif" }} />
//                     </div>
//                   </div>
//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
//                     <div>
//                       <label style={{ fontSize: 11, fontWeight: 600, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.6, display: 'block', marginBottom: 6 }}>Gender</label>
//                       <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}
//                         style={{ width: '100%', background: '#f5f6fa', border: '1px solid #e0e0e0', borderRadius: 10, color: '#0d1b3e', padding: '11px 14px', fontSize: 14, outline: 'none', fontFamily: "'DM Sans', sans-serif", cursor: 'pointer' }}>
//                         <option value="">Select gender</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                       </select>
//                     </div>
//                     <div>
//                       <label style={{ fontSize: 11, fontWeight: 600, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.6, display: 'block', marginBottom: 6 }}>Experience</label>
//                       <input value={form.exp} onChange={e => setForm({ ...form, exp: e.target.value })} placeholder="12+ years"
//                         style={{ width: '100%', background: '#f5f6fa', border: '1px solid #e0e0e0', borderRadius: 10, color: '#0d1b3e', padding: '11px 14px', fontSize: 14, outline: 'none', fontFamily: "'DM Sans', sans-serif" }} />
//                     </div>
//                     <div>
//                       <label style={{ fontSize: 11, fontWeight: 600, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.6, display: 'block', marginBottom: 6 }}>Education</label>
//                       <input value={form.education} onChange={e => setForm({ ...form, education: e.target.value })} placeholder="DDS – University Name, Year"
//                         style={{ width: '100%', background: '#f5f6fa', border: '1px solid #e0e0e0', borderRadius: 10, color: '#0d1b3e', padding: '11px 14px', fontSize: 14, outline: 'none', fontFamily: "'DM Sans', sans-serif" }} />
//                     </div>
//                     <div>
//                       <label style={{ fontSize: 11, fontWeight: 600, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.6, display: 'block', marginBottom: 6 }}>Schedule</label>
//                       <input value={form.schedule} onChange={e => setForm({ ...form, schedule: e.target.value })} placeholder="Mon – Fri: 9AM – 5PM"
//                         style={{ width: '100%', background: '#f5f6fa', border: '1px solid #e0e0e0', borderRadius: 10, color: '#0d1b3e', padding: '11px 14px', fontSize: 14, outline: 'none', fontFamily: "'DM Sans', sans-serif" }} />
//                     </div>
//                   </div>

//                   <div>
//                     <label style={{ fontSize: 11, fontWeight: 600, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.6, display: 'block', marginBottom: 6 }}>Specialties (comma separated)</label>
//                     <input value={form.specialties} onChange={e => setForm({ ...form, specialties: e.target.value })} placeholder="Braces, Aligners, Whitening"
//                       style={{ width: '100%', background: '#f5f6fa', border: '1px solid #e0e0e0', borderRadius: 10, color: '#0d1b3e', padding: '11px 14px', fontSize: 14, outline: 'none', fontFamily: "'DM Sans', sans-serif" }} />
//                   </div>

//                   {/* ✅ FIX: About now correctly uses form.about */}
//                   <div>
//                     <label style={{ fontSize: 11, fontWeight: 600, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.6, display: 'block', marginBottom: 6 }}>About / Description</label>
//                     <textarea value={form.about} onChange={e => setForm({ ...form, about: e.target.value })} placeholder="Specializing in braces and aligner therapy..." rows={3}
//                       style={{ width: '100%', background: '#f5f6fa', border: '1px solid #e0e0e0', borderRadius: 10, color: '#0d1b3e', padding: '11px 14px', fontSize: 14, outline: 'none', fontFamily: "'DM Sans', sans-serif", resize: 'vertical' }} />
//                   </div>

//                   <div style={{ display: 'flex', gap: 10, paddingTop: 4 }}>
//                     <button onClick={save}
//                       style={{ background: '#0d1b3e', border: 'none', color: '#fff', padding: '11px 28px', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
//                       {editing !== null ? 'Save Changes' : 'Add Employee'}
//                     </button>
//                     <button onClick={resetForm}
//                       style={{ background: '#f5f6fa', border: '1px solid #e0e0e0', color: '#666', padding: '11px 20px', borderRadius: 10, fontSize: 14, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* EMPLOYEE CARDS */}
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
//             {dentists.map(d => (
//               <div key={d.id}
//                 style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', transition: 'transform 0.2s, box-shadow 0.2s' }}
//                 onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)' }}
//                 onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)' }}>

//                 {/* Photo */}
//                 <div style={{ height: 200, overflow: 'hidden', background: '#f0f2f5', position: 'relative' }}>
//                   <img
//                     src={d.photo || getDefaultPhoto(d.gender)}
//                     alt={d.name}
//                     style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
//                     onError={e => { e.target.src = getDefaultPhoto(d.gender) }}
//                   />
//                   {d.gender && (
//                     <span style={{ position: 'absolute', top: 10, right: 10, background: d.gender === 'Female' ? '#fce8f3' : '#e8f0fe', color: d.gender === 'Female' ? '#c0186e' : '#1a56db', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 99, textTransform: 'uppercase', letterSpacing: 0.5 }}>
//                       {d.gender}
//                     </span>
//                   )}
//                 </div>

//                 {/* Info */}
//                 <div style={{ padding: '16px 18px' }}>
//                   <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0d1b3e', marginBottom: 3 }}>{d.name}</h3>
//                   <p style={{ fontSize: 12, color: '#4ecdc4', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>{d.title}</p>
//                   <p style={{ fontSize: 12, color: '#8a9fc4', lineHeight: 1.6, marginBottom: 14 }}>{d.exp}</p>
//                   <div style={{ display: 'flex', gap: 8 }}>
//                     <button onClick={() => startEdit(d)}
//                       style={{ flex: 1, background: '#f0f2f5', border: 'none', color: '#0d1b3e', padding: '8px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
//                       onMouseEnter={e => e.target.style.background = '#e0e4ea'}
//                       onMouseLeave={e => e.target.style.background = '#f0f2f5'}>
//                       Edit
//                     </button>
//                     <button onClick={() => deleteDentist(d.id)}
//                       style={{ flex: 1, background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.2)', color: '#ff6b6b', padding: '8px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {dentists.length === 0 && (
//             <div style={{ textAlign: 'center', padding: '60px 20px', color: '#8a9fc4' }}>
//               <p style={{ fontSize: 16, marginBottom: 8 }}>No employees yet</p>
//               <p style={{ fontSize: 13 }}>Click "Add Employee" to get started</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }


import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import doctor1 from '../../assets/images/download (2).png'
import doctor2 from '../../assets/images/download (3).png'
import doctor3 from '../../assets/images/download.png'
import { DataStorage } from '../../seeders/data' // ✅ seeder import

export default function Dentists() {
  const navigate = useNavigate()
  const [dentists, setDentists] = useState([])
  const [form, setForm] = useState({
    name: '', title: '', exp: '', gender: '', photo: '',
    about: '', education: '', specialties: '', schedule: ''
  })
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [preview, setPreview] = useState('')

  useEffect(() => {
    // ✅ use seeder instead of hardcoded defaults
    const defaults = DataStorage.dentists.map(d => ({
      ...d,
      photo: d.id === 1 ? doctor1 : d.id === 2 ? doctor2 : doctor3
    }))

    const saved = JSON.parse(localStorage.getItem('dentists') || '[]')
    if (saved.length === 0) {
      localStorage.setItem('dentists', JSON.stringify(defaults))
      setDentists(defaults)
    } else {
      const merged = saved.map(d => {
        if (d.id === 1 && !d.photo?.startsWith('data:')) return { ...d, photo: doctor1 }
        if (d.id === 2 && !d.photo?.startsWith('data:')) return { ...d, photo: doctor2 }
        if (d.id === 3 && !d.photo?.startsWith('data:')) return { ...d, photo: doctor3 }
        return d
      })
      setDentists(merged)
    }
  }, [])

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setPreview(ev.target.result)
      setForm(f => ({ ...f, photo: ev.target.result }))
    }
    reader.readAsDataURL(file)
  }

  const getDefaultPhoto = (gender) => {
    if (gender === 'Male') return doctor2
    return doctor1
  }

  const save = () => {
    if (!form.name || !form.title) return
    const specialtiesArray = form.specialties
      ? form.specialties.split(',').map(s => s.trim()).filter(Boolean)
      : []
    const formToSave = { ...form, specialties: specialtiesArray }
    let updated
    if (editing !== null) {
      updated = dentists.map(d => d.id === editing ? { ...d, ...formToSave } : d)
    } else {
      updated = [...dentists, { id: Date.now(), ...formToSave }]
    }
    localStorage.setItem('dentists', JSON.stringify(updated))
    setDentists(updated)
    resetForm()
  }

  const deleteDentist = (id) => {
    if (!window.confirm('Delete this dentist?')) return
    const updated = dentists.filter(d => d.id !== id)
    localStorage.setItem('dentists', JSON.stringify(updated))
    setDentists(updated)
  }

  const startEdit = (d) => {
    setForm({
      name: d.name,
      title: d.title,
      exp: d.exp,
      gender: d.gender || '',
      photo: d.photo || '',
      about: d.about || '',
      education: d.education || '',
      specialties: Array.isArray(d.specialties) ? d.specialties.join(', ') : (d.specialties || ''),
      schedule: d.schedule || ''
    })
    setPreview(d.photo || '')
    setEditing(d.id)
    setShowForm(true)
    window.scrollTo(0, 0)
  }

  const resetForm = () => {
    setShowForm(false)
    setEditing(null)
    setForm({
      name: '', title: '', exp: '', gender: '', photo: '',
      about: '', education: '', specialties: '', schedule: ''
    })
    setPreview('')
  }

  const sidebarItems = [
    { label: 'Dashboard',   path: '/admin'              },
    { label: 'Schedule',    path: '/admin/schedule'     },
    { label: 'Employees',   path: '/admin/dentists'     },
    { label: 'Appointment', path: '/admin/appointments' },
    { label: 'Record',      path: '/admin/users'        },
    { label: 'Setting',     path: '/admin/reports'      },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", background: '#f0f2f5' }}>

      {/* SIDEBAR */}
      <aside style={{ width: 180, background: '#0d1b3e', display: 'flex', flexDirection: 'column', flexShrink: 0, paddingBottom: 24 }}>
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #243560' }}>
          <div style={{ background: '#4ecdc4', borderRadius: 10, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0d1b3e' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8 2 5 5 5 9c0 2 .5 4 1.5 5.5L8 20h8l1.5-5.5C18.5 13 19 11 19 9c0-4-3-7-7-7z"/>
            </svg>
          </div>
        </div>
        <div style={{ padding: '14px 20px 10px', borderBottom: '1px solid #243560' }}>
          <p style={{ fontSize: 10, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>Dashboard</p>
          <p style={{ fontSize: 11, color: '#4ecdc4', fontWeight: 500 }}>Home / Employees</p>
        </div>
        {sidebarItems.map(item => (
          <div key={item.path} onClick={() => navigate(item.path)}
            style={{ padding: '11px 20px', fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
              background: window.location.pathname === item.path ? 'rgba(78,205,196,0.1)' : 'transparent',
              borderLeft: window.location.pathname === item.path ? '3px solid #4ecdc4' : '3px solid transparent',
              color: window.location.pathname === item.path ? '#4ecdc4' : '#8a9fc4' }}>
            {item.label}
          </div>
        ))}
        <div style={{ marginTop: 'auto', padding: '0 16px' }}>
          <button onClick={() => { localStorage.removeItem('currentUser'); navigate('/login') }}
            style={{ width: '100%', background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.25)', color: '#ff6b6b', padding: 9, borderRadius: 8, fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* TOP BAR */}
        <div style={{ background: '#fff', borderBottom: '1px solid #e8ecf0', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: 11, color: '#8a9fc4' }}>Dashboard</p>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1b3e' }}>Home / Employees</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => { resetForm(); setShowForm(true) }}
              style={{ background: '#0d1b3e', border: 'none', color: '#fff', padding: '8px 20px', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              + Add Employee
            </button>
            <button onClick={() => navigate('/admin')}
              style={{ background: 'transparent', border: '1px solid #e0e4ea', color: '#666', padding: '8px 18px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              ← Back
            </button>
          </div>
        </div>

        <div style={{ padding: 24 }}>

          {/* FORM */}
          {showForm && (
            <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #e0e4ea' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d1b3e', marginBottom: 24 }}>
                {editing !== null ? 'Edit Employee' : 'Add New Employee'}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 28, alignItems: 'start' }}>
                {/* PHOTO */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 140, height: 160, borderRadius: 14, overflow: 'hidden', border: '2px dashed #e0e4ea', background: '#f8f9fc' }}>
                    <img src={preview || getDefaultPhoto(form.gender)} alt="preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                  </div>
                  <label style={{ background: '#f0f2f5', border: '1px solid #e0e4ea', borderRadius: 8, padding: '7px 16px', fontSize: 12, fontWeight: 600, color: '#0d1b3e', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", textAlign: 'center', width: '100%' }}>
                    Upload Photo
                    <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
                  </label>
                  {preview && (
                    <button onClick={() => { setPreview(''); setForm(f => ({ ...f, photo: '' })) }}
                      style={{ background: 'none', border: 'none', color: '#ff6b6b', fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                      Remove photo
                    </button>
                  )}
                </div>
                {/* FIELDS */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 600, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.6, display: 'block', marginBottom: 6 }}>Full Name *</label>
                      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Dr. John Smith"
                        style={{ width: '100%', background: '#f5f6fa', border: '1px solid #e0e0e0', borderRadius: 10, color: '#0d1b3e', padding: '11px 14px', fontSize: 14, outline: 'none', fontFamily: "'DM Sans', sans-serif" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 600, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.6, display: 'block', marginBottom: 6 }}>Specialty *</label>
                      <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Orthodontist"
                        style={{ width: '100%', background: '#f5f6fa', border: '1px solid #e0e0e0', borderRadius: 10, color: '#0d1b3e', padding: '11px 14px', fontSize: 14, outline: 'none', fontFamily: "'DM Sans', sans-serif" }} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 600, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.6, display: 'block', marginBottom: 6 }}>Gender</label>
                      <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}
                        style={{ width: '100%', background: '#f5f6fa', border: '1px solid #e0e0e0', borderRadius: 10, color: '#0d1b3e', padding: '11px 14px', fontSize: 14, outline: 'none', fontFamily: "'DM Sans', sans-serif", cursor: 'pointer' }}>
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 600, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.6, display: 'block', marginBottom: 6 }}>Experience</label>
                      <input value={form.exp} onChange={e => setForm({ ...form, exp: e.target.value })} placeholder="12+ years"
                        style={{ width: '100%', background: '#f5f6fa', border: '1px solid #e0e0e0', borderRadius: 10, color: '#0d1b3e', padding: '11px 14px', fontSize: 14, outline: 'none', fontFamily: "'DM Sans', sans-serif" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 600, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.6, display: 'block', marginBottom: 6 }}>Education</label>
                      <input value={form.education} onChange={e => setForm({ ...form, education: e.target.value })} placeholder="DDS – University Name, Year"
                        style={{ width: '100%', background: '#f5f6fa', border: '1px solid #e0e0e0', borderRadius: 10, color: '#0d1b3e', padding: '11px 14px', fontSize: 14, outline: 'none', fontFamily: "'DM Sans', sans-serif" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 600, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.6, display: 'block', marginBottom: 6 }}>Schedule</label>
                      <input value={form.schedule} onChange={e => setForm({ ...form, schedule: e.target.value })} placeholder="Mon – Fri: 9AM – 5PM"
                        style={{ width: '100%', background: '#f5f6fa', border: '1px solid #e0e0e0', borderRadius: 10, color: '#0d1b3e', padding: '11px 14px', fontSize: 14, outline: 'none', fontFamily: "'DM Sans', sans-serif" }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.6, display: 'block', marginBottom: 6 }}>Specialties (comma separated)</label>
                    <input value={form.specialties} onChange={e => setForm({ ...form, specialties: e.target.value })} placeholder="Braces, Aligners, Whitening"
                      style={{ width: '100%', background: '#f5f6fa', border: '1px solid #e0e0e0', borderRadius: 10, color: '#0d1b3e', padding: '11px 14px', fontSize: 14, outline: 'none', fontFamily: "'DM Sans', sans-serif" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 0.6, display: 'block', marginBottom: 6 }}>About / Description</label>
                    <textarea value={form.about} onChange={e => setForm({ ...form, about: e.target.value })} placeholder="Specializing in braces and aligner therapy..." rows={3}
                      style={{ width: '100%', background: '#f5f6fa', border: '1px solid #e0e0e0', borderRadius: 10, color: '#0d1b3e', padding: '11px 14px', fontSize: 14, outline: 'none', fontFamily: "'DM Sans', sans-serif", resize: 'vertical' }} />
                  </div>
                  <div style={{ display: 'flex', gap: 10, paddingTop: 4 }}>
                    <button onClick={save}
                      style={{ background: '#0d1b3e', border: 'none', color: '#fff', padding: '11px 28px', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                      {editing !== null ? 'Save Changes' : 'Add Employee'}
                    </button>
                    <button onClick={resetForm}
                      style={{ background: '#f5f6fa', border: '1px solid #e0e0e0', color: '#666', padding: '11px 20px', borderRadius: 10, fontSize: 14, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* EMPLOYEE CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {dentists.map(d => (
              <div key={d.id}
                style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)' }}>
                <div style={{ height: 200, overflow: 'hidden', background: '#f0f2f5', position: 'relative' }}>
                  <img src={d.photo || getDefaultPhoto(d.gender)} alt={d.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                    onError={e => { e.target.src = getDefaultPhoto(d.gender) }} />
                  {d.gender && (
                    <span style={{ position: 'absolute', top: 10, right: 10, background: d.gender === 'Female' ? '#fce8f3' : '#e8f0fe', color: d.gender === 'Female' ? '#c0186e' : '#1a56db', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 99, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      {d.gender}
                    </span>
                  )}
                </div>
                <div style={{ padding: '16px 18px' }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0d1b3e', marginBottom: 3 }}>{d.name}</h3>
                  <p style={{ fontSize: 12, color: '#4ecdc4', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>{d.title}</p>
                  <p style={{ fontSize: 12, color: '#8a9fc4', lineHeight: 1.6, marginBottom: 14 }}>{d.exp}</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => startEdit(d)}
                      style={{ flex: 1, background: '#f0f2f5', border: 'none', color: '#0d1b3e', padding: '8px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
                      onMouseEnter={e => e.target.style.background = '#e0e4ea'}
                      onMouseLeave={e => e.target.style.background = '#f0f2f5'}>
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
        </div>
      </div>
    </div>
  )
}