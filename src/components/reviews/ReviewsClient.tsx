'use client'

import { useState, useEffect } from 'react'
import { Star, MessageSquare, Loader2 } from 'lucide-react'
import ReviewForm from './ReviewForm'
import { fetchApprovedReviews } from '@/lib/public-data'
import type { Review } from '@/lib/types'

export default function ReviewsClient() {
  const [showForm, setShowForm] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApprovedReviews().then((r) => {
      setReviews(r)
      setLoading(false)
    })
  }, [])

  return (
    <div className="px-4 py-6 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div className="text-center sm:text-left">
            <h1 className="section-title">Müştəri Rəyləri</h1>
            <p className="section-subtitle">Müştərilərimizin təcrübələri</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm">
            <MessageSquare size={16} />
            Rəy yaz
          </button>
        </div>

        {showForm && <ReviewForm onClose={() => setShowForm(false)} />}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={28} className="animate-spin" style={{ color: 'var(--accent)' }} />
          </div>
        ) : reviews.length === 0 ? (
          <div className="theme-card p-12 text-center">
            <MessageSquare size={24} className="mx-auto mb-3" style={{ color: 'var(--text-faint)' }} />
            <p style={{ color: 'var(--text-muted)' }} className="text-sm">Hələ təsdiqlənmiş rəy yoxdur. İlk rəyi siz yazın!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="theme-card p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 style={{ color: 'var(--text-primary)' }} className="font-semibold">{review.name}</h3>
                    <p style={{ color: 'var(--text-faint)' }} className="text-xs">
                      {review.platform}{review.country ? ` - ${review.country}` : ''}
                    </p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < review.rating ? 'fill-current' : ''} style={{ color: i < review.rating ? 'var(--warning)' : 'var(--border-strong)' }} />
                    ))}
                  </div>
                </div>
                <p style={{ color: 'var(--text-secondary)' }} className="text-sm leading-relaxed">&ldquo;{review.message}&rdquo;</p>
                <p style={{ color: 'var(--text-faint)' }} className="text-xs mt-3">
                  {new Date(review.created_at).toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
