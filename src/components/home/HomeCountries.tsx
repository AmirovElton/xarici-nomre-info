'use client'

import Link from 'next/link'
import { ArrowRight, Star, TrendingUp } from 'lucide-react'

const featured = [
  { flag: '🇹🇷', name: 'Türkiyə', code: '+90', price: 15, badge: 'Ən çox seçilən', platform: 'WhatsApp' },
  { flag: '🇬🇧', name: 'Böyük Britaniya', code: '+44', price: 35, badge: 'Premium seçim', platform: 'WhatsApp' },
  { flag: '🇺🇸', name: 'ABŞ', code: '+1', price: 30, badge: 'Daha stabil', platform: 'WhatsApp' },
  { flag: '🇷🇺', name: 'Rusiya', code: '+7', price: 8, badge: 'Ən çox seçilən', platform: 'Telegram' },
]

export default function HomeCountries() {
  return (
    <section className="px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Populyar Ölkələr</h2>
            <p className="section-subtitle">Ən çox seçilən nömrələr</p>
          </div>
          <Link href="/numbers" className="hidden sm:flex items-center gap-1 text-sm font-medium" style={{ color: 'var(--accent)' }}>
            Hamısını gör <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((c, i) => (
            <div
              key={i}
              className="theme-card p-5 relative overflow-hidden group cursor-pointer"
            >
              {/* Subtle gradient glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(124,108,255,0.03), rgba(56,189,248,0.03))' }} />

              {/* Badge */}
              <div className="mb-3">
                <span className="badge-accent text-[10px]">
                  {c.badge === 'Premium seçim' && <Star size={10} className="inline mr-1" />}
                  {c.badge === 'Daha stabil' && <TrendingUp size={10} className="inline mr-1" />}
                  {c.badge}
                </span>
              </div>

              {/* Country */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{c.flag}</span>
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{c.name}</h3>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{c.code} · {c.platform}</p>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                <span className="text-lg font-bold" style={{ color: 'var(--success)' }}>{c.price} AZN</span>
                <span className="text-xs" style={{ color: 'var(--text-faint)' }}>Stokda</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <Link href="/numbers" className="sm:hidden flex items-center justify-center gap-1 mt-6 text-sm font-medium" style={{ color: 'var(--accent)' }}>
          Bütün nömrələri gör <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  )
}
