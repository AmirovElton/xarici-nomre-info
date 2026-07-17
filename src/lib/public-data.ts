import { supabase } from '@/lib/supabase/client'
import type { Country, Platform, Review, FAQ, SiteSettings } from '@/lib/types'

/**
 * Public data helpers — read from Supabase using the anon client.
 * RLS policies allow public SELECT on active/approved rows.
 */

export async function fetchActivePlatforms(): Promise<Platform[]> {
  const { data, error } = await supabase
    .from('platforms')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
  if (error) return []
  return (data as Platform[]) || []
}

export async function fetchActiveCountries(): Promise<Country[]> {
  const { data, error } = await supabase
    .from('countries')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
  if (error) return []
  return (data as Country[]) || []
}

export async function fetchApprovedReviews(homeOnly = false): Promise<Review[]> {
  let query = supabase
    .from('reviews')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
  if (homeOnly) query = query.eq('show_on_home', true)
  const { data, error } = await query
  if (error) return []
  return (data as Review[]) || []
}

export async function fetchActiveFaqs(): Promise<FAQ[]> {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
  if (error) return []
  return (data as FAQ[]) || []
}

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  const { data, error } = await supabase.from('site_settings').select('*').limit(1)
  if (error || !data || data.length === 0) return null
  return data[0] as SiteSettings
}

// Default WhatsApp number fallback used when settings are not yet loaded.
export const DEFAULT_WHATSAPP = '994501234567'
