'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { fetchSiteSettings, DEFAULT_WHATSAPP } from '@/lib/public-data'
import type { SiteSettings } from '@/lib/types'

interface SettingsContextValue {
  settings: SiteSettings | null
  whatsapp: string
  loaded: boolean
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: null,
  whatsapp: DEFAULT_WHATSAPP,
  loaded: false,
})

export function useSettings() {
  return useContext(SettingsContext)
}

export default function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetchSiteSettings().then((s) => {
      setSettings(s)
      setLoaded(true)
    })
  }, [])

  const whatsapp = settings?.whatsapp_number || DEFAULT_WHATSAPP

  return (
    <SettingsContext.Provider value={{ settings, whatsapp, loaded }}>
      {children}
    </SettingsContext.Provider>
  )
}
