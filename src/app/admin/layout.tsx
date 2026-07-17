'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Globe, MapPin, Star, MessageSquare, HelpCircle, Settings, LogOut, Menu, X, Image } from 'lucide-react'

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

  // Login
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg-primary)' }}>
        <div className="w-full max-w-sm">
          <div className="p-8 rounded-3xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-lg)' }}>
            <div className="text-center mb-8">
              <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, var(--accent), #6366f1)' }}>
                <span className="text-white font-bold text-xl">XN</span>
              </div>
              <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Admin Panel</h1>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>XariciNomrəAz idarəetmə</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && <div className="p-3 rounded-xl text-sm" style={{ background: 'var(--danger-muted)', color: 'var(--danger)', border: '1px solid rgba(239,68,68,0.15)' }}>{error}</div>}
              <div>
                <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>E-poçt</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="theme-input" placeholder="admin@xaricinomsreaz.com" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Parol</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="theme-input" placeholder="••••••••" />
              </div>
              <button type="submit" className="w-full btn-primary">Daxil ol</button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Admin Layout
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg" style={{ color: 'var(--text-secondary)' }}><Menu size={20} /></button>
        <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Admin Panel</span>
        <button onClick={handleLogout} className="p-2 rounded-lg" style={{ color: 'var(--danger)' }}><LogOut size={18} /></button>
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 bottom-0 w-64 z-50 transition-transform md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-subtle)', backdropFilter: 'blur(20px)' }}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--accent), #6366f1)', boxShadow: 'var(--shadow-glow)' }}>
                <span className="text-white font-bold text-sm">XN</span>
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>XariciNomrəAz</p>
                <p className="text-xs" style={{ color: 'var(--text-faint)' }}>Admin</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1 rounded-lg" style={{ color: 'var(--text-muted)' }}><X size={18} /></button>
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
                  style={{
                    background: isActive ? 'var(--accent-muted)' : 'transparent',
                    color: isActive ? 'var(--accent-hover)' : 'var(--text-muted)',
                    boxShadow: isActive ? '0 0 12px rgba(124,108,255,0.1)' : 'none',
                  }}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full" style={{ color: 'var(--danger)' }}>
            <LogOut size={18} /> Çıxış
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="md:ml-64 pt-16 md:pt-0 min-h-screen">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  )
}
