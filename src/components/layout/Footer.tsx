'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle, Send, Mail } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'
import { useSettings } from '@/components/SettingsProvider'

export default function Footer() {
  const { settings, whatsapp } = useSettings()
  const siteName = settings?.site_name || 'XariciNomrəAz'
  const logoUrl = settings?.logo_url || '/logo.svg'
  const waUrl = getWhatsAppUrl(whatsapp, settings?.default_whatsapp_message || 'Salam, XariciNomrəAz saytından gəlirəm.')
  const instagram = settings?.instagram_url
  const telegram = settings?.telegram_url
  const email = settings?.email
  const footerText = settings?.footer_text || '© 2026 XariciNomrəAz. Bütün hüquqlar qorunur.'
  const warningText = settings?.warning_text || 'Yalnız XariciNomrəAz-ın bu saytda göstərilən rəsmi WhatsApp və sosial media hesabları vasitəsilə əlaqə saxlayın. Başqa şəxslərə və ya saxta hesablara edilən ödənişlərə görə XariciNomrəAz məsuliyyət daşımır.'

  return (
    <footer className="hidden md:block mt-16" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Image src={logoUrl} alt={siteName} width={32} height={32} className="rounded-lg" unoptimized />
              <span className="font-bold gradient-text">{siteName}</span>
            </div>
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
              {settings?.slogan || 'Xarici nömrələr haqqında doğru məlumat, düzgün seçim və təhlükəsiz istifadə.'}
            </p>
            <div className="flex gap-3">
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 hover:bg-green-500/20 transition-colors">
                <MessageCircle size={18} />
              </a>
              {telegram && (
                <a href={telegram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 hover:bg-blue-500/20 transition-colors">
                  <Send size={18} />
                </a>
              )}
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 hover:bg-purple-500/20 transition-colors">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-10.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 hover:bg-amber-500/20 transition-colors">
                  <Mail size={18} />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Səhifələr</h3>
            <div className="flex flex-col gap-2">
              {[['Ana səhifə', '/'], ['Nömrələr', '/numbers'], ['Bələdçi', '/guide'], ['Premium', '/premium'], ['Rəylər', '/reviews']].map(([l, h]) => (
                <Link key={h} href={h} className="text-sm transition-colors hover:opacity-80" style={{ color: 'var(--text-muted)' }}>{l}</Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Məlumat</h3>
            <div className="flex flex-col gap-2">
              {[['Xarici nömrə nədir?', '/guide'], ['Proses necə işləyir', '/guide'], ['Təhlükəsizlik', '/guide'], ['FAQ', '/guide']].map(([l, h], i) => (
                <Link key={i} href={h} className="text-sm transition-colors hover:opacity-80" style={{ color: 'var(--text-muted)' }}>{l}</Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Əlaqə</h3>
            <div className="flex flex-col gap-2">
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="text-sm transition-colors hover:opacity-80" style={{ color: 'var(--text-muted)' }}>WhatsApp</a>
              {settings?.working_hours && <span className="text-sm" style={{ color: 'var(--text-muted)' }}>İş saatları: {settings.working_hours}</span>}
              {email && <a href={`mailto:${email}`} className="text-sm transition-colors hover:opacity-80" style={{ color: 'var(--text-muted)' }}>{email}</a>}
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
          <p className="text-xs text-amber-400/80 text-center">{warningText}</p>
        </div>

        <div className="mt-8 pt-6 text-center" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{footerText}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-faint)' }}>
            Bu sayt məlumatlandırma xarakterlidir. Platformaların adları və loqoları onların müvafiq sahiblərinə aiddir.
          </p>
        </div>
      </div>
    </footer>
  )
}
