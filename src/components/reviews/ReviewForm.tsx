'use client'

import { useState } from 'react'
import { Star, Send, X, CheckCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase/client'

interface ReviewFormProps {
  onClose: () => void
}

export default function ReviewForm({ onClose }: ReviewFormProps) {
  const [name, setName] = useState('')
  const [platform, setPlatform] = useState('')
  const [country, setCountry] = useState('')
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [hoverRating, setHoverRating] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !platform || !rating || !message || !agreed) return

    setSubmitting(true)
    setError('')
    try {
      const { error: insertError } = await supabase.from('reviews').insert({
        name: name.trim(),
        platform,
        country: country.trim() || null,
        rating,
        message: message.trim(),
        status: 'pending',
      })
      if (insertError) throw insertError
      setSubmitted(true)
    } catch (err) {
      setError('Rəy göndərilə bilmədi. Yenidən cəhd edin.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="theme-card p-8 text-center mb-8 animate-fade-in">
        <div
          className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
          style={{ background: 'var(--success-muted)' }}
        >
          <CheckCircle size={28} style={{ color: 'var(--success)' }} />
        </div>
        <h3 style={{ color: 'var(--text-primary)' }} className="font-bold mb-2">Rəyiniz qəbul edildi!</h3>
        <p style={{ color: 'var(--text-muted)' }} className="text-sm mb-4">Admin yoxlamasından sonra saytda yayımlanacaq.</p>
        <button onClick={onClose} className="btn-outline text-sm">Bağla</button>
      </div>
    )
  }

  const labelCls = 'text-sm font-medium mb-1 block'
  const labelStyle = { color: 'var(--text-secondary)' }

  return (
    <div className="theme-card p-6 mb-8 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 style={{ color: 'var(--text-primary)' }} className="font-bold">Rəy yazın</h3>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
          style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
        >
          <X size={16} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div
            className="p-3 rounded-xl text-sm"
            style={{ background: 'var(--danger-muted)', border: '1px solid color-mix(in srgb, var(--danger) 20%, transparent)', color: 'var(--danger)' }}
          >
            {error}
          </div>
        )}

        {/* Name */}
        <div>
          <label className={labelCls} style={labelStyle}>Ad və ya ləqəb *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Adınız"
            className="theme-input"
            required
          />
        </div>

        {/* Platform */}
        <div>
          <label className={labelCls} style={labelStyle}>Platforma *</label>
          <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="theme-input" required>
            <option value="">Seçin</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Telegram">Telegram</option>
            <option value="Digər">Digər</option>
          </select>
        </div>

        {/* Country */}
        <div>
          <label className={labelCls} style={labelStyle}>Ölkə (istəyə bağlı)</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Məsələn: Türkiyə"
            className="theme-input"
          />
        </div>

        {/* Rating */}
        <div>
          <label className={labelCls} style={labelStyle}>Qiymətləndirmə *</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1"
              >
                <Star
                  size={28}
                  className={cn('transition-colors', (hoverRating || rating) >= star && 'fill-current')}
                  style={{ color: (hoverRating || rating) >= star ? 'var(--warning)' : 'var(--border-strong)' }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className={labelCls} style={labelStyle}>Rəy mətni *</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Təcrübənizi paylaşın..."
            rows={4}
            className="theme-input resize-none"
            required
          />
        </div>

        {/* Agreement */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 w-4 h-4 rounded"
            style={{ accentColor: 'var(--accent)' }}
          />
          <span style={{ color: 'var(--text-muted)' }} className="text-xs">
            Rəyimin admin yoxlamasından sonra saytda anonim şəkildə yayımlanmasına razıyam.
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={!name || !platform || !rating || !message || !agreed || submitting}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {submitting ? 'Göndərilir...' : 'Göndər'}
        </button>
      </form>
    </div>
  )
}
