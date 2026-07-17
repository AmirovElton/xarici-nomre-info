'use client'

import { Crown, Shield, TrendingUp, MessageCircle, CheckCircle, Star } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

const premiumCountries = [
  { id: '1', name: 'Böyük Britaniya', flag: '🇬🇧', platform: 'WhatsApp', quality: 'Premium', stability: 'Yüksək', suitable: 'Şəxsi və biznes istifadəsi', note: 'Uzunmüddətli istifadə üçün daha çox üstünlük verilən seçimdir.', tags: ['Premium', 'Müştərilərin seçimi', 'Daha stabil', 'Tövsiyə olunur'] },
  { id: '2', name: 'ABŞ', flag: '🇺🇸', platform: 'WhatsApp', quality: 'Premium', stability: 'Yüksək', suitable: 'Biznes və şəxsi istifadə', note: 'Düzgün istifadə zamanı daha rahat və stabil seçimdir.', tags: ['Premium', 'Ən çox seçilən', 'Uzunmüddətli'] },
  { id: '3', name: 'Böyük Britaniya', flag: '🇬🇧', platform: 'Telegram', quality: 'Premium', stability: 'Yüksək', suitable: 'Uzunmüddətli Telegram istifadəsi', note: 'Telegram üçün premium və stabil seçim.', tags: ['Premium', 'Daha stabil', 'Uzunmüddətli'] },
]

export default function PremiumClient() {
  return (
    <div className="px-4 py-6 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: 'var(--warning-muted)', border: '1px solid rgba(251,191,36,0.2)' }}>
            <Crown size={14} style={{ color: 'var(--warning)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--warning)' }}>Premium seçimlər</span>
          </div>
          <h1 className="section-title">Stabil və Premium Seçimlər</h1>
          <p className="section-subtitle max-w-2xl mx-auto">Uzunmüddətli istifadə üçün daha keyfiyyətli nömrələr</p>
        </div>

        {/* Info note */}
        <div className="max-w-3xl mx-auto mb-8 p-4 rounded-2xl" style={{ background: 'var(--accent-muted)', border: '1px solid rgba(124,108,255,0.15)' }}>
          <div className="flex gap-3">
            <Shield size={18} style={{ color: 'var(--accent)' }} className="flex-shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Bu bölmə məlumatlandırma məqsədi daşıyır. Heç bir nömrə üçün &ldquo;100% bloklanmır&rdquo; vədi verilmir.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {premiumCountries.map((c) => (
            <div key={c.id} className="theme-card p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, var(--warning), #f59e0b)' }} />

              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{c.flag}</span>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{c.name}</h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{c.platform}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {c.tags.map((tag, i) => (
                  <span key={i} className="badge-warning">{tag}</span>
                ))}
              </div>

              <div className="space-y-2.5 mb-5">
                <div className="flex items-center gap-2.5">
                  <Star size={14} style={{ color: 'var(--warning)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Səviyyə: <strong style={{ color: 'var(--text-primary)' }}>{c.quality}</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <TrendingUp size={14} style={{ color: 'var(--success)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Stabilik: <strong style={{ color: 'var(--text-primary)' }}>{c.stability}</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle size={14} style={{ color: 'var(--info)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Uyğundur: {c.suitable}</span>
                </div>
              </div>

              <p className="text-xs leading-relaxed mb-5 p-3 rounded-xl" style={{ color: 'var(--text-muted)', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
                {c.note}
              </p>

              <a
                href={getWhatsAppUrl('994501234567', `Salam, premium ${c.name} ${c.platform} nömrəsi haqqında məlumat almaq istəyirəm.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full text-sm py-2.5"
              >
                <MessageCircle size={16} /> Məlumat al
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <div className="theme-card inline-block px-6 py-4">
            <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>Uzunmüddətli istifadə üçün premium seçimlərə baxın.</p>
            <a href={getWhatsAppUrl('994501234567', 'Salam, premium nömrələr haqqında məlumat almaq istəyirəm.')} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-sm">
              <MessageCircle size={16} /> WhatsApp-dan əlaqə
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
