import Link from 'next/link'
import { BookOpen, Smartphone, Shield, Sparkles } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-8 md:pt-16 pb-12">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
          <Sparkles size={14} className="text-indigo-400" />
          <span className="text-xs font-medium text-indigo-300">Sifarişdən əvvəl hər şeyi öyrənin</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          <span className="text-gray-100">Xarici virtual nömrələr </span>
          <span className="gradient-text">haqqında bilməli olduğunuz hər şey</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Platformanıza uyğun ölkələri, aktual stok vəziyyətini, istifadə qaydalarını və 
          təhlükəsizlik tövsiyələrini sifarişdən əvvəl öyrənin.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <Link href="/numbers" className="btn-primary w-full sm:w-auto">
            <Smartphone size={18} />
            Nömrələrə bax
          </Link>
          <Link href="/guide" className="btn-outline w-full sm:w-auto">
            <BookOpen size={18} />
            İstifadə qaydaları
          </Link>
          <a
            href={getWhatsAppUrl('994501234567', 'Salam, XariciNomrəAz saytından gəlirəm. Xarici nömrə haqqında məlumat almaq istəyirəm.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full sm:w-auto"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214l-.29-.174-3.03.795.808-2.953-.192-.303A8 8 0 1112 20z"/></svg>
            WhatsApp əlaqə
          </a>
        </div>

        {/* Hero visual */}
        <div className="relative max-w-lg mx-auto">
          <div className="glass-card p-6 md:p-8">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium text-green-400">Stokda var</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <Shield size={14} className="text-indigo-400" />
                <span className="text-sm font-medium text-indigo-400">Təhlükəsiz</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <Sparkles size={14} className="text-purple-400" />
                <span className="text-sm font-medium text-purple-400">Premium</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-2xl bg-gray-800/50 border border-gray-700/50">
                <div className="text-2xl mb-1">🇹🇷</div>
                <div className="text-xs text-gray-400">Türkiyə</div>
              </div>
              <div className="text-center p-3 rounded-2xl bg-gray-800/50 border border-gray-700/50">
                <div className="text-2xl mb-1">🇬🇧</div>
                <div className="text-xs text-gray-400">B. Britaniya</div>
              </div>
              <div className="text-center p-3 rounded-2xl bg-gray-800/50 border border-gray-700/50">
                <div className="text-2xl mb-1">🇺🇸</div>
                <div className="text-xs text-gray-400">ABŞ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
