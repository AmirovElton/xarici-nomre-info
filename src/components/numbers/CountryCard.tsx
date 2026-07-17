'use client'

import { useState } from 'react'
import { Info, X, Clock, Star, TrendingUp, MessageCircle } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'
import { STOCK_STATUS_MAP, type StockStatus } from '@/lib/types'

interface CountryData {
  id: string
  platform_name: string
  name: string
  flag: string
  country_code: string
  stock_count: number
  stock_status: StockStatus
  price: number | null
  show_price: boolean
  quality_level: string
  stability_level: string | null
  is_premium: boolean
  is_popular: boolean
  recommended_use: string | null
  short_description: string | null
  last_updated: string
}

export default function CountryCard({ country }: { country: CountryData }) {
  const [expanded, setExpanded] = useState(false)
  const statusInfo = STOCK_STATUS_MAP[country.stock_status]
  const isAvailable = country.stock_status === 'in_stock' || country.stock_status === 'low_stock'

  const whatsappMsg = isAvailable
    ? `Salam, ${country.platform_name} üçün ${country.name} nömrəsi haqqında məlumat almaq istəyirəm.`
    : `Salam, ${country.name} ${country.platform_name} nömrəsi stoka gəldikdə xəbər almaq istəyirəm.`

  return (
    <>
      {/* Compact Card */}
      <div
        className="theme-card p-4 cursor-pointer flex items-center gap-3"
        onClick={() => setExpanded(true)}
      >
        {/* Left: Flag + Info */}
        <span className="text-2xl flex-shrink-0">{country.flag}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm truncate" style={{ color: 'var(--text-primary)' }}>{country.name}</h3>
            {country.is_premium && (
              <Star size={12} style={{ color: 'var(--warning)' }} className="fill-current flex-shrink-0" />
            )}
          </div>
          <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
            {country.country_code} · {country.platform_name}
          </p>
        </div>

        {/* Right: Price + Info btn */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {country.show_price && country.price ? (
            <span className="font-bold text-sm" style={{ color: 'var(--success)' }}>{country.price} AZN</span>
          ) : (
            <span className="text-xs" style={{ color: 'var(--text-faint)' }}>Sorğu</span>
          )}
          <button
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
            style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}
            onClick={(e) => { e.stopPropagation(); setExpanded(true) }}
          >
            <Info size={14} />
          </button>
        </div>
      </div>

      {/* Expanded Detail Modal/Bottom Sheet */}
      {expanded && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center" onClick={() => setExpanded(false)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Content */}
          <div
            className="relative w-full max-w-md mx-4 mb-0 md:mb-0 animate-slide-up rounded-t-3xl md:rounded-3xl overflow-hidden"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar (mobile) */}
            <div className="md:hidden flex justify-center pt-3">
              <div className="w-10 h-1 rounded-full" style={{ background: 'var(--border-strong)' }} />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between p-5 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{country.flag}</span>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{country.name}</h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{country.country_code} · {country.platform_name}</p>
                </div>
              </div>
              <button onClick={() => setExpanded(false)} className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'var(--bg-card)', color: 'var(--text-muted)' }}>
                <X size={16} />
              </button>
            </div>

            {/* Badges */}
            <div className="px-5 pb-3 flex flex-wrap gap-2">
              <span className={statusInfo.color}>{statusInfo.label}</span>
              {country.is_premium && <span className="badge-warning">Premium</span>}
              {country.is_popular && <span className="badge-accent">Populyar</span>}
            </div>

            {/* Details */}
            <div className="px-5 pb-4 space-y-3">
              {country.show_price && country.price && (
                <div className="p-3 rounded-xl" style={{ background: 'var(--success-muted)', border: '1px solid rgba(34,197,94,0.15)' }}>
                  <span className="text-xl font-bold" style={{ color: 'var(--success)' }}>{country.price} AZN</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                {country.stock_count > 0 && (
                  <div className="flex items-center gap-2">
                    <TrendingUp size={14} style={{ color: 'var(--text-muted)' }} />
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Stok: {country.stock_count}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Star size={14} style={{ color: 'var(--text-muted)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Səviyyə: {country.quality_level}</span>
                </div>
                {country.stability_level && (
                  <div className="flex items-center gap-2">
                    <TrendingUp size={14} style={{ color: 'var(--text-muted)' }} />
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Stabillik: {country.stability_level}</span>
                  </div>
                )}
                {country.recommended_use && (
                  <div className="flex items-center gap-2 col-span-2">
                    <Info size={14} style={{ color: 'var(--text-muted)' }} />
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{country.recommended_use}</span>
                  </div>
                )}
              </div>

              {country.short_description && (
                <p className="text-sm leading-relaxed p-3 rounded-xl" style={{ color: 'var(--text-secondary)', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                  {country.short_description}
                </p>
              )}

              <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-faint)' }}>
                <Clock size={11} />
                <span>Son yenilənmə: {new Date(country.last_updated).toLocaleDateString('az-AZ')}</span>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="p-5 pt-2">
              <a
                href={getWhatsAppUrl('994501234567', whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-white transition-all"
                style={{ background: isAvailable ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'var(--bg-card)', color: isAvailable ? 'white' : 'var(--text-muted)' }}
              >
                <MessageCircle size={16} />
                {isAvailable ? 'WhatsApp-dan məlumat al' : 'Stoka gələndə xəbər al'}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
