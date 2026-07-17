'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Edit2, Trash2, Save } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import type { Platform } from '@/lib/types'
import { AdminHeader, AdminButton, Field, TextInput, TextArea, Toggle, Modal, AdminLoading, AdminEmpty, Toast } from '@/components/admin/ui'

const emptyForm = { name: '', description: '', sort_order: 0, is_active: true }

export default function AdminPlatformsPage() {
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(''), 2500) }

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('platforms').select('*').order('sort_order', { ascending: true })
    setPlatforms((data as Platform[]) || [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const openNew = () => {
    setEditId(null)
    setForm({ ...emptyForm, sort_order: platforms.length + 1 })
    setModalOpen(true)
  }

  const openEdit = (p: Platform) => {
    setEditId(p.id)
    setForm({ name: p.name, description: p.description || '', sort_order: p.sort_order, is_active: p.is_active })
    setModalOpen(true)
  }

  const save = async () => {
    if (!form.name) { showToast('Platforma adı mütləqdir'); return }
    setSaving(true)
    const payload = {
      name: form.name.trim(),
      description: form.description || null,
      sort_order: Number(form.sort_order) || 0,
      is_active: form.is_active,
    }
    let err
    if (editId) {
      ({ error: err } = await supabase.from('platforms').update(payload).eq('id', editId))
    } else {
      ({ error: err } = await supabase.from('platforms').insert(payload))
    }
    setSaving(false)
    if (err) { showToast('Xəta: ' + err.message); return }
    setModalOpen(false)
    showToast(editId ? 'Platforma yeniləndi' : 'Platforma əlavə edildi')
    load()
  }

  const remove = async (id: string) => {
    if (!confirm('Bu platformanı silmək istədiyinizə əminsiniz? Ona aid ölkələr də silinəcək.')) return
    const { error } = await supabase.from('platforms').delete().eq('id', id)
    if (error) { showToast('Xəta: ' + error.message); return }
    showToast('Platforma silindi')
    load()
  }

  const toggleActive = async (p: Platform) => {
    setPlatforms(prev => prev.map(x => x.id === p.id ? { ...x, is_active: !x.is_active } : x))
    await supabase.from('platforms').update({ is_active: !p.is_active }).eq('id', p.id)
  }

  return (
    <div>
      <AdminHeader
        title="Platformalar"
        subtitle={`${platforms.length} platforma`}
        action={<AdminButton onClick={openNew}><Plus size={16} /> Yeni platforma</AdminButton>}
      />

      {loading ? <AdminLoading /> : platforms.length === 0 ? (
        <AdminEmpty text="Platforma yoxdur. Yeni platforma əlavə edin." />
      ) : (
        <div className="space-y-3">
          {platforms.map((p) => (
            <div key={p.id} className="theme-card p-5 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 style={{ color: 'var(--text-primary)' }} className="font-semibold">{p.name}</h3>
                  <span className="badge-accent">Sıra: {p.sort_order}</span>
                  {!p.is_active && <span className="badge-danger">Passiv</span>}
                </div>
                {p.description && <p style={{ color: 'var(--text-muted)' }} className="text-sm mt-1">{p.description}</p>}
              </div>
              <div className="flex items-center gap-3">
                <Toggle checked={p.is_active} onChange={() => toggleActive(p)} />
                <button onClick={() => openEdit(p)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}><Edit2 size={14} /></button>
                <button onClick={() => remove(p.id)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--danger-muted)', color: 'var(--danger)' }}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editId ? 'Platformanı redaktə et' : 'Yeni platforma'}
        footer={
          <>
            <AdminButton variant="ghost" onClick={() => setModalOpen(false)}>Ləğv et</AdminButton>
            <AdminButton onClick={save} loading={saving}><Save size={16} /> Yadda saxla</AdminButton>
          </>
        }
      >
        <Field label="Platforma adı">
          <TextInput value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="WhatsApp" />
        </Field>
        <Field label="Açıqlama">
          <TextArea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Qısa açıqlama" />
        </Field>
        <Field label="Sıralama nömrəsi">
          <TextInput type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
        </Field>
        <div className="flex items-center justify-between pt-2">
          <span style={{ color: 'var(--text-secondary)' }} className="text-sm">Saytda aktiv</span>
          <Toggle checked={form.is_active} onChange={() => setForm({ ...form, is_active: !form.is_active })} />
        </div>
      </Modal>

      <Toast message={toast} />
    </div>
  )
}
