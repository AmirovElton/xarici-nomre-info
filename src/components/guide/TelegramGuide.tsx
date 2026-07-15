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

export default function TelegramGuide() {
  return (
    <div className="space-y-6">
      {/* Two Factor */}
      <div className="glass-card p-5">
        <h3 className="font-bold text-gray-900 mb-4">
          Telegram-da ikili doğrulamanı aktiv etmək
        </h3>
        <ol className="space-y-2.5">
          {twoFactorSteps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {i + 1}
              </span>
              <span className="text-sm text-gray-700 pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Active Sessions */}
      <div className="glass-card p-5">
        <h3 className="font-bold text-gray-900 mb-4">
          Aktiv sessiyaları yoxlamaq
        </h3>
        <ol className="space-y-2.5">
          {sessionSteps.map((step, i) => (
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
          Telegram-da ilk günlərdə edilməməli olanlar
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
