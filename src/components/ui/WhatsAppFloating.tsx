'use client'

import { MessageCircle } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/utils'

export default function WhatsAppFloating() {
  return (
    <a
      href={getWhatsAppUrl('994501234567', 'Salam, XariciNomrəAz saytından gəlirəm. Xarici nömrə haqqında məlumat almaq istəyirəm.')}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:flex fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
      aria-label="WhatsApp ilə əlaqə"
    >
      <MessageCircle size={26} />
    </a>
  )
}
