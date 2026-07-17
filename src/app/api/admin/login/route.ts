import { NextRequest, NextResponse } from 'next/server'

// Simple password-based admin login.
// Set ADMIN_PASSWORD in your environment variables.
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    const expected = process.env.ADMIN_PASSWORD

    if (!expected) {
      return NextResponse.json(
        { ok: false, error: 'ADMIN_PASSWORD environment dəyişəni təyin edilməyib.' },
        { status: 500 }
      )
    }

    if (typeof password !== 'string' || password !== expected) {
      return NextResponse.json({ ok: false, error: 'Parol yanlışdır.' }, { status: 401 })
    }

    // Return the password back as the session token used for subsequent API calls.
    return NextResponse.json({ ok: true, token: password })
  } catch {
    return NextResponse.json({ ok: false, error: 'Xəta baş verdi.' }, { status: 500 })
  }
}
