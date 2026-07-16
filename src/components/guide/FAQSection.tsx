'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  { q: 'Xarici virtual nömrə nədir?', a: 'Xarici virtual nömrə fiziki SIM kartın istifadəçinin cihazında olmadığı, lakin müəyyən platformalarda qeydiyyat və ya hesab istifadəsi üçün təqdim edilən xarici ölkə nömrəsidir.' },
  { q: 'Nömrəni neçə dəqiqəyə əldə edirəm?', a: 'Ödəniş təsdiqləndikdən sonra nömrə adətən 5-15 dəqiqə ərzində təqdim edilir.' },
  { q: 'Hesab bloklana bilərmi?', a: 'Hər bir platforma öz qaydalarına malikdir. Spam, kütləvi mesaj və qayda pozuntusu blok riskini artırır.' },
  { q: 'Hansı ölkə daha stabildir?', a: 'Premium kateqoriyasındakı ölkələr daha stabil hesab olunur. Amma heç bir nömrə üçün 100% zəmanət verilmir.' },
  { q: 'İki addımlı doğrulama nə vaxt aktiv edilməlidir?', a: 'Hesabı aldıqdan dərhal sonra aktiv etməniz tövsiyə olunur.' },
  { q: 'VPN istifadə etmək olar?', a: 'Bəzi platformalar VPN istifadəsini şübhəli hesab edə bilər. Sabit internet bağlantısından istifadə edin.' },
  { q: 'Ödəniş necə edilir?', a: 'Ödəniş WhatsApp vasitəsilə razılaşdırılır. Satıcı ödəniş məlumatlarını əlaqə zamanı təqdim edir.' },
  { q: 'Geri qaytarma şərtləri necədir?', a: 'Geri qaytarma şərtləri məhsulun növünə görə dəyişir. WhatsApp vasitəsilə əlaqə saxlayın.' },
  { q: 'Stoklar nə qədər tez yenilənir?', a: 'Stok məlumatları mütəmadi olaraq yenilənir. Son yenilənmə tarixi hər ölkə kartında göstərilir.' },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      <div className="glass-card p-4 mb-4 border-indigo-500/20 bg-indigo-500/5">
        <div className="flex gap-3">
          <HelpCircle size={18} className="text-indigo-400 flex-shrink-0" />
          <p className="text-sm text-indigo-300">Əlavə suallarınız üçün WhatsApp vasitəsilə əlaqə saxlaya bilərsiniz.</p>
        </div>
      </div>

      {faqs.map((faq, index) => {
        const isOpen = openIndex === index
        return (
          <div key={index} className="glass-card overflow-hidden">
            <button onClick={() => setOpenIndex(isOpen ? null : index)} className="w-full flex items-center gap-3 p-4 text-left">
              <span className="flex-1 font-medium text-gray-200 text-sm">{faq.q}</span>
              <ChevronDown size={18} className={cn('text-gray-500 transition-transform flex-shrink-0', isOpen && 'rotate-180')} />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pt-0 animate-fade-in">
                <p className="text-sm text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
