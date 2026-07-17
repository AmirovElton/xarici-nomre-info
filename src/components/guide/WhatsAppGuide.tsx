'use client'

import { useState } from 'react'
import { Smartphone, Monitor } from 'lucide-react'

const steps2FA = ['WhatsApp tətbiqini açın.', 'Ayarlar bölməsinə keçin.', 'Hesab bölməsini açın.', 'İki addımlı doğrulama seçin.', 'Aktiv et düyməsinə toxunun.', '6 rəqəmli PIN yaradın.', 'E-poçt ünvanınızı əlavə edin.', 'Təsdiqi tamamlayın.', 'PIN-i heç kimlə paylaşmayın.']
const stepsEmail = ['Ayarlar > Hesab > İki addımlı doğrulama.', 'E-poçt əlavə et seçimini seçin.', 'Şəxsi e-poçtunuzu yazın.', 'Təsdiq prosesini tamamlayın.']
const stepsDevices = ['Ayarlar > Bağlı cihazlar açın.', 'Aktiv cihazları yoxlayın.', 'Tanımadığınız cihazdan çıxış edin.', 'Yalnız şəxsi cihazınızda istifadə edin.']
const dontDo = ['Kütləvi mesaj göndərmək', 'Reklam yazmaq', 'Eyni mətni ardıcıl göndərmək', 'Çoxlu qrupa qısa müddətdə qoşulmaq', 'Üçüncü tərəf WA proqramları', 'Hesabı başqaları ilə paylaşmaq']

export default function WhatsAppGuide() {
  const [platform, setPlatform] = useState<'ios' | 'android'>('ios')

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <button onClick={() => setPlatform('ios')} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all" style={{ background: platform === 'ios' ? 'var(--bg-elevated)' : 'transparent', border: `1px solid ${platform === 'ios' ? 'var(--border-strong)' : 'var(--border-default)'}`, color: 'var(--text-primary)' }}>
          <Smartphone size={16} /> iPhone
        </button>
        <button onClick={() => setPlatform('android')} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all" style={{ background: platform === 'android' ? 'var(--bg-elevated)' : 'transparent', border: `1px solid ${platform === 'android' ? 'var(--border-strong)' : 'var(--border-default)'}`, color: 'var(--text-primary)' }}>
          <Monitor size={16} /> Android
        </button>
      </div>

      <div className="theme-card p-5">
        <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>İkili doğrulamanı aktiv edin</h3>
        <ol className="space-y-2.5">
          {steps2FA.map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}>{i + 1}</span>
              <span className="text-sm pt-0.5" style={{ color: 'var(--text-secondary)' }}>{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="theme-card p-5">
        <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>E-poçt əlavə edin</h3>
        <ol className="space-y-2.5">
          {stepsEmail.map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'var(--info-muted)', color: 'var(--info)' }}>{i + 1}</span>
              <span className="text-sm pt-0.5" style={{ color: 'var(--text-secondary)' }}>{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="theme-card p-5">
        <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Bağlı cihazları yoxlayın</h3>
        <ol className="space-y-2.5">
          {stepsDevices.map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}>{i + 1}</span>
              <span className="text-sm pt-0.5" style={{ color: 'var(--text-secondary)' }}>{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="theme-card p-5" style={{ borderColor: 'rgba(239,68,68,0.15)' }}>
        <h3 className="font-bold mb-4" style={{ color: 'var(--danger)' }}>Edilməməli olanlar</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {dontDo.map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-2">
              <span style={{ color: 'var(--danger)' }}>✕</span>
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
