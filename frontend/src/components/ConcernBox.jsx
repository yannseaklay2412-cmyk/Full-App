import { useState } from 'react'
import api from '../api/axios'
import './ConcernBox.css'

export default function ConcernBox() {
  const [open, setOpen]           = useState(false)
  const [message, setMessage]     = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return
    setSubmitting(true)
    try {
      await api.post('/concerns', { message: message.trim() })
      setMessage('')
      setOpen(false)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
    } catch (err) {
      console.error(err)
    }
    setSubmitting(false)
  }

  return (
    <div className="concernbox">
      {!open && !submitted && (
        <button className="concernbox-toggle" onClick={() => setOpen(true)}>
          💬 Have a concern?
        </button>
      )}

      {open && (
        <form className="concernbox-form" onSubmit={handleSubmit}>
          <p className="concernbox-note">This is submitted anonymously — we don't collect your name or email.</p>
          <textarea
            className="concernbox-textarea"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Tell us what's on your mind..."
            rows={4}
            autoFocus
          />
          <div className="concernbox-actions">
            <button type="button" className="concernbox-cancel" onClick={() => { setOpen(false); setMessage('') }}>
              Cancel
            </button>
            <button type="submit" className="concernbox-submit" disabled={submitting || !message.trim()}>
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      )}

      {submitted && (
        <p className="concernbox-thanks">✓ Thank you — your concern was submitted anonymously.</p>
      )}
    </div>
  )
}
