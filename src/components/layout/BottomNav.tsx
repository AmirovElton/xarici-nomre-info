'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Smartphone, BookOpen, Star, MessageSquare } from 'lucide-react'

const navItems = [
  { label: 'Ana səhifə', href: '/', icon: Home },
  { label: 'Nömrələr', href: '/numbers', icon: Smartphone },
  { label: 'Bələdçi', href: '/guide', icon: BookOpen },
  { label: 'Premium', href: '/premium', icon: Star },
  { label: 'Rəylər', href: '/reviews', icon: MessageSquare },
]

export default function BottomNav() {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="mx-3 mb-3">
        <nav className="glass-nav rounded-2xl px-2 py-2">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname?.startsWith(item.href))
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all"
                  style={{
                    color: isActive ? 'var(--accent)' : 'var(--text-faint)',
                    background: isActive ? 'var(--accent-muted)' : 'transparent',
                  }}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}
