'use client'

import { useState } from 'react'
import { Smartphone, Monitor } from 'lucide-react'

const iosSteps = {
  twoFactor: [
    'WhatsApp tətbiqini açın.',
    'Ayarlar (Settings) bölməsinə keçin.',
    'Hesab (Account) bölməsini açın.',
    'İki addımlı doğrulama seçiminə daxil olun.',
    'Aktiv et düyməsinə toxunun.',
    'Yadda saxlayacağınız 6 rəqəmli PIN yaradın.',
    'Şəxsi e-poçt ünvanınızı əlavə edin.',
    'E-poçta göndərilən təsdiqi tamamlayın.',
    'PIN və e-poçt məlumatlarını heç kimlə paylaşmayın.',
  ],
  email: [
    'WhatsApp Ayarlar bölməsinə keçin.',
    'Hesab bölməsini açın.',
    'İki addımlı doğrulama bölməsinə daxil olun.',
    'E-poçt əlavə et və ya dəyiş seçimini seçin.',
    'Şəxsi e-poçt ünvanınızı yazın.',
    'Təsdiq prosesini tamamlayın.',
  ],
  devices: [
    'WhatsApp Ayarlar bölməsinə keçin.',
    'Bağlı cihazlar (Linked Devices) bölməsini açın.',
    'Aktiv cihazları yoxlayın.',
    'Tanımadığınız cihaz varsa çıxış edin.',
    'Hesabı yalnız şəxsi cihazınızda istifadə edin.',
  ],
}

const dontDo = [
  'Kütləvi mesaj göndərmək',
  'Tanımadığınız şəxslərə reklam yazmaq',
  'Eyni mətni ardıcıl göndərmək',
  'Çoxlu qrupa qısa müddətdə qoşulmaq',
  'Şübhəli üçüncü tərəf WhatsApp proqramlarından istifadə etmək',
  'Hesabı bir neçə şəxslə paylaşmaq',
]

function StepList({ steps, badgeColor }: { steps: string[]; badgeColor: string }) {
  return (
    <ol className="space-y-2.5">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ background: `color-mix(in srgb, ${badgeColor} 15%, transparent)`, color: badgeColor }}
          >
            {i + 1}
          </span>
          <span style={{ color: 'var(--text-secondary)' }} className="text-sm pt-0.5">{step}</span>
        </li>
      ))}
    </ol>
  )
}

export default function WhatsAppGuide() {
  const [platform, setPlatform] = useState<'ios' | 'android'>('ios')

  return (
    <div className="space-y-6">
      {/* Platform Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setPlatform('ios')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
          style={platform === 'ios'
            ? { background: 'var(--accent)', color: '#fff' }
            : { background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}
        >
          <Smartphone size={16} /> iPhone
        </button>
        <button
          onClick={() => setPlatform('android')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
          style={platform === 'android'
            ? { background: 'var(--success)', color: '#fff' }
            : { background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}
        >
          <Monitor size={16} /> Android
        </button>
      </div>

      <div className="theme-card p-5">
        <h3 style={{ color: 'var(--text-primary)' }} className="font-bold mb-4">WhatsApp-da ikili doğrulamanı aktiv etmək</h3>
        <StepList steps={iosSteps.twoFactor} badgeColor="var(--accent)" />
      </div>

      <div className="theme-card p-5">
        <h3 style={{ color: 'var(--text-primary)' }} className="font-bold mb-4">E-poçt əlavə etmək və ya dəyişmək</h3>
        <StepList steps={iosSteps.email} badgeColor="var(--info)" />
      </div>

      <div className="theme-card p-5">
        <h3 style={{ color: 'var(--text-primary)' }} className="font-bold mb-4">Bağlı cihazları yoxlamaq</h3>
        <StepList steps={iosSteps.devices} badgeColor="#a855f7" />
      </div>

      {/* Don't Do */}
      <div className="theme-card p-5" style={{ border: '1px solid color-mix(in srgb, var(--danger) 25%, transparent)' }}>
        <h3 style={{ color: 'var(--danger)' }} className="font-bold mb-4">WhatsApp-da edilməməli olanlar</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {dontDo.map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-2 rounded-lg">
              <span style={{ color: 'var(--danger)' }} className="mt-0.5">&#10005;</span>
              <span style={{ color: 'var(--text-secondary)' }} className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
