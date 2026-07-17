'use client'

import { useState } from 'react'
import { Star, MessageSquare } from 'lucide-react'
import ReviewForm from './ReviewForm'

const reviews = [
  { id: '1', name: 'Elvin M.', platform: 'WhatsApp', country: 'Türkiyə', rating: 5, message: 'Çox sürətli xidmət. Nömrəni 5 dəqiqə ərzində aldım.', created_at: '2026-07-10' },
  { id: '2', name: 'Aysel K.', platform: 'WhatsApp', country: 'Böyük Britaniya', rating: 5, message: 'Premium nömrə aldım, 3 aydır problem yoxdur.', created_at: '2026-07-08' },
  { id: '3', name: 'Rəşad N.', platform: 'Telegram', country: 'Türkiyə', rating: 4, message: 'Telegram üçün nömrə aldım. Keyfiyyətli idi.', created_at: '2026-07-05' },
  { id: '4', name: 'Ləman H.', platform: 'WhatsApp', country: 'ABŞ', rating: 5, message: 'ABŞ nömrəsi aldım, 2 aydır istifadə edirəm.', created_at: '2026-06-28' },
  { id: '5', name: 'Tural V.', platform: 'WhatsApp', country: 'Türkiyə', rating: 4, message: 'Təlimatlara əməl etdim, problem yaşamadım.', created_at: '2026-06-20' },
]

export default function ReviewsClient() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="px-4 py-6 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div className="text-center sm:text-left">
            <h1 className="section-title">Müştəri Rəyləri</h1>
            <p className="section-subtitle">Müştərilərimizin təcrübələri</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm">
            <MessageSquare size={16} /> Rəy yaz
          </button>
        </div>

        {showForm && <ReviewForm onClose={() => setShowForm(false)} />}

        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="theme-card p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{r.name}</h3>
                  <p className="text-xs" style={{ color: 'var(--text-faint)' }}>{r.platform} - {r.country}</p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < r.rating ? 'fill-current' : ''} style={{ color: i < r.rating ? 'var(--warning)' : 'var(--border-strong)' }} />
                  ))}
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>&ldquo;{r.message}&rdquo;</p>
              <p className="text-xs mt-3" style={{ color: 'var(--text-faint)' }}>
                {new Date(r.created_at).toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
