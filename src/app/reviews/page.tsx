import { Metadata } from 'next'
import ReviewsClient from '@/components/reviews/ReviewsClient'

export const metadata: Metadata = {
  title: 'Müştəri Rəyləri - XariciNomrəAz',
  description: 'XariciNomrəAz müştərilərinin rəyləri və qiymətləndirmələri.',
}

export default function ReviewsPage() {
  return <ReviewsClient />
}
