'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, Smartphone, Send, Globe, RefreshCw } from 'lucide-react'
import CountryCard from './CountryCard'
import { cn } from '@/lib/utils'

// Static data for initial build - will be replaced with Supabase data
const platforms = [
  { id: '1', name: 'Hamısı', icon: 'globe' },
  { id: '2', name: 'WhatsApp', icon: 'message-circle' },
  { id: '3', name: 'Telegram', icon: 'send' },
  { id: '4', name: 'Digər', icon: 'smartphone' },
]

const countries = [
  { id: '1', platform_id: '2', platform_name: 'WhatsApp', name: 'Türkiyə', flag: '🇹🇷', country_code: '+90', stock_count: 5, stock_status: 'in_stock' as const, price: 15, show_price: true, quality_level: 'Standart', stability_level: 'Orta', is_premium: false, is_popular: true, recommended_use: 'Şəxsi və biznes istifadəsi', short_description: 'Yeni hesab yaradılması üçün uyğun seçimdir.', last_updated: '2026-07-15T18:40:00Z' },
  { id: '2', platform_id: '2', platform_name: 'WhatsApp', name: 'Böyük Britaniya', flag: '🇬🇧', country_code: '+44', stock_count: 3, stock_status: 'in_stock' as const, price: 35, show_price: true, quality_level: 'Premium', stability_level: 'Yüksək', is_premium: true, is_popular: true, recommended_use: 'Uzunmüddətli şəxsi və biznes istifadəsi', short_description: 'Müştərilər tərəfindən uzunmüddətli istifadə üçün daha çox üstünlük verilən seçimdir.', last_updated: '2026-07-15T16:20:00Z' },
  { id: '3', platform_id: '2', platform_name: 'WhatsApp', name: 'ABŞ', flag: '🇺🇸', country_code: '+1', stock_count: 2, stock_status: 'low_stock' as const, price: 30, show_price: true, quality_level: 'Premium', stability_level: 'Yüksək', is_premium: true, is_popular: true, recommended_use: 'Biznes və şəxsi istifadə', short_description: 'Premium keyfiyyətli, stabil seçim.', last_updated: '2026-07-15T14:10:00Z' },
  { id: '4', platform_id: '2', platform_name: 'WhatsApp', name: 'Filippin', flag: '🇵🇭', country_code: '+63', stock_count: 0, stock_status: 'out_of_stock' as const, price: null, show_price: false, quality_level: 'Standart', stability_level: null, is_premium: false, is_popular: false, recommended_use: null, short_description: 'Yaxın zamanda əlavə ediləcək.', last_updated: '2026-07-14T10:00:00Z' },
  { id: '5', platform_id: '2', platform_name: 'WhatsApp', name: 'Hindistan', flag: '🇮🇳', country_code: '+91', stock_count: 4, stock_status: 'in_stock' as const, price: 12, show_price: true, quality_level: 'Standart', stability_level: 'Orta', is_premium: false, is_popular: false, recommended_use: 'Birdəfəlik və qısamüddətli istifadə', short_description: 'Qısa müddətli istifadə üçün əlverişli seçimdir.', last_updated: '2026-07-15T12:30:00Z' },
  { id: '6', platform_id: '3', platform_name: 'Telegram', name: 'Türkiyə', flag: '🇹🇷', country_code: '+90', stock_count: 3, stock_status: 'in_stock' as const, price: 10, show_price: true, quality_level: 'Standart', stability_level: 'Orta', is_premium: false, is_popular: true, recommended_use: 'Yeni hesab yaratmaq', short_description: 'Telegram üçün uyğun seçim.', last_updated: '2026-07-15T17:00:00Z' },
  { id: '7', platform_id: '3', platform_name: 'Telegram', name: 'Böyük Britaniya', flag: '🇬🇧', country_code: '+44', stock_count: 2, stock_status: 'in_stock' as const, price: 25, show_price: true, quality_level: 'Premium', stability_level: 'Yüksək', is_premium: true, is_popular: false, recommended_use: 'Uzunmüddətli istifadə', short_description: 'Premium və stabil Telegram nömrəsi.', last_updated: '2026-07-15T15:45:00Z' },
  { id: '8', platform_id: '3', platform_name: 'Telegram', name: 'Rusiya', flag: '🇷🇺', country_code: '+7', stock_count: 6, stock_status: 'in_stock' as const, price: 8, show_price: true, quality_level: 'Standart', stability_level: 'Orta', is_premium: false, is_popular: true, recommended_use: 'Şəxsi istifadə', short_description: 'Geniş stokda olan əlverişli seçim.', last_updated: '2026-07-15T18:00:00Z' },
]

const stockFilters = [
  { id: 'all', label: 'Hamısı' },
  { id: 'in_stock', label: 'Stokda var' },
  { id: 'premium', label: 'Premium' },
  { id: 'popular', label: 'Ən çox seçilən' },
  { id: 'out_of_stock', label: 'Stokda yoxdur' },
]

export default function NumbersClient() {
  const [selectedPlatform, setSelectedPlatform] = useState('1')
  const [searchQuery, setSearchQuery] = useState('')
  const [stockFilter, setStockFilter] = useState('all')

  const filteredCountries = useMemo(() => {
    let result = countries

    // Platform filter
    if (selectedPlatform !== '1') {
      result = result.filter(c => c.platform_id === selectedPlatform)
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.country_code.includes(q) ||
        c.platform_name.toLowerCase().includes(q)
      )
    }

    // Stock filter
    if (stockFilter === 'in_stock') {
      result = result.filter(c => c.stock_status === 'in_stock' || c.stock_status === 'low_stock')
    } else if (stockFilter === 'out_of_stock') {
      result = result.filter(c => c.stock_status === 'out_of_stock')
    } else if (stockFilter === 'premium') {
      result = result.filter(c => c.is_premium)
    } else if (stockFilter === 'popular') {
      result = result.filter(c => c.is_popular)
    }

    return result
  }, [selectedPlatform, searchQuery, stockFilter])

  const getPlatformIcon = (icon: string) => {
    switch (icon) {
      case 'message-circle': return <Smartphone size={16} />
      case 'send': return <Send size={16} />
      case 'smartphone': return <Smartphone size={16} />
      default: return <Globe size={16} />
    }
  }

  return (
    <div className="px-4 py-6 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="section-title">Nömrələr</h1>
          <p className="section-subtitle">Platformanıza uyğun ölkələri və stok vəziyyətini görün</p>
        </div>

        {/* Last Updated Info */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <RefreshCw size={12} />
          <span>Stok məlumatları son dəfə 15 iyul 2026 tarixində yenilənib</span>
        </div>

        {/* Platform Tabs */}
        <div className="mb-4 overflow-x-auto hide-scrollbar">
          <div className="flex gap-2 pb-2">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium whitespace-nowrap transition-all',
                  selectedPlatform === platform.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'glass-card hover:shadow-glass-lg text-gray-700'
                )}
              >
                {getPlatformIcon(platform.icon)}
                {platform.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ölkə, kod və ya platforma axtar..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl glass-card border-0 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
            />
          </div>
        </div>

        {/* Stock Filters */}
        <div className="mb-6 overflow-x-auto hide-scrollbar">
          <div className="flex gap-2 pb-1">
            {stockFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setStockFilter(filter.id)}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border',
                  stockFilter === filter.id
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                    : 'bg-white/50 text-gray-600 border-gray-200 hover:bg-gray-50'
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            {filteredCountries.length} nəticə tapıldı
          </p>
        </div>

        {/* Country Cards Grid */}
        {filteredCountries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCountries.map((country) => (
              <CountryCard key={country.id} country={country} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-700 mb-2">Nəticə tapılmadı</h3>
            <p className="text-sm text-gray-500">Axtarış və ya filtr parametrlərini dəyişdirin</p>
          </div>
        )}
      </div>
    </div>
  )
}
