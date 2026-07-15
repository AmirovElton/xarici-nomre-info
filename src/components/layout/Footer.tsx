import Link from 'next/link'
import { MessageCircle, Send, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="hidden md:block mt-16 border-t border-gray-200/50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">XN</span>
              </div>
              <span className="font-bold">
                <span className="gradient-text">XariciNomrə</span>
                <span className="text-gray-700">Az</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Xarici nömrələr haqqında doğru məlumat, düzgün seçim və təhlükəsiz istifadə.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-100 transition-colors">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors">
                <Send size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 hover:bg-purple-100 transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Səhifələr</h3>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Ana səhifə</Link>
              <Link href="/numbers" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Nömrələr</Link>
              <Link href="/guide" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Bələdçi</Link>
              <Link href="/premium" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Premium</Link>
              <Link href="/reviews" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Rəylər</Link>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Məlumat</h3>
            <div className="flex flex-col gap-2">
              <Link href="/guide#what-is" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Xarici nömrə nədir?</Link>
              <Link href="/guide#process" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Proses necə işləyir</Link>
              <Link href="/guide#safety" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Təhlükəsizlik</Link>
              <Link href="/guide#faq" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">FAQ</Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Hüquqi</h3>
            <div className="flex flex-col gap-2">
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Məxfilik siyasəti</Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Qaydalar və şərtlər</Link>
              <Link href="/disclaimer" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Məsuliyyət</Link>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="mt-8 p-4 rounded-2xl bg-amber-50/50 border border-amber-200/50">
          <p className="text-xs text-amber-700 text-center">
            Yalnız XariciNomrəAz-ın bu saytda göstərilən rəsmi WhatsApp və sosial media hesabları vasitəsilə əlaqə saxlayın. 
            Başqa şəxslərə və ya saxta hesablara edilən ödənişlərə görə XariciNomrəAz məsuliyyət daşımır.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200/50 text-center">
          <p className="text-sm text-gray-500">
            © 2026 XariciNomrəAz. Bütün hüquqlar qorunur.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Bu sayt məlumatlandırma xarakterlidir. Platformaların adları və loqoları onların müvafiq sahiblərinə aiddir.
          </p>
        </div>
      </div>
    </footer>
  )
}
