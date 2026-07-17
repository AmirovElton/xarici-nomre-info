'use client'

const TOKEN_KEY = 'xn_admin_token'

export function setAdminToken(token: string) {
  if (typeof window !== 'undefined') sessionStorage.setItem(TOKEN_KEY, token)
}
export function getAdminToken(): string {
  if (typeof window === 'undefined') return ''
  return sessionStorage.getItem(TOKEN_KEY) || ''
}
export function clearAdminToken() {
  if (typeof window !== 'undefined') sessionStorage.removeItem(TOKEN_KEY)
}

export async function adminLogin(password: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    const json = await res.json()
    if (json.ok && json.token) {
      setAdminToken(json.token)
      return { ok: true }
    }
    return { ok: false, error: json.error || 'Parol yanlışdır.' }
  } catch {
    return { ok: false, error: 'Serverə qoşulmaq mümkün olmadı.' }
  }
}

interface DbOptions {
  action: 'select' | 'insert' | 'update' | 'delete'
  table: string
  values?: Record<string, unknown>
  match?: Record<string, unknown>
  order?: { column: string; ascending?: boolean }
  single?: boolean
}

export async function adminDb<T = unknown>(opts: DbOptions): Promise<{ data: T | null; error: { message: string } | null }> {
  try {
    const res = await fetch('/api/admin/db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': getAdminToken() },
      body: JSON.stringify(opts),
    })
    return await res.json()
  } catch {
    return { data: null, error: { message: 'Şəbəkə xətası.' } }
  }
}
