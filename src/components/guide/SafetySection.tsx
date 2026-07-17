'use client'

import { AlertTriangle, XCircle, CheckCircle, Clock } from 'lucide-react'

const dontDoList = [
  'Çox sayda şəxsə mesaj göndərmək',
  'Kütləvi zəng etmək',
  'Çoxlu qrupa daxil olmaq',
  'Tanımadığınız şəxsləri ardıcıl əlavə etmək',
  'Eyni mətni çox sayda şəxsə göndərmək',
  'Reklam və spam mesajları göndərmək',
  'Profil məlumatlarını dəfələrlə dəyişmək',
  'Tez-tez cihaz dəyişmək',
  'VPN və IP ünvanını davamlı dəyişmək',
  'Hesabı başqa şəxslərlə paylaşmaq',
  'Avtomatlaşdırılmış proqramlardan istifadə etmək',
  'Çox sayda kanal və qrupa sürətlə qoşulmaq',
]

const doList = [
  'Profil şəklini əlavə etmək',
  'Ad və qısa məlumat bölməsini doldurmaq',
  'Bir neçə etibarlı kontaktla normal ünsiyyət qurmaq',
  'Hesabın aktivliyini tədricən artırmaq',
  'Platformanın xidmət şərtlərinə əməl etmək',
  'Eyni cihazdan istifadə etmək',
  'Hesabı normal insan davranışına uyğun istifadə etmək',
  'İki addımlı doğrulamanı aktiv etmək',
  'Şəxsi e-poçt ünvanını əlavə etmək',
]

export default function SafetySection() {
  return (
    <div className="space-y-6">
      {/* Warning Banner */}
      <div
        className="p-5 rounded-2xl"
        style={{ background: 'var(--bg-card)', border: '1px solid color-mix(in srgb, var(--warning) 25%, transparent)' }}
      >
        <div className="flex gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--warning-muted)' }}
          >
            <Clock size={20} style={{ color: 'var(--warning)' }} />
          </div>
          <div>
            <h3 style={{ color: 'var(--text-primary)' }} className="font-bold mb-1">İlk 24 saat hesabın təhlükəsizliyi üçün vacibdir</h3>
            <p style={{ color: 'var(--text-secondary)' }} className="text-sm leading-relaxed">
              Bu müddət mütləq zəmanət kimi yox, tövsiyə olunan minimum uyğunlaşma müddəti kimi nəzərdə tutulur.
              İlk saatlarda edilən hərəkətlər hesabın gələcək stabilliyinə birbaşa təsir edə bilər.
            </p>
          </div>
        </div>
      </div>

      {/* Don't Do */}
      <div className="theme-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--danger-muted)' }}>
            <XCircle size={16} style={{ color: 'var(--danger)' }} />
          </div>
          <h3 style={{ color: 'var(--text-primary)' }} className="font-bold">İlk 24 saat ərzində edilməməli olanlar</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {dontDoList.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-2 p-2.5 rounded-xl"
              style={{ background: 'var(--danger-muted)', border: '1px solid color-mix(in srgb, var(--danger) 15%, transparent)' }}
            >
              <XCircle size={14} style={{ color: 'var(--danger)' }} className="mt-0.5 flex-shrink-0" />
              <span style={{ color: 'var(--text-secondary)' }} className="text-xs">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Do */}
      <div className="theme-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--success-muted)' }}>
            <CheckCircle size={16} style={{ color: 'var(--success)' }} />
          </div>
          <h3 style={{ color: 'var(--text-primary)' }} className="font-bold">İlk 24 saat ərzində tövsiyə olunanlar</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {doList.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-2 p-2.5 rounded-xl"
              style={{ background: 'var(--success-muted)', border: '1px solid color-mix(in srgb, var(--success) 15%, transparent)' }}
            >
              <CheckCircle size={14} style={{ color: 'var(--success)' }} className="mt-0.5 flex-shrink-0" />
              <span style={{ color: 'var(--text-secondary)' }} className="text-xs">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Final Note */}
      <div className="theme-card p-4">
        <div className="flex gap-3">
          <AlertTriangle size={16} style={{ color: 'var(--text-muted)' }} className="flex-shrink-0 mt-0.5" />
          <p style={{ color: 'var(--text-secondary)' }} className="text-xs leading-relaxed">
            Heç bir nömrə və ya hesab üçün 100% bloklanmama zəmanəti verilmir. Hesabın təhlükəsizliyi
            istifadə formasından, platformanın daxili yoxlamalarından və istifadəçinin davranışından asılıdır.
          </p>
        </div>
      </div>
    </div>
  )
}
