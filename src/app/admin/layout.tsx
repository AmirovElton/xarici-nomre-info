'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Globe, MapPin, Star, MessageSquare,
  HelpCircle, Image, Settings, LogOut, Menu, X
} from 'lucide-react'

const sidebarItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Platformalar', href: '/admin/platforms', icon: Globe },
  { label: 'Ölkələr', href: '/admin/countries', icon: MapPin },
  { label: 'Premium', href: '/admin/premium', icon: Star },
  { label: 'Rəylər', href: '/admin/reviews', icon: MessageSquare },
  { label: 'FAQ', href: '/admin/faq', icon: HelpCircle },
  { label: 'Logo', href: '/admin/logo', icon: Image },
  { label: 'Ayarlar', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const session = localStorage.getItem('admin_session')
    if (session) setIsLoggedIn(true)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      localStorage.setItem('admin_session', 'true')
      setIsLoggedIn(true)
      setError('')
    } else {
      setError('E-poçt və parol daxil edin')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_session')
    setIsLoggedIn(false)
  }

  // Dark Login Page
  if (!isLoggedIn) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: 'var(--bg-primary)' }}
      >
        <div className="w-full max-w-sm">
          <div className="theme-card p-8">
            {/* XN Gradient Logo */}
            <div className="text-center mb-8">
              <div
                className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'linear-gradient(135deg, var(--accent), #a855f7)' }}
              >
                <span className="text-white font-bold text-xl">XN</span>
              </div>
              <h1 style={{ color: 'var(--text-primary)' }} className="text-xl font-bold">Admin Panel</h1>
              <p style={{ color: 'var(--text-faint)' }} className="text-sm mt-1">XariciNomrəAz idarəetmə</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div
                  className="p-3 rounded-xl text-sm"
                  style={{ background: 'color-mix(in srgb, var(--danger) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--danger) 20%, transparent)', color: 'var(--danger)' }}
                >
                  {error}
                </div>
              )}
              <div>
                <label style={{ color: 'var(--text-muted)' }} className="text-sm font-medium mb-1 block">E-poçt</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="theme-input w-full px-4 py-3 rounded-xl text-sm"
                  placeholder="admin@xaricinomsreaz.com"
                />
              </div>
              <div>
                <label style={{ color: 'var(--text-muted)' }} className="text-sm font-medium mb-1 block">Parol</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="theme-input w-full px-4 py-3 rounded-xl text-sm"
                  placeholder="••••••••"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Daxil ol
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Admin Layout with Sidebar
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Mobile Header */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between backdrop-blur-xl"
        style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)' }}
      >
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg" style={{ color: 'var(--text-secondary)' }}>
          <Menu size={20} />
        </button>
        <span style={{ color: 'var(--text-primary)' }} className="font-bold text-sm">Admin Panel</span>
        <button onClick={handleLogout} className="p-2 rounded-lg" style={{ color: 'var(--danger)' }}>
          <LogOut size={18} />
        </button>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar with glass effect */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 z-50 transition-transform md:translate-x-0 backdrop-blur-xl ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-subtle)' }}
      >
        <div className="p-6">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--accent), #a855f7)' }}
              >
                <span className="text-white font-bold text-sm">XN</span>
              </div>
              <div>
                <p style={{ color: 'var(--text-primary)' }} className="font-bold text-sm">XariciNomrəAz</p>
                <p style={{ color: 'var(--text-faint)' }} className="text-xs">Admin</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1 rounded-lg" style={{ color: 'var(--text-muted)' }}>
              <X size={18} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={
                    isActive
                      ? {
                          background: 'var(--accent-muted)',
                          color: 'var(--accent-hover)',
                          boxShadow: '0 0 12px color-mix(in srgb, var(--accent) 20%, transparent)',
                        }
                      : {
                          color: 'var(--text-muted)',
                        }
                  }
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Logout button at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full"
            style={{ color: 'var(--danger)' }}
          >
            <LogOut size={18} />
            Çıxış
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 pt-16 md:pt-0 min-h-screen">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
