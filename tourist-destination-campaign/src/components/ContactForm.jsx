import { useState } from 'react'
import { motion } from 'framer-motion'
import { API_BASE } from '../api'

const ContactForm = ({ setCurrentPage, bookingId = null, prefillEmail = '' }) => {
  const [form, setForm] = useState({
    name: '', email: prefillEmail, phone: '', subject: 'General Inquiry', message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [myEmail, setMyEmail] = useState('')
  const [replies, setReplies] = useState([])
  const [checkingReplies, setCheckingReplies] = useState(false)

  const set = (f, v) => setForm(p => ({ ...p, [f]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch(`${API_BASE}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, bookingId }),
      })
      setSuccess(true)
    } catch {
      alert('Failed to send message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const checkReplies = async (e) => {
    e.preventDefault()
    if (!myEmail.trim()) return
    setCheckingReplies(true)
    try {
      const res = await fetch(`${API_BASE}/messages/email/${encodeURIComponent(myEmail)}`)
      const data = await res.json()
      setReplies(Array.isArray(data) ? data : [])
    } catch {
      alert('Could not fetch messages.')
    } finally {
      setCheckingReplies(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fcfbf7] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <button onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2 text-gray-400 hover:text-[#2d3e23] transition-colors mb-8 text-sm font-medium">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Home
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Send Message */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-[#d4af37] text-xs font-black uppercase tracking-[0.3em] mb-3 block">Get In Touch</span>
              <h1 className="text-4xl font-black text-[#2d3e23] mb-3">Send Us a Message</h1>
              <p className="text-gray-400 mb-8 font-light">
                Have a question we haven't answered? Send us a message and our team will respond within 2 hours.
              </p>
            </motion.div>

            {success ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-black text-[#2d3e23] mb-2">Message Sent!</h3>
                <p className="text-gray-400 mb-6">We'll reply to <strong>{form.email}</strong> within 2 hours.</p>
                <button onClick={() => { setSuccess(false); setForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' }) }}
                  className="bg-[#2d3e23] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#3d4a35] transition-all">
                  Send Another
                </button>
              </motion.div>
            ) : (
              <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { label: 'Full Name', field: 'name', type: 'text', placeholder: 'Your name', required: true },
                    { label: 'Email Address', field: 'email', type: 'email', placeholder: 'your@email.com', required: true },
                    { label: 'Phone (optional)', field: 'phone', type: 'tel', placeholder: '+1 234 567 8900', required: false },
                  ].map(f => (
                    <div key={f.field} className={f.field === 'name' ? '' : ''}>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">{f.label}</label>
                      <input type={f.type} required={f.required} placeholder={f.placeholder}
                        value={form[f.field]} onChange={e => set(f.field, e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"/>
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Subject</label>
                    <select value={form.subject} onChange={e => set('subject', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm bg-white">
                      {['General Inquiry','Booking Question','Payment Issue','Custom Tour Request','Complaint','Other'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Message *</label>
                  <textarea required value={form.message} onChange={e => set('message', e.target.value)}
                    rows={5} placeholder="Describe your question or request in detail..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm resize-none"/>
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full bg-[#2d3e23] text-white py-4 rounded-2xl font-black hover:bg-[#3d4a35] transition-all shadow-lg disabled:opacity-60">
                  {submitting ? 'Sending...' : 'Send Message →'}
                </button>
              </motion.form>
            )}
          </div>

          {/* Check Replies + Contact Info */}
          <div className="space-y-6">

            {/* Check Replies */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-black text-[#2d3e23] mb-2">Check Admin Replies</h3>
              <p className="text-gray-400 text-sm mb-5 font-light">Enter your email to see if we've responded to your messages.</p>
              <form onSubmit={checkReplies} className="flex gap-3 mb-5">
                <input type="email" required value={myEmail} onChange={e => setMyEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-sm"/>
                <button type="submit" disabled={checkingReplies}
                  className="bg-[#d4af37] text-[#2d3e23] px-5 py-3 rounded-xl font-black hover:bg-[#f1d38a] transition-all text-sm disabled:opacity-60">
                  {checkingReplies ? '...' : 'Check'}
                </button>
              </form>

              {replies.length > 0 && (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {replies.map(msg => (
                    <div key={msg._id} className={`rounded-2xl p-4 border text-sm ${msg.status === 'replied' ? 'bg-green-50 border-green-100' : 'bg-[#f8f7f4] border-gray-100'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-bold text-[#2d3e23] text-xs">{msg.subject}</p>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${msg.status === 'replied' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {msg.status}
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs mb-2 line-clamp-2">{msg.message}</p>
                      {msg.adminReply && (
                        <div className="bg-white rounded-xl p-3 border border-green-100">
                          <p className="text-xs font-black text-green-600 mb-1">Admin Reply:</p>
                          <p className="text-gray-700 text-xs">{msg.adminReply}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {replies.length === 0 && myEmail && !checkingReplies && (
                <p className="text-gray-400 text-sm text-center py-4">No messages found for this email.</p>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-[#2d3e23] rounded-3xl p-8 text-white">
              <h3 className="text-lg font-black mb-5 text-[#d4af37]">Direct Contact</h3>
              <div className="space-y-4">
                {[
                  { icon: '📞', label: 'Phone / WhatsApp', value: '+251 935 756 054', href: 'tel:+251935756054' },
                  { icon: '✉️', label: 'Email', value: 'sisay3575@gmail.com', href: 'mailto:sisay3575@gmail.com' },
                  { icon: '🕐', label: 'Response Time', value: 'Within 2 hours', href: null },
                  { icon: '📍', label: 'Based In', value: 'Addis Ababa, Ethiopia', href: null },
                ].map(c => (
                  <div key={c.label} className="flex items-start gap-3">
                    <span className="text-xl shrink-0">{c.icon}</span>
                    <div>
                      <p className="text-white/50 text-xs font-bold uppercase tracking-wider">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} className="font-bold text-white hover:text-[#d4af37] transition-colors">{c.value}</a>
                      ) : (
                        <p className="font-bold text-white">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
