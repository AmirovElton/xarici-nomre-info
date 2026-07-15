'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2, MinusCircle, PlusCircle, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STOCK_STATUS_MAP } from '@/lib/types'

const initialCountries = [
  { id: '1', platform: 'WhatsApp', name: 'Türkiyə', flag: '🇹🇷', code: '+90', stock: 5, status: 'in_stock' as const, price: 15, showPrice: true, quality: 'Standart', premium: false, active: true },
  { id: '2', platform: 'WhatsApp', name: 'Böyük Britaniya', flag: '🇬🇧', code: '+44', stock: 3, status: 'in_stock' as const, price: 35, showPrice: true, quality: 'Premium', premium: true, active: true },
  { id: '3', platform: 'WhatsApp', name: 'ABŞ', flag: '🇺🇸', code: '+1', stock: 2, status: 'low_stock' as const, price: 30, showPrice: true, quality: 'Premium', premium: true, active: true },
  { id: '4', platform: 'WhatsApp', name: 'Filippin', flag: '🇵🇭', code: '+63', stock: 0, status: 'out_of_stock' as const, price: 0, showPrice: false, quality: 'Standart', premium: false, active: true },
  { id: '5', platform: 'WhatsApp', name: 'Hindistan', flag: '🇮🇳', code: '+91', stock: 4, status: 'in_stock' as const, price: 12, showPrice: true, quality: 'Standart', premium: false, active: true },
  { id: '6', platform: 'Telegram', name: 'Türkiyə', flag: '🇹🇷', code: '+90', stock: 3, status: 'in_stock' as const, price: 10, showPrice: true, quality: 'Standart', premium: false, active: true },
  { id: '7', platform: 'Telegram', name: 'Böyük Britaniya', flag: '🇬🇧', code: '+44', stock: 2, status: 'in_stock' as const, price: 25, showPrice: true, quality: 'Premium', premium: true, active: true },
  { id: '8', platform: 'Telegram', name: 'Rusiya', flag: '🇷🇺', code: '+7', stock: 6, status: 'in_stock' as const, price: 8, showPrice: true, quality: 'Standart', premium: false, active: true },
]

export default function AdminCountriesPage() {
  const [countries, setCountries] = useState(initialCountries)
  const [search, setSearch] = useState('')
  const [filterPlatform, setFilterPlatform] = useState('all')

  const filtered = countries.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.code.includes(search)
    const matchPlatform = filterPlatform === 'all' || c.platform === filterPlatform
    return matchSearch && matchPlatform
  })

  const updateStock = (id: string, delta: number) => {
    setCountries(prev => prev.map(c => {
      if (c.id === id) {
        const newStock = Math.max(0, c.stock + delta)
        let newStatus = c.status
        if (newStock === 0) newStatus = 'out_of_stock'
        else if (newStock <= 2) newStatus = 'low_stock'
        else newStatus = 'in_stock'
        return { ...c, stock: newStock, status: newStatus }
      }
      return c
    }))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ölkələr</h1>
          <p className="text-sm text-gray-500">{countries.length} ölkə</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
          <Plus size={16} /> Yeni ölkə
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Axtar..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <select
          value={filterPlatform}
          onChange={(e) => setFilterPlatform(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <option value="all">Bütün platformalar</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="Telegram">Telegram</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-500">Ölkə</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Platforma</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Stok</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Qiymət</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Əməliyyat</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((country) => (
                <tr key={country.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{country.flag}</span>
                      <div>
                        <p className="font-medium text-gray-900">{country.name}</p>
                        <p className="text-xs text-gray-500">{country.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-lg text-xs bg-gray-100 text-gray-700">{country.platform}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateStock(country.id, -1)} className="text-red-400 hover:text-red-600">
                        <MinusCircle size={16} />
                      </button>
                      <span className="font-bold text-gray-900 w-6 text-center">{country.stock}</span>
                      <button onClick={() => updateStock(country.id, 1)} className="text-green-400 hover:text-green-600">
                        <PlusCircle size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={cn('px-2 py-1 rounded-lg text-xs font-medium border', STOCK_STATUS_MAP[country.status].color)}>
                      {STOCK_STATUS_MAP[country.status].label}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {country.showPrice ? (
                      <span className="font-medium text-gray-900">{country.price} AZN</span>
                    ) : (
                      <span className="text-xs text-gray-400">Gizli</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-indigo-50 text-indigo-600">
                        <Edit2 size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-600">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
