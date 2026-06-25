import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './DoctorInfo.css'
import { supabase } from '../../config/supabaseClient'

export default function DoctorDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDoctor = async () => {
      const { data, error } = await supabase
        .from('dentists')
        .select('*')
        .eq('id', id)
        .single()
      //error handling 
      if (error) {
        console.error('Error fetching doctor:', error)
        setDoctor(null)
      } else {
        setDoctor(data)
      }
      setLoading(false)
    }
    //execute the function
    fetchDoctor()

  }, [id])

  if (loading) {
    return <div className="not-found">Loading...</div>
  }

  if (!doctor) {
    return <div className="not-found">Doctor not found.</div>
  }

  // specialties can be an array, a comma-separated string, or empty
  const specialties = Array.isArray(doctor.specialties)
    ? doctor.specialties
    : typeof doctor.specialties === 'string' && doctor.specialties
      ? doctor.specialties.split(',').map(s => s.trim()).filter(Boolean)
      : doctor.specialty
        ? [doctor.specialty]
        : []

  return (
    <div className="doctor-detail">
      {/* BACK BUTTON */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* PROFILE HEADER */}
      <div className="profile-header">
        <img
          src={doctor.photo || 'https://via.placeholder.com/180x200?text=Dentist'}
          alt={doctor.dentist_name}
          className="profile-img"
        />
        <div className="profile-info">
          <h1 className="profile-name">{doctor.dentist_name}</h1>
          <p className="profile-title">{doctor.specialty}</p>
          <p className="profile-exp">{doctor.background}</p>
          <p className="profile-exp">{doctor.phone}</p>
          {doctor.telegram && (
            <p className="profile-exp">Telegram: {doctor.telegram}</p>
          )}
          <button className="btn-appointment" onClick={() => navigate('/book')}>
            Book Appointment
          </button>
        </div>
      </div>

      {/* DETAILS */}
      <div className="detail-grid">
        <div className="detail-card">
          <h3>About</h3>
          <p>{doctor.about || 'No information provided.'}</p>
        </div>
        <div className="detail-card">
          <h3>Education</h3>
          <p>{doctor.education || 'No information provided.'}</p>
        </div>
        <div className="detail-card">
          <h3>Specialties</h3>
          {specialties.length > 0 ? (
            <ul>
              {specialties.map((s, i) => (
                <li key={i}>🦷 {s}</li>
              ))}
            </ul>
          ) : (
            <p>No specialties listed.</p>
          )}
        </div>
        <div className="detail-card">
          <h3>Schedule</h3>
          <p>🕐 {doctor.schedule || 'No schedule available.'}</p>
        </div>
      </div>
    </div>
  )
}