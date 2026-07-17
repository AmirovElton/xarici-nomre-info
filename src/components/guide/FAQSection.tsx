'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  { q: 'Xarici virtual nömrə nədir?', a: 'Fiziki SIM kartın olmadığı, lakin müəyyən platformalarda qeydiyyat üçün istifadə olunan xarici ölkə nömrəsidir.' },
  { q: 'Nömrəni neçə dəqiqəyə alıram?', a: 'Ödəniş təsdiqləndikdən sonra adətən 5-15 dəqiqə ərzində təqdim edilir.' },
  { q: 'Hesab bloklana bilərmi?', a: 'Spam, kütləvi mesaj və qayda pozuntusu blok riskini artırır. Təlimatlarımıza əməl etdikdə risk minimuma endirilir.' },
  { q: 'Hansı ölkə daha stabildir?', a: 'Premium kateqoriyasındakı ölkələr daha stabil hesab olunur. Amma 100% zəmanət verilmir.' },
  { q: 'İki addımlı doğrulama nə vaxt aktiv edilməlidir?', a: 'Hesabı aldıqdan dərhal sonra aktiv etməniz tövsiyə olunur.' },
  { q: 'VPN istifadə etmək olar?', a: 'Bəzi platformalar VPN-i şübhəli hesab edə bilər. Sabit internet istifadə edin.' },
  { q: 'Ödəniş necə edilir?', a: 'Ödəniş WhatsApp vasitəsilə razılaşdırılır.' },
  { q: 'Geri qaytarma şərtləri?', a: 'Məhsulun növünə görə dəyişir. WhatsApp ilə əlaqə saxlayın.' },
  { q: 'Stoklar nə vaxt yenilənir?', a: 'Mütəmadi yenilənir. Son tarix hər kartda göstərilir.' },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      <div className="p-4 mb-4 rounded-2xl" style={{ background: 'var(--accent-muted)', border: '1px solid rgba(124,108,255,0.15)' }}>
        <div className="flex gap-3">
          <HelpCircle size={18} style={{ color: 'var(--accent)' }} className="flex-shrink-0" />
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Əlavə suallarınız üçün WhatsApp vasitəsilə əlaqə saxlayın.</p>
        </div>
      </div>

      {faqs.map((faq, index) => {
        const isOpen = openIndex === index
        return (
          <div key={index} className="theme-card overflow-hidden">
            <button onClick={() => setOpenIndex(isOpen ? null : index)} className="w-full flex items-center gap-3 p-4 text-left">
              <span className="flex-1 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{faq.q}</span>
              <ChevronDown size={18} style={{ color: 'var(--text-faint)', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pt-0 animate-fade-in">
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{faq.a}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
