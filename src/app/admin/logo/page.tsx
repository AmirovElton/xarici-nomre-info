'use client'

import { useState } from 'react'
import { Upload, Link as LinkIcon, Save, CheckCircle, Image } from 'lucide-react'

export default function AdminLogoPage() {
  const [logoType, setLogoType] = useState<'url' | 'upload'>('url')
  const [logoUrl, setLogoUrl] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ color: 'var(--text-primary)' }} className="text-2xl font-bold">Logo İdarəetmə</h1>
          <p style={{ color: 'var(--text-faint)' }} className="text-sm">Sayt loqosunu şəkil və ya link ilə dəyişdirin</p>
        </div>
        <button
          onClick={handleSave}
          className="btn-primary flex items-center gap-2 px-4 py-2 text-sm"
        >
          {saved ? <><CheckCircle size={16} /> Saxlanıldı!</> : <><Save size={16} /> Yadda saxla</>}
        </button>
      </div>

      {/* Success Feedback */}
      {saved && (
        <div
          className="mb-4 p-3 rounded-xl text-sm flex items-center gap-2"
          style={{ background: 'color-mix(in srgb, var(--success) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--success) 20%, transparent)', color: 'var(--success)' }}
        >
          <CheckCircle size={16} /> Logo uğurla yeniləndi!
        </div>
      )}

      {/* Logo Type Selection */}
      <div className="theme-card p-6 mb-6">
        <h2 style={{ color: 'var(--text-primary)' }} className="font-bold mb-4 flex items-center gap-2">
          <Image size={18} style={{ color: 'var(--accent)' }} /> Logo növünü seçin
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => setLogoType('url')}
            className="flex-1 p-4 rounded-xl text-sm font-medium transition-all"
            style={
              logoType === 'url'
                ? { border: '1px solid color-mix(in srgb, var(--accent) 50%, transparent)', background: 'color-mix(in srgb, var(--accent) 10%, transparent)', color: 'var(--accent)' }
                : { border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', color: 'var(--text-muted)' }
            }
          >
            <LinkIcon size={20} className="mx-auto mb-2" />
            PNG Link
          </button>
          <button
            onClick={() => setLogoType('upload')}
            className="flex-1 p-4 rounded-xl text-sm font-medium transition-all"
            style={
              logoType === 'upload'
                ? { border: '1px solid color-mix(in srgb, var(--accent) 50%, transparent)', background: 'color-mix(in srgb, var(--accent) 10%, transparent)', color: 'var(--accent)' }
                : { border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', color: 'var(--text-muted)' }
            }
          >
            <Upload size={20} className="mx-auto mb-2" />
            Şəkil yüklə
          </button>
        </div>
      </div>

      {/* Input Area */}
      <div className="theme-card p-6">
        {logoType === 'url' ? (
          <div>
            <label style={{ color: 'var(--text-muted)' }} className="text-sm font-medium mb-2 block">Logo PNG linki</label>
            <input
              type="url"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://example.com/logo.png"
              className="theme-input w-full px-4 py-3 rounded-xl text-sm"
            />
            <p style={{ color: 'var(--text-faint)' }} className="text-xs mt-2">PNG, SVG və ya WebP formatında olmalıdır.</p>
          </div>
        ) : (
          <div>
            <label style={{ color: 'var(--text-muted)' }} className="text-sm font-medium mb-2 block">Logo şəkli yüklə</label>
            <div
              className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <Upload size={32} className="mx-auto mb-3" style={{ color: 'var(--text-faint)' }} />
              <p style={{ color: 'var(--text-muted)' }} className="text-sm">Şəkili buraya sürükleyin və ya klikləyin</p>
              <p style={{ color: 'var(--text-faint)' }} className="text-xs mt-1">PNG, SVG, WebP (max 2MB)</p>
            </div>
          </div>
        )}

        {/* Preview */}
        {logoUrl && logoType === 'url' && (
          <div
            className="mt-6 p-4 rounded-xl"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
          >
            <p style={{ color: 'var(--text-faint)' }} className="text-xs mb-2">Önbaxış:</p>
            <div className="flex items-center gap-3">
              <img
                src={logoUrl}
                alt="Logo"
                className="w-10 h-10 rounded-xl object-contain p-1"
                style={{ background: 'var(--bg-card)' }}
              />
              <span className="font-bold">
                <span style={{ color: 'var(--accent)' }}>XariciNomrə</span>
                <span style={{ color: 'var(--text-primary)' }}>Az</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
