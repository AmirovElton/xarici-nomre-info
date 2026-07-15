import { MessageCircle, ArrowRight } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

export default function CTASection() {
  return (
    <section className="px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="glass-card p-8 md:p-12 text-center bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-blue-50/50">
          {/* Decorative */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            <MessageCircle size={28} className="text-white" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Sifariş verməyə hazırsınız?
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Məlumatlarla tanış olduqdan sonra WhatsApp vasitəsilə bizimlə əlaqə saxlayın. 
            Sizə uyğun nömrəni birlikdə seçəcəyik.
          </p>

          <a
            href={getWhatsAppUrl('994501234567', 'Salam, XariciNomrəAz saytından gəlirəm. Xarici nömrə haqqında məlumat almaq istəyirəm.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-base"
          >
            <MessageCircle size={20} />
            WhatsApp-dan əlaqə saxla
            <ArrowRight size={16} />
          </a>

          <p className="text-xs text-gray-500 mt-4">
            İş saatları: 09:00 - 22:00
          </p>
        </div>
      </div>
    </section>
  )
}
