'use client'

const steps2FA = ['Telegram tətbiqini açın.', 'Ayarlar bölməsinə keçin.', 'Məxfilik və təhlükəsizlik açın.', 'İki addımlı doğrulama seçin.', 'Güclü parol yaradın.', 'Bərpa e-poçtunuzu əlavə edin.', 'Təsdiq kodunu daxil edin.', 'Parolu paylaşmayın.']
const sessionSteps = ['Ayarlar > Cihazlar açın.', 'Aktiv sessiyaları yoxlayın.', 'Tanımadığınız cihazlardan çıxın.', 'Bütün sessiyaları sonlandırın.']
const dontDo = ['Eyni anda çoxlu qrupa qoşulmaq', 'Tanımadığınız şəxslərə yazmaq', 'Kütləvi reklam göndərmək', 'Eyni mətni çox göndərmək', 'Şübhəli botlardan istifadə', 'Çoxlu istifadəçi əlavə etmək', 'Hesabı tez-tez fərqli cihazlarda açmaq']

export default function TelegramGuide() {
  return (
    <div className="space-y-5">
      <div className="theme-card p-5">
        <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>İkili doğrulamanı aktiv edin</h3>
        <ol className="space-y-2.5">
          {steps2FA.map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'var(--info-muted)', color: 'var(--info)' }}>{i + 1}</span>
              <span className="text-sm pt-0.5" style={{ color: 'var(--text-secondary)' }}>{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="theme-card p-5">
        <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Aktiv sessiyaları yoxlayın</h3>
        <ol className="space-y-2.5">
          {sessionSteps.map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}>{i + 1}</span>
              <span className="text-sm pt-0.5" style={{ color: 'var(--text-secondary)' }}>{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="theme-card p-5" style={{ borderColor: 'rgba(239,68,68,0.15)' }}>
        <h3 className="font-bold mb-4" style={{ color: 'var(--danger)' }}>İlk günlərdə edilməməli olanlar</h3>
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
