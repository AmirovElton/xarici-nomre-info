import Link from 'next/link'
import { MessageCircle, BookOpen, Smartphone, Shield, Sparkles } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-8 md:pt-16 pb-12">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl -z-10" />
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50/80 border border-indigo-100 mb-6">
          <Sparkles size={14} className="text-indigo-500" />
          <span className="text-xs font-medium text-indigo-600">Sifarişdən əvvəl hər şeyi öyrənin</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          <span className="text-gray-900">Xarici virtual nömrələr </span>
          <span className="gradient-text">haqqında bilməli olduğunuz hər şey</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
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
            <MessageCircle size={18} />
            WhatsApp əlaqə
          </a>
        </div>

        {/* Hero visual - abstract shapes */}
        <div className="relative max-w-lg mx-auto">
          <div className="glass-card p-6 md:p-8">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 border border-green-100">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-green-700">Stokda var</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-100">
                <Shield size={14} className="text-indigo-500" />
                <span className="text-sm font-medium text-indigo-700">Təhlükəsiz</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 border border-purple-100">
                <Sparkles size={14} className="text-purple-500" />
                <span className="text-sm font-medium text-purple-700">Premium</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-2xl bg-gradient-to-b from-white to-gray-50 border border-gray-100">
                <div className="text-2xl mb-1">🇹🇷</div>
                <div className="text-xs text-gray-500">Türkiyə</div>
              </div>
              <div className="text-center p-3 rounded-2xl bg-gradient-to-b from-white to-gray-50 border border-gray-100">
                <div className="text-2xl mb-1">🇬🇧</div>
                <div className="text-xs text-gray-500">B. Britaniya</div>
              </div>
              <div className="text-center p-3 rounded-2xl bg-gradient-to-b from-white to-gray-50 border border-gray-100">
                <div className="text-2xl mb-1">🇺🇸</div>
                <div className="text-xs text-gray-500">ABŞ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
