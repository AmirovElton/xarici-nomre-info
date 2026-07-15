import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function getWhatsAppUrl(phone: string, message: string): string {
  const encodedMessage = encodeURIComponent(message)
  const cleanPhone = phone.replace(/[^0-9]/g, '')
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)

  if (diffMins < 1) return 'İndicə'
  if (diffMins < 60) return `${diffMins} dəqiqə əvvəl`
  if (diffHours < 24) return `${diffHours} saat əvvəl`

  return date.toLocaleDateString('az-AZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function getStockColor(status: string): string {
  switch (status) {
    case 'in_stock': return 'bg-green-100 text-green-700 border-green-200'
    case 'low_stock': return 'bg-orange-100 text-orange-700 border-orange-200'
    case 'out_of_stock': return 'bg-red-100 text-red-700 border-red-200'
    case 'coming_soon': return 'bg-blue-100 text-blue-700 border-blue-200'
    case 'temporarily_unavailable': return 'bg-gray-100 text-gray-700 border-gray-200'
    case 'sales_stopped': return 'bg-red-100 text-red-800 border-red-300'
    default: return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}
