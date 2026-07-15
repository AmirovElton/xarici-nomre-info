'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Star, AlertTriangle, Trash2, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'

type ReviewStatus = 'pending' | 'approved' | 'rejected' | 'spam'

const initialReviews = [
  { id: '1', name: 'Elvin M.', platform: 'WhatsApp', country: 'Türkiyə', rating: 5, message: 'Çox sürətli xidmət.', status: 'approved' as ReviewStatus, date: '2026-07-10' },
  { id: '2', name: 'Aysel K.', platform: 'WhatsApp', country: 'B. Britaniya', rating: 5, message: 'Premium nömrə aldım, 3 aydır problem yoxdur.', status: 'approved' as ReviewStatus, date: '2026-07-08' },
  { id: '3', name: 'Rəşad N.', platform: 'Telegram', country: 'Türkiyə', rating: 4, message: 'Telegram üçün nömrə aldım. Keyfiyyətli idi.', status: 'approved' as ReviewStatus, date: '2026-07-05' },
  { id: '4', name: 'Nihad A.', platform: 'WhatsApp', country: 'Hindistan', rating: 5, message: 'Əla xidmət, tez və keyfiyyətli.', status: 'pending' as ReviewStatus, date: '2026-07-14' },
  { id: '5', name: 'Səbinə M.', platform: 'Telegram', country: '', rating: 3, message: 'Yaxşı idi amma bir az gec oldu.', status: 'pending' as ReviewStatus, date: '2026-07-13' },
]

const statusTabs = [
  { id: 'all', label: 'Hamısı' },
  { id: 'pending', label: 'Gözləyən' },
  { id: 'approved', label: 'Təsdiqlənmiş' },
  { id: 'rejected', label: 'Rədd edilmiş' },
  { id: 'spam', label: 'Spam' },
]

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews)
  const [activeTab, setActiveTab] = useState('all')

  const filtered = activeTab === 'all' ? reviews : reviews.filter(r => r.status === activeTab)

  const updateStatus = (id: string, status: ReviewStatus) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700'
      case 'approved': return 'bg-green-100 text-green-700'
      case 'rejected': return 'bg-red-100 text-red-700'
      case 'spam': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Gözləyir'
      case 'approved': return 'Təsdiqlənib'
      case 'rejected': return 'Rədd edilib'
      case 'spam': return 'Spam'
      default: return status
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Rəylər</h1>
        <p className="text-sm text-gray-500">{reviews.length} rəy, {reviews.filter(r => r.status === 'pending').length} gözləyir</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {statusTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
              activeTab === tab.id ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-3">
        {filtered.map((review) => (
          <div key={review.id} className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{review.name}</h3>
                  <span className={cn('px-2 py-0.5 rounded-lg text-xs font-medium', getStatusColor(review.status))}>
                    {getStatusLabel(review.status)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {review.platform} {review.country && `- ${review.country}`} &middot; {review.date}
                </p>
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className={i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-4">&ldquo;{review.message}&rdquo;</p>

            {/* Actions */}
            <div className="flex items-center gap-2 border-t border-gray-100 pt-3">
              {review.status === 'pending' && (
                <>
                  <button
                    onClick={() => updateStatus(review.id, 'approved')}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-medium hover:bg-green-100"
                  >
                    <CheckCircle size={12} /> Təsdiqle
                  </button>
                  <button
                    onClick={() => updateStatus(review.id, 'rejected')}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-medium hover:bg-red-100"
                  >
                    <XCircle size={12} /> Rədd et
                  </button>
                </>
              )}
              <button
                onClick={() => updateStatus(review.id, 'spam')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-50 text-gray-700 text-xs font-medium hover:bg-gray-100"
              >
                <AlertTriangle size={12} /> Spam
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-medium hover:bg-red-100 ml-auto">
                <Trash2 size={12} /> Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
