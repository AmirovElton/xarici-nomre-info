'use client'

import { useState, useEffect } from 'react'
import { Save, Globe, MessageCircle, Mail } from 'lucide-react'
import { adminDb } from '@/lib/admin-api'
import type { SiteSettings } from '@/lib/types'
import { AdminHeader, AdminButton, Field, TextInput, TextArea, AdminLoading, Toast } from '@/components/admin/ui'

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const [rowId, setRowId] = useState<string | null>(null)
  const [s, setS] = useState({
    site_name: '', slogan: '', hero_title: '', hero_subtitle: '',
    whatsapp_number: '', instagram_url: '', telegram_url: '',
    email: '', working_hours: '', footer_text: '', default_whatsapp_message: '', warning_text: '',
  })

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(''), 2500) }

  useEffect(() => {
    adminDb<SiteSettings>({ action: 'select', table: 'site_settings', single: true }).then(({ data }) => {
      if (data) {
        setRowId(data.id)
        setS({
          site_name: data.site_name || '',
          slogan: data.slogan || '',
          hero_title: data.hero_title || '',
          hero_subtitle: data.hero_subtitle || '',
          whatsapp_number: data.whatsapp_number || '',
          instagram_url: data.instagram_url || '',
          telegram_url: data.telegram_url || '',
          email: data.email || '',
          working_hours: data.working_hours || '',
          footer_text: data.footer_text || '',
          default_whatsapp_message: data.default_whatsapp_message || '',
          warning_text: data.warning_text || '',
        })
      }
      setLoading(false)
    })
  }, [])

  const save = async () => {
    if (!rowId) { showToast('Ayarlar tapılmadı'); return }
    setSaving(true)
    const { error } = await adminDb({
      action: 'update', table: 'site_settings', match: { id: rowId },
      values: {
        site_name: s.site_name, slogan: s.slogan, hero_title: s.hero_title, hero_subtitle: s.hero_subtitle,
        whatsapp_number: s.whatsapp_number, instagram_url: s.instagram_url || null, telegram_url: s.telegram_url || null,
        email: s.email || null, working_hours: s.working_hours, footer_text: s.footer_text,
        default_whatsapp_message: s.default_whatsapp_message, warning_text: s.warning_text,
      },
    })
    setSaving(false)
    showToast(error ? 'Xəta: ' + error.message : 'Ayarlar yadda saxlanıldı ✓')
  }

  const set = (k: string, v: string) => setS(prev => ({ ...prev, [k]: v }))

  if (loading) return <AdminLoading />

  return (
    <div>
      <AdminHeader
        title="Sayt Ayarları"
        subtitle="Ümumi məlumat, əlaqə linkləri və mesajlar"
        action={<AdminButton onClick={save} loading={saving}><Save size={16} /> Yadda saxla</AdminButton>}
      />

      <div className="space-y-6">
        <div className="theme-card p-6">
          <h2 style={{ color: 'var(--text-primary)' }} className="font-bold mb-4 flex items-center gap-2">
            <Globe size={18} style={{ color: 'var(--accent)' }} /> Ümumi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Sayt adı"><TextInput value={s.site_name} onChange={(e) => set('site_name', e.target.value)} /></Field>
            <Field label="Slogan"><TextInput value={s.slogan} onChange={(e) => set('slogan', e.target.value)} /></Field>
            <div className="md:col-span-2"><Field label="Hero başlığı"><TextInput value={s.hero_title} onChange={(e) => set('hero_title', e.target.value)} /></Field></div>
            <div className="md:col-span-2"><Field label="Hero alt mətni"><TextArea rows={2} value={s.hero_subtitle} onChange={(e) => set('hero_subtitle', e.target.value)} /></Field></div>
          </div>
        </div>

        <div className="theme-card p-6">
          <h2 style={{ color: 'var(--text-primary)' }} className="font-bold mb-4 flex items-center gap-2">
            <MessageCircle size={18} style={{ color: 'var(--success)' }} /> Əlaqə və Linklər
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="WhatsApp nömrəsi"><TextInput value={s.whatsapp_number} onChange={(e) => set('whatsapp_number', e.target.value)} placeholder="994501234567" /></Field>
            <Field label="Instagram linki"><TextInput value={s.instagram_url} onChange={(e) => set('instagram_url', e.target.value)} placeholder="https://instagram.com/..." /></Field>
            <Field label="Telegram linki"><TextInput value={s.telegram_url} onChange={(e) => set('telegram_url', e.target.value)} placeholder="https://t.me/..." /></Field>
            <Field label="E-poçt"><TextInput value={s.email} onChange={(e) => set('email', e.target.value)} placeholder="info@..." /></Field>
            <Field label="İş saatları"><TextInput value={s.working_hours} onChange={(e) => set('working_hours', e.target.value)} placeholder="09:00 - 22:00" /></Field>
          </div>
        </div>

        <div className="theme-card p-6">
          <h2 style={{ color: 'var(--text-primary)' }} className="font-bold mb-4 flex items-center gap-2">
            <Mail size={18} style={{ color: '#a855f7' }} /> Mesajlar və Mətnlər
          </h2>
          <div className="space-y-4">
            <Field label="WhatsApp hazır mesajı"><TextArea rows={2} value={s.default_whatsapp_message} onChange={(e) => set('default_whatsapp_message', e.target.value)} /></Field>
            <Field label="Xəbərdarlıq mətni"><TextArea rows={3} value={s.warning_text} onChange={(e) => set('warning_text', e.target.value)} /></Field>
            <Field label="Footer mətni"><TextInput value={s.footer_text} onChange={(e) => set('footer_text', e.target.value)} /></Field>
          </div>
        </div>
      </div>

      <Toast message={toast} />
    </div>
  )
}
