'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Edit2, Trash2, MinusCircle, PlusCircle, Search, Save } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { STOCK_STATUS_MAP, type StockStatus, type Country, type Platform } from '@/lib/types'
import { AdminHeader, AdminButton, Field, TextInput, TextArea, Select, Toggle, Modal, AdminLoading, AdminEmpty, Toast } from '@/components/admin/ui'

const STATUS_OPTIONS: StockStatus[] = ['in_stock', 'low_stock', 'out_of_stock', 'coming_soon', 'temporarily_unavailable', 'sales_stopped']

const emptyForm = {
  platform_id: '',
  name: '',
  flag: '🏳️',
  country_code: '',
  stock_count: 0,
  stock_status: 'in_stock' as StockStatus,
  price: '',
  show_price: true,
  quality_level: 'Standart',
  stability_level: 'Orta',
  is_premium: false,
  is_popular: false,
  recommended_use: '',
  short_description: '',
  is_active: true,
}

export default function AdminCountriesPage() {
  const [countries, setCountries] = useState<Country[]>([])
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterPlatform, setFilterPlatform] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(''), 2500) }

  const load = useCallback(async () => {
    setLoading(true)
    const [{ data: c }, { data: p }] = await Promise.all([
      supabase.from('countries').select('*').order('sort_order', { ascending: true }),
      supabase.from('platforms').select('*').order('sort_order', { ascending: true }),
    ])
    setCountries((c as Country[]) || [])
    setPlatforms((p as Platform[]) || [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const platformName = (id: string) => platforms.find(p => p.id === id)?.name || '—'

  const filtered = countries.filter(c => {
    const s = search.toLowerCase()
    const matchSearch = c.name.toLowerCase().includes(s) || c.country_code.includes(search)
    const matchPlatform = filterPlatform === 'all' || c.platform_id === filterPlatform
    return matchSearch && matchPlatform
  })

  const openNew = () => {
    setEditId(null)
    setForm({ ...emptyForm, platform_id: platforms[0]?.id || '' })
    setModalOpen(true)
  }

  const openEdit = (c: Country) => {
    setEditId(c.id)
    setForm({
      platform_id: c.platform_id,
      name: c.name,
      flag: c.flag,
      country_code: c.country_code,
      stock_count: c.stock_count,
      stock_status: c.stock_status,
      price: c.price != null ? String(c.price) : '',
      show_price: c.show_price,
      quality_level: c.quality_level,
      stability_level: c.stability_level || '',
      is_premium: c.is_premium,
      is_popular: c.is_popular,
      recommended_use: c.recommended_use || '',
      short_description: c.short_description || '',
      is_active: c.is_active,
    })
    setModalOpen(true)
  }

  const save = async () => {
    if (!form.name || !form.country_code || !form.platform_id) {
      showToast('Ad, kod və platforma mütləqdir')
      return
    }
    setSaving(true)
    const payload = {
      platform_id: form.platform_id,
      name: form.name.trim(),
      flag: form.flag.trim() || '🏳️',
      country_code: form.country_code.trim(),
      stock_count: Number(form.stock_count) || 0,
      stock_status: form.stock_status,
      price: form.price === '' ? null : Number(form.price),
      show_price: form.show_price,
      quality_level: form.quality_level,
      stability_level: form.stability_level || null,
      is_premium: form.is_premium,
      is_popular: form.is_popular,
      recommended_use: form.recommended_use || null,
      short_description: form.short_description || null,
      is_active: form.is_active,
    }
    let err
    if (editId) {
      ({ error: err } = await supabase.from('countries').update(payload).eq('id', editId))
    } else {
      ({ error: err } = await supabase.from('countries').insert(payload))
    }
    setSaving(false)
    if (err) { showToast('Xəta: ' + err.message); return }
    setModalOpen(false)
    showToast(editId ? 'Ölkə yeniləndi' : 'Ölkə əlavə edildi')
    load()
  }

  const remove = async (id: string) => {
    if (!confirm('Bu ölkəni silmək istədiyinizə əminsiniz?')) return
    const { error } = await supabase.from('countries').delete().eq('id', id)
    if (error) { showToast('Xəta: ' + error.message); return }
    showToast('Ölkə silindi')
    load()
  }

  // Quick stock adjust (persists immediately)
  const adjustStock = async (c: Country, delta: number) => {
    const newStock = Math.max(0, c.stock_count + delta)
    let status = c.stock_status
    if (newStock === 0) status = 'out_of_stock'
    else if (newStock <= 2) status = 'low_stock'
    else status = 'in_stock'
    setCountries(prev => prev.map(x => x.id === c.id ? { ...x, stock_count: newStock, stock_status: status } : x))
    await supabase.from('countries').update({ stock_count: newStock, stock_status: status }).eq('id', c.id)
  }

  return (
    <div>
      <AdminHeader
        title="Ölkələr"
        subtitle={`${countries.length} ölkə`}
        action={<AdminButton onClick={openNew}><Plus size={16} /> Yeni ölkə</AdminButton>}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-faint)' }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Axtar..." className="theme-input" style={{ paddingLeft: '2.25rem' }} />
        </div>
        <select value={filterPlatform} onChange={(e) => setFilterPlatform(e.target.value)} className="theme-input sm:max-w-[220px]">
          <option value="all">Bütün platformalar</option>
          {platforms.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      {loading ? <AdminLoading /> : filtered.length === 0 ? (
        <AdminEmpty text="Ölkə tapılmadı. Yeni ölkə əlavə edin." />
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => (
            <div key={c.id} className="theme-card p-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-2xl">{c.flag}</span>
                <div className="flex-1 min-w-[140px]">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span style={{ color: 'var(--text-primary)' }} className="font-semibold">{c.name}</span>
                    <span style={{ color: 'var(--text-muted)' }} className="text-xs">{c.country_code}</span>
                    <span className="badge-accent">{platformName(c.platform_id)}</span>
                    {c.is_premium && <span className="badge-warning">Premium</span>}
                    <span className={STOCK_STATUS_MAP[c.stock_status].color}>{STOCK_STATUS_MAP[c.stock_status].label}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs" style={{ color: 'var(--text-faint)' }}>
                    {c.show_price && c.price != null ? <span style={{ color: 'var(--success)' }}>{c.price} AZN</span> : <span>Qiymət gizli</span>}
                    <span>·</span>
                    <span>{c.quality_level}</span>
                  </div>
                </div>

                {/* Quick stock */}
                <div className="flex items-center gap-2">
                  <button onClick={() => adjustStock(c, -1)} style={{ color: 'var(--danger)' }}><MinusCircle size={18} /></button>
                  <span style={{ color: 'var(--text-primary)' }} className="font-bold w-6 text-center">{c.stock_count}</span>
                  <button onClick={() => adjustStock(c, 1)} style={{ color: 'var(--success)' }}><PlusCircle size={18} /></button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(c)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}><Edit2 size={14} /></button>
                  <button onClick={() => remove(c.id)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--danger-muted)', color: 'var(--danger)' }}><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editId ? 'Ölkəni redaktə et' : 'Yeni ölkə'}
        footer={
          <>
            <AdminButton variant="ghost" onClick={() => setModalOpen(false)}>Ləğv et</AdminButton>
            <AdminButton onClick={save} loading={saving}><Save size={16} /> Yadda saxla</AdminButton>
          </>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          <Field label="Platforma">
            <Select value={form.platform_id} onChange={(e) => setForm({ ...form, platform_id: e.target.value })}>
              {platforms.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </Select>
          </Field>
          <Field label="Bayraq (emoji)">
            <TextInput value={form.flag} onChange={(e) => setForm({ ...form, flag: e.target.value })} placeholder="🇹🇷" />
          </Field>
          <Field label="Ölkə adı">
            <TextInput value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Türkiyə" />
          </Field>
          <Field label="Ölkə kodu">
            <TextInput value={form.country_code} onChange={(e) => setForm({ ...form, country_code: e.target.value })} placeholder="+90" />
          </Field>
          <Field label="Stok sayı">
            <TextInput type="number" value={form.stock_count} onChange={(e) => setForm({ ...form, stock_count: Number(e.target.value) })} />
          </Field>
          <Field label="Stok statusu">
            <Select value={form.stock_status} onChange={(e) => setForm({ ...form, stock_status: e.target.value as StockStatus })}>
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{STOCK_STATUS_MAP[s].label}</option>)}
            </Select>
          </Field>
          <Field label="Qiymət (AZN)">
            <TextInput type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Boş = gizli" />
          </Field>
          <Field label="Keyfiyyət səviyyəsi">
            <Select value={form.quality_level} onChange={(e) => setForm({ ...form, quality_level: e.target.value })}>
              <option>Standart</option>
              <option>Premium</option>
            </Select>
          </Field>
          <Field label="Stabillik">
            <Select value={form.stability_level} onChange={(e) => setForm({ ...form, stability_level: e.target.value })}>
              <option value="">—</option>
              <option>Orta</option>
              <option>Yüksək</option>
            </Select>
          </Field>
          <Field label="Tövsiyə olunan istifadə">
            <TextInput value={form.recommended_use} onChange={(e) => setForm({ ...form, recommended_use: e.target.value })} placeholder="Şəxsi istifadə" />
          </Field>
        </div>

        <Field label="Qısa açıqlama">
          <TextArea rows={2} value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} />
        </Field>

        {/* Toggles */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span style={{ color: 'var(--text-secondary)' }} className="text-sm">Qiyməti göstər</span>
            <Toggle checked={form.show_price} onChange={() => setForm({ ...form, show_price: !form.show_price })} />
          </div>
          <div className="flex items-center justify-between">
            <span style={{ color: 'var(--text-secondary)' }} className="text-sm">Premium nömrə</span>
            <Toggle checked={form.is_premium} onChange={() => setForm({ ...form, is_premium: !form.is_premium })} />
          </div>
          <div className="flex items-center justify-between">
            <span style={{ color: 'var(--text-secondary)' }} className="text-sm">Ən çox seçilən (populyar)</span>
            <Toggle checked={form.is_popular} onChange={() => setForm({ ...form, is_popular: !form.is_popular })} />
          </div>
          <div className="flex items-center justify-between">
            <span style={{ color: 'var(--text-secondary)' }} className="text-sm">Saytda aktiv</span>
            <Toggle checked={form.is_active} onChange={() => setForm({ ...form, is_active: !form.is_active })} />
          </div>
        </div>
      </Modal>

      <Toast message={toast} />
    </div>
  )
}
