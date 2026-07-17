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
      <div
        className="p-4 mb-4 rounded-2xl"
        style={{ background: 'var(--bg-card)', border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)' }}
      >
        <div className="flex gap-3">
          <HelpCircle size={18} style={{ color: 'var(--accent)' }} className="flex-shrink-0" />
          <p style={{ color: 'var(--text-secondary)' }} className="text-sm">
            Əlavə suallarınız üçün WhatsApp vasitəsilə əlaqə saxlaya bilərsiniz.
          </p>
        </div>
      </div>

      {faqs.map((faq, index) => {
        const isOpen = openIndex === index
        return (
          <div key={index} className="theme-card overflow-hidden">
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center gap-3 p-4 text-left"
            >
              <span style={{ color: 'var(--text-primary)' }} className="flex-1 font-semibold text-sm">{faq.q}</span>
              <ChevronDown
                size={18}
                style={{ color: 'var(--text-muted)' }}
                className={cn('transition-transform flex-shrink-0', isOpen && 'rotate-180')}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pt-0 animate-fade-in">
                <p style={{ color: 'var(--text-secondary)' }} className="text-sm leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
