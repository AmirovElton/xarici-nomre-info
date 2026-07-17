'use client'

import { X, Loader2 } from 'lucide-react'
import { useEffect } from 'react'

/* ---------- Page Header ---------- */
export function AdminHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
      <div>
        <h1 style={{ color: 'var(--text-primary)' }} className="text-2xl font-bold">{title}</h1>
        {subtitle && <p style={{ color: 'var(--text-muted)' }} className="text-sm mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

/* ---------- Primary Button ---------- */
export function AdminButton({
  children, onClick, type = 'button', variant = 'primary', loading, disabled, className = '',
}: {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'ghost' | 'danger'
  loading?: boolean
  disabled?: boolean
  className?: string
}) {
  const base = 'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed'
  const style: React.CSSProperties =
    variant === 'primary'
      ? { background: 'linear-gradient(135deg, var(--accent), #6366f1)', color: '#fff' }
      : variant === 'danger'
      ? { background: 'var(--danger-muted)', color: 'var(--danger)', border: '1px solid color-mix(in srgb, var(--danger) 20%, transparent)' }
      : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-default)' }
  return (
    <button type={type} onClick={onClick} disabled={disabled || loading} className={`${base} ${className}`} style={style}>
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  )
}

/* ---------- Field (label + input/select/textarea) ---------- */
export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ color: 'var(--text-secondary)' }} className="text-sm font-medium mb-1 block">{label}</label>
      {children}
    </div>
  )
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="theme-input" />
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className="theme-input resize-none" />
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className="theme-input" />
}

/* ---------- Toggle ---------- */
export function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="w-11 h-6 rounded-full relative transition-colors flex-shrink-0"
      style={{ background: checked ? 'var(--accent)' : 'var(--bg-secondary)', border: '1px solid var(--border-default)' }}
    >
      <span
        className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform"
        style={{ left: '2px', transform: checked ? 'translateX(20px)' : 'translateX(0)' }}
      />
    </button>
  )
}

/* ---------- Modal ---------- */
export function Modal({ open, onClose, title, children, footer }: {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg rounded-3xl max-h-[90vh] overflow-y-auto animate-slide-up"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-lg)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="sticky top-0 flex items-center justify-between p-5 z-10"
          style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-subtle)' }}
        >
          <h3 style={{ color: 'var(--text-primary)' }} className="font-bold text-lg">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-5 space-y-4">{children}</div>
        {footer && (
          <div
            className="sticky bottom-0 flex items-center justify-end gap-3 p-5"
            style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-subtle)' }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------- Empty / Loading states ---------- */
export function AdminLoading() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 size={24} className="animate-spin" style={{ color: 'var(--accent)' }} />
    </div>
  )
}

export function AdminEmpty({ text }: { text: string }) {
  return (
    <div className="theme-card p-12 text-center">
      <p style={{ color: 'var(--text-muted)' }} className="text-sm">{text}</p>
    </div>
  )
}

export function Toast({ message }: { message: string }) {
  if (!message) return null
  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] px-5 py-3 rounded-2xl text-sm font-medium animate-slide-up"
      style={{ background: 'var(--success)', color: '#04210f', boxShadow: 'var(--shadow-lg)' }}
    >
      {message}
    </div>
  )
}
