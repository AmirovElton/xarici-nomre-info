'use client'

import { useState, useMemo, useEffect } from 'react'
import { Search, ArrowLeft, RefreshCw, Loader2 } from 'lucide-react'
import CountryCard from './CountryCard'
import { WhatsAppIcon, TelegramIcon, GlobalIcon } from './PlatformIcons'
import { fetchActivePlatforms, fetchActiveCountries } from '@/lib/public-data'
import type { Platform, Country } from '@/lib/types'

const stockFilters = [
  { id: 'all', label: 'Hamısı' },
  { id: 'in_stock', label: 'Stokda var' },
  { id: 'premium', label: 'Premium' },
  { id: 'popular', label: 'Ən çox seçilən' },
]

function PlatformIcon({ name, size = 40 }: { name: string; size?: number }) {
  const n = name.toLowerCase()
  if (n.includes('whatsapp')) return <WhatsAppIcon size={size} />
  if (n.includes('telegram')) return <TelegramIcon size={size} />
  return <GlobalIcon size={size} />
}

export default function NumbersClient() {
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [stockFilter, setStockFilter] = useState('all')

  useEffect(() => {
    Promise.all([fetchActivePlatforms(), fetchActiveCountries()]).then(([p, c]) => {
      setPlatforms(p)
      setCountries(c)
      setLoading(false)
    })
  }, [])

  const platformName = (id: string) => platforms.find(p => p.id === id)?.name || ''

  const filteredCountries = useMemo(() => {
    if (!selectedPlatform) return []
    let result = countries
      .filter(c => c.platform_id === selectedPlatform)
      .map(c => ({ ...c, platform_name: platformName(c.platform_id) }))
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(c => c.name.toLowerCase().includes(q) || c.country_code.includes(q))
    }
    if (stockFilter === 'in_stock') result = result.filter(c => c.stock_status === 'in_stock' || c.stock_status === 'low_stock')
    else if (stockFilter === 'premium') result = result.filter(c => c.is_premium)
    else if (stockFilter === 'popular') result = result.filter(c => c.is_popular)
    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlatform, searchQuery, stockFilter, countries, platforms])

  if (loading) {
    return (
      <div className="px-4 py-6 flex items-center justify-center min-h-[50vh]">
        <Loader2 size={28} className="animate-spin" style={{ color: 'var(--accent)' }} />
      </div>
    )
  }

  // Platform Selection Screen
  if (!selectedPlatform) {
    return (
      <div className="px-4 py-6 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="section-title">Nömrələr</h1>
            <p className="section-subtitle">Platformanızı seçin</p>
          </div>

          {platforms.length === 0 ? (
            <div className="theme-card p-12 text-center max-w-md mx-auto">
              <p style={{ color: 'var(--text-muted)' }} className="text-sm">
                Hələ platforma əlavə edilməyib. Admin paneldən platforma əlavə edin.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {platforms.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlatform(p.id)}
                  className="theme-card p-6 flex flex-col items-center gap-3 hover:scale-[1.02] transition-all duration-300"
                >
                  <PlatformIcon name={p.name} size={40} />
                  <span style={{ color: 'var(--text-primary)' }} className="font-semibold">{p.name}</span>
                  {p.description && <span style={{ color: 'var(--text-faint)' }} className="text-xs">{p.description}</span>}
                </button>
              ))}
            </div>
          )}

          <div className="mt-8 text-center flex items-center justify-center gap-2 text-xs" style={{ color: 'var(--text-faint)' }}>
            <RefreshCw size={12} />
            <span>Stok məlumatları mütəmadi yenilənir</span>
          </div>
        </div>
      </div>
    )
  }

  // Countries List Screen
  return (
    <div className="px-4 py-6 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <button
            onClick={() => { setSelectedPlatform(null); setSearchQuery(''); setStockFilter('all') }}
            className="inline-flex items-center gap-2 text-sm mb-3 transition-opacity hover:opacity-80"
            style={{ color: 'var(--accent)' }}
          >
            <ArrowLeft size={16} /> Platformalar
          </button>
          <h1 className="section-title">{platformName(selectedPlatform)} Nömrələri</h1>
          <p className="section-subtitle">Mövcud ölkələri və stok vəziyyətini görün</p>
        </div>

        <div className="relative max-w-lg mx-auto mb-5">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-faint)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ölkə adı və ya kodu axtar..."
            className="theme-input w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {stockFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setStockFilter(f.id)}
              className="px-4 py-2 rounded-xl text-xs font-medium transition-all border"
              style={
                stockFilter === f.id
                  ? { background: 'color-mix(in srgb, var(--accent) 15%, transparent)', color: 'var(--accent)', borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)' }
                  : { background: 'var(--bg-card)', color: 'var(--text-muted)', borderColor: 'var(--border-subtle)' }
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        <p className="text-sm mb-4 text-center" style={{ color: 'var(--text-faint)' }}>
          {filteredCountries.length} nəticə
        </p>

        {filteredCountries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredCountries.map((c) => <CountryCard key={c.id} country={c} />)}
          </div>
        ) : (
          <div className="theme-card p-12 text-center">
            <Search size={24} className="mx-auto mb-3" style={{ color: 'var(--text-faint)' }} />
            <h3 style={{ color: 'var(--text-secondary)' }} className="font-semibold mb-2">Nəticə tapılmadı</h3>
            <p style={{ color: 'var(--text-faint)' }} className="text-sm">Bu platforma üçün hələ ölkə əlavə edilməyib və ya axtarışa uyğun nəticə yoxdur</p>
          </div>
        )}
      </div>
    </div>
  )
}
