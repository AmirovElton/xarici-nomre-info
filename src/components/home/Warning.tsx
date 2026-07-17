import { AlertTriangle } from 'lucide-react'

export default function Warning() {
  return (
    <section className="px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="p-5 rounded-2xl" style={{ background: 'var(--warning-muted)', border: '1px solid rgba(251,191,36,0.15)' }}>
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(251,191,36,0.15)' }}>
              <AlertTriangle size={20} style={{ color: 'var(--warning)' }} />
            </div>
            <div>
              <h3 className="font-semibold mb-1" style={{ color: 'var(--warning)' }}>Vacib məlumat</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Bu sayt məlumatlandırma xarakterlidir. Sifariş və ödəniş yalnız XariciNomrəAz-ın
                rəsmi WhatsApp əlaqəsi vasitəsilə həyata keçirilir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
