'use client'

import { AlertTriangle, XCircle, CheckCircle, Clock } from 'lucide-react'

const dontDoList = [
  'Çox sayda şəxsə mesaj göndərmək',
  'Kütləvi zəng etmək',
  'Çoxlu qrupa daxil olmaq',
  'Tanımadığınız şəxsləri ardıcıl əlavə etmək',
  'Eyni mətni çox sayda şəxsə göndərmək',
  'Reklam və spam mesajları göndərmək',
  'Profil məlumatlarını dəfələrlə dəyişmək',
  'Tez-tez cihaz dəyişmək',
  'VPN və IP ünvanını davamlı dəyişmək',
  'Hesabı başqa şəxslərlə paylaşmaq',
  'Avtomatlaşdırılmış proqramlardan istifadə etmək',
  'Çox sayda kanal və qrupa sürətlə qoşulmaq',
]

const doList = [
  'Profil şəklini əlavə etmək',
  'Ad və qısa məlumat bölməsini doldurmaq',
  'Bir neçə etibarlı kontaktla normal ünsiyyət qurmaq',
  'Hesabın aktivliyini tədricən artırmaq',
  'Platformanın xidmət şərtlərinə əməl etmək',
  'Eyni cihazdan istifadə etmək',
  'Hesabı normal insan davranışına uyğun istifadə etmək',
  'İki addımlı doğrulamanı aktiv etmək',
  'Şəxsi e-poçt ünvanını əlavə etmək',
]

export default function SafetySection() {
  return (
    <div className="space-y-6">
      {/* Warning Banner */}
      <div className="glass-card p-5 bg-amber-50/50 border-amber-200/50">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
            <Clock size={20} className="text-amber-600" />
          </div>
          <div>
            <h3 className="font-bold text-amber-800 mb-1">İlk 24 saat hesabın təhlükəsizliyi üçün vacibdir</h3>
            <p className="text-sm text-amber-700 leading-relaxed">
              Bu müddət mütləq zəmanət kimi yox, tövsiyə olunan minimum uyğunlaşma müddəti kimi nəzərdə tutulur. 
              İlk saatlarda edilən hərəkətlər hesabın gələcək stabilliyinə birbaşa təsir edə bilər.
            </p>
          </div>
        </div>
      </div>

      {/* Don't Do */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
            <XCircle size={16} className="text-red-600" />
          </div>
          <h3 className="font-bold text-gray-900">İlk 24 saat ərzində edilməməli olanlar</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {dontDoList.map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-red-50/50 border border-red-100">
              <XCircle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
              <span className="text-xs text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Do */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <CheckCircle size={16} className="text-green-600" />
          </div>
          <h3 className="font-bold text-gray-900">İlk 24 saat ərzində tövsiyə olunanlar</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {doList.map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-green-50/50 border border-green-100">
              <CheckCircle size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-xs text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Final Note */}
      <div className="glass-card p-4 bg-gray-50/50 border-gray-200/50">
        <div className="flex gap-3">
          <AlertTriangle size={16} className="text-gray-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-600 leading-relaxed">
            Heç bir nömrə və ya hesab üçün 100% bloklanmama zəmanəti verilmir. Hesabın təhlükəsizliyi 
            istifadə formasından, platformanın daxili yoxlamalarından və istifadəçinin davranışından asılıdır.
          </p>
        </div>
      </div>
    </div>
  )
}
