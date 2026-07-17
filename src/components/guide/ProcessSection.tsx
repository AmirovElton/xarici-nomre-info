import { MessageCircle, Smartphone, Globe, CreditCard, Package, Shield, CheckCircle } from 'lucide-react'

const steps = [
  { n: 1, title: 'Əlaqə saxlayın', desc: 'WhatsApp-a yazın və platformanı bildirin.', icon: MessageCircle, color: '#22c55e' },
  { n: 2, title: 'Platforma seçin', desc: 'WhatsApp, Telegram və ya digər.', icon: Smartphone, color: '#38bdf8' },
  { n: 3, title: 'Ölkə seçin', desc: 'Stokda olan ölkələrdən uyğununu seçin.', icon: Globe, color: 'var(--accent)' },
  { n: 4, title: 'Şərtlər bildirilir', desc: 'Qiymət, növ, müddət və qaydalar.', icon: CreditCard, color: '#fbbf24' },
  { n: 5, title: 'Ödəniş edin', desc: 'Rəsmi ödəniş məlumatları göndərilir.', icon: CreditCard, color: '#f472b6' },
  { n: 6, title: 'Nömrə təqdim edilir', desc: 'Giriş məlumatları və təlimat verilir.', icon: Package, color: '#6366f1' },
  { n: 7, title: 'İlkin təhlükəsizlik', desc: 'İlk saatlarda təlimata əməl edin.', icon: Shield, color: '#ef4444' },
  { n: 8, title: 'Normal istifadə', desc: 'Tövsiyə olunan müddətdən sonra normal istifadə.', icon: CheckCircle, color: '#22c55e' },
]

export default function ProcessSection() {
  return (
    <div className="space-y-3">
      <div className="p-4 mb-4 rounded-2xl" style={{ background: 'var(--accent-muted)', border: '1px solid rgba(124,108,255,0.15)' }}>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Aşağıdakı addımlar sifariş prosesinin ümumi axışını göstərir.
        </p>
      </div>

      {steps.map((s) => {
        const Icon = s.icon
        return (
          <div key={s.n} className="theme-card p-4">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `color-mix(in srgb, ${s.color} 15%, transparent)`, color: s.color }}>
                <Icon size={20} />
              </div>
              <div>
                <span className="text-xs font-bold" style={{ color: 'var(--accent)' }}>Addım {s.n}</span>
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{s.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
