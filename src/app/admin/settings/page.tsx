'use client'

import { useState, useEffect } from 'react'
import { Save, Globe, MessageCircle, Mail, CheckCircle, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState({
    siteName: 'XariciNomrəAz',
    slogan: 'Xarici nömrələr haqqında doğru məlumat, düzgün seçim və təhlükəsiz istifadə.',
    heroTitle: 'Xarici virtual nömrələr haqqında bilməli olduğunuz hər şey',
    heroSubtitle: 'Platformanıza uyğun ölkələri, aktual stok vəziyyətini, istifadə qaydalarını və təhlükəsizlik tövsiyələrini sifarişdən əvvəl öyrənin.',
    whatsappNumber: '994501234567',
    instagramUrl: '',
    telegramUrl: '',
    email: '',
    workingHours: '09:00 - 22:00',
    footerText: '© 2026 XariciNomrəAz. Bütün hüquqlar qorunur.',
    warningText: 'Bu sayt məlumatlandırma xarakterlidir. Sifariş və ödəniş yalnız XariciNomrəAz-ın rəsmi WhatsApp əlaqəsi vasitəsilə həyata keçirilir.',
    defaultWhatsappMessage: 'Salam, XariciNomrəAz saytından gəlirəm. Xarici nömrə haqqında məlumat almaq istəyirəm.',
  })

  // Load settings from Supabase
  useEffect(() => {
    async function loadSettings() {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .single()

        if (data && !error) {
          setSettings({
            siteName: data.site_name || settings.siteName,
            slogan: data.slogan || settings.slogan,
            heroTitle: data.hero_title || settings.heroTitle,
            heroSubtitle: data.hero_subtitle || settings.heroSubtitle,
            whatsappNumber: data.whatsapp_number || settings.whatsappNumber,
            instagramUrl: data.instagram_url || '',
            telegramUrl: data.telegram_url || '',
            email: data.email || '',
            workingHours: data.working_hours || settings.workingHours,
            footerText: data.footer_text || settings.footerText,
            warningText: data.warning_text || settings.warningText,
            defaultWhatsappMessage: data.default_whatsapp_message || settings.defaultWhatsappMessage,
          })
        }
      } catch (e) {
        console.error('Failed to load settings:', e)
      } finally {
        setLoading(false)
      }
    }
    loadSettings()
  }, [])

  // Save settings to Supabase
  const handleSave = async () => {
    setSaving(true)
    setSaved(false)

    try {
      // Get the first (and only) settings row
      const { data: existing } = await supabase
        .from('site_settings')
        .select('id')
        .single()

      if (existing) {
        const { error } = await supabase
          .from('site_settings')
          .update({
            site_name: settings.siteName,
            slogan: settings.slogan,
            hero_title: settings.heroTitle,
            hero_subtitle: settings.heroSubtitle,
            whatsapp_number: settings.whatsappNumber,
            instagram_url: settings.instagramUrl || null,
            telegram_url: settings.telegramUrl || null,
            email: settings.email || null,
            working_hours: settings.workingHours,
            footer_text: settings.footerText,
            warning_text: settings.warningText,
            default_whatsapp_message: settings.defaultWhatsappMessage,
          })
          .eq('id', existing.id)

        if (error) throw error
      }

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e) {
      console.error('Failed to save settings:', e)
      alert('Xəta baş verdi. Yenidən cəhd edin.')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-indigo-600" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sayt Ayarları</h1>
          <p className="text-sm text-gray-500">Ümumi ayarlar və əlaqə məlumatları</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {saving ? (
            <><Loader2 size={16} className="animate-spin" /> Saxlanılır...</>
          ) : saved ? (
            <><CheckCircle size={16} /> Saxlanıldı!</>
          ) : (
            <><Save size={16} /> Yadda saxla</>
          )}
        </button>
      </div>

      {saved && (
        <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-700 flex items-center gap-2">
          <CheckCircle size={16} /> Ayarlar uğurla yadda saxlanıldı!
        </div>
      )}

      <div className="space-y-6">
        {/* General */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Globe size={18} className="text-indigo-600" /> Ümumi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Sayt adı</label>
              <input type="text" value={settings.siteName} onChange={(e) => handleChange('siteName', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Slogan</label>
              <input type="text" value={settings.slogan} onChange={(e) => handleChange('slogan', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Hero başlığı</label>
              <input type="text" value={settings.heroTitle} onChange={(e) => handleChange('heroTitle', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1 block">Hero alt mətni</label>
              <textarea value={settings.heroSubtitle} onChange={(e) => handleChange('heroSubtitle', e.target.value)} rows={2} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none" />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MessageCircle size={18} className="text-green-600" /> Əlaqə
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">WhatsApp nömrəsi</label>
              <input type="text" value={settings.whatsappNumber} onChange={(e) => handleChange('whatsappNumber', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Instagram</label>
              <input type="text" value={settings.instagramUrl} onChange={(e) => handleChange('instagramUrl', e.target.value)} placeholder="https://instagram.com/..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Telegram</label>
              <input type="text" value={settings.telegramUrl} onChange={(e) => handleChange('telegramUrl', e.target.value)} placeholder="https://t.me/..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">E-poçt</label>
              <input type="email" value={settings.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="info@xaricinomsreaz.com" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">İş saatları</label>
              <input type="text" value={settings.workingHours} onChange={(e) => handleChange('workingHours', e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" />
            </div>
          </div>
        </div>

        {/* WhatsApp Messages */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Mail size={18} className="text-purple-600" /> Mesajlar
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">WhatsApp hazır mesaj</label>
              <textarea value={settings.defaultWhatsappMessage} onChange={(e) => handleChange('defaultWhatsappMessage', e.target.value)} rows={2} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Xəbərdarlıq mətni</label>
              <textarea value={settings.warningText} onChange={(e) => handleChange('warningText', e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
