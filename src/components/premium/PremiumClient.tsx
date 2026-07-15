'use client'

import { Crown, Shield, TrendingUp, MessageCircle, CheckCircle, Star } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

const premiumCountries = [
  {
    id: '1',
    name: 'Böyük Britaniya',
    flag: '🇬🇧',
    platform: 'WhatsApp',
    quality_level: 'Premium',
    stability: 'Yüksək',
    suitable_for: 'Şəxsi və biznes istifadəsi',
    recommended_use: 'Uzunmüddətli WhatsApp hesabı',
    popularity: 'Müştərilərin seçimi',
    note: 'Müştərilər tərəfindən uzunmüddətli istifadə üçün daha çox üstünlük verilən seçimlərdəndir.',
    tags: ['Premium', 'Müştərilərin seçimi', 'Daha stabil', 'Tövsiyə olunur'],
  },
  {
    id: '2',
    name: 'ABŞ',
    flag: '🇺🇸',
    platform: 'WhatsApp',
    quality_level: 'Premium',
    stability: 'Yüksək',
    suitable_for: 'Biznes və şəxsi istifadə',
    recommended_use: 'Uzunmüddətli istifadə',
    popularity: 'Ən çox seçilən',
    note: 'Düzgün istifadə zamanı daha rahat və stabil seçimdir.',
    tags: ['Premium', 'Ən çox seçilən', 'Uzunmüddətli istifadə'],
  },
  {
    id: '3',
    name: 'Böyük Britaniya',
    flag: '🇬🇧',
    platform: 'Telegram',
    quality_level: 'Premium',
    stability: 'Yüksək',
    suitable_for: 'Uzunmüddətli Telegram istifadəsi',
    recommended_use: 'Şəxsi və biznes kanalları',
    popularity: 'Daha stabil',
    note: 'Telegram üçün premium və stabil seçim.',
    tags: ['Premium', 'Daha stabil', 'Uzunmüddətli istifadə'],
  },
]

export default function PremiumClient() {
  return (
    <div className="px-4 py-6 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50/80 border border-amber-100 mb-4">
            <Crown size={14} className="text-amber-500" />
            <span className="text-xs font-medium text-amber-700">Premium seçimlər</span>
          </div>
          <h1 className="section-title">Stabil və Premium Seçimlər</h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            Uzunmüddətli istifadə üçün daha keyfiyyətli və müştərilər tərəfindən daha çox seçilən nömrələr
          </p>
        </div>

        {/* Important Note */}
        <div className="glass-card p-4 mb-8 max-w-3xl mx-auto bg-indigo-50/30 border-indigo-100/50">
          <div className="flex gap-3">
            <Shield size={18} className="text-indigo-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Bu bölmə satış üçün deyil, məlumatlandırma və tövsiyə məqsədi daşıyır. Heç bir nömrə üçün 
                &ldquo;100% bloklanmır&rdquo; və ya &ldquo;ömürlük zəmanət&rdquo; vədi verilmir. Premium seçimlər 
                düzgün istifadə zamanı daha rahat və uzunmüddətli təcrübə təklif edir.
              </p>
            </div>
          </div>
        </div>

        {/* Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {premiumCountries.map((country) => (
            <div key={country.id} className="glass-card p-6 hover:shadow-glass-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              {/* Premium gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />

              {/* Flag & Name */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{country.flag}</span>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{country.name}</h3>
                  <p className="text-sm text-gray-500">{country.platform}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {country.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 rounded-lg text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Details */}
              <div className="space-y-2.5 mb-5">
                <div className="flex items-center gap-2.5">
                  <Star size={14} className="text-amber-500" />
                  <span className="text-sm text-gray-700">Səviyyə: <strong>{country.quality_level}</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <TrendingUp size={14} className="text-green-500" />
                  <span className="text-sm text-gray-700">Stabilik: <strong>{country.stability}</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle size={14} className="text-blue-500" />
                  <span className="text-sm text-gray-700">Uyğundur: {country.suitable_for}</span>
                </div>
              </div>

              {/* Note */}
              <p className="text-xs text-gray-500 leading-relaxed mb-5 p-3 rounded-xl bg-gray-50/50 border border-gray-100">
                {country.note}
              </p>

              {/* CTA */}
              <a
                href={getWhatsAppUrl('994501234567', `Salam, premium və uzunmüddətli istifadə üçün ${country.name} ${country.platform} nömrəsi haqqında məlumat almaq istəyirəm.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg transition-all"
              >
                <MessageCircle size={16} />
                Məlumat al
              </a>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-10 text-center">
          <div className="glass-card inline-block px-6 py-4">
            <p className="text-sm text-gray-600 mb-3">
              Uzunmüddətli WhatsApp istifadəsi üçün premium və daha stabil seçimlərə baxmağınız tövsiyə olunur.
            </p>
            <a
              href={getWhatsAppUrl('994501234567', 'Salam, premium nömrələr haqqında ətraflı məlumat almaq istəyirəm.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-sm"
            >
              <MessageCircle size={16} />
              WhatsApp-dan əlaqə
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
