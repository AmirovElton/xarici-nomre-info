'use client'

import { useState, useEffect } from 'react'
import { Crown, Shield, TrendingUp, MessageCircle, CheckCircle, Star, Loader2 } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'
import { fetchActiveCountries, fetchActivePlatforms, fetchSiteSettings, DEFAULT_WHATSAPP } from '@/lib/public-data'
import type { Country, Platform } from '@/lib/types'

export default function PremiumClient() {
  const [countries, setCountries] = useState<Country[]>([])
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [whatsapp, setWhatsapp] = useState(DEFAULT_WHATSAPP)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchActiveCountries(), fetchActivePlatforms(), fetchSiteSettings()]).then(([c, p, s]) => {
      setCountries(c.filter(x => x.is_premium))
      setPlatforms(p)
      if (s?.whatsapp_number) setWhatsapp(s.whatsapp_number)
      setLoading(false)
    })
  }, [])

  const platformName = (id: string) => platforms.find(p => p.id === id)?.name || ''

  const buildTags = (c: Country) => {
    const tags = ['Premium']
    if (c.is_popular) tags.push('Ən çox seçilən')
    if (c.stability_level === 'Yüksək') tags.push('Daha stabil')
    tags.push('Tövsiyə olunur')
    return tags
  }

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

        {/* Important Note */}
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

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={28} className="animate-spin" style={{ color: 'var(--accent)' }} />
          </div>
        ) : countries.length === 0 ? (
          <div className="theme-card p-12 text-center max-w-md mx-auto">
            <p style={{ color: 'var(--text-muted)' }} className="text-sm">
              Hələ premium nömrə əlavə edilməyib. Admin paneldən ölkəni &quot;Premium&quot; kimi işarələyin.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {countries.map((country) => (
              <div key={country.id} className="theme-card p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{country.flag}</span>
                  <div>
                    <h3 style={{ color: 'var(--text-primary)' }} className="font-bold text-lg">{country.name}</h3>
                    <p style={{ color: 'var(--text-muted)' }} className="text-sm">{platformName(country.platform_id)}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {buildTags(country).map((tag, i) => (
                    <span key={i} className="badge-warning">{tag}</span>
                  ))}
                </div>

                <div className="space-y-2.5 mb-5">
                  <div className="flex items-center gap-2.5">
                    <Star size={14} style={{ color: 'var(--warning)' }} />
                    <span style={{ color: 'var(--text-secondary)' }} className="text-sm">
                      Səviyyə: <strong style={{ color: 'var(--text-primary)' }}>{country.quality_level}</strong>
                    </span>
                  </div>
                  {country.stability_level && (
                    <div className="flex items-center gap-2.5">
                      <TrendingUp size={14} style={{ color: 'var(--success)' }} />
                      <span style={{ color: 'var(--text-secondary)' }} className="text-sm">
                        Stabilik: <strong style={{ color: 'var(--text-primary)' }}>{country.stability_level}</strong>
                      </span>
                    </div>
                  )}
                  {country.recommended_use && (
                    <div className="flex items-center gap-2.5">
                      <CheckCircle size={14} style={{ color: 'var(--info)' }} />
                      <span style={{ color: 'var(--text-secondary)' }} className="text-sm">Uyğundur: {country.recommended_use}</span>
                    </div>
                  )}
                </div>

                {country.short_description && (
                  <p
                    style={{ color: 'var(--text-secondary)', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
                    className="text-xs leading-relaxed mb-5 p-3 rounded-xl"
                  >
                    {country.short_description}
                  </p>
                )}

                <a
                  href={getWhatsAppUrl(whatsapp, `Salam, premium və uzunmüddətli istifadə üçün ${country.name} ${platformName(country.platform_id)} nömrəsi haqqında məlumat almaq istəyirəm.`)}
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
        )}

        <div className="mt-10 text-center">
          <div className="theme-card inline-block px-6 py-4">
            <p style={{ color: 'var(--text-secondary)' }} className="text-sm mb-3">
              Uzunmüddətli WhatsApp istifadəsi üçün premium və daha stabil seçimlərə baxmağınız tövsiyə olunur.
            </p>
            <a
              href={getWhatsAppUrl(whatsapp, 'Salam, premium nömrələr haqqında ətraflı məlumat almaq istəyirəm.')}
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
