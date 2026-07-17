'use client'

import { useState } from 'react'
import { Star, Send, X, CheckCircle } from 'lucide-react'

export default function ReviewForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('')
  const [platform, setPlatform] = useState('')
  const [country, setCountry] = useState('')
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [hover, setHover] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !platform || !rating || !message || !agreed) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="theme-card p-8 text-center mb-8 animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'var(--success-muted)' }}>
          <CheckCircle size={28} style={{ color: 'var(--success)' }} />
        </div>
        <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Rəyiniz qəbul edildi!</h3>
        <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>Admin yoxlamasından sonra yayımlanacaq.</p>
        <button onClick={onClose} className="btn-outline text-sm">Bağla</button>
      </div>
    )
  }

  return (
    <div className="theme-card p-6 mb-8 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>Rəy yazın</h3>
        <button onClick={onClose} className="p-2 rounded-xl" style={{ color: 'var(--text-muted)' }}><X size={18} /></button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Ad *</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Adınız" className="theme-input" required />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Platforma *</label>
          <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="theme-input" required>
            <option value="">Seçin</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Telegram">Telegram</option>
            <option value="Digər">Digər</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Ölkə</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Məsələn: Türkiyə" className="theme-input" />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>Qiymətləndirmə *</label>
          <div className="flex gap-1">
            {[1,2,3,4,5].map((s) => (
              <button key={s} type="button" onClick={() => setRating(s)} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)} className="p-1">
                <Star size={28} className={(hover || rating) >= s ? 'fill-current' : ''} style={{ color: (hover || rating) >= s ? 'var(--warning)' : 'var(--border-strong)' }} />
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Rəy *</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Təcrübənizi paylaşın..." rows={4} className="theme-input resize-none" required />
        </div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 w-4 h-4 rounded" />
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Rəyimin admin yoxlamasından sonra yayımlanmasına razıyam.</span>
        </label>
        <button type="submit" disabled={!name || !platform || !rating || !message || !agreed} className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
          <Send size={16} /> Göndər
        </button>
      </form>
    </div>
  )
}
