import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

// Tables the admin panel is allowed to manage.
const ALLOWED_TABLES = ['countries', 'platforms', 'faqs', 'reviews', 'site_settings', 'info_articles']

interface DbRequest {
  action: 'select' | 'insert' | 'update' | 'delete'
  table: string
  values?: Record<string, unknown>
  match?: Record<string, unknown>
  order?: { column: string; ascending?: boolean }
  single?: boolean
}

export async function POST(request: NextRequest) {
  // --- Auth check ---
  const token = request.headers.get('x-admin-token')
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) {
    return NextResponse.json({ data: null, error: { message: 'ADMIN_PASSWORD təyin edilməyib.' } }, { status: 500 })
  }
  if (token !== expected) {
    return NextResponse.json({ data: null, error: { message: 'İcazə yoxdur.' } }, { status: 401 })
  }

  let body: DbRequest
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ data: null, error: { message: 'Yanlış sorğu.' } }, { status: 400 })
  }

  const { action, table, values, match, order, single } = body

  if (!ALLOWED_TABLES.includes(table)) {
    return NextResponse.json({ data: null, error: { message: 'Bu cədvələ icazə yoxdur.' } }, { status: 400 })
  }

  const supabase = createServerClient()

  try {
    if (action === 'select') {
      let query = supabase.from(table).select('*')
      if (order) query = query.order(order.column, { ascending: order.ascending ?? true })
      if (single) {
        const { data, error } = await query.single()
        return NextResponse.json({ data, error })
      }
      const { data, error } = await query
      return NextResponse.json({ data, error })
    }

    if (action === 'insert') {
      const { data, error } = await supabase.from(table).insert(values!).select()
      return NextResponse.json({ data, error })
    }

    if (action === 'update') {
      let query = supabase.from(table).update(values!)
      for (const [k, v] of Object.entries(match || {})) query = query.eq(k, v as string)
      const { data, error } = await query.select()
      return NextResponse.json({ data, error })
    }

    if (action === 'delete') {
      let query = supabase.from(table).delete()
      for (const [k, v] of Object.entries(match || {})) query = query.eq(k, v as string)
      const { data, error } = await query.select()
      return NextResponse.json({ data, error })
    }

    return NextResponse.json({ data: null, error: { message: 'Naməlum əməliyyat.' } }, { status: 400 })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Server xətası'
    return NextResponse.json({ data: null, error: { message: msg } }, { status: 500 })
  }
}
