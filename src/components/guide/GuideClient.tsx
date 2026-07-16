'use client'

import { useState } from 'react'
import { BookOpen, Zap, Shield, MessageCircle, Send, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import WhatIsSection from './WhatIsSection'
import ProcessSection from './ProcessSection'
import SafetySection from './SafetySection'
import WhatsAppGuide from './WhatsAppGuide'
import TelegramGuide from './TelegramGuide'
import FAQSection from './FAQSection'

const tabs = [
  { id: 'what-is', label: 'Nömrə nədir', icon: BookOpen },
  { id: 'process', label: 'Proses', icon: Zap },
  { id: 'safety', label: 'Təhlükəsizlik', icon: Shield },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { id: 'telegram', label: 'Telegram', icon: Send },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
]

export default function GuideClient() {
  const [activeTab, setActiveTab] = useState('what-is')

  return (
    <div className="px-4 py-6 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="section-title">Bələdçi</h1>
          <p className="section-subtitle">Sifarişdən əvvəl bilməli olduğunuz hər şey</p>
        </div>

        {/* Tab Navigation - Grid layout, no scroll needed */}
        <div className="mb-8">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex flex-col items-center gap-1.5 px-3 py-3 rounded-2xl text-xs font-medium transition-all',
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                      : 'bg-zinc-900/70 border border-zinc-800/60 text-gray-400 hover:text-gray-200 hover:border-zinc-700'
                  )}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {activeTab === 'what-is' && <WhatIsSection />}
          {activeTab === 'process' && <ProcessSection />}
          {activeTab === 'safety' && <SafetySection />}
          {activeTab === 'whatsapp' && <WhatsAppGuide />}
          {activeTab === 'telegram' && <TelegramGuide />}
          {activeTab === 'faq' && <FAQSection />}
        </div>
      </div>
    </div>
  )
}
