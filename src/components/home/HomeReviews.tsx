'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Star, ArrowRight } from 'lucide-react'
import { fetchApprovedReviews } from '@/lib/public-data'
import type { Review } from '@/lib/types'

export default function HomeReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApprovedReviews().then((all) => {
      // Prefer reviews marked show_on_home; otherwise show latest approved.
      const home = all.filter(r => r.show_on_home)
      setReviews((home.length > 0 ? home : all).slice(0, 3))
      setLoading(false)
    })
  }, [])

  // Hide section entirely if there are no reviews yet.
  if (!loading && reviews.length === 0) return null

  return (
    <section className="px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Müştəri rəyləri</h2>
            <p className="section-subtitle">Müştərilərimizin fikirləri</p>
          </div>
          <Link href="/reviews" className="hidden sm:flex items-center gap-1 text-sm font-medium" style={{ color: 'var(--accent)' }}>
            Hamısı <ArrowRight size={14} />
          </Link>
        </div>

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviews.map((review) => (
              <div key={review.id} className="theme-card p-5">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < review.rating ? 'fill-current' : ''} style={{ color: i < review.rating ? 'var(--warning)' : 'var(--border-strong)' }} />
                  ))}
                </div>
                <p style={{ color: 'var(--text-secondary)' }} className="text-sm mb-4 leading-relaxed">&ldquo;{review.message}&rdquo;</p>
                <div>
                  <p style={{ color: 'var(--text-primary)' }} className="text-sm font-medium">{review.name}</p>
                  <p style={{ color: 'var(--text-faint)' }} className="text-xs">{review.platform}{review.country ? ` - ${review.country}` : ''}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <Link href="/reviews" className="sm:hidden flex items-center justify-center gap-1 mt-4 text-sm font-medium" style={{ color: 'var(--accent)' }}>
          Bütün rəyləri gör <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  )
}
