import { Metadata } from 'next'
import NumbersClient from '@/components/numbers/NumbersClient'

export const metadata: Metadata = {
  title: 'Nömrələr - XariciNomrəAz',
  description: 'Platformanıza uyğun xarici virtual nömrələri, aktual stok vəziyyətini və ölkə seçimlərini görün.',
}

export default function NumbersPage() {
  return <NumbersClient />
}
