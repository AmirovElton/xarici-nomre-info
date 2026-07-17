'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

const navItems = [
  { label: 'Ana səhifə', href: '/' },
  { label: 'Nömrələr', href: '/numbers' },
  { label: 'Bələdçi', href: '/guide' },
  { label: 'Premium', href: '/premium' },
  { label: 'Rəylər', href: '/reviews' },
]

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214l-.29-.174-3.03.795.808-2.953-.192-.303A8 8 0 1112 20z"/>
  </svg>
)

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-3 mt-2 md:mx-4 md:mt-3">
          <nav className="glass-nav rounded-2xl px-4 py-3 md:px-6">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5">
                <Image
                  src="/logo.svg"
                  alt="XariciNomrəAz"
                  width={36}
                  height={36}
                  className="rounded-xl"
                />
                <span className="font-bold text-lg">
                  <span className="gradient-text">XariciNomrə</span>
                  <span style={{ color: 'var(--text-primary)' }}>Az</span>
                </span>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Desktop WhatsApp */}
              <div className="hidden md:flex items-center">
                <a
                  href={getWhatsAppUrl('994501234567', 'Salam, XariciNomrəAz saytından gəlirəm.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-sm py-2.5 px-4"
                >
                  <WhatsAppIcon />
                  Sifariş et
                </a>
              </div>

              {/* Mobile Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-xl transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
              <div
                className="md:hidden mt-3 pt-3 animate-fade-in"
                style={{ borderTop: '1px solid var(--border-subtle)' }}
              >
                <div className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-3 rounded-xl text-sm font-medium transition-all"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <a
                    href={getWhatsAppUrl('994501234567', 'Salam, XariciNomrəAz saytından gəlirəm.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp text-sm mt-2"
                  >
                    <WhatsAppIcon />
                    WhatsApp-dan sifariş et
                  </a>
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Blur overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 backdrop-blur-sm"
          style={{ background: 'rgba(0,0,0,0.7)' }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
