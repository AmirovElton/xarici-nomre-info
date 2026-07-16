'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Globe, MapPin, Star, MessageSquare, HelpCircle, Settings, LogOut, Menu, X, Image } from 'lucide-react'
import { cn } from '@/lib/utils'

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

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-zinc-950">
        <div className="w-full max-w-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <div className="text-center mb-8">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">XN</span>
              </div>
              <h1 className="text-xl font-bold text-gray-100">Admin Panel</h1>
              <p className="text-sm text-gray-500 mt-1">XariciNomrəAz idarəetmə</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">{error}</div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-1 block">E-poçt</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50" placeholder="admin@xaricinomsreaz.com" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-1 block">Parol</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50" placeholder="••••••••" />
              </div>
              <button type="submit" className="w-full btn-primary">Daxil ol</button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-zinc-800 text-gray-300"><Menu size={20} /></button>
        <span className="font-bold text-sm text-gray-200">Admin Panel</span>
        <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-zinc-800 text-red-400"><LogOut size={18} /></button>
      </div>

      {sidebarOpen && <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />}

      <aside className={cn('fixed top-0 left-0 bottom-0 w-64 bg-zinc-900 border-r border-zinc-800 z-50 transition-transform md:translate-x-0', sidebarOpen ? 'translate-x-0' : '-translate-x-full')}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">XN</span>
              </div>
              <div>
                <p className="font-bold text-sm text-gray-200">XariciNomrəAz</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1 rounded-lg hover:bg-zinc-800 text-gray-400"><X size={18} /></button>
          </div>
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)} className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all', isActive ? 'bg-indigo-500/15 text-indigo-400' : 'text-gray-400 hover:bg-zinc-800 hover:text-gray-200')}>
                  <Icon size={18} />{item.label}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-zinc-800">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all w-full">
            <LogOut size={18} />Çıxış
          </button>
        </div>
      </aside>

      <main className="md:ml-64 pt-16 md:pt-0 min-h-screen">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  )
}
