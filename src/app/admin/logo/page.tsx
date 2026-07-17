'use client'

import { useState } from 'react'
import { Image, Upload, Link as LinkIcon, Save, CheckCircle } from 'lucide-react'

export default function AdminLogoPage() {
  const [logoType, setLogoType] = useState<'url' | 'upload'>('url')
  const [logoUrl, setLogoUrl] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000) }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Logo İdarəetmə</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Sayt loqosunu dəyişdirin</p>
        </div>
        <button onClick={handleSave} className="btn-primary text-sm py-2.5 px-4">
          {saved ? <><CheckCircle size={16} /> Saxlanıldı!</> : <><Save size={16} /> Yadda saxla</>}
        </button>
      </div>

      {saved && <div className="mb-4 p-3 rounded-xl text-sm" style={{ background: 'var(--success-muted)', color: 'var(--success)', border: '1px solid rgba(34,197,94,0.15)' }}>✓ Logo yeniləndi!</div>}

      {/* Type select */}
      <div className="theme-card p-6 mb-6">
        <h2 className="font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}><Image size={18} style={{ color: 'var(--accent)' }} /> Logo növü</h2>
        <div className="flex gap-3">
          <button onClick={() => setLogoType('url')} className="flex-1 p-4 rounded-xl text-sm font-medium transition-all" style={{ background: logoType === 'url' ? 'var(--accent-muted)' : 'var(--bg-input)', border: `1px solid ${logoType === 'url' ? 'rgba(124,108,255,0.3)' : 'var(--border-default)'}`, color: logoType === 'url' ? 'var(--accent-hover)' : 'var(--text-muted)' }}>
            <LinkIcon size={20} className="mx-auto mb-2" /> PNG Link
          </button>
          <button onClick={() => setLogoType('upload')} className="flex-1 p-4 rounded-xl text-sm font-medium transition-all" style={{ background: logoType === 'upload' ? 'var(--accent-muted)' : 'var(--bg-input)', border: `1px solid ${logoType === 'upload' ? 'rgba(124,108,255,0.3)' : 'var(--border-default)'}`, color: logoType === 'upload' ? 'var(--accent-hover)' : 'var(--text-muted)' }}>
            <Upload size={20} className="mx-auto mb-2" /> Şəkil yüklə
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="theme-card p-6">
        {logoType === 'url' ? (
          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>Logo PNG linki</label>
            <input type="url" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://example.com/logo.png" className="theme-input" />
            <p className="text-xs mt-2" style={{ color: 'var(--text-faint)' }}>PNG, SVG və ya WebP formatı.</p>
          </div>
        ) : (
          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-secondary)' }}>Şəkil yüklə</label>
            <div className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors" style={{ borderColor: 'var(--border-default)' }}>
              <Upload size={32} className="mx-auto mb-3" style={{ color: 'var(--text-faint)' }} />
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Şəkili sürükləyin və ya klikləyin</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-faint)' }}>PNG, SVG, WebP (max 2MB)</p>
            </div>
          </div>
        )}

        {logoUrl && logoType === 'url' && (
          <div className="mt-6 p-4 rounded-xl" style={{ background: 'var(--bg-input)', border: '1px solid var(--border-default)' }}>
            <p className="text-xs mb-2" style={{ color: 'var(--text-faint)' }}>Önbaxış:</p>
            <div className="flex items-center gap-3">
              <img src={logoUrl} alt="Logo" className="w-10 h-10 rounded-xl object-contain p-1" style={{ background: 'var(--bg-card)' }} />
              <span className="font-bold"><span className="gradient-text">XariciNomrə</span><span style={{ color: 'var(--text-primary)' }}>Az</span></span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
