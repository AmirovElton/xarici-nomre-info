import { Database, Globe, BookOpen, MessageCircle, Shield, Star } from 'lucide-react'

const features = [
  { icon: Database, title: 'Aktual stok məlumatları', desc: 'Hər ölkənin stok vəziyyətini real zamanda izləyin', accent: 'var(--success)' },
  { icon: Globe, title: 'Platformaya uyğun seçim', desc: 'WhatsApp, Telegram və digər platformalar üçün ayrıca stok', accent: 'var(--info)' },
  { icon: BookOpen, title: 'Addım-addım təlimat', desc: 'Hesabınızı qorumaq üçün detallı bələdçi', accent: 'var(--accent)' },
  { icon: Shield, title: 'Sifarişdən əvvəl məlumat', desc: 'Nömrə haqqında hər şeyi əvvəlcədən bilin', accent: 'var(--info)' },
  { icon: Star, title: 'Premium seçimlər', desc: 'Uzunmüddətli istifadə üçün keyfiyyətli nömrələr', accent: 'var(--warning)' },
  { icon: MessageCircle, title: 'Birbaşa WhatsApp dəstəyi', desc: 'Suallarınız üçün birbaşa əlaqə saxlayın', accent: 'var(--success)' },
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
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <div key={i} className="theme-card p-5">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-3" style={{ background: `color-mix(in srgb, ${f.accent} 12%, transparent)`, color: f.accent }}>
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{f.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{f.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
