'use client'

import { useState } from 'react'
import { Smartphone, Monitor } from 'lucide-react'
import { cn } from '@/lib/utils'

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

export default function WhatsAppGuide() {
  const [platform, setPlatform] = useState<'ios' | 'android'>('ios')

  return (
    <div className="space-y-6">
      {/* Platform Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setPlatform('ios')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all',
            platform === 'ios'
              ? 'bg-gray-900 text-white'
              : 'glass-card text-gray-700'
          )}
        >
          <Smartphone size={16} /> iPhone
        </button>
        <button
          onClick={() => setPlatform('android')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all',
            platform === 'android'
              ? 'bg-green-600 text-white'
              : 'glass-card text-gray-700'
          )}
        >
          <Monitor size={16} /> Android
        </button>
      </div>

      {/* Two Factor Auth */}
      <div className="glass-card p-5">
        <h3 className="font-bold text-gray-900 mb-4">
          WhatsApp-da ikili doğrulamanı aktiv etmək
        </h3>
        <ol className="space-y-2.5">
          {iosSteps.twoFactor.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {i + 1}
              </span>
              <span className="text-sm text-gray-700 pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Email */}
      <div className="glass-card p-5">
        <h3 className="font-bold text-gray-900 mb-4">
          E-poçt əlavə etmək və ya dəyişmək
        </h3>
        <ol className="space-y-2.5">
          {iosSteps.email.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {i + 1}
              </span>
              <span className="text-sm text-gray-700 pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Linked Devices */}
      <div className="glass-card p-5">
        <h3 className="font-bold text-gray-900 mb-4">
          Bağlı cihazları yoxlamaq
        </h3>
        <ol className="space-y-2.5">
          {iosSteps.devices.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {i + 1}
              </span>
              <span className="text-sm text-gray-700 pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Don't Do */}
      <div className="glass-card p-5 bg-red-50/30 border-red-100/50">
        <h3 className="font-bold text-red-800 mb-4">
          WhatsApp-da edilməməli olanlar
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {dontDo.map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-2 rounded-lg">
              <span className="text-red-400 mt-0.5">&#10005;</span>
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
