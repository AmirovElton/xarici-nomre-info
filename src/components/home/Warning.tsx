import { AlertTriangle } from 'lucide-react'

export default function Warning() {
  return (
    <section className="px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="glass-card p-5 border-amber-500/20 bg-amber-500/5">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={20} className="text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-300 mb-1">Vacib məlumat</h3>
              <p className="text-sm text-amber-400/80 leading-relaxed">
                Bu sayt məlumatlandırma xarakterlidir. Sifariş və ödəniş yalnız XariciNomrəAz-ın 
                rəsmi WhatsApp əlaqəsi vasitəsilə həyata keçirilir. Saytda onlayn ödəniş, səbət 
                sistemi və ya avtomatik sifariş mövcud deyil.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
