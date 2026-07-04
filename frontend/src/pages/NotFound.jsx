import { useNavigate } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="notfound-page">
      <div className="notfound-icon">🦷</div>
      <h1 className="notfound-code">404</h1>
      <h2 className="notfound-title">Page not found</h2>
      <p className="notfound-desc">The page you're looking for doesn't exist or has moved.</p>
      <button className="notfound-btn" onClick={() => navigate('/')}>Go Home</button>
    </div>
  )
}
