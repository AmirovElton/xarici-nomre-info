'use client'

import { useState, useEffect, useCallback } from 'react'
import { Star, Home } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import type { Country, Platform } from '@/lib/types'
import { AdminHeader, AdminLoading, AdminEmpty, Toast, Toggle } from '@/components/admin/ui'

export default function AdminPremiumPage() {
  const [countries, setCountries] = useState<Country[]>([])
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState('')

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(''), 2500) }

  const load = useCallback(async () => {
    setLoading(true)
    const [{ data: c }, { data: p }] = await Promise.all([
      supabase.from('countries').select('*').order('sort_order', { ascending: true }),
      supabase.from('platforms').select('*'),
    ])
    setCountries((c as Country[]) || [])
    setPlatforms((p as Platform[]) || [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const platformName = (id: string) => platforms.find(p => p.id === id)?.name || '—'

  const togglePremium = async (c: Country) => {
    const next = !c.is_premium
    setCountries(prev => prev.map(x => x.id === c.id ? { ...x, is_premium: next } : x))
    await supabase.from('countries').update({ is_premium: next }).eq('id', c.id)
    showToast(next ? 'Premium edildi' : 'Premium ləğv edildi')
  }

  const togglePopular = async (c: Country) => {
    const next = !c.is_popular
    setCountries(prev => prev.map(x => x.id === c.id ? { ...x, is_popular: next } : x))
    await supabase.from('countries').update({ is_popular: next }).eq('id', c.id)
    showToast(next ? 'Ən çox seçilən edildi' : 'Ləğv edildi')
  }

  const premiumList = countries.filter(c => c.is_premium)

  return (
    <div>
      <AdminHeader title="Premium Seçimlər" subtitle={`${premiumList.length} premium nömrə`} />

      <div className="theme-card p-4 mb-6" style={{ border: '1px solid color-mix(in srgb, var(--warning) 25%, transparent)' }}>
        <p style={{ color: 'var(--text-secondary)' }} className="text-sm flex items-start gap-2">
          <Star size={16} style={{ color: 'var(--warning)' }} className="flex-shrink-0 mt-0.5" />
          Hər ölkəni premium və ya "ən çox seçilən" kimi işarələyin. Premium ölkələr Premium səhifəsində göstərilir.
        </p>
      </div>

      {loading ? <AdminLoading /> : countries.length === 0 ? (
        <AdminEmpty text="Ölkə yoxdur. Əvvəlcə Ölkələr bölməsində ölkə əlavə edin." />
      ) : (
        <div className="space-y-3">
          {countries.map((c) => (
            <div key={c.id} className="theme-card p-4 flex items-center gap-4 flex-wrap">
              <span className="text-2xl">{c.flag}</span>
              <div className="flex-1 min-w-[120px]">
                <div className="flex items-center gap-2 flex-wrap">
                  <span style={{ color: 'var(--text-primary)' }} className="font-semibold">{c.name}</span>
                  <span style={{ color: 'var(--text-muted)' }} className="text-xs">{c.country_code}</span>
                  <span className="badge-accent">{platformName(c.platform_id)}</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span style={{ color: 'var(--text-muted)' }} className="text-xs flex items-center gap-1"><Star size={12} /> Premium</span>
                  <Toggle checked={c.is_premium} onChange={() => togglePremium(c)} />
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: 'var(--text-muted)' }} className="text-xs flex items-center gap-1"><Home size={12} /> Populyar</span>
                  <Toggle checked={c.is_popular} onChange={() => togglePopular(c)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Toast message={toast} />
    </div>
  )
}
