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
        {/* Centered title */}
        <div className="text-center mb-6">
          <h1 className="section-title">Bələdçi</h1>
          <p className="section-subtitle">Sifarişdən əvvəl bilməli olduğunuz hər şey</p>
        </div>

        {/* 3x2 Grid of Tab Buttons */}
        <div className="mb-8">
          <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto sm:grid-cols-3 md:grid-cols-6 md:max-w-none">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex flex-col items-center gap-1.5 px-3 py-3 rounded-2xl text-xs font-medium transition-all"
                  style={
                    isActive
                      ? {
                          background: 'linear-gradient(135deg, var(--accent), #a855f7)',
                          color: '#ffffff',
                          boxShadow: '0 0 20px color-mix(in srgb, var(--accent) 40%, transparent)',
                        }
                      : {
                          background: 'var(--bg-card)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-muted)',
                        }
                  }
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
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
