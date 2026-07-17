'use client'

import { Globe, MapPin, Package, Star, MessageSquare, Clock, TrendingUp, AlertCircle } from 'lucide-react'

const stats = [
  { label: 'Aktiv platformalar', value: '3', icon: Globe, color: 'var(--info)' },
  { label: 'Aktiv ölkələr', value: '8', icon: MapPin, color: 'var(--success)' },
  { label: 'Ümumi stok', value: '25', icon: Package, color: 'var(--accent)' },
  { label: 'Stokda olan', value: '7', icon: TrendingUp, color: 'var(--success)' },
  { label: 'Stokda olmayan', value: '1', icon: AlertCircle, color: 'var(--danger)' },
  { label: 'Premium', value: '3', icon: Star, color: 'var(--warning)' },
  { label: 'Gözləyən rəylər', value: '2', icon: MessageSquare, color: 'var(--warning)' },
  { label: 'Təsdiqlənmiş', value: '5', icon: MessageSquare, color: 'var(--info)' },
]

const activities = [
  { action: 'Stok yeniləndi', details: 'Türkiyə WhatsApp: 5 ədəd', time: '18:40' },
  { action: 'Rəy təsdiqləndi', details: 'Elvin M. - 5 ulduz', time: '17:20' },
  { action: 'Yeni ölkə əlavə edildi', details: 'Hindistan - WhatsApp', time: '15:00' },
  { action: 'Qiymət dəyişdirildi', details: 'ABŞ WhatsApp: 30 AZN', time: '14:30' },
]

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>XariciNomrəAz idarəetmə paneli</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className="theme-card p-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `color-mix(in srgb, ${s.color} 12%, transparent)`, color: s.color }}>
                <Icon size={18} />
              </div>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
            </div>
          )
        })}
      </div>

      {/* Activities */}
      <div className="theme-card p-6">
        <h2 className="font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <Clock size={18} style={{ color: 'var(--text-muted)' }} /> Son fəaliyyətlər
        </h2>
        <div className="space-y-3">
          {activities.map((a, i) => (
            <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: i < activities.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{a.action}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{a.details}</p>
              </div>
              <span className="text-xs" style={{ color: 'var(--text-faint)' }}>{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
