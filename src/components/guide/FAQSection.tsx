'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  { q: 'Xarici virtual nömrə nədir?', a: 'Xarici virtual nömrə fiziki SIM kartın istifadəçinin cihazında olmadığı, lakin müəyyən platformalarda qeydiyyat və ya hesab istifadəsi üçün təqdim edilən xarici ölkə nömrəsidir.' },
  { q: 'Nömrəni neçə dəqiqəyə əldə edirəm?', a: 'Ödəniş təsdiqləndikdən sonra nömrə adətən 5-15 dəqiqə ərzində təqdim edilir. Bəzi hallarda bu müddət bir qədər dəyişə bilər.' },
  { q: 'Nömrə hansı platformalarda işləyir?', a: 'Hər nömrə konkret platforma üçün təqdim edilir. WhatsApp, Telegram və digər platformalar üçün ayrıca nömrələr mövcuddur.' },
  { q: 'Kod gəlməsə nə baş verir?', a: 'Əgər SMS kodu müəyyən müddət ərzində gəlməzsə, XariciNomrəAz ilə əlaqə saxlayın. Şərtlərə uyğun olaraq alternativ həll təklif ediləcək.' },
  { q: 'Nömrə daimidirmi?', a: 'Bu, nömrənin növünə görə dəyişir. Birdəfəlik nömrələr yalnız kod almaq üçündür, uzunmüddətli nömrələr isə daha uzun müddət istifadə edilə bilər.' },
  { q: 'Hesab bloklana bilərmi?', a: 'Hər bir platforma öz qaydalarına malikdir. Spam, kütləvi mesaj və qayda pozuntusu blok riskini artırır. Təlimatlarımıza əməl etdikdə risk minimuma endirilir.' },
  { q: 'Hansı ölkə daha stabildir?', a: 'Premium kateqoriyasındakı ölkələr (Böyük Britaniya, ABŞ və s.) daha stabil hesab olunur. Amma heç bir nömrə üçün 100% zəmanət verilmir.' },
  { q: 'İki addımlı doğrulama nə vaxt aktiv edilməlidir?', a: 'Hesabı aldıqdan dərhal sonra iki addımlı doğrulamanı aktiv etməniz tövsiyə olunur.' },
  { q: 'VPN istifadə etmək olar?', a: 'Bəzi platformalar VPN istifadəsini şübhəli hesab edə bilər. Mümkün olduqda sabit internet bağlantısından istifadə edin.' },
  { q: 'Ödəniş necə edilir?', a: 'Ödəniş WhatsApp vasitəsilə razılaşdırılır. Satıcı ödəniş məlumatlarını əlaqə zamanı təqdim edir.' },
  { q: 'Geri qaytarma şərtləri necədir?', a: 'Geri qaytarma şərtləri məhsulun növünə görə dəyişir. Ətraflı məlumat üçün WhatsApp vasitəsilə əlaqə saxlayın.' },
  { q: 'Stoklar nə qədər tez yenilənir?', a: 'Stok məlumatları mütəmadi olaraq yenilənir. Son yenilənmə tarixi hər ölkə kartında göstərilir.' },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      <div className="glass-card p-4 mb-4 bg-indigo-50/30 border-indigo-100/50">
        <div className="flex gap-3">
          <HelpCircle size={18} className="text-indigo-500 flex-shrink-0" />
          <p className="text-sm text-indigo-700">
            Əlavə suallarınız üçün WhatsApp vasitəsilə əlaqə saxlaya bilərsiniz.
          </p>
        </div>
      </div>

      {faqs.map((faq, index) => {
        const isOpen = openIndex === index
        return (
          <div key={index} className="glass-card overflow-hidden">
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center gap-3 p-4 text-left"
            >
              <span className="flex-1 font-medium text-gray-900 text-sm">{faq.q}</span>
              <ChevronDown
                size={18}
                className={cn('text-gray-400 transition-transform flex-shrink-0', isOpen && 'rotate-180')}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pt-0 animate-fade-in">
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
