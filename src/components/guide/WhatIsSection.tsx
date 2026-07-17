'use client'

import { useState } from 'react'
import { ChevronDown, Smartphone, Users, Clock, AlertTriangle, Shield } from 'lucide-react'

const infoItems = [
  { question: 'Xarici virtual nömrə nədir?', answer: 'Xarici virtual nömrə fiziki SIM kartın istifadəçinin cihazında olmadığı, lakin müəyyən platformalarda qeydiyyat, SMS təsdiqi və ya hesab istifadəsi üçün təqdim edilən xarici ölkə nömrəsidir.', icon: Smartphone },
  { question: 'Nə üçün istifadə olunur?', answer: 'Xarici ölkə nömrəsi ilə hesab yaratmaq, iş və şəxsi hesabları ayırmaq, fərqli ölkəyə uyğun profil yaratmaq, şəxsi əsas nömrəni paylaşmamaq üçün istifadə olunur.', icon: Users },
  { question: 'Nömrələr birdəfəlikdir, yoxsa uzunmüddətli?', answer: 'Bu, nömrənin növünə görə dəyişir. Birdəfəlik SMS nömrəsi, müəyyən müddət aktiv olan nömrə, hazır hesabla birlikdə təqdim olunan nömrə, uzunmüddətli istifadə üçün nəzərdə tutulan nömrə seçimləri mövcuddur.', icon: Clock },
  { question: 'Nömrə nə qədər müddət istifadə olunur?', answer: 'İstifadə müddəti konkret məhsula, platformaya və istifadə qaydasına görə dəyişə bilər. Heç bir nömrə üçün müddətsiz istifadə vədi verilmir. Premium seçimlər uzunmüddətli istifadə üçün daha uyğundur.', icon: Clock },
  { question: 'Nömrə məxfidirmi?', answer: 'Müştərinin sifariş məlumatları üçüncü şəxslərlə paylaşılmır. Hesabı aldıqdan sonra iki addımlı doğrulamanı aktiv etmək, şəxsi e-poçt əlavə etmək tövsiyə olunur.', icon: Shield },
  { question: 'Hesab niyə bloklana bilər?', answer: 'Qısa müddətdə çox sayda mesaj göndərmək, kütləvi reklam, çoxlu qrupa birdən daxil olmaq, tez-tez cihaz dəyişmək, şübhəli VPN istifadəsi blok riskini artırır.', icon: AlertTriangle },
]

export default function WhatIsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {/* Warning */}
      <div className="p-4 mb-4 rounded-2xl" style={{ background: 'var(--danger-muted)', border: '1px solid rgba(239,68,68,0.15)' }}>
        <div className="flex gap-3">
          <AlertTriangle size={18} style={{ color: 'var(--danger)' }} className="flex-shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Nömrələrin qanunsuz fəaliyyət, dələduzluq, spam və platforma qaydalarını pozmaq üçün istifadəsi qadağandır.
          </p>
        </div>
      </div>

      {infoItems.map((item, index) => {
        const Icon = item.icon
        const isOpen = openIndex === index
        return (
          <div key={index} className="theme-card overflow-hidden">
            <button onClick={() => setOpenIndex(isOpen ? null : index)} className="w-full flex items-center gap-3 p-4 text-left">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}>
                <Icon size={18} />
              </div>
              <span className="flex-1 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{item.question}</span>
              <ChevronDown size={18} style={{ color: 'var(--text-faint)', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pt-0 ml-12 animate-fade-in">
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.answer}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
