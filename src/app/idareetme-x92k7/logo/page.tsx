'use client'

import { useState, useEffect } from 'react'
import { Save, Link as LinkIcon } from 'lucide-react'
import { adminDb } from '@/lib/admin-api'
import { AdminHeader, AdminButton, Field, TextInput, AdminLoading, Toast } from '@/components/admin/ui'

interface SettingsRow { id: string; site_name?: string; logo_url?: string }

export default function AdminLogoPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const [rowId, setRowId] = useState<string | null>(null)
  const [siteName, setSiteName] = useState('')
  const [logoUrl, setLogoUrl] = useState('')

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(''), 2500) }

  useEffect(() => {
    adminDb<SettingsRow>({ action: 'select', table: 'site_settings', single: true }).then(({ data }) => {
      if (data) {
        setRowId(data.id)
        setSiteName(data.site_name || '')
        setLogoUrl(data.logo_url || '')
      }
      setLoading(false)
    })
  }, [])

  const save = async () => {
    if (!rowId) { showToast('Ayarlar tapılmadı'); return }
    setSaving(true)
    const { error } = await adminDb({
      action: 'update', table: 'site_settings', match: { id: rowId },
      values: { site_name: siteName, logo_url: logoUrl || null },
    })
    setSaving(false)
    showToast(error ? 'Xəta: ' + error.message : 'Yadda saxlanıldı ✓')
  }

  if (loading) return <AdminLoading />

  return (
    <div>
      <AdminHeader
        title="Logo və Ad"
        subtitle="Sayt loqosunu və adını dəyişdirin"
        action={<AdminButton onClick={save} loading={saving}><Save size={16} /> Yadda saxla</AdminButton>}
      />

      <div className="space-y-6 max-w-2xl">
        <div className="theme-card p-6">
          <h2 style={{ color: 'var(--text-primary)' }} className="font-bold mb-4">Marka adı</h2>
          <Field label="Sayt adı">
            <TextInput value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder="XariciNomrəAz" />
          </Field>
        </div>

        <div className="theme-card p-6">
          <h2 style={{ color: 'var(--text-primary)' }} className="font-bold mb-4 flex items-center gap-2">
            <LinkIcon size={18} style={{ color: 'var(--accent)' }} /> Logo (PNG/SVG linki)
          </h2>
          <Field label="Logo şəkil linki">
            <TextInput value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://example.com/logo.png" />
          </Field>
          <p style={{ color: 'var(--text-faint)' }} className="text-xs mt-2">
            Şəkil linkini bura yapışdırın. PNG, SVG və ya WebP formatında olmalıdır.
          </p>

          <div className="mt-5 p-4 rounded-xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
            <p style={{ color: 'var(--text-faint)' }} className="text-xs mb-3">Önbaxış:</p>
            <div className="flex items-center gap-3">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt="Logo" className="w-11 h-11 rounded-xl object-contain p-1" style={{ background: 'var(--bg-card)' }} />
              ) : (
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--accent), #6366f1)' }}>
                  <span className="text-white font-bold text-sm">XN</span>
                </div>
              )}
              <span className="font-bold text-lg gradient-text">{siteName || 'XariciNomrəAz'}</span>
            </div>
          </div>
        </div>
      </div>

      <Toast message={toast} />
    </div>
  )
}
