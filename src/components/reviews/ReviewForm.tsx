'use client'

import { useState } from 'react'
import { Star, Send, X, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

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
  const [hoverRating, setHoverRating] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !platform || !rating || !message || !agreed) return
    // Will submit to Supabase API
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="glass-card p-8 text-center mb-8 animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-100 flex items-center justify-center">
          <CheckCircle size={28} className="text-green-600" />
        </div>
        <h3 className="font-bold text-gray-900 mb-2">Rəyiniz qəbul edildi!</h3>
        <p className="text-sm text-gray-600 mb-4">Admin yoxlamasından sonra saytda yayımlanacaq.</p>
        <button onClick={onClose} className="btn-outline text-sm">
          Bağla
        </button>
      </div>
    )
  }

  return (
    <div className="glass-card p-6 mb-8 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900">Rəy yazın</h3>
        <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <X size={18} className="text-gray-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Ad və ya ləqəb *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Adınız"
            className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
            required
          />
        </div>

        {/* Platform */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Platforma *</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
            required
          >
            <option value="">Seçin</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Telegram">Telegram</option>
            <option value="Digər">Digər</option>
          </select>
        </div>

        {/* Country (Optional) */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Ölkə (istəyə bağlı)</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Məsələn: Türkiyə"
            className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Qiymətləndirmə *</label>
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
                  className={cn(
                    'transition-colors',
                    (hoverRating || rating) >= star
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-300'
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Rəy mətni *</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Təcrübənizi paylaşın..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
            required
          />
        </div>

        {/* Agreement */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-xs text-gray-600">
            Rəyimin admin yoxlamasından sonra saytda anonim şəkildə yayımlanmasına razıyam.
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={!name || !platform || !rating || !message || !agreed}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={16} />
          Göndər
        </button>
      </form>
    </div>
  )
}
