'use client'

import {
  Globe, MapPin, Package, Star, MessageSquare, Clock,
  TrendingUp, AlertCircle
} from 'lucide-react'

const stats = [
  { label: 'Aktiv platformalar', value: '3', icon: Globe, color: 'var(--accent)' },
  { label: 'Aktiv ölkələr', value: '8', icon: MapPin, color: 'var(--success)' },
  { label: 'Ümumi stok', value: '25', icon: Package, color: '#a855f7' },
  { label: 'Stokda olan', value: '7', icon: TrendingUp, color: '#10b981' },
  { label: 'Stokda olmayan', value: '1', icon: AlertCircle, color: 'var(--danger)' },
  { label: 'Premium nömrələr', value: '3', icon: Star, color: 'var(--warning)' },
  { label: 'Gözləyən rəylər', value: '2', icon: MessageSquare, color: '#f97316' },
  { label: 'Təsdiqlənmiş rəylər', value: '5', icon: MessageSquare, color: 'var(--accent)' },
]

const recentActivities = [
  { action: 'Stok yeniləndi', details: 'Türkiyə WhatsApp: 5 ədəd', time: '18:40' },
  { action: 'Rəy təsdiqləndi', details: 'Elvin M. - 5 ulduz', time: '17:20' },
  { action: 'Yeni ölkə əlavə edildi', details: 'Hindistan - WhatsApp', time: '15:00' },
  { action: 'Premium aktivləşdi', details: 'ABŞ +1 - WhatsApp', time: '14:10' },
  { action: 'Stok bitdi', details: 'Filippin WhatsApp', time: '10:00' },
]

export default function AdminDashboard() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 style={{ color: 'var(--text-primary)' }} className="text-2xl font-bold">Dashboard</h1>
        <p style={{ color: 'var(--text-faint)' }} className="text-sm mt-1">XariciNomrəAz idarəetmə paneli</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="theme-card p-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `color-mix(in srgb, ${stat.color} 15%, transparent)`, color: stat.color }}
              >
                <Icon size={18} />
              </div>
              <p style={{ color: 'var(--text-primary)' }} className="text-2xl font-bold">{stat.value}</p>
              <p style={{ color: 'var(--text-faint)' }} className="text-xs mt-0.5">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Activities */}
      <div className="theme-card p-6">
        <h2 style={{ color: 'var(--text-primary)' }} className="font-bold mb-4 flex items-center gap-2">
          <Clock size={18} style={{ color: 'var(--text-faint)' }} /> Son fəaliyyətlər
        </h2>
        <div className="space-y-0">
          {recentActivities.map((activity, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3"
              style={{ borderBottom: i < recentActivities.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}
            >
              <div>
                <p style={{ color: 'var(--text-primary)' }} className="text-sm font-medium">{activity.action}</p>
                <p style={{ color: 'var(--text-faint)' }} className="text-xs">{activity.details}</p>
              </div>
              <span style={{ color: 'var(--text-faint)' }} className="text-xs">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
