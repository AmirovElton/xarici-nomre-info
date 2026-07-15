'use client'

import { Globe, MapPin, Package, Star, MessageSquare, Clock, TrendingUp, AlertCircle } from 'lucide-react'

const stats = [
  { label: 'Aktiv platformalar', value: '3', icon: Globe, color: 'bg-blue-50 text-blue-600' },
  { label: 'Aktiv ölkələr', value: '8', icon: MapPin, color: 'bg-green-50 text-green-600' },
  { label: 'Ümumi stok', value: '25', icon: Package, color: 'bg-purple-50 text-purple-600' },
  { label: 'Stokda olan', value: '7', icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600' },
  { label: 'Stokda olmayan', value: '1', icon: AlertCircle, color: 'bg-red-50 text-red-600' },
  { label: 'Premium nömrələr', value: '3', icon: Star, color: 'bg-amber-50 text-amber-600' },
  { label: 'Gözləyən rəylər', value: '2', icon: MessageSquare, color: 'bg-orange-50 text-orange-600' },
  { label: 'Təsdiqlənmiş rəylər', value: '5', icon: MessageSquare, color: 'bg-blue-50 text-blue-600' },
]

const recentActivities = [
  { action: 'Stok yeniləndi', details: 'Türkiyə WhatsApp: 5 ədəd', time: '18:40' },
  { action: 'Rəy təsdiqləndi', details: 'Elvin M. - 5 ulduz', time: '17:20' },
  { action: 'Yeni ölkə əlavə edildi', details: 'Hindistan - WhatsApp', time: '15:00' },
  { action: 'Qiymət dəyişdirildi', details: 'ABŞ WhatsApp: 30 AZN', time: '14:30' },
]

export default function AdminDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">XariciNomrəAz idarəetmə paneli</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-4">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                <Icon size={18} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Clock size={18} className="text-gray-500" />
          Son fəaliyyətlər
        </h2>
        <div className="space-y-3">
          {recentActivities.map((activity, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.details}</p>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Last Update Info */}
      <div className="mt-6 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
        <p className="text-sm text-indigo-700">
          <strong>Son stok yenilənməsi:</strong> Bu gün, 18:40
        </p>
      </div>
    </div>
  )
}
