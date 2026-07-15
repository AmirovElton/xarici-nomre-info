'use client'

import { Clock, Star, TrendingUp } from 'lucide-react'
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
            <h3 className="font-semibold text-gray-100">{country.name}</h3>
            <p className="text-xs text-gray-500">{country.country_code} &middot; {country.platform_name}</p>
          </div>
        </div>
        {country.is_premium && (
          <div className="px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <Star size={12} className="text-amber-400 fill-amber-400" />
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className={cn('px-2.5 py-1 rounded-lg text-xs font-medium border', statusInfo.color)}>
          {statusInfo.label}
        </span>
        {country.is_premium && (
          <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
            Premium
          </span>
        )}
        {country.is_popular && (
          <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Populyar
          </span>
        )}
      </div>

      {/* Info */}
      <div className="space-y-2 mb-4">
        {country.stock_count > 0 && (
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <TrendingUp size={12} />
            <span>Stok: {country.stock_count} ədəd</span>
          </div>
        )}
        {country.quality_level && (
          <div className="flex items-center gap-2 text-xs text-gray-400">
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
        <div className="mb-4 px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
          <span className="text-lg font-bold text-green-400">{country.price} AZN</span>
        </div>
      ) : (
        <div className="mb-4 px-3 py-2 rounded-xl bg-gray-800/50 border border-gray-700/50">
          <span className="text-xs text-gray-500">Qiymət üçün WhatsApp-dan məlumat alın</span>
        </div>
      )}

      {/* Last Updated */}
      <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-4">
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
            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
        )}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214l-.29-.174-3.03.795.808-2.953-.192-.303A8 8 0 1112 20z"/></svg>
        {isAvailable ? 'Məlumat al' : 'Stoka gələndə xəbər al'}
      </a>
    </div>
  )
}
