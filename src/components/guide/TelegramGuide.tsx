'use client'

const twoFactorSteps = [
  'Telegram tətbiqini açın.',
  'Ayarlar (Settings) bölməsinə keçin.',
  'Məxfilik və təhlükəsizlik bölməsini açın.',
  'İki addımlı doğrulama seçimini seçin.',
  'Güclü parol yaradın.',
  'Şəxsi bərpa e-poçtunuzu əlavə edin.',
  'E-poçta gələn təsdiq kodunu daxil edin.',
  'Parolu heç kimlə paylaşmayın.',
]

const sessionSteps = [
  'Ayarlar bölməsinə keçin.',
  'Cihazlar (Devices) bölməsini açın.',
  'Aktiv sessiyaları yoxlayın.',
  'Tanımadığınız cihazlardan çıxış edin.',
  'Lazım olduqda digər bütün sessiyaları sonlandırın.',
]

const dontDo = [
  'Eyni anda çoxlu qrupa qoşulmaq',
  'Tanımadığınız şəxslərə ardıcıl mesaj yazmaq',
  'Kütləvi reklam göndərmək',
  'Eyni mətni çox sayda şəxsə göndərmək',
  'Şübhəli botlardan istifadə etmək',
  'Qısa müddətdə çoxlu istifadəçi əlavə etmək',
  'Hesabı tez-tez fərqli cihazlarda açmaq',
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

export default function TelegramGuide() {
  return (
    <div className="space-y-6">
      <div className="theme-card p-5">
        <h3 style={{ color: 'var(--text-primary)' }} className="font-bold mb-4">Telegram-da ikili doğrulamanı aktiv etmək</h3>
        <StepList steps={twoFactorSteps} badgeColor="var(--info)" />
      </div>

      <div className="theme-card p-5">
        <h3 style={{ color: 'var(--text-primary)' }} className="font-bold mb-4">Aktiv sessiyaları yoxlamaq</h3>
        <StepList steps={sessionSteps} badgeColor="#a855f7" />
      </div>

      <div className="theme-card p-5" style={{ border: '1px solid color-mix(in srgb, var(--danger) 25%, transparent)' }}>
        <h3 style={{ color: 'var(--danger)' }} className="font-bold mb-4">Telegram-da ilk günlərdə edilməməli olanlar</h3>
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
