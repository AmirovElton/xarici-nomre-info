import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

// GET - Fetch active countries with optional platform filter
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const platformId = searchParams.get('platform_id')

    let query = supabase
      .from('countries')
      .select('*, platforms(name, icon)')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (platformId) {
      query = query.eq('platform_id', platformId)
    }

    const { data, error } = await query

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch countries' }, { status: 500 })
  }
}
