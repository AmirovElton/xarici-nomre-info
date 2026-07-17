'use client'

import { useState, useEffect } from 'react'
import { X, Star, Clock } from 'lucide-react'

interface CountryData {
  id: string
  platform_id: string
  platform_name: string
  name: string
  flag: string
  country_code: string
  stock_count: number
  stock_status: 'in_stock' | 'low_stock' | 'out_of_stock'
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

interface CountryCardProps {
  country: CountryData
}

export default function CountryCard({ country }: CountryCardProps) {
  const [showModal, setShowModal] = useState(false)
  const [visible, setVisible] = useState(false)

  const isAvailable = country.stock_status === 'in_stock' || country.stock_status === 'low_stock'

  const getStockBadge = () => {
    if (country.stock_status === 'in_stock') return { label: 'Stokda', className: 'badge-success' }
    if (country.stock_status === 'low_stock') return { label: 'Az stok', className: 'badge-warning' }
    return { label: 'Stokda yoxdur', className: 'badge-danger' }
  }

  const stockBadge = getStockBadge()

  // Smooth open/close animation control
  const openModal = () => {
    setShowModal(true)
    requestAnimationFrame(() => setVisible(true))
  }
  const closeModal = () => {
    setVisible(false)
    setTimeout(() => setShowModal(false), 220)
  }

  // Lock body scroll while modal open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [showModal])

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('az-AZ', {
      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
    })

  return (
    <>
      {/* Compact Card - whole card clickable */}
      <button
        onClick={openModal}
        className="theme-card p-4 flex items-center justify-between gap-3 w-full text-left cursor-pointer hover:scale-[1.01] transition-transform"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-2xl flex-shrink-0">{country.flag}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span style={{ color: 'var(--text-primary)' }} className="font-semibold text-sm truncate">
                {country.name}
              </span>
              <span style={{ color: 'var(--text-muted)' }} className="text-xs">{country.country_code}</span>
              <span style={{ color: 'var(--text-faint)' }} className="text-xs">{country.platform_name}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={stockBadge.className}>{stockBadge.label}</span>
              {country.is_premium && <span className="badge-accent">Premium</span>}
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          {country.show_price && country.price ? (
            <span style={{ color: 'var(--success)' }} className="font-bold text-sm">{country.price} AZN</span>
          ) : (
            <span style={{ color: 'var(--text-faint)' }} className="text-xs">Soruşun</span>
          )}
        </div>
      </button>

      {/* Centered Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-200"
            style={{ opacity: visible ? 1 : 0 }}
          />

          {/* Modal content - centered, compact, smooth */}
          <div
            className="relative w-full max-w-sm rounded-3xl p-6 max-h-[85vh] overflow-y-auto transition-all duration-200"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-lg)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'scale(1) translateY(0)' : 'scale(0.94) translateY(8px)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
            >
              <X size={16} />
            </button>

            {/* Centered header: flag, name, code */}
            <div className="flex flex-col items-center text-center mb-5 pt-1">
              <span className="text-5xl mb-2">{country.flag}</span>
              <h3 style={{ color: 'var(--text-primary)' }} className="font-bold text-xl">{country.name}</h3>
              <p style={{ color: 'var(--text-muted)' }} className="text-sm mt-0.5">
                {country.country_code} &middot; {country.platform_name}
              </p>
              {country.is_premium && (
                <span className="badge-accent mt-2 inline-flex items-center gap-1">
                  <Star size={11} fill="currentColor" /> Premium
                </span>
              )}
            </div>

            {/* Details */}
            <div className="space-y-1 mb-4">
              <div className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)' }} className="text-sm">Stok</span>
                <span className={stockBadge.className}>
                  {isAvailable ? `${country.stock_count} ədəd` : 'Stokda yoxdur'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)' }} className="text-sm">Keyfiyyət</span>
                <span style={{ color: 'var(--text-primary)' }} className="text-sm font-medium">{country.quality_level}</span>
              </div>
              {country.stability_level && (
                <div className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-muted)' }} className="text-sm">Stabillik</span>
                  <span style={{ color: 'var(--text-primary)' }} className="text-sm font-medium">{country.stability_level}</span>
                </div>
              )}
              {country.recommended_use && (
                <div className="flex justify-between items-center py-2 gap-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-muted)' }} className="text-sm flex-shrink-0">Tövsiyə</span>
                  <span style={{ color: 'var(--text-secondary)' }} className="text-sm text-right">{country.recommended_use}</span>
                </div>
              )}
              {country.show_price && country.price && (
                <div className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-muted)' }} className="text-sm">Qiymət</span>
                  <span style={{ color: 'var(--success)' }} className="text-lg font-bold">{country.price} AZN</span>
                </div>
              )}
            </div>

            {country.short_description && (
              <p style={{ color: 'var(--text-secondary)' }} className="text-sm leading-relaxed mb-4 text-center">
                {country.short_description}
              </p>
            )}

            {/* Last updated */}
            <div className="flex items-center justify-center gap-1.5 mb-5" style={{ color: 'var(--text-faint)' }}>
              <Clock size={12} />
              <span className="text-xs">Son yenilənmə: {formatDate(country.last_updated)}</span>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/994501234567?text=${encodeURIComponent(
                isAvailable
                  ? `Salam, ${country.platform_name} üçün ${country.name} (${country.country_code}) nömrəsi sifariş etmək istəyirəm.`
                  : `Salam, ${country.name} ${country.platform_name} nömrəsi stoka gəldikdə xəbər verin.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full justify-center text-sm py-3"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214l-.29-.174-3.03.795.808-2.953-.192-.303A8 8 0 1112 20z"/>
              </svg>
              {isAvailable ? 'WhatsApp-dan sifariş et' : 'Stoka gələndə xəbər al'}
            </a>
          </div>
        </div>
      )}
    </>
  )
}
