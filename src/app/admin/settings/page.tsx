'use client'

import { useState, useEffect } from 'react'
import { Save, Globe, MessageCircle, Mail, CheckCircle, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    siteName: 'XariciNomrəAz', slogan: '', heroTitle: '', heroSubtitle: '',
    whatsappNumber: '994501234567', instagramUrl: '', telegramUrl: '',
    email: '', workingHours: '09:00 - 22:00', defaultWhatsappMessage: '', warningText: '',
  })

  useEffect(() => {
    supabase.from('site_settings').select('*').single().then(({ data }) => {
      if (data) setSettings({
        siteName: data.site_name || '', slogan: data.slogan || '',
        heroTitle: data.hero_title || '', heroSubtitle: data.hero_subtitle || '',
        whatsappNumber: data.whatsapp_number || '', instagramUrl: data.instagram_url || '',
        telegramUrl: data.telegram_url || '', email: data.email || '',
        workingHours: data.working_hours || '', defaultWhatsappMessage: data.default_whatsapp_message || '',
        warningText: data.warning_text || '',
      })
    })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    const { data: ex } = await supabase.from('site_settings').select('id').single()
    if (ex) {
      await supabase.from('site_settings').update({
        site_name: settings.siteName, slogan: settings.slogan, hero_title: settings.heroTitle,
        hero_subtitle: settings.heroSubtitle, whatsapp_number: settings.whatsappNumber,
        instagram_url: settings.instagramUrl || null, telegram_url: settings.telegramUrl || null,
        email: settings.email || null, working_hours: settings.workingHours,
        default_whatsapp_message: settings.defaultWhatsappMessage, warning_text: settings.warningText,
      }).eq('id', ex.id)
    }
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const h = (k: string, v: string) => setSettings(p => ({ ...p, [k]: v }))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Sayt Ayarları</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Ümumi ayarlar</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2.5 px-4 disabled:opacity-50">
          {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <CheckCircle size={16} /> : <Save size={16} />}
          {saving ? 'Saxlanılır...' : saved ? 'Saxlanıldı!' : 'Yadda saxla'}
        </button>
      </div>

      {saved && <div className="mb-4 p-3 rounded-xl text-sm" style={{ background: 'var(--success-muted)', color: 'var(--success)', border: '1px solid rgba(34,197,94,0.15)' }}>✓ Ayarlar saxlanıldı!</div>}

      <div className="space-y-6">
        <div className="theme-card p-6">
          <h2 className="font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}><Globe size={18} style={{ color: 'var(--accent)' }} /> Ümumi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Sayt adı</label><input type="text" value={settings.siteName} onChange={(e) => h('siteName', e.target.value)} className="theme-input" /></div>
            <div><label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Slogan</label><input type="text" value={settings.slogan} onChange={(e) => h('slogan', e.target.value)} className="theme-input" /></div>
            <div className="md:col-span-2"><label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Hero başlığı</label><input type="text" value={settings.heroTitle} onChange={(e) => h('heroTitle', e.target.value)} className="theme-input" /></div>
            <div className="md:col-span-2"><label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Hero alt mətni</label><textarea value={settings.heroSubtitle} onChange={(e) => h('heroSubtitle', e.target.value)} rows={2} className="theme-input resize-none" /></div>
          </div>
        </div>

        <div className="theme-card p-6">
          <h2 className="font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}><MessageCircle size={18} style={{ color: 'var(--success)' }} /> Əlaqə</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>WhatsApp</label><input type="text" value={settings.whatsappNumber} onChange={(e) => h('whatsappNumber', e.target.value)} className="theme-input" /></div>
            <div><label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Instagram</label><input type="text" value={settings.instagramUrl} onChange={(e) => h('instagramUrl', e.target.value)} className="theme-input" placeholder="https://instagram.com/..." /></div>
            <div><label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Telegram</label><input type="text" value={settings.telegramUrl} onChange={(e) => h('telegramUrl', e.target.value)} className="theme-input" placeholder="https://t.me/..." /></div>
            <div><label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>E-poçt</label><input type="email" value={settings.email} onChange={(e) => h('email', e.target.value)} className="theme-input" /></div>
            <div><label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>İş saatları</label><input type="text" value={settings.workingHours} onChange={(e) => h('workingHours', e.target.value)} className="theme-input" /></div>
          </div>
        </div>

        <div className="theme-card p-6">
          <h2 className="font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}><Mail size={18} style={{ color: 'var(--accent)' }} /> Mesajlar</h2>
          <div className="space-y-4">
            <div><label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>WhatsApp mesaj</label><textarea value={settings.defaultWhatsappMessage} onChange={(e) => h('defaultWhatsappMessage', e.target.value)} rows={2} className="theme-input resize-none" /></div>
            <div><label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Xəbərdarlıq</label><textarea value={settings.warningText} onChange={(e) => h('warningText', e.target.value)} rows={3} className="theme-input resize-none" /></div>
          </div>
        </div>
      </div>
    </div>
  )
}
