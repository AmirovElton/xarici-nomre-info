'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2, GripVertical, ToggleLeft, ToggleRight } from 'lucide-react'

const initialFaqs = [
  { id: '1', question: 'Xarici virtual nömrə nədir?', answer: 'Xarici virtual nömrə fiziki SIM kartın...', active: true, order: 1 },
  { id: '2', question: 'Nömrəni neçə dəqiqəyə əldə edirəm?', answer: 'Ödəniş təsdiqləndikdən sonra...', active: true, order: 2 },
  { id: '3', question: 'Nömrə hansı platformalarda işləyir?', answer: 'Hər nömrə konkret platforma üçün...', active: true, order: 3 },
  { id: '4', question: 'Kod gəlməsə nə baş verir?', answer: 'Əgər SMS kodu müəyyən müddət...', active: true, order: 4 },
  { id: '5', question: 'Hesab bloklana bilərmi?', answer: 'Hər bir platforma öz qaydalarına...', active: true, order: 5 },
  { id: '6', question: 'VPN istifadə etmək olar?', answer: 'Bəzi platformalar VPN istifadəsini...', active: true, order: 6 },
]

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState(initialFaqs)

  const toggleActive = (id: string) => {
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, active: !f.active } : f))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQ</h1>
          <p className="text-sm text-gray-500">{faqs.length} sual</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
          <Plus size={16} /> Yeni sual
        </button>
      </div>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-start gap-3">
              <button className="text-gray-300 hover:text-gray-500 cursor-grab mt-1">
                <GripVertical size={16} />
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-400 font-mono">#{faq.order}</span>
                  <h3 className="font-medium text-gray-900 text-sm">{faq.question}</h3>
                </div>
                <p className="text-xs text-gray-500 line-clamp-1">{faq.answer}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleActive(faq.id)}
                  className={faq.active ? 'text-green-500' : 'text-gray-300'}
                >
                  {faq.active ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                </button>
                <button className="p-1.5 rounded-lg hover:bg-indigo-50 text-indigo-600">
                  <Edit2 size={14} />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-600">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
