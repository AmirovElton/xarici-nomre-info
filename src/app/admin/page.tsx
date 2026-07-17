'use client'

import { useState, useEffect } from 'react'
import { Globe, MapPin, Package, Star, MessageSquare, TrendingUp, AlertCircle, Clock } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { AdminLoading } from '@/components/admin/ui'
import type { Country, Platform, Review } from '@/lib/types'

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [countries, setCountries] = useState<Country[]>([])
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    Promise.all([
      supabase.from('countries').select('*'),
      supabase.from('platforms').select('*'),
      supabase.from('reviews').select('*'),
    ]).then(([c, p, r]) => {
      setCountries((c.data as Country[]) || [])
      setPlatforms((p.data as Platform[]) || [])
      setReviews((r.data as Review[]) || [])
      setLoading(false)
    })
  }, [])

  if (loading) return <AdminLoading />

  const inStock = countries.filter(c => c.stock_status === 'in_stock' || c.stock_status === 'low_stock').length
  const outOfStock = countries.filter(c => c.stock_status === 'out_of_stock').length
  const totalStock = countries.reduce((sum, c) => sum + (c.stock_count || 0), 0)

  const stats = [
    { label: 'Aktiv platformalar', value: platforms.filter(p => p.is_active).length, icon: Globe, color: 'var(--info)' },
    { label: 'Ümumi ölkələr', value: countries.length, icon: MapPin, color: 'var(--success)' },
    { label: 'Ümumi stok', value: totalStock, icon: Package, color: 'var(--accent)' },
    { label: 'Stokda olan', value: inStock, icon: TrendingUp, color: '#10b981' },
    { label: 'Stokda olmayan', value: outOfStock, icon: AlertCircle, color: 'var(--danger)' },
    { label: 'Premium nömrələr', value: countries.filter(c => c.is_premium).length, icon: Star, color: 'var(--warning)' },
    { label: 'Gözləyən rəylər', value: reviews.filter(r => r.status === 'pending').length, icon: MessageSquare, color: '#f97316' },
    { label: 'Təsdiqlənmiş rəylər', value: reviews.filter(r => r.status === 'approved').length, icon: MessageSquare, color: 'var(--accent)' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 style={{ color: 'var(--text-primary)' }} className="text-2xl font-bold">Dashboard</h1>
        <p style={{ color: 'var(--text-muted)' }} className="text-sm mt-1">XariciNomrəAz idarəetmə paneli</p>
      </div>

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
              <p style={{ color: 'var(--text-muted)' }} className="text-xs mt-0.5">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Low stock alerts */}
      <div className="theme-card p-6">
        <h2 style={{ color: 'var(--text-primary)' }} className="font-bold mb-4 flex items-center gap-2">
          <Clock size={18} style={{ color: 'var(--text-muted)' }} /> Diqqət tələb edən ölkələr
        </h2>
        <div className="space-y-2">
          {countries.filter(c => c.stock_count <= 2).slice(0, 8).map((c) => (
            <div key={c.id} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <div className="flex items-center gap-2">
                <span className="text-lg">{c.flag}</span>
                <span style={{ color: 'var(--text-primary)' }} className="text-sm font-medium">{c.name}</span>
                <span style={{ color: 'var(--text-faint)' }} className="text-xs">{c.country_code}</span>
              </div>
              <span
                className="text-xs font-medium px-2 py-1 rounded-lg"
                style={{ background: c.stock_count === 0 ? 'var(--danger-muted)' : 'var(--warning-muted)', color: c.stock_count === 0 ? 'var(--danger)' : 'var(--warning)' }}
              >
                {c.stock_count} ədəd
              </span>
            </div>
          ))}
          {countries.filter(c => c.stock_count <= 2).length === 0 && (
            <p style={{ color: 'var(--text-muted)' }} className="text-sm">Bütün ölkələrdə kifayət qədər stok var.</p>
          )}
        </div>
      </div>
    </div>
  )
}
