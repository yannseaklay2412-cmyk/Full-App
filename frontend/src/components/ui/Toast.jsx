import { useEffect, useState } from 'react'

export default function Toast({ message, type = 'success', onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!message) return
    setVisible(true)
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300)
    }, 3000)
    return () => clearTimeout(t)
  }, [message])

  if (!message) return null

  const isSuccess = type === 'success'

  return (
    <div style={{
      position: 'fixed',
      top: 24,
      right: 24,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: '#fff',
      border: `1px solid ${isSuccess ? 'rgba(78,205,196,0.3)' : 'rgba(255,107,107,0.3)'}`,
      borderRadius: 14,
      padding: '12px 20px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
      fontFamily: 'DM Sans, sans-serif',
      fontSize: 14,
      fontWeight: 500,
      color: '#0d1b3e',
      transform: visible ? 'translateX(0)' : 'translateX(120%)',
      opacity: visible ? 1 : 0,
      transition: 'transform 0.3s ease, opacity 0.3s ease',
      minWidth: 220,
      maxWidth: 340,
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
        background: isSuccess ? 'rgba(78,205,196,0.15)' : 'rgba(255,107,107,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {isSuccess ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ecdc4" strokeWidth="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="3">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        )}
      </div>
      <span style={{ flex: 1 }}>{message}</span>
      <button onClick={() => { setVisible(false); setTimeout(onClose, 300) }}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8a9fc4', padding: 0, lineHeight: 1, fontSize: 16 }}>
        ×
      </button>
    </div>
  )
}
