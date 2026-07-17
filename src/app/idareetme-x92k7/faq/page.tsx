'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Edit2, Trash2, Save } from 'lucide-react'
import { adminDb } from '@/lib/admin-api'
import type { FAQ } from '@/lib/types'
import { AdminHeader, AdminButton, Field, TextInput, TextArea, Toggle, Modal, AdminLoading, AdminEmpty, Toast } from '@/components/admin/ui'

const emptyForm = { question: '', answer: '', sort_order: 0, is_active: true }

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(''), 2500) }

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await adminDb<FAQ[]>({ action: 'select', table: 'faqs', order: { column: 'sort_order', ascending: true } })
    setFaqs(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const openNew = () => {
    setEditId(null)
    setForm({ ...emptyForm, sort_order: faqs.length + 1 })
    setModalOpen(true)
  }

  const openEdit = (f: FAQ) => {
    setEditId(f.id)
    setForm({ question: f.question, answer: f.answer, sort_order: f.sort_order, is_active: f.is_active })
    setModalOpen(true)
  }

  const save = async () => {
    if (!form.question || !form.answer) { showToast('Sual və cavab mütləqdir'); return }
    setSaving(true)
    const values = {
      question: form.question.trim(),
      answer: form.answer.trim(),
      sort_order: Number(form.sort_order) || 0,
      is_active: form.is_active,
    }
    const res = editId
      ? await adminDb({ action: 'update', table: 'faqs', values, match: { id: editId } })
      : await adminDb({ action: 'insert', table: 'faqs', values })
    setSaving(false)
    if (res.error) { showToast('Xəta: ' + res.error.message); return }
    setModalOpen(false)
    showToast(editId ? 'Sual yeniləndi' : 'Sual əlavə edildi')
    load()
  }

  const remove = async (id: string) => {
    if (!confirm('Bu sualı silmək istədiyinizə əminsiniz?')) return
    const res = await adminDb({ action: 'delete', table: 'faqs', match: { id } })
    if (res.error) { showToast('Xəta: ' + res.error.message); return }
    showToast('Sual silindi')
    load()
  }

  const toggleActive = async (f: FAQ) => {
    setFaqs(prev => prev.map(x => x.id === f.id ? { ...x, is_active: !x.is_active } : x))
    await adminDb({ action: 'update', table: 'faqs', values: { is_active: !f.is_active }, match: { id: f.id } })
  }

  return (
    <div>
      <AdminHeader
        title="FAQ"
        subtitle={`${faqs.length} sual`}
        action={<AdminButton onClick={openNew}><Plus size={16} /> Yeni sual</AdminButton>}
      />

      {loading ? <AdminLoading /> : faqs.length === 0 ? (
        <AdminEmpty text="Sual yoxdur. Yeni sual əlavə edin." />
      ) : (
        <div className="space-y-3">
          {faqs.map((f) => (
            <div key={f.id} className="theme-card p-5">
              <div className="flex items-start gap-3">
                <span style={{ color: 'var(--text-faint)' }} className="text-xs font-mono mt-1">#{f.sort_order}</span>
                <div className="flex-1 min-w-0">
                  <h3 style={{ color: 'var(--text-primary)' }} className="font-medium text-sm">{f.question}</h3>
                  <p style={{ color: 'var(--text-muted)' }} className="text-xs mt-1 line-clamp-2">{f.answer}</p>
                  {!f.is_active && <span className="badge-danger mt-2 inline-block">Passiv</span>}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Toggle checked={f.is_active} onChange={() => toggleActive(f)} />
                  <button onClick={() => openEdit(f)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-muted)', color: 'var(--accent)' }}><Edit2 size={14} /></button>
                  <button onClick={() => remove(f.id)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--danger-muted)', color: 'var(--danger)' }}><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editId ? 'Sualı redaktə et' : 'Yeni sual'}
        footer={
          <>
            <AdminButton variant="ghost" onClick={() => setModalOpen(false)}>Ləğv et</AdminButton>
            <AdminButton onClick={save} loading={saving}><Save size={16} /> Yadda saxla</AdminButton>
          </>
        }
      >
        <Field label="Sual">
          <TextInput value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} placeholder="Sual mətni" />
        </Field>
        <Field label="Cavab">
          <TextArea rows={4} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} placeholder="Cavab mətni" />
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
