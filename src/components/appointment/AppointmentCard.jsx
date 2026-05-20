import { useLocation } from 'react-router-dom'

export default function AppointmentCard() {
  const { state } = useLocation()
  const appointment = state?.appointment

  return (
    <div className="appointment-card">
      <div className="appointment-card-header">
        <span className="appointment-icon">🦷</span>
        <span className="appointment-status confirmed">Confirmed</span>
      </div>
      <div className="appointment-card-body">
        <h3 className="appointment-doctor">{appointment?.doctor}</h3>
        <p className="appointment-service">{appointment?.service}</p>
        <div className="appointment-details">
          <p>👤 {appointment?.name}</p>
          <p>📞 {appointment?.phone}</p>
          <p>📅 {appointment?.date}</p>
          <p>🕐 {appointment?.time}</p>
        </div>
      </div>
    </div>
  )
}
