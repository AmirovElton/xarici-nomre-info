import { MessageCircle, Smartphone, Globe, CreditCard, Package, Shield, CheckCircle } from 'lucide-react'

const steps = [
  { number: 1, title: 'Müştəri əlaqə saxlayır', description: 'XariciNomrəAz-ın rəsmi WhatsApp hesabına yazırsınız və nömrənin hansı platforma üçün lazım olduğunu bildirirsiniz.', icon: MessageCircle, color: 'from-green-400 to-green-600' },
  { number: 2, title: 'Platforma seçilir', description: 'WhatsApp, Telegram və ya digər platformalardan birini seçirsiniz.', icon: Smartphone, color: 'from-blue-400 to-blue-600' },
  { number: 3, title: 'Ölkə və stok yoxlanılır', description: 'Seçilən platformaya uyğun stokda olan ölkələr təqdim edilir. Siz uyğun ölkəni seçirsiniz.', icon: Globe, color: 'from-purple-400 to-purple-600' },
  { number: 4, title: 'Qiymət və şərtlər bildirilir', description: 'Qiymət, nömrənin növü, istifadə müddəti, təhlükəsizlik qaydaları və dəyişdirmə şərtləri əvvəlcədən bildirilir.', icon: CreditCard, color: 'from-amber-400 to-amber-600' },
  { number: 5, title: 'Ödəniş edilir', description: 'Rəsmi kart və ya ödəniş məlumatları göndərilir. Ödəniş təsdiqləndikdən sonra növbəti addıma keçilir.', icon: CreditCard, color: 'from-pink-400 to-pink-600' },
  { number: 6, title: 'Nömrə və ya hesab təqdim edilir', description: 'Ödəniş təsdiqləndikdən sonra nömrə, hesab, giriş məlumatları və istifadə təlimatı müştəriyə təqdim edilir.', icon: Package, color: 'from-indigo-400 to-indigo-600' },
  { number: 7, title: 'İlkin təhlükəsizlik mərhələsi', description: 'Hesabı aldıqdan sonra ilk saatlarda təqdim edilən təlimata uyğun davranmalısınız. İki addımlı doğrulamanı aktiv edin.', icon: Shield, color: 'from-red-400 to-red-600' },
  { number: 8, title: 'Normal istifadəyə başlanılır', description: 'Tövsiyə olunan ilkin müddətdən sonra hesab normal istifadə edilə bilər. Amma spam və qayda pozuntusu yenə də edilməməlidir.', icon: CheckCircle, color: 'from-green-400 to-green-600' },
]

export default function ProcessSection() {
  return (
    <div className="space-y-4">
      <div
        className="p-4 mb-6 rounded-2xl"
        style={{ background: 'var(--bg-card)', border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)' }}
      >
        <p style={{ color: 'var(--text-secondary)' }} className="text-sm leading-relaxed">
          Aşağıdakı addımlar sifariş prosesinin ümumi axışını göstərir. Hər bir addım
          WhatsApp vasitəsilə satıcı ilə birbaşa əlaqədə həyata keçirilir.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step) => {
          const Icon = step.icon
          return (
            <div key={step.number} className="theme-card p-5">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <span style={{ color: 'var(--accent)' }} className="text-xs font-bold">Addım {step.number}</span>
                  <h3 style={{ color: 'var(--text-primary)' }} className="font-semibold mb-1">{step.title}</h3>
                  <p style={{ color: 'var(--text-secondary)' }} className="text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
