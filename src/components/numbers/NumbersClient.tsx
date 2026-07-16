'use client'

import { useState, useMemo } from 'react'
import { Search, ArrowLeft, RefreshCw } from 'lucide-react'
import CountryCard from './CountryCard'
import { cn } from '@/lib/utils'

const platforms = [
  { id: '2', name: 'WhatsApp', icon: '💬', desc: 'WhatsApp nömrələri' },
  { id: '3', name: 'Telegram', icon: '✈️', desc: 'Telegram nömrələri' },
  { id: '4', name: 'Digər', icon: '🌐', desc: 'Digər platformalar' },
]

const countries = [
  { id: '1', platform_id: '2', platform_name: 'WhatsApp', name: 'Türkiyə', flag: '🇹🇷', country_code: '+90', stock_count: 5, stock_status: 'in_stock' as const, price: 15, show_price: true, quality_level: 'Standart', stability_level: 'Orta', is_premium: false, is_popular: true, recommended_use: 'Şəxsi və biznes istifadəsi', short_description: 'Yeni hesab yaradılması üçün uyğun seçimdir.', last_updated: '2026-07-15T18:40:00Z' },
  { id: '2', platform_id: '2', platform_name: 'WhatsApp', name: 'Böyük Britaniya', flag: '🇬🇧', country_code: '+44', stock_count: 3, stock_status: 'in_stock' as const, price: 35, show_price: true, quality_level: 'Premium', stability_level: 'Yüksək', is_premium: true, is_popular: true, recommended_use: 'Uzunmüddətli istifadə', short_description: 'Uzunmüddətli istifadə üçün üstünlük verilən seçimdir.', last_updated: '2026-07-15T16:20:00Z' },
  { id: '3', platform_id: '2', platform_name: 'WhatsApp', name: 'ABŞ', flag: '🇺🇸', country_code: '+1', stock_count: 2, stock_status: 'low_stock' as const, price: 30, show_price: true, quality_level: 'Premium', stability_level: 'Yüksək', is_premium: true, is_popular: true, recommended_use: 'Biznes və şəxsi istifadə', short_description: 'Premium keyfiyyətli, stabil seçim.', last_updated: '2026-07-15T14:10:00Z' },
  { id: '4', platform_id: '2', platform_name: 'WhatsApp', name: 'Filippin', flag: '🇵🇭', country_code: '+63', stock_count: 0, stock_status: 'out_of_stock' as const, price: null, show_price: false, quality_level: 'Standart', stability_level: null, is_premium: false, is_popular: false, recommended_use: null, short_description: 'Yaxın zamanda əlavə ediləcək.', last_updated: '2026-07-14T10:00:00Z' },
  { id: '5', platform_id: '2', platform_name: 'WhatsApp', name: 'Hindistan', flag: '🇮🇳', country_code: '+91', stock_count: 4, stock_status: 'in_stock' as const, price: 12, show_price: true, quality_level: 'Standart', stability_level: 'Orta', is_premium: false, is_popular: false, recommended_use: 'Qısamüddətli istifadə', short_description: 'Qısa müddətli istifadə üçün əlverişli seçimdir.', last_updated: '2026-07-15T12:30:00Z' },
  { id: '6', platform_id: '3', platform_name: 'Telegram', name: 'Türkiyə', flag: '🇹🇷', country_code: '+90', stock_count: 3, stock_status: 'in_stock' as const, price: 10, show_price: true, quality_level: 'Standart', stability_level: 'Orta', is_premium: false, is_popular: true, recommended_use: 'Yeni hesab yaratmaq', short_description: 'Telegram üçün uyğun seçim.', last_updated: '2026-07-15T17:00:00Z' },
  { id: '7', platform_id: '3', platform_name: 'Telegram', name: 'Böyük Britaniya', flag: '🇬🇧', country_code: '+44', stock_count: 2, stock_status: 'in_stock' as const, price: 25, show_price: true, quality_level: 'Premium', stability_level: 'Yüksək', is_premium: true, is_popular: false, recommended_use: 'Uzunmüddətli istifadə', short_description: 'Premium və stabil Telegram nömrəsi.', last_updated: '2026-07-15T15:45:00Z' },
  { id: '8', platform_id: '3', platform_name: 'Telegram', name: 'Rusiya', flag: '🇷🇺', country_code: '+7', stock_count: 6, stock_status: 'in_stock' as const, price: 8, show_price: true, quality_level: 'Standart', stability_level: 'Orta', is_premium: false, is_popular: true, recommended_use: 'Şəxsi istifadə', short_description: 'Geniş stokda olan əlverişli seçim.', last_updated: '2026-07-15T18:00:00Z' },
]

const stockFilters = [
  { id: 'all', label: 'Hamısı' },
  { id: 'in_stock', label: 'Stokda var' },
  { id: 'premium', label: 'Premium' },
  { id: 'popular', label: 'Ən çox seçilən' },
]

export default function NumbersClient() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [stockFilter, setStockFilter] = useState('all')

  const filteredCountries = useMemo(() => {
    if (!selectedPlatform) return []
    let result = countries.filter(c => c.platform_id === selectedPlatform)
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(c => c.name.toLowerCase().includes(q) || c.country_code.includes(q))
    }
    if (stockFilter === 'in_stock') result = result.filter(c => c.stock_status === 'in_stock' || c.stock_status === 'low_stock')
    else if (stockFilter === 'premium') result = result.filter(c => c.is_premium)
    else if (stockFilter === 'popular') result = result.filter(c => c.is_popular)
    return result
  }, [selectedPlatform, searchQuery, stockFilter])

  if (!selectedPlatform) {
    return (
      <div className="px-4 py-6 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="section-title">Nömrələr</h1>
            <p className="section-subtitle">Platformanızı seçin</p>
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-4">
            {platforms.slice(0, 2).map((p) => (
              <button key={p.id} onClick={() => setSelectedPlatform(p.id)} className="glass-card p-6 flex flex-col items-center gap-3 hover:border-indigo-500/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <span className="text-4xl">{p.icon}</span>
                <span className="font-semibold text-gray-100">{p.name}</span>
                <span className="text-xs text-gray-500">{p.desc}</span>
              </button>
            ))}
          </div>
          <div className="max-w-[200px] mx-auto">
            {platforms.slice(2).map((p) => (
              <button key={p.id} onClick={() => setSelectedPlatform(p.id)} className="glass-card p-6 w-full flex flex-col items-center gap-3 hover:border-indigo-500/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <span className="text-4xl">{p.icon}</span>
                <span className="font-semibold text-gray-100">{p.name}</span>
                <span className="text-xs text-gray-500">{p.desc}</span>
              </button>
            ))}
          </div>
          <div className="mt-8 text-center flex items-center justify-center gap-2 text-xs text-gray-500">
            <RefreshCw size={12} /><span>Stok məlumatları son dəfə 15 iyul 2026 tarixində yenilənib</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <button onClick={() => { setSelectedPlatform(null); setSearchQuery(''); setStockFilter('all') }} className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 mb-3"><ArrowLeft size={16} /> Platformalar</button>
          <h1 className="section-title">{platforms.find(p => p.id === selectedPlatform)?.name} Nömrələri</h1>
          <p className="section-subtitle">Mövcud ölkələri və stok vəziyyətini görün</p>
        </div>
        <div className="relative max-w-lg mx-auto mb-5">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Ölkə adı və ya kodu axtar..." className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-700/50 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all" />
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {stockFilters.map((f) => (
            <button key={f.id} onClick={() => setStockFilter(f.id)} className={cn('px-4 py-2 rounded-xl text-xs font-medium transition-all border', stockFilter === f.id ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-zinc-900/50 text-gray-400 border-zinc-700/50 hover:bg-zinc-800/50')}>{f.label}</button>
          ))}
        </div>
        <p className="text-sm text-gray-500 mb-4 text-center">{filteredCountries.length} nəticə</p>
        {filteredCountries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCountries.map((c) => <CountryCard key={c.id} country={c} />)}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <Search size={24} className="mx-auto text-gray-600 mb-3" />
            <h3 className="font-semibold text-gray-300 mb-2">Nəticə tapılmadı</h3>
            <p className="text-sm text-gray-500">Axtarış parametrlərini dəyişdirin</p>
          </div>
        )}
      </div>
    </div>
  )
}
