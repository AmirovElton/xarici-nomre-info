import Link from 'next/link'
import { Star, ArrowRight } from 'lucide-react'

// Static sample reviews for initial build
const sampleReviews = [
  {
    id: '1',
    name: 'Elvin M.',
    platform: 'WhatsApp',
    country: 'Türkiyə',
    rating: 5,
    message: 'Çox sürətli xidmət. Nömrəni 5 dəqiqə ərzində aldım. Təlimatlar çox aydın idi.',
  },
  {
    id: '2',
    name: 'Aysel K.',
    platform: 'WhatsApp',
    country: 'Böyük Britaniya',
    rating: 5,
    message: 'Premium nömrə aldım, 3 aydır heç bir problem olmadan istifadə edirəm. Tövsiyə edirəm.',
  },
  {
    id: '3',
    name: 'Rəşad N.',
    platform: 'Telegram',
    country: 'Türkiyə',
    rating: 4,
    message: 'Telegram üçün nömrə aldım. Xidmət keyfiyyətli idi, təşəkkür edirəm.',
  },
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
          <Link href="/reviews" className="hidden sm:flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700">
            Hamısı <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sampleReviews.map((review) => (
            <div key={review.id} className="glass-card p-5">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">&ldquo;{review.message}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{review.name}</p>
                  <p className="text-xs text-gray-500">{review.platform} - {review.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link href="/reviews" className="sm:hidden flex items-center justify-center gap-1 mt-4 text-sm font-medium text-indigo-600">
          Bütün rəyləri gör <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  )
}
