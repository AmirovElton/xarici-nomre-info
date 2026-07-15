import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

// GET - Fetch active platforms
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('platforms')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch platforms' }, { status: 500 })
  }
}
