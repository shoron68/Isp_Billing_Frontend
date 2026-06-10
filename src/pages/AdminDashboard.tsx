import { useState } from 'react'
import AdminLayout, { type AdminTab } from '../components/admin/AdminLayout'
import HeroEditor from '../components/admin/HeroEditor'
import FeaturesEditor from '../components/admin/FeaturesEditor'
import WhyChooseEditor from '../components/admin/WhyChooseEditor'
import DashboardImageEditor from '../components/admin/DashboardImageEditor'
import PricingEditor from '../components/admin/PricingEditor'
import OwnServerEditor from '../components/admin/OwnServerEditor'
import FAQEditor from '../components/admin/FAQEditor'
import CTAEditor from '../components/admin/CTAEditor'
import GeneralEditor from '../components/admin/GeneralEditor'
import ContactSettings from '../components/admin/ContactSettings'
import MessagesInbox from '../components/admin/MessagesInbox'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('hero')

  const renderTab = () => {
    switch (activeTab) {
      case 'hero':
        return <HeroEditor />
      case 'features':
        return <FeaturesEditor />
      case 'whyChoose':
        return <WhyChooseEditor />
      case 'dashboard':
        return <DashboardImageEditor />
      case 'pricing':
        return <PricingEditor />
      case 'ownServer':
        return <OwnServerEditor />
      case 'faq':
        return <FAQEditor />
      case 'cta':
        return <CTAEditor />
      case 'general':
        return <GeneralEditor />
      case 'contact':
        return <ContactSettings />
      case 'messages':
        return <MessagesInbox />
      default:
        return <HeroEditor />
    }
  }

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTab()}
    </AdminLayout>
  )
}
