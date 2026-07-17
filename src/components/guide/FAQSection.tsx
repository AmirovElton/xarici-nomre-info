'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, HelpCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { fetchActiveFaqs } from '@/lib/public-data'

// Fallback FAQs shown only if the database has none yet.
const fallbackFaqs = [
  { question: 'Xarici virtual nömrə nədir?', answer: 'Xarici virtual nömrə fiziki SIM kartın istifadəçinin cihazında olmadığı, lakin müəyyən platformalarda qeydiyyat və ya hesab istifadəsi üçün təqdim edilən xarici ölkə nömrəsidir.' },
  { question: 'Nömrəni neçə dəqiqəyə əldə edirəm?', answer: 'Ödəniş təsdiqləndikdən sonra nömrə adətən 5-15 dəqiqə ərzində təqdim edilir.' },
  { question: 'Hesab bloklana bilərmi?', answer: 'Hər bir platforma öz qaydalarına malikdir. Spam, kütləvi mesaj və qayda pozuntusu blok riskini artırır. Təlimatlarımıza əməl etdikdə risk minimuma endirilir.' },
]

interface FaqItem { question: string; answer: string }

export default function FAQSection() {
  const [faqs, setFaqs] = useState<FaqItem[]>([])
  const [loading, setLoading] = useState(true)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    fetchActiveFaqs().then((data) => {
      setFaqs(data.length > 0 ? data.map(f => ({ question: f.question, answer: f.answer })) : fallbackFaqs)
      setLoading(false)
    })
  }, [])

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

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 size={24} className="animate-spin" style={{ color: 'var(--accent)' }} />
        </div>
      ) : (
        faqs.map((faq, index) => {
          const isOpen = openIndex === index
          return (
            <div key={index} className="theme-card overflow-hidden">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center gap-3 p-4 text-left"
              >
                <span style={{ color: 'var(--text-primary)' }} className="flex-1 font-semibold text-sm">{faq.question}</span>
                <ChevronDown
                  size={18}
                  style={{ color: 'var(--text-muted)' }}
                  className={cn('transition-transform flex-shrink-0', isOpen && 'rotate-180')}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-0 animate-fade-in">
                  <p style={{ color: 'var(--text-secondary)' }} className="text-sm leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          )
        })
      )}
    </div>
  )
}
