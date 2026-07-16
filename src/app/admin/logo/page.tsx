'use client'

import { useState } from 'react'
import { Image, Upload, Link as LinkIcon, Save, CheckCircle } from 'lucide-react'

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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Logo İdarəetmə</h1>
          <p className="text-sm text-gray-500">Sayt loqosunu şəkil və ya link ilə dəyişdirin</p>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
          {saved ? <><CheckCircle size={16} /> Saxlanıldı!</> : <><Save size={16} /> Yadda saxla</>}
        </button>
      </div>

      {saved && (
        <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-sm text-green-400 flex items-center gap-2">
          <CheckCircle size={16} /> Logo uğurla yeniləndi!
        </div>
      )}

      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 mb-6">
        <h2 className="font-bold text-gray-200 mb-4 flex items-center gap-2">
          <Image size={18} className="text-indigo-400" /> Logo növünü seçin
        </h2>
        <div className="flex gap-3">
          <button onClick={() => setLogoType('url')} className={`flex-1 p-4 rounded-xl border text-sm font-medium transition-all ${logoType === 'url' ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 bg-zinc-800/50 text-gray-400 hover:border-zinc-600'}`}>
            <LinkIcon size={20} className="mx-auto mb-2" />
            PNG Link
          </button>
          <button onClick={() => setLogoType('upload')} className={`flex-1 p-4 rounded-xl border text-sm font-medium transition-all ${logoType === 'upload' ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-300' : 'border-zinc-700 bg-zinc-800/50 text-gray-400 hover:border-zinc-600'}`}>
            <Upload size={20} className="mx-auto mb-2" />
            Şəkil yüklə
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
        {logoType === 'url' ? (
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Logo PNG linki</label>
            <input type="url" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://example.com/logo.png" className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
            <p className="text-xs text-gray-500 mt-2">PNG, SVG və ya WebP formatında olmalıdır.</p>
          </div>
        ) : (
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Logo şəkli yüklə</label>
            <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:border-indigo-500/50 transition-colors cursor-pointer">
              <Upload size={32} className="mx-auto text-gray-500 mb-3" />
              <p className="text-sm text-gray-400">Şəkili buraya sürükleyin və ya klikləyin</p>
              <p className="text-xs text-gray-500 mt-1">PNG, SVG, WebP (max 2MB)</p>
            </div>
          </div>
        )}

        {logoUrl && logoType === 'url' && (
          <div className="mt-6 p-4 bg-zinc-800/50 rounded-xl border border-zinc-700">
            <p className="text-xs text-gray-500 mb-2">Önbaxış:</p>
            <div className="flex items-center gap-3">
              <img src={logoUrl} alt="Logo" className="w-10 h-10 rounded-xl object-contain bg-zinc-900 p-1" />
              <span className="font-bold"><span className="text-indigo-400">XariciNomrə</span><span className="text-gray-200">Az</span></span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
