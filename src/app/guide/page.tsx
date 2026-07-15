import { Metadata } from 'next'
import GuideClient from '@/components/guide/GuideClient'

export const metadata: Metadata = {
  title: 'Bələdçi - XariciNomrəAz',
  description: 'Xarici virtual nömrələr haqqında tam bələdçi. İstifadə qaydaları, təhlükəsizlik, proses və FAQ.',
}

export default function GuidePage() {
  return <GuideClient />
}
