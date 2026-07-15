import { Metadata } from 'next'
import PremiumClient from '@/components/premium/PremiumClient'

export const metadata: Metadata = {
  title: 'Stabil və Premium Seçimlər - XariciNomrəAz',
  description: 'Uzunmüddətli istifadə üçün daha stabil, premium keyfiyyətli xarici virtual nömrələr.',
}

export default function PremiumPage() {
  return <PremiumClient />
}
