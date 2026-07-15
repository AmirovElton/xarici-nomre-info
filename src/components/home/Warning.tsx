import { AlertTriangle } from 'lucide-react'

export default function Warning() {
  return (
    <section className="px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="glass-card p-5 border-amber-200/50 bg-amber-50/30">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={20} className="text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-800 mb-1">Vacib məlumat</h3>
              <p className="text-sm text-amber-700 leading-relaxed">
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
