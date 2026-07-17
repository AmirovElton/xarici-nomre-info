import Link from 'next/link'
import { Star, ArrowRight } from 'lucide-react'

const reviews = [
  { id: '1', name: 'Elvin M.', platform: 'WhatsApp', country: 'Türkiyə', rating: 5, message: 'Çox sürətli xidmət. Nömrəni 5 dəqiqə ərzində aldım. Təlimatlar çox aydın idi.' },
  { id: '2', name: 'Aysel K.', platform: 'WhatsApp', country: 'Böyük Britaniya', rating: 5, message: 'Premium nömrə aldım, 3 aydır heç bir problem olmadan istifadə edirəm.' },
  { id: '3', name: 'Rəşad N.', platform: 'Telegram', country: 'Türkiyə', rating: 4, message: 'Telegram üçün nömrə aldım. Xidmət keyfiyyətli idi, təşəkkür edirəm.' },
]

export default function HomeReviews() {
  return (
    <section className="px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Müştəri rəyləri</h2>
            <p className="section-subtitle">Müştərilərimizin fikirləri</p>
          </div>
          <Link href="/reviews" className="hidden sm:flex items-center gap-1 text-sm font-medium" style={{ color: 'var(--accent)' }}>
            Hamısı <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((r) => (
            <div key={r.id} className="theme-card p-5">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < r.rating ? 'fill-current' : ''} style={{ color: i < r.rating ? 'var(--warning)' : 'var(--border-strong)' }} />
                ))}
              </div>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>&ldquo;{r.message}&rdquo;</p>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{r.name}</p>
                <p className="text-xs" style={{ color: 'var(--text-faint)' }}>{r.platform} - {r.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
