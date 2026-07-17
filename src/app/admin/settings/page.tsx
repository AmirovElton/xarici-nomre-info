'use client'

import { useState, useEffect } from 'react'
import { Save, Globe, MessageCircle, Mail, CheckCircle, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    siteName: 'XariciNomrəAz',
    slogan: '',
    heroTitle: '',
    heroSubtitle: '',
    whatsappNumber: '994501234567',
    instagramUrl: '',
    telegramUrl: '',
    email: '',
    workingHours: '09:00 - 22:00',
    defaultWhatsappMessage: '',
    warningText: '',
  })

  useEffect(() => {
    supabase
      .from('site_settings')
      .select('*')
      .single()
      .then(({ data }) => {
        if (data) {
          setSettings({
            siteName: data.site_name || '',
            slogan: data.slogan || '',
            heroTitle: data.hero_title || '',
            heroSubtitle: data.hero_subtitle || '',
            whatsappNumber: data.whatsapp_number || '',
            instagramUrl: data.instagram_url || '',
            telegramUrl: data.telegram_url || '',
            email: data.email || '',
            workingHours: data.working_hours || '',
            defaultWhatsappMessage: data.default_whatsapp_message || '',
            warningText: data.warning_text || '',
          })
        }
      })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    const { data: existing } = await supabase.from('site_settings').select('id').single()
    if (existing) {
      await supabase.from('site_settings').update({
        site_name: settings.siteName,
        slogan: settings.slogan,
        hero_title: settings.heroTitle,
        hero_subtitle: settings.heroSubtitle,
        whatsapp_number: settings.whatsappNumber,
        instagram_url: settings.instagramUrl || null,
        telegram_url: settings.telegramUrl || null,
        email: settings.email || null,
        working_hours: settings.workingHours,
        default_whatsapp_message: settings.defaultWhatsappMessage,
        warning_text: settings.warningText,
      }).eq('id', existing.id)
    }
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ color: 'var(--text-primary)' }} className="text-2xl font-bold">Sayt Ayarları</h1>
          <p style={{ color: 'var(--text-faint)' }} className="text-sm">Ümumi ayarlar</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary flex items-center gap-2 px-4 py-2 text-sm disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <CheckCircle size={16} /> : <Save size={16} />}
          {saving ? 'Saxlanılır...' : saved ? 'Saxlanıldı!' : 'Yadda saxla'}
        </button>
      </div>

      {/* Success feedback */}
      {saved && (
        <div
          className="mb-4 p-3 rounded-xl text-sm flex items-center gap-2"
          style={{ background: 'color-mix(in srgb, var(--success) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--success) 20%, transparent)', color: 'var(--success)' }}
        >
          <CheckCircle size={16} /> Ayarlar uğurla saxlanıldı!
        </div>
      )}

      <div className="space-y-6">
        {/* General Settings Section */}
        <div className="theme-card p-6">
          <h2 style={{ color: 'var(--text-primary)' }} className="font-bold mb-4 flex items-center gap-2">
            <Globe size={18} style={{ color: 'var(--accent)' }} /> Ümumi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label style={{ color: 'var(--text-muted)' }} className="text-sm font-medium mb-1 block">Sayt adı</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleChange('siteName', e.target.value)}
                className="theme-input w-full px-4 py-2.5 rounded-xl text-sm"
              />
            </div>
            <div>
              <label style={{ color: 'var(--text-muted)' }} className="text-sm font-medium mb-1 block">Slogan</label>
              <input
                type="text"
                value={settings.slogan}
                onChange={(e) => handleChange('slogan', e.target.value)}
                className="theme-input w-full px-4 py-2.5 rounded-xl text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label style={{ color: 'var(--text-muted)' }} className="text-sm font-medium mb-1 block">Hero başlığı</label>
              <input
                type="text"
                value={settings.heroTitle}
                onChange={(e) => handleChange('heroTitle', e.target.value)}
                className="theme-input w-full px-4 py-2.5 rounded-xl text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label style={{ color: 'var(--text-muted)' }} className="text-sm font-medium mb-1 block">Hero alt mətni</label>
              <textarea
                value={settings.heroSubtitle}
                onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                rows={2}
                className="theme-input w-full px-4 py-2.5 rounded-xl text-sm resize-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Settings Section */}
        <div className="theme-card p-6">
          <h2 style={{ color: 'var(--text-primary)' }} className="font-bold mb-4 flex items-center gap-2">
            <MessageCircle size={18} style={{ color: 'var(--success)' }} /> Əlaqə
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label style={{ color: 'var(--text-muted)' }} className="text-sm font-medium mb-1 block">WhatsApp</label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                className="theme-input w-full px-4 py-2.5 rounded-xl text-sm"
              />
            </div>
            <div>
              <label style={{ color: 'var(--text-muted)' }} className="text-sm font-medium mb-1 block">Instagram</label>
              <input
                type="text"
                value={settings.instagramUrl}
                onChange={(e) => handleChange('instagramUrl', e.target.value)}
                className="theme-input w-full px-4 py-2.5 rounded-xl text-sm"
              />
            </div>
            <div>
              <label style={{ color: 'var(--text-muted)' }} className="text-sm font-medium mb-1 block">Telegram</label>
              <input
                type="text"
                value={settings.telegramUrl}
                onChange={(e) => handleChange('telegramUrl', e.target.value)}
                className="theme-input w-full px-4 py-2.5 rounded-xl text-sm"
              />
            </div>
            <div>
              <label style={{ color: 'var(--text-muted)' }} className="text-sm font-medium mb-1 block">E-poçt</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="theme-input w-full px-4 py-2.5 rounded-xl text-sm"
              />
            </div>
            <div>
              <label style={{ color: 'var(--text-muted)' }} className="text-sm font-medium mb-1 block">İş saatları</label>
              <input
                type="text"
                value={settings.workingHours}
                onChange={(e) => handleChange('workingHours', e.target.value)}
                className="theme-input w-full px-4 py-2.5 rounded-xl text-sm"
              />
            </div>
          </div>
        </div>

        {/* Messages Section */}
        <div className="theme-card p-6">
          <h2 style={{ color: 'var(--text-primary)' }} className="font-bold mb-4 flex items-center gap-2">
            <Mail size={18} style={{ color: '#a855f7' }} /> Mesajlar
          </h2>
          <div className="space-y-4">
            <div>
              <label style={{ color: 'var(--text-muted)' }} className="text-sm font-medium mb-1 block">Standart WhatsApp mesajı</label>
              <textarea
                value={settings.defaultWhatsappMessage}
                onChange={(e) => handleChange('defaultWhatsappMessage', e.target.value)}
                rows={2}
                className="theme-input w-full px-4 py-2.5 rounded-xl text-sm resize-none"
              />
            </div>
            <div>
              <label style={{ color: 'var(--text-muted)' }} className="text-sm font-medium mb-1 block">Xəbərdarlıq mətni</label>
              <textarea
                value={settings.warningText}
                onChange={(e) => handleChange('warningText', e.target.value)}
                rows={3}
                className="theme-input w-full px-4 py-2.5 rounded-xl text-sm resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
