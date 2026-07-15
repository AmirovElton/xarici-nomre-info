import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

// GET - Fetch approved reviews
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

// POST - Submit new review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, platform, country, rating, message } = body

    // Validation
    if (!name || !platform || !rating || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be 1-5' }, { status: 400 })
    }

    // Basic spam filter
    const urlPattern = /(https?:\/\/[^\s]+)/g
    const phonePattern = /(\+?\d{10,})/g
    if (urlPattern.test(message) || phonePattern.test(message)) {
      return NextResponse.json({ error: 'Links and phone numbers are not allowed' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        name: name.trim(),
        platform,
        country: country?.trim() || null,
        rating,
        message: message.trim(),
        status: 'pending',
      })
      .select()

    if (error) throw error
    return NextResponse.json({ success: true, message: 'Review submitted' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 })
  }
}
