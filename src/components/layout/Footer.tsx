import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle, Send, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="hidden md:block mt-16" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Image src="/logo.svg" alt="XariciNomrəAz" width={32} height={32} className="rounded-lg" />
              <span className="font-bold">
                <span className="gradient-text">XariciNomrə</span>
                <span style={{ color: 'var(--text-primary)' }}>Az</span>
              </span>
            </div>
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
              Xarici nömrələr haqqında doğru məlumat, düzgün seçim və təhlükəsiz istifadə.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors" style={{ background: 'var(--success-muted)', color: 'var(--success)' }}>
                <MessageCircle size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors" style={{ background: 'var(--info-muted)', color: 'var(--info)' }}>
                <Send size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors" style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}>
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Səhifələr</h3>
            <div className="flex flex-col gap-2">
              {['Ana səhifə', 'Nömrələr', 'Bələdçi', 'Premium', 'Rəylər'].map((label, i) => (
                <Link key={i} href={['/', '/numbers', '/guide', '/premium', '/reviews'][i]} className="text-sm transition-colors" style={{ color: 'var(--text-muted)' }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Məlumat</h3>
            <div className="flex flex-col gap-2">
              {['Xarici nömrə nədir?', 'Proses necə işləyir', 'Təhlükəsizlik', 'FAQ'].map((l, i) => (
                <Link key={i} href="/guide" className="text-sm transition-colors" style={{ color: 'var(--text-muted)' }}>
                  {l}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Hüquqi</h3>
            <div className="flex flex-col gap-2">
              {['Məxfilik siyasəti', 'Qaydalar və şərtlər', 'Məsuliyyət'].map((l, i) => (
                <Link key={i} href="/" className="text-sm transition-colors" style={{ color: 'var(--text-muted)' }}>
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="mt-8 p-4 rounded-2xl" style={{ background: 'var(--warning-muted)', border: '1px solid rgba(251,191,36,0.15)' }}>
          <p className="text-xs text-center" style={{ color: 'var(--warning)' }}>
            Yalnız XariciNomrəAz-ın rəsmi WhatsApp və sosial media hesabları vasitəsilə əlaqə saxlayın.
            Başqa şəxslərə edilən ödənişlərə görə XariciNomrəAz məsuliyyət daşımır.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 text-center" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>© 2026 XariciNomrəAz. Bütün hüquqlar qorunur.</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-faint)' }}>Bu sayt məlumatlandırma xarakterlidir.</p>
        </div>
      </div>
    </footer>
  )
}
