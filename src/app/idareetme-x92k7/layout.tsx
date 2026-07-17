'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Globe, MapPin, Star, MessageSquare,
  HelpCircle, Image as ImageIcon, Settings, LogOut, Menu, X, Loader2, Lock,
} from 'lucide-react'
import { adminLogin, getAdminToken, clearAdminToken } from '@/lib/admin-api'

const BASE = '/idareetme-x92k7'

const sidebarItems = [
  { label: 'Dashboard', href: BASE, icon: LayoutDashboard },
  { label: 'Platformalar', href: `${BASE}/platforms`, icon: Globe },
  { label: 'Ölkələr', href: `${BASE}/countries`, icon: MapPin },
  { label: 'Premium', href: `${BASE}/premium`, icon: Star },
  { label: 'Rəylər', href: `${BASE}/reviews`, icon: MessageSquare },
  { label: 'FAQ', href: `${BASE}/faq`, icon: HelpCircle },
  { label: 'Logo və Ad', href: `${BASE}/logo`, icon: ImageIcon },
  { label: 'Ayarlar', href: `${BASE}/settings`, icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [checking, setChecking] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setIsLoggedIn(!!getAdminToken())
    setChecking(false)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await adminLogin(password)
    setLoading(false)
    if (res.ok) {
      setIsLoggedIn(true)
    } else {
      setError(res.error || 'Parol yanlışdır.')
    }
  }

  const handleLogout = () => {
    clearAdminToken()
    setIsLoggedIn(false)
    setPassword('')
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <Loader2 size={28} className="animate-spin" style={{ color: 'var(--accent)' }} />
      </div>
    )
  }

  // Login Page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg-primary)' }}>
        <div className="w-full max-w-sm">
          <div className="theme-card p-8">
            <div className="text-center mb-8">
              <div
                className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'linear-gradient(135deg, var(--accent), #6366f1)' }}
              >
                <Lock size={22} className="text-white" />
              </div>
              <h1 style={{ color: 'var(--text-primary)' }} className="text-xl font-bold">İdarəetmə Paneli</h1>
              <p style={{ color: 'var(--text-muted)' }} className="text-sm mt-1">Davam etmək üçün parolu daxil edin</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div
                  className="p-3 rounded-xl text-sm"
                  style={{ background: 'var(--danger-muted)', border: '1px solid color-mix(in srgb, var(--danger) 20%, transparent)', color: 'var(--danger)' }}
                >
                  {error}
                </div>
              )}
              <div>
                <label style={{ color: 'var(--text-secondary)' }} className="text-sm font-medium mb-1 block">Parol</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="theme-input"
                  placeholder="••••••••"
                  autoFocus
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">
                {loading && <Loader2 size={16} className="animate-spin" />}
                Daxil ol
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Admin Shell
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between backdrop-blur-xl"
        style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)' }}
      >
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg" style={{ color: 'var(--text-secondary)' }}>
          <Menu size={20} />
        </button>
        <span style={{ color: 'var(--text-primary)' }} className="font-bold text-sm">İdarəetmə Paneli</span>
        <button onClick={handleLogout} className="p-2 rounded-lg" style={{ color: 'var(--danger)' }}>
          <LogOut size={18} />
        </button>
      </div>

      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 z-50 transition-transform md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-subtle)' }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--accent), #6366f1)' }}>
                <span className="text-white font-bold text-sm">XN</span>
              </div>
              <div>
                <p style={{ color: 'var(--text-primary)' }} className="font-bold text-sm">XariciNomrəAz</p>
                <p style={{ color: 'var(--text-faint)' }} className="text-xs">Panel</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1 rounded-lg" style={{ color: 'var(--text-muted)' }}>
              <X size={18} />
            </button>
          </div>

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
                  style={isActive
                    ? { background: 'var(--accent-muted)', color: 'var(--accent-hover)', boxShadow: '0 0 12px color-mix(in srgb, var(--accent) 20%, transparent)' }
                    : { color: 'var(--text-muted)' }}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full"
            style={{ color: 'var(--danger)' }}
          >
            <LogOut size={18} /> Çıxış
          </button>
        </div>
      </aside>

      <main className="md:ml-64 pt-16 md:pt-0 min-h-screen">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  )
}
