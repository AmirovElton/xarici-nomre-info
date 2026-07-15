import { Database, Globe, BookOpen, MessageCircle, Shield, Star } from 'lucide-react'

const features = [
  {
    icon: Database,
    title: 'Aktual stok məlumatları',
    description: 'Hər ölkənin stok vəziyyətini real zamanda izləyin',
    color: 'bg-green-50 text-green-600 border-green-100',
  },
  {
    icon: Globe,
    title: 'Platformaya uyğun ölkə seçimi',
    description: 'WhatsApp, Telegram və digər platformalar üçün ayrıca stok',
    color: 'bg-blue-50 text-blue-600 border-blue-100',
  },
  {
    icon: BookOpen,
    title: 'Addım-addım istifadə təlimatı',
    description: 'Hesabınızı qorumaq üçün detallı bələdçi',
    color: 'bg-purple-50 text-purple-600 border-purple-100',
  },
  {
    icon: Shield,
    title: 'Sifarişdən əvvəl tam məlumat',
    description: 'Nömrə haqqında hər şeyi əvvəlcədən bilin',
    color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  },
  {
    icon: Star,
    title: 'Premium və stabil seçimlər',
    description: 'Uzunmüddətli istifadə üçün keyfiyyətli nömrələr',
    color: 'bg-amber-50 text-amber-600 border-amber-100',
  },
  {
    icon: MessageCircle,
    title: 'Birbaşa WhatsApp dəstəyi',
    description: 'Suallarınız üçün birbaşa əlaqə saxlayın',
    color: 'bg-green-50 text-green-600 border-green-100',
  },
]

export default function Features() {
  return (
    <section className="px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="section-title">Niyə bu sayt?</h2>
          <p className="section-subtitle">Sifarişdən əvvəl bütün məlumatları bir yerdə əldə edin</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="glass-card p-5 hover:shadow-glass-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center mb-3 ${feature.color}`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
