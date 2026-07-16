import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BottomNav from '@/components/layout/BottomNav'
import WhatsAppFloating from '@/components/ui/WhatsAppFloating'

export const metadata: Metadata = {
  title: 'XariciNomrəAz - Xarici Virtual Nömrələr Haqqında Məlumat',
  description: 'Xarici virtual nömrələr haqqında tam məlumat. Platformanıza uyğun ölkələri, aktual stok vəziyyətini, istifadə qaydalarını və təhlükəsizlik tövsiyələrini öyrənin.',
  keywords: 'xarici nömrə, virtual nömrə, whatsapp nömrə, telegram nömrə, xarici sim',
  openGraph: {
    title: 'XariciNomrəAz - Xarici Virtual Nömrələr',
    description: 'Sifarişdən əvvəl hər şeyi öyrənin. Platformaya uyğun ölkələr, stok vəziyyəti və istifadə qaydaları.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="az">
      <body className="gradient-bg min-h-screen overflow-x-hidden">
        <Header />
        <main className="pt-20 pb-24 md:pb-8">
          {children}
        </main>
        <Footer />
        <BottomNav />
        <WhatsAppFloating />
      </body>
    </html>
  )
}
