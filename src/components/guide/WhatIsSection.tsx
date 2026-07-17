'use client'

import { useState } from 'react'
import { ChevronDown, Smartphone, Users, Clock, AlertTriangle, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

const infoItems = [
  {
    question: 'Xarici virtual nömrə nədir?',
    answer: 'Xarici virtual nömrə fiziki SIM kartın istifadəçinin cihazında olmadığı, lakin müəyyən platformalarda qeydiyyat, SMS təsdiqi və ya hesab istifadəsi üçün təqdim edilən xarici ölkə nömrəsidir. Nömrənin növündən və xidmət şərtlərindən asılı olaraq SMS kodu qəbul edilə bilər, yeni hesab yaradıla bilər, hazır hesab təqdim edilə bilər və ya qısa/uzunmüddətli istifadə mümkün ola bilər.',
    icon: Smartphone,
  },
  {
    question: 'Nə üçün istifadə olunur?',
    answer: 'Xarici ölkə nömrəsi ilə hesab yaratmaq, iş və şəxsi hesabları ayırmaq, fərqli ölkəyə uyğun profil yaratmaq, şəxsi əsas nömrəni paylaşmamaq, biznes və müştəri əlaqəsi üçün əlavə hesab istifadə etmək, müxtəlif platformalarda əlavə profil yaratmaq üçün istifadə olunur.',
    icon: Users,
  },
  {
    question: 'Nömrələr birdəfəlikdir, yoxsa uzunmüddətli?',
    answer: 'Bu, nömrənin növünə görə dəyişir. Birdəfəlik SMS nömrəsi, müəyyən müddət aktiv olan nömrə, hazır hesabla birlikdə təqdim olunan nömrə, uzunmüddətli istifadə üçün nəzərdə tutulan nömrə və premium daha stabil nömrə seçimləri mövcuddur. Hər ölkə və məhsul kartında nömrənin növü ayrıca göstərilir.',
    icon: Clock,
  },
  {
    question: 'Nömrə nə qədər müddət istifadə olunur?',
    answer: 'İstifadə müddəti konkret məhsula, platformaya, ölkəyə və istifadə qaydasına görə dəyişə bilər. Heç bir nömrə üçün müddətsiz və ya tam zəmanətli istifadə vədi verilmir. Birdəfəlik nömrə yalnız kod almaq üçün ola bilər, bəzi nömrələr müəyyən müddət üçün istifadə edilə bilər, premium seçimlər uzunmüddətli istifadə üçün daha uyğun ola bilər, hesabın ömrü istifadəçinin fəaliyyətindən də asılıdır.',
    icon: Clock,
  },
  {
    question: 'Nömrə məxfidirmi?',
    answer: 'Müştərinin sifariş məlumatları üçüncü şəxslərlə paylaşılmır. Ancaq virtual nömrələrin texniki xüsusiyyətlərinə görə bütün nömrələr şəxsi fiziki SIM kartla eyni təhlükəsizlik səviyyəsinə malik olmaya bilər. Hesabı aldıqdan sonra iki addımlı doğrulamanı aktiv etmək, şəxsi e-poçt əlavə etmək, aktiv cihazları yoxlamaq və tanımadığınız sessiyalardan çıxmaq tövsiyə olunur.',
    icon: Shield,
  },
  {
    question: 'Hesab niyə bloklana bilər?',
    answer: 'Qısa müddətdə çox sayda mesaj göndərmək, tanımadığınız şəxslərə ardıcıl yazmaq, kütləvi reklam göndərmək, çoxlu qrupa birdən daxil olmaq, eyni cihazda həddindən artıq hesab idarə etmək, tez-tez cihaz dəyişmək, IP ünvanını davamlı dəyişmək, şübhəli VPN və proxy istifadəsi, avtomatlaşdırılmış mesaj proqramlarından istifadə, platformanın qaydalarını pozmaq blok riskini artırır.',
    icon: AlertTriangle,
  },
]

export default function WhatIsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {/* Important Warning - dark theme */}
      <div
        className="p-4 mb-6 rounded-2xl"
        style={{ background: 'var(--bg-card)', border: '1px solid color-mix(in srgb, var(--danger) 25%, transparent)' }}
      >
        <div className="flex gap-3">
          <AlertTriangle size={18} style={{ color: 'var(--danger)' }} className="flex-shrink-0 mt-0.5" />
          <p style={{ color: 'var(--text-secondary)' }} className="text-sm leading-relaxed">
            Nömrələrin qanunsuz fəaliyyət, dələduzluq, spam, icazəsiz reklam və platforma qaydalarını
            pozmaq üçün istifadəsi qadağandır. Heç bir nömrə və ya hesab üçün 100% bloklanmama zəmanəti verilmir.
          </p>
        </div>
      </div>

      {infoItems.map((item, index) => {
        const Icon = item.icon
        const isOpen = openIndex === index
        return (
          <div key={index} className="theme-card overflow-hidden">
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center gap-3 p-4 text-left"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--accent-muted)' }}
              >
                <Icon size={18} style={{ color: 'var(--accent)' }} />
              </div>
              <span style={{ color: 'var(--text-primary)' }} className="flex-1 font-semibold text-sm">{item.question}</span>
              <ChevronDown
                size={18}
                style={{ color: 'var(--text-muted)' }}
                className={cn('transition-transform', isOpen && 'rotate-180')}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pt-0 ml-12 animate-fade-in">
                <p style={{ color: 'var(--text-secondary)' }} className="text-sm leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
