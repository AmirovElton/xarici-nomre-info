import type { Metadata } from 'next'
import './globals.css'
import SettingsProvider from '@/components/SettingsProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BottomNav from '@/components/layout/BottomNav'
import WhatsAppFloating from '@/components/ui/WhatsAppFloating'

export const metadata: Metadata = {
  title: 'XariciNomrəAz - Xarici Virtual Nömrələr Haqqında Məlumat',
  description: 'Xarici virtual nömrələr haqqında tam məlumat.',
  openGraph: { title: 'XariciNomrəAz', description: 'Sifarişdən əvvəl hər şeyi öyrənin.', type: 'website' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az">
      <body>
        <SettingsProvider>
          <Header />
          <main className="pt-20 pb-24 md:pb-8">{children}</main>
          <Footer />
          <BottomNav />
          <WhatsAppFloating />
        </SettingsProvider>
      </body>
    </html>
  )
}
