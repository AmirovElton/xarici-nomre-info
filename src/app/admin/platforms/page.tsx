'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2, GripVertical, ToggleLeft, ToggleRight } from 'lucide-react'

const initialPlatforms = [
  { id: '1', name: 'WhatsApp', icon: 'message-circle', description: 'WhatsApp mesajlaşma platforması üçün virtual nömrələr', active: true, order: 1 },
  { id: '2', name: 'Telegram', icon: 'send', description: 'Telegram platforması üçün virtual nömrələr', active: true, order: 2 },
  { id: '3', name: 'Digər platformalar', icon: 'globe', description: 'Digər sosial şəbəkə və xidmətlər üçün nömrələr', active: true, order: 3 },
]

export default function AdminPlatformsPage() {
  const [platforms, setPlatforms] = useState(initialPlatforms)

  const toggleActive = (id: string) => {
    setPlatforms(prev => prev.map(p =>
      p.id === id ? { ...p, active: !p.active } : p
    ))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platformalar</h1>
          <p className="text-sm text-gray-500">{platforms.length} platforma</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
          <Plus size={16} /> Yeni platforma
        </button>
      </div>

      <div className="space-y-3">
        {platforms.map((platform) => (
          <div key={platform.id} className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4">
            {/* Drag Handle */}
            <button className="text-gray-300 hover:text-gray-500 cursor-grab">
              <GripVertical size={18} />
            </button>

            {/* Platform Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                <span className="px-2 py-0.5 rounded-lg text-xs bg-gray-100 text-gray-500">
                  Sıra: {platform.order}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{platform.description}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleActive(platform.id)}
                className={platform.active ? 'text-green-500' : 'text-gray-300'}
              >
                {platform.active ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
              </button>
              <button className="p-2 rounded-lg hover:bg-indigo-50 text-indigo-600">
                <Edit2 size={16} />
              </button>
              <button className="p-2 rounded-lg hover:bg-red-50 text-red-600">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
