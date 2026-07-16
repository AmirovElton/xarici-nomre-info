import { MessageCircle, Smartphone, Globe, CreditCard, Package, Shield, CheckCircle } from 'lucide-react'

const steps = [
  { number: 1, title: 'Müştəri əlaqə saxlayır', description: 'XariciNomrəAz-ın rəsmi WhatsApp hesabına yazırsınız.', icon: MessageCircle, color: 'from-green-400 to-green-600' },
  { number: 2, title: 'Platforma seçilir', description: 'WhatsApp, Telegram və ya digər platformalardan birini seçirsiniz.', icon: Smartphone, color: 'from-blue-400 to-blue-600' },
  { number: 3, title: 'Ölkə və stok yoxlanılır', description: 'Seçilən platformaya uyğun stokda olan ölkələr təqdim edilir.', icon: Globe, color: 'from-purple-400 to-purple-600' },
  { number: 4, title: 'Qiymət və şərtlər bildirilir', description: 'Qiymət, növü, istifadə müddəti və təhlükəsizlik qaydaları bildirilir.', icon: CreditCard, color: 'from-amber-400 to-amber-600' },
  { number: 5, title: 'Ödəniş edilir', description: 'Rəsmi ödəniş məlumatları göndərilir və ödəniş təsdiqlənir.', icon: CreditCard, color: 'from-pink-400 to-pink-600' },
  { number: 6, title: 'Nömrə təqdim edilir', description: 'Nömrə, giriş məlumatları və istifadə təlimatı müştəriyə verilir.', icon: Package, color: 'from-indigo-400 to-indigo-600' },
  { number: 7, title: 'İlkin təhlükəsizlik', description: 'İlk saatlarda təqdim edilən təlimata uyğun davranılmalıdır.', icon: Shield, color: 'from-red-400 to-red-600' },
  { number: 8, title: 'Normal istifadə', description: 'Tövsiyə olunan müddətdən sonra hesab normal istifadə edilə bilər.', icon: CheckCircle, color: 'from-green-400 to-green-600' },
]

export default function ProcessSection() {
  return (
    <div className="space-y-4">
      <div className="glass-card p-4 mb-6 border-indigo-500/20 bg-indigo-500/5">
        <p className="text-sm text-indigo-300 leading-relaxed">
          Aşağıdakı addımlar sifariş prosesinin ümumi axışını göstərir. Hər bir addım WhatsApp vasitəsilə satıcı ilə birbaşa əlaqədə həyata keçirilir.
        </p>
      </div>

      <div className="space-y-3">
        {steps.map((step) => {
          const Icon = step.icon
          return (
            <div key={step.number} className="glass-card p-5">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-indigo-400">Addım {step.number}</span>
                  <h3 className="font-semibold text-gray-200 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
