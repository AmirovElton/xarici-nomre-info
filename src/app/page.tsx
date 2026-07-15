import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import Warning from '@/components/home/Warning'
import HomeReviews from '@/components/home/HomeReviews'
import CTASection from '@/components/home/CTASection'

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      <Hero />
      <Features />
      <Warning />
      <HomeReviews />
      <CTASection />
    </div>
  )
}
