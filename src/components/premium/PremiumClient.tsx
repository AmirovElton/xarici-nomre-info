'use client'

import { Crown, Shield, TrendingUp, MessageCircle, CheckCircle, Star } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

const premiumCountries = [
  { id: '1', name: 'Böyük Britaniya', flag: '🇬🇧', platform: 'WhatsApp', quality_level: 'Premium', stability: 'Yüksək', suitable_for: 'Şəxsi və biznes istifadəsi', note: 'Uzunmüddətli istifadə üçün daha çox üstünlük verilən seçimdir.', tags: ['Premium', 'Müştərilərin seçimi', 'Daha stabil', 'Tövsiyə olunur'] },
  { id: '2', name: 'ABŞ', flag: '🇺🇸', platform: 'WhatsApp', quality_level: 'Premium', stability: 'Yüksək', suitable_for: 'Biznes və şəxsi istifadə', note: 'Düzgün istifadə zamanı daha rahat və stabil seçimdir.', tags: ['Premium', 'Ən çox seçilən', 'Uzunmüddətli istifadə'] },
  { id: '3', name: 'Böyük Britaniya', flag: '🇬🇧', platform: 'Telegram', quality_level: 'Premium', stability: 'Yüksək', suitable_for: 'Uzunmüddətli Telegram istifadəsi', note: 'Telegram üçün premium və stabil seçim.', tags: ['Premium', 'Daha stabil', 'Uzunmüddətli istifadə'] },
]

export default function PremiumClient() {
  return (
    <div className="px-4 py-6 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
            <Crown size={14} className="text-amber-400" />
            <span className="text-xs font-medium text-amber-300">Premium seçimlər</span>
          </div>
          <h1 className="section-title">Stabil və Premium Seçimlər</h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            Uzunmüddətli istifadə üçün daha keyfiyyətli və müştərilər tərəfindən daha çox seçilən nömrələr
          </p>
        </div>

        <div className="glass-card p-4 mb-8 max-w-3xl mx-auto border-indigo-500/20 bg-indigo-500/5">
          <div className="flex gap-3">
            <Shield size={18} className="text-indigo-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-300 leading-relaxed">
              Bu bölmə satış üçün deyil, məlumatlandırma və tövsiyə məqsədi daşıyır. Heç bir nömrə üçün 
              &ldquo;100% bloklanmır&rdquo; və ya &ldquo;ömürlük zəmanət&rdquo; vədi verilmir.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {premiumCountries.map((country) => (
            <div key={country.id} className="glass-card p-6 hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />

              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{country.flag}</span>
                <div>
                  <h3 className="font-bold text-gray-100 text-lg">{country.name}</h3>
                  <p className="text-sm text-gray-500">{country.platform}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {country.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-2.5 mb-5">
                <div className="flex items-center gap-2.5">
                  <Star size={14} className="text-amber-400" />
                  <span className="text-sm text-gray-300">Səviyyə: <strong className="text-gray-200">{country.quality_level}</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <TrendingUp size={14} className="text-green-400" />
                  <span className="text-sm text-gray-300">Stabilik: <strong className="text-gray-200">{country.stability}</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle size={14} className="text-blue-400" />
                  <span className="text-sm text-gray-300">Uyğundur: {country.suitable_for}</span>
                </div>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed mb-5 p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                {country.note}
              </p>

              <a
                href={getWhatsAppUrl('994501234567', `Salam, premium ${country.name} ${country.platform} nömrəsi haqqında məlumat almaq istəyirəm.`)}
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

        <div className="mt-10 text-center">
          <div className="glass-card inline-block px-6 py-4">
            <p className="text-sm text-gray-400 mb-3">
              Uzunmüddətli istifadə üçün premium seçimlərə baxmağınız tövsiyə olunur.
            </p>
            <a
              href={getWhatsAppUrl('994501234567', 'Salam, premium nömrələr haqqında ətraflı məlumat almaq istəyirəm.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-sm"
            >
              <MessageCircle size={16} /> WhatsApp-dan əlaqə
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
