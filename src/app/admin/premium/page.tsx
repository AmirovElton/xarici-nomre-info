'use client'

import { useState } from 'react'
import { Star, Edit2, ToggleLeft, ToggleRight } from 'lucide-react'

const initialPremium = [
  { id: '1', name: 'Böyük Britaniya', flag: '🇬🇧', platform: 'WhatsApp', stability: 'Yüksək', featured: true, showOnHome: true },
  { id: '2', name: 'ABŞ', flag: '🇺🇸', platform: 'WhatsApp', stability: 'Yüksək', featured: true, showOnHome: true },
  { id: '3', name: 'Böyük Britaniya', flag: '🇬🇧', platform: 'Telegram', stability: 'Yüksək', featured: false, showOnHome: false },
]

export default function AdminPremiumPage() {
  const [items, setItems] = useState(initialPremium)

  const toggleFeatured = (id: string) => {
    setItems(prev => prev.map(i =>
      i.id === id ? { ...i, featured: !i.featured } : i
    ))
  }

  const toggleHome = (id: string) => {
    setItems(prev => prev.map(i =>
      i.id === id ? { ...i, showOnHome: !i.showOnHome } : i
    ))
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Premium Seçimlər</h1>
        <p className="text-sm text-gray-500">
          Premium olaraq işarələnmiş ölkələr
        </p>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border p-5">
            <div className="flex items-center gap-4">
              <span className="text-3xl">{item.flag}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.platform} &middot; Stabilik: {item.stability}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Seçilmiş</p>
                  <button onClick={() => toggleFeatured(item.id)}>
                    {item.featured
                      ? <ToggleRight size={24} className="text-amber-500" />
                      : <ToggleLeft size={24} className="text-gray-300" />
                    }
                  </button>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Ana səhifə</p>
                  <button onClick={() => toggleHome(item.id)}>
                    {item.showOnHome
                      ? <ToggleRight size={24} className="text-green-500" />
                      : <ToggleLeft size={24} className="text-gray-300" />
                    }
                  </button>
                </div>
                <button className="p-2 rounded-lg hover:bg-indigo-50 text-indigo-600">
                  <Edit2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-100">
        <p className="text-sm text-amber-700">
          <Star size={14} className="inline mr-1" />
          Premium seçimlər Ölkələr bölməsindən idarə olunur. Ölkəni premium
          olaraq işarələdikdə burada görünəcək.
        </p>
      </div>
    </div>
  )
}
