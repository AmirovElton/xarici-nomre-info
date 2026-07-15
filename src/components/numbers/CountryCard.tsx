'use client'

import { MessageCircle, Clock, Star, TrendingUp } from 'lucide-react'
import { getWhatsAppUrl, formatDate, cn } from '@/lib/utils'
import { STOCK_STATUS_MAP, type StockStatus } from '@/lib/types'

interface CountryCardProps {
  country: {
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
}

export default function CountryCard({ country }: CountryCardProps) {
  const statusInfo = STOCK_STATUS_MAP[country.stock_status]
  const isAvailable = country.stock_status === 'in_stock' || country.stock_status === 'low_stock'

  const whatsappMessage = isAvailable
    ? `Salam, ${country.platform_name} üçün ${country.name} nömrəsi haqqında məlumat almaq istəyirəm.`
    : `Salam, ${country.name} ${country.platform_name} nömrəsi stoka gəldikdə məlumat almaq istəyirəm.`

  return (
    <div className="glass-card p-5 hover:shadow-glass-lg transition-all duration-300 hover:-translate-y-0.5">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{country.flag}</span>
          <div>
            <h3 className="font-semibold text-gray-900">{country.name}</h3>
            <p className="text-xs text-gray-500">{country.country_code} &middot; {country.platform_name}</p>
          </div>
        </div>
        {country.is_premium && (
          <div className="px-2 py-1 rounded-lg bg-amber-50 border border-amber-200">
            <Star size={12} className="text-amber-500 fill-amber-500" />
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className={cn('px-2.5 py-1 rounded-lg text-xs font-medium border', statusInfo.color)}>
          {statusInfo.label}
        </span>
        {country.is_premium && (
          <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
            Premium
          </span>
        )}
        {country.is_popular && (
          <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
            Populyar
          </span>
        )}
      </div>

      {/* Info */}
      <div className="space-y-2 mb-4">
        {country.stock_count > 0 && (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <TrendingUp size={12} />
            <span>Stok: {country.stock_count} ədəd</span>
          </div>
        )}
        {country.quality_level && (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Star size={12} />
            <span>Səviyyə: {country.quality_level}</span>
          </div>
        )}
        {country.short_description && (
          <p className="text-xs text-gray-500 leading-relaxed">{country.short_description}</p>
        )}
      </div>

      {/* Price */}
      {country.show_price && country.price ? (
        <div className="mb-4 px-3 py-2 rounded-xl bg-green-50/50 border border-green-100">
          <span className="text-lg font-bold text-green-700">{country.price} AZN</span>
        </div>
      ) : (
        <div className="mb-4 px-3 py-2 rounded-xl bg-gray-50 border border-gray-100">
          <span className="text-xs text-gray-500">Qiymət üçün WhatsApp-dan məlumat alın</span>
        </div>
      )}

      {/* Last Updated */}
      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
        <Clock size={11} />
        <span>Son yenilənmə: {formatDate(country.last_updated)}</span>
      </div>

      {/* Action Button */}
      <a
        href={getWhatsAppUrl('994501234567', whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all',
          isAvailable
            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        )}
      >
        <MessageCircle size={16} />
        {isAvailable ? 'Məlumat al' : 'Stoka gələndə xəbər al'}
      </a>
    </div>
  )
}
