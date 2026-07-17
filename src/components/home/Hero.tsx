import Link from 'next/link'
import { Smartphone, BookOpen, Sparkles, Shield } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-8 md:pt-16 pb-12">
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl -z-10" style={{ background: 'rgba(124,108,255,0.06)' }} />
      <div className="absolute top-20 right-1/4 w-80 h-80 rounded-full blur-3xl -z-10" style={{ background: 'rgba(56,189,248,0.04)' }} />

      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'var(--accent-muted)', border: '1px solid rgba(124,108,255,0.2)' }}>
          <Sparkles size={14} style={{ color: 'var(--accent)' }} />
          <span className="text-xs font-medium" style={{ color: 'var(--accent-hover)' }}>Sifarişdən əvvəl hər şeyi öyrənin</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          <span style={{ color: 'var(--text-primary)' }}>Xarici virtual nömrələr </span>
          <span className="gradient-text">haqqında bilməli olduğunuz hər şey</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Platformanıza uyğun ölkələri, aktual stok vəziyyətini, istifadə qaydalarını və
          təhlükəsizlik tövsiyələrini sifarişdən əvvəl öyrənin.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <Link href="/numbers" className="btn-primary w-full sm:w-auto">
            <Smartphone size={18} /> Nömrələrə bax
          </Link>
          <Link href="/guide" className="btn-outline w-full sm:w-auto">
            <BookOpen size={18} /> İstifadə qaydaları
          </Link>
          <a
            href={getWhatsAppUrl('994501234567', 'Salam, XariciNomrəAz saytından gəlirəm.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full sm:w-auto"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214l-.29-.174-3.03.795.808-2.953-.192-.303A8 8 0 1112 20z"/></svg>
            WhatsApp əlaqə
          </a>
        </div>

        {/* Visual card */}
        <div className="relative max-w-lg mx-auto">
          <div className="theme-card p-6 md:p-8">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: 'var(--success-muted)', border: '1px solid rgba(34,197,94,0.2)' }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--success)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--success)' }}>Stokda var</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: 'var(--accent-muted)', border: '1px solid rgba(124,108,255,0.2)' }}>
                <Shield size={14} style={{ color: 'var(--accent)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>Təhlükəsiz</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: 'var(--warning-muted)', border: '1px solid rgba(251,191,36,0.2)' }}>
                <Sparkles size={14} style={{ color: 'var(--warning)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--warning)' }}>Premium</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[{ flag: '🇹🇷', name: 'Türkiyə' }, { flag: '🇬🇧', name: 'B. Britaniya' }, { flag: '🇺🇸', name: 'ABŞ' }].map((c) => (
                <div key={c.name} className="text-center p-3 rounded-2xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
                  <div className="text-2xl mb-1">{c.flag}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{c.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
