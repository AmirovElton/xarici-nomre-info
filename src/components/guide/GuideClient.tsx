'use client'

import { useState } from 'react'
import { BookOpen, Zap, Shield, MessageCircle, Send, HelpCircle } from 'lucide-react'
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
        <div className="text-center mb-6">
          <h1 className="section-title">Bələdçi</h1>
          <p className="section-subtitle">Sifarişdən əvvəl bilməli olduğunuz hər şey</p>
        </div>

        {/* Grid tabs - no scroll */}
        <div className="mb-8">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex flex-col items-center gap-1.5 px-3 py-3 rounded-2xl text-xs font-medium transition-all"
                  style={{
                    background: isActive ? 'linear-gradient(135deg, var(--accent), #6366f1)' : 'var(--bg-card)',
                    border: `1px solid ${isActive ? 'transparent' : 'var(--border-default)'}`,
                    color: isActive ? 'white' : 'var(--text-muted)',
                    boxShadow: isActive ? 'var(--shadow-glow)' : 'none',
                  }}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

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
