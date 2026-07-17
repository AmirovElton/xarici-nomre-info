'use client'

import { useState, useEffect, useCallback } from 'react'
import { CheckCircle, XCircle, Star, AlertTriangle, Trash2, Home } from 'lucide-react'
import { adminDb } from '@/lib/admin-api'
import type { Review, ReviewStatus } from '@/lib/types'
import { AdminHeader, AdminLoading, AdminEmpty, Toast } from '@/components/admin/ui'

const statusTabs = [
  { id: 'all', label: 'Hamısı' },
  { id: 'pending', label: 'Gözləyən' },
  { id: 'approved', label: 'Təsdiqlənmiş' },
  { id: 'rejected', label: 'Rədd edilmiş' },
  { id: 'spam', label: 'Spam' },
]

const statusBadge: Record<string, { label: string; cls: string }> = {
  pending: { label: 'Gözləyir', cls: 'badge-warning' },
  approved: { label: 'Təsdiqlənib', cls: 'badge-success' },
  rejected: { label: 'Rədd edilib', cls: 'badge-danger' },
  spam: { label: 'Spam', cls: 'badge-accent' },
  deleted: { label: 'Silinib', cls: 'badge-danger' },
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [toast, setToast] = useState('')

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(''), 2500) }

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await adminDb<Review[]>({ action: 'select', table: 'reviews', order: { column: 'created_at', ascending: false } })
    setReviews(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const filtered = activeTab === 'all' ? reviews : reviews.filter(r => r.status === activeTab)

  const setStatus = async (r: Review, status: ReviewStatus) => {
    setReviews(prev => prev.map(x => x.id === r.id ? { ...x, status } : x))
    const res = await adminDb({ action: 'update', table: 'reviews', values: { status }, match: { id: r.id } })
    if (res.error) { showToast('Xəta: ' + res.error.message); load(); return }
    showToast('Status yeniləndi')
  }

  const toggleHome = async (r: Review) => {
    const next = !r.show_on_home
    setReviews(prev => prev.map(x => x.id === r.id ? { ...x, show_on_home: next } : x))
    await adminDb({ action: 'update', table: 'reviews', values: { show_on_home: next }, match: { id: r.id } })
    showToast(next ? 'Ana səhifədə göstəriləcək' : 'Ana səhifədən çıxarıldı')
  }

  const remove = async (id: string) => {
    if (!confirm('Bu rəyi silmək istədiyinizə əminsiniz?')) return
    const res = await adminDb({ action: 'delete', table: 'reviews', match: { id } })
    if (res.error) { showToast('Xəta: ' + res.error.message); return }
    showToast('Rəy silindi')
    load()
  }

  const pendingCount = reviews.filter(r => r.status === 'pending').length

  return (
    <div>
      <AdminHeader title="Rəylər" subtitle={`${reviews.length} rəy · ${pendingCount} gözləyir`} />

      <div className="flex flex-wrap gap-2 mb-6">
        {statusTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={activeTab === tab.id
              ? { background: 'linear-gradient(135deg, var(--accent), #6366f1)', color: '#fff' }
              : { background: 'var(--bg-card)', border: '1px solid var(--border-default)', color: 'var(--text-muted)' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? <AdminLoading /> : filtered.length === 0 ? (
        <AdminEmpty text="Rəy yoxdur." />
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => (
            <div key={r.id} className="theme-card p-5">
              <div className="flex items-start justify-between mb-3 gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 style={{ color: 'var(--text-primary)' }} className="font-semibold">{r.name}</h3>
                    <span className={statusBadge[r.status]?.cls}>{statusBadge[r.status]?.label}</span>
                    {r.show_on_home && <span className="badge-info">Ana səhifədə</span>}
                  </div>
                  <p style={{ color: 'var(--text-faint)' }} className="text-xs mt-0.5">
                    {r.platform}{r.country ? ` · ${r.country}` : ''} · {new Date(r.created_at).toLocaleDateString('az-AZ')}
                  </p>
                </div>
                <div className="flex gap-0.5 flex-shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className={i < r.rating ? 'fill-current' : ''} style={{ color: i < r.rating ? 'var(--warning)' : 'var(--border-strong)' }} />
                  ))}
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)' }} className="text-sm mb-4">&ldquo;{r.message}&rdquo;</p>

              <div className="flex items-center gap-2 flex-wrap pt-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                {r.status !== 'approved' && (
                  <button onClick={() => setStatus(r, 'approved')} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'var(--success-muted)', color: 'var(--success)' }}>
                    <CheckCircle size={12} /> Təsdiqlə
                  </button>
                )}
                {r.status !== 'rejected' && (
                  <button onClick={() => setStatus(r, 'rejected')} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'var(--danger-muted)', color: 'var(--danger)' }}>
                    <XCircle size={12} /> Rədd et
                  </button>
                )}
                <button onClick={() => setStatus(r, 'spam')} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
                  <AlertTriangle size={12} /> Spam
                </button>
                {r.status === 'approved' && (
                  <button onClick={() => toggleHome(r)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'var(--info-muted)', color: 'var(--info)' }}>
                    <Home size={12} /> {r.show_on_home ? 'Ana səhifədən çıxar' : 'Ana səhifədə göstər'}
                  </button>
                )}
                <button onClick={() => remove(r.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium ml-auto" style={{ background: 'var(--danger-muted)', color: 'var(--danger)' }}>
                  <Trash2 size={12} /> Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Toast message={toast} />
    </div>
  )
}
