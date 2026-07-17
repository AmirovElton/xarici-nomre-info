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
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{ background: 'var(--warning-muted)', border: '1px solid color-mix(in srgb, var(--warning) 25%, transparent)' }}
          >
            <Crown size={14} style={{ color: 'var(--warning)' }} />
            <span style={{ color: 'var(--warning)' }} className="text-xs font-medium">Premium seçimlər</span>
          </div>
          <h1 className="section-title">Stabil və Premium Seçimlər</h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            Uzunmüddətli istifadə üçün daha keyfiyyətli və müştərilər tərəfindən daha çox seçilən nömrələr
          </p>
        </div>

        {/* Important Note - dark theme */}
        <div
          className="p-4 mb-8 max-w-3xl mx-auto rounded-2xl"
          style={{ background: 'var(--bg-card)', border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)' }}
        >
          <div className="flex gap-3">
            <Shield size={18} style={{ color: 'var(--accent)' }} className="flex-shrink-0 mt-0.5" />
            <p style={{ color: 'var(--text-secondary)' }} className="text-sm leading-relaxed">
              Bu bölmə satış üçün deyil, məlumatlandırma və tövsiyə məqsədi daşıyır. Heç bir nömrə üçün
              &ldquo;100% bloklanmır&rdquo; və ya &ldquo;ömürlük zəmanət&rdquo; vədi verilmir. Premium seçimlər
              düzgün istifadə zamanı daha rahat və uzunmüddətli təcrübə təklif edir.
            </p>
          </div>
        </div>

        {/* Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {premiumCountries.map((country) => (
            <div key={country.id} className="theme-card p-6 relative overflow-hidden">
              {/* Premium gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />

              {/* Flag & Name */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{country.flag}</span>
                <div>
                  <h3 style={{ color: 'var(--text-primary)' }} className="font-bold text-lg">{country.name}</h3>
                  <p style={{ color: 'var(--text-muted)' }} className="text-sm">{country.platform}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {country.tags.map((tag, i) => (
                  <span key={i} className="badge-warning">{tag}</span>
                ))}
              </div>

              {/* Details */}
              <div className="space-y-2.5 mb-5">
                <div className="flex items-center gap-2.5">
                  <Star size={14} style={{ color: 'var(--warning)' }} />
                  <span style={{ color: 'var(--text-secondary)' }} className="text-sm">
                    Səviyyə: <strong style={{ color: 'var(--text-primary)' }}>{country.quality_level}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <TrendingUp size={14} style={{ color: 'var(--success)' }} />
                  <span style={{ color: 'var(--text-secondary)' }} className="text-sm">
                    Stabilik: <strong style={{ color: 'var(--text-primary)' }}>{country.stability}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle size={14} style={{ color: 'var(--info)' }} />
                  <span style={{ color: 'var(--text-secondary)' }} className="text-sm">Uyğundur: {country.suitable_for}</span>
                </div>
              </div>

              {/* Note - dark theme */}
              <p
                style={{ color: 'var(--text-secondary)', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
                className="text-xs leading-relaxed mb-5 p-3 rounded-xl"
              >
                {country.note}
              </p>

              {/* CTA */}
              <a
                href={getWhatsAppUrl('994501234567', `Salam, premium və uzunmüddətli istifadə üçün ${country.name} ${country.platform} nömrəsi haqqında məlumat almaq istəyirəm.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full justify-center text-sm py-3"
              >
                <MessageCircle size={16} />
                Məlumat al
              </a>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-10 text-center">
          <div className="theme-card inline-block px-6 py-4">
            <p style={{ color: 'var(--text-secondary)' }} className="text-sm mb-3">
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
