'use client'

import { AlertTriangle, XCircle, CheckCircle, Clock } from 'lucide-react'

const dontDo = ['Çox sayda şəxsə mesaj göndərmək', 'Kütləvi zəng etmək', 'Çoxlu qrupa daxil olmaq', 'Tanımadığınız şəxsləri əlavə etmək', 'Eyni mətni çox göndərmək', 'Spam/reklam mesajları', 'Profili dəfələrlə dəyişmək', 'Tez-tez cihaz dəyişmək', 'VPN-i davamlı dəyişmək', 'Hesabı paylaşmaq', 'Avtomatlaşdırılmış proqramlar', 'Sürətlə çoxlu kanala qoşulmaq']
const doList = ['Profil şəkli əlavə edin', 'Ad bölməsini doldurun', 'Etibarlı kontaktlarla yazışın', 'Aktivliyi tədricən artırın', 'Xidmət şərtlərinə əməl edin', 'Eyni cihazdan istifadə edin', 'Normal davranış nümayiş etdirin', 'İki addımlı doğrulama aktiv edin', 'E-poçt əlavə edin']

export default function SafetySection() {
  return (
    <div className="space-y-5">
      {/* Warning banner */}
      <div className="p-5 rounded-2xl" style={{ background: 'var(--warning-muted)', border: '1px solid rgba(251,191,36,0.15)' }}>
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(251,191,36,0.15)' }}>
            <Clock size={20} style={{ color: 'var(--warning)' }} />
          </div>
          <div>
            <h3 className="font-bold mb-1" style={{ color: 'var(--warning)' }}>İlk 24 saat vacibdir</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Bu müddət tövsiyə olunan minimum uyğunlaşma müddətidir. İlk saatlarda edilən hərəkətlər hesabın stabilliyinə təsir edir.
            </p>
          </div>
        </div>
      </div>

      {/* Don't do */}
      <div className="theme-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--danger-muted)' }}>
            <XCircle size={16} style={{ color: 'var(--danger)' }} />
          </div>
          <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>Edilməməli olanlar</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {dontDo.map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl" style={{ background: 'var(--danger-muted)', border: '1px solid rgba(239,68,68,0.1)' }}>
              <XCircle size={13} style={{ color: 'var(--danger)' }} className="mt-0.5 flex-shrink-0" />
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item}</span>
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
          <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>Tövsiyə olunanlar</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {doList.map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl" style={{ background: 'var(--success-muted)', border: '1px solid rgba(34,197,94,0.1)' }}>
              <CheckCircle size={13} style={{ color: 'var(--success)' }} className="mt-0.5 flex-shrink-0" />
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)' }}>
        <div className="flex gap-3">
          <AlertTriangle size={16} style={{ color: 'var(--text-faint)' }} className="flex-shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Heç bir nömrə üçün 100% bloklanmama zəmanəti verilmir. Hesabın təhlükəsizliyi istifadə formasından asılıdır.
          </p>
        </div>
      </div>
    </div>
  )
}
