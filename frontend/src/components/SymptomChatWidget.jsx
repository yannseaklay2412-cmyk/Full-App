import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import './SymptomChatWidget.css'

export default function SymptomChatWidget() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [redirect, setRedirect] = useState(null)
  const [insufficient, setInsufficient] = useState(null)
  const [unavailable, setUnavailable] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const toggleOpen = () => {
    if (!user) {
      navigate('/login', { state: { message: 'Please sign in first to use the symptom checker! 🦷' } })
      return
    }
    setOpen(prev => !prev)
  }

  const reset = () => {
    setHistory([])
    setResult(null)
    setRedirect(null)
    setInsufficient(null)
    setUnavailable(null)
    setError(null)
    setInput('')
  }

  const goToBooking = () => {
    setOpen(false)
    navigate('/book')
  }

  const send = async () => {
    if (!input.trim()) return
    const next = [...history, { role: 'user', text: input }]
    setHistory(next)
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const { data } = await api.post('/triage', { history: next })

      if (data.status === 'asking') {
        setHistory([...next, { role: 'model', text: data.message }])
      } else if (data.status === 'done') {
        setResult(data)
      } else if (data.status === 'redirect') {
        setRedirect(data.message)
      } else if (data.status === 'insufficient') {
        setInsufficient(data.message)
      } else if (data.status === 'unavailable') {
        setUnavailable(data.message)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button className="chat-fab" onClick={toggleOpen} aria-label="Symptom checker">
        🤖
      </button>

      {open && (
        <div className="chat-widget">
          <div className="chat-widget-header">
            <span>How can I help you today?</span>
            <button className="chat-widget-close" onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="chat-widget-body">
            {history.length === 0 && !result && (
              <p className="chat-widget-intro">Describe how you're feeling and I'll suggest the right service.</p>
            )}

            {history.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'bubble-user' : 'bubble-ai'}>
                {m.text}
              </div>
            ))}
            {loading && <div className="bubble-ai">Thinking…</div>}
            {error && <div className="bubble-ai error">{error}</div>}

            {result && (
              <div className={`chat-result ${result.urgent ? 'urgent' : ''}`}>
                <h4>Recommended: {result.service}</h4>
                <p>{result.reason}</p>
                {result.urgent && <p> This may be urgent — please seek care now.</p>}
                <small>A dentist will confirm during your visit.</small>
                <button className="chat-widget-reset" onClick={reset}>Ask again</button>
              </div>
            )}

            {redirect && (
              <div className="chat-result">
                <p>{redirect}</p>
                <button className="chat-widget-reset" onClick={goToBooking}>Go to Booking</button>
                <button className="chat-widget-reset" onClick={reset}>Ask a symptom instead</button>
              </div>
            )}

            {insufficient && (
              <div className="chat-result">
                <p>{insufficient}</p>
                <button className="chat-widget-reset" onClick={reset}>Try again</button>
                <button className="chat-widget-reset" onClick={goToBooking}>Go to Booking</button>
              </div>
            )}

            {unavailable && (
              <div className="chat-result">
                <p>{unavailable}</p>
                <button className="chat-widget-reset" onClick={reset}>Ask another symptom</button>
              </div>
            )}
          </div>

          {!result && !redirect && !insufficient && !unavailable && (
            <div className="chat-widget-input">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Describe your symptom…"
              />
              <button onClick={send} disabled={loading}>Send</button>
            </div>
          )}
        </div>
      )}
    </>
  )
}
