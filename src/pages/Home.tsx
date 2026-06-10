import Hero from '../components/Hero'
import Features from '../components/Features'
import WhyChoose from '../components/WhyChoose'
import DashboardShowcase from '../components/DashboardShowcase'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import CTA from '../components/CTA'
import ContactForm from '../components/ContactForm'
import { useContent } from '../context/ContentContext'

export default function Home() {
  const { content } = useContent()

  return (
    <>
      <Hero />
      <Features />
      <WhyChoose />
      <DashboardShowcase />
      <Pricing />
      {content.showTestimonials && <Testimonials />}
      <FAQ />
      <CTA />
      <ContactForm />
    </>
  )
}
