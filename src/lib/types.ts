export interface Platform {
  id: string
  name: string
  icon: string
  description: string | null
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Country {
  id: string
  platform_id: string
  platform?: Platform
  name: string
  flag: string
  country_code: string
  stock_count: number
  stock_status: StockStatus
  price: number | null
  show_price: boolean
  number_type: string | null
  quality_level: string
  stability_level: string | null
  is_premium: boolean
  is_popular: boolean
  recommended_use: string | null
  short_description: string | null
  detailed_description: string | null
  is_active: boolean
  sort_order: number
  last_updated: string
  created_at: string
  updated_at: string
}

export type StockStatus =
  | 'in_stock'
  | 'low_stock'
  | 'out_of_stock'
  | 'coming_soon'
  | 'temporarily_unavailable'
  | 'sales_stopped'

export interface Review {
  id: string
  name: string
  platform: string
  country: string | null
  rating: number
  message: string
  status: ReviewStatus
  is_featured: boolean
  show_on_home: boolean
  created_at: string
  updated_at: string
}

export type ReviewStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'spam'
  | 'deleted'

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string | null
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface InfoArticle {
  id: string
  title: string
  content: string
  category: string | null
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface SiteSettings {
  id: string
  site_name: string
  slogan: string
  hero_title: string
  hero_subtitle: string
  whatsapp_number: string
  instagram_url: string | null
  telegram_url: string | null
  email: string | null
  working_hours: string | null
  footer_text: string
  warning_text: string | null
  privacy_policy: string | null
  terms_conditions: string | null
  default_whatsapp_message: string
  primary_color: string
  updated_at: string
}

export interface AdminActivity {
  id: string
  admin_id: string
  action: string
  details: string | null
  ip_address: string | null
  created_at: string
}

export const STOCK_STATUS_MAP: Record<StockStatus, { label: string; color: string }> = {
  in_stock: { label: 'Stokda var', color: 'text-green-600 bg-green-50 border-green-200' },
  low_stock: { label: 'Az qalıb', color: 'text-orange-600 bg-orange-50 border-orange-200' },
  out_of_stock: { label: 'Stokda yoxdur', color: 'text-red-600 bg-red-50 border-red-200' },
  coming_soon: { label: 'Yaxın zamanda', color: 'text-blue-600 bg-blue-50 border-blue-200' },
  temporarily_unavailable: { label: 'Müvəqqəti mövcud deyil', color: 'text-gray-600 bg-gray-50 border-gray-200' },
  sales_stopped: { label: 'Satış dayandırılıb', color: 'text-red-700 bg-red-50 border-red-300' },
}
