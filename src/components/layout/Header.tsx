'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, MessageCircle } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

const navItems = [
  { label: 'Ana səhifə', href: '/' },
  { label: 'Nömrələr', href: '/numbers' },
  { label: 'Bələdçi', href: '/guide' },
  { label: 'Premium', href: '/premium' },
  { label: 'Rəylər', href: '/reviews' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-3">
        <nav className="glass-nav rounded-2xl px-4 py-3 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">XN</span>
              </div>
              <span className="font-bold text-lg hidden sm:block">
                <span className="gradient-text">XariciNomrə</span>
                <span className="text-gray-700">Az</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* WhatsApp Button (Desktop) */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={getWhatsAppUrl('994501234567', 'Salam, XariciNomrəAz saytından gəlirəm. Xarici nömrə haqqında məlumat almaq istəyirəm.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-sm py-2 px-4"
              >
                <MessageCircle size={16} />
                Sifariş et
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100/50 transition-colors"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mt-3 pt-3 border-t border-gray-200/50 animate-fade-in">
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all"
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href={getWhatsAppUrl('994501234567', 'Salam, XariciNomrəAz saytından gəlirəm. Xarici nömrə haqqında məlumat almaq istəyirəm.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-sm mt-2"
                >
                  <MessageCircle size={16} />
                  WhatsApp-dan sifariş et
                </a>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
