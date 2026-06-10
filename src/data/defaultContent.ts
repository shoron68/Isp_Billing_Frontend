export interface SectionHeader {
  badge: string
  title: string
  subtitle: string
}

export interface HeroContent {
  badge: string
  headline: string
  headlineHighlight: string
  subheadline: string
  ctaPrimary: string
  ctaSecondary: string
  trustNote1: string
  trustNote2: string
}

export interface FeatureItem {
  id: string
  title: string
  items: string[]
}

export interface WhyChooseItem {
  id: string
  title: string
  description: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface TestimonialItem {
  id: string
  name: string
  role: string
  content: string
  rating: number
}

export interface CTAContent {
  headline: string
  text: string
  buttonPrimary: string
  buttonSecondary: string
}

export interface NavbarContent {
  brandName: string
  ctaButton: string
}

export interface FooterContent {
  brandName: string
  description: string
  copyright: string
}

export interface PlanFeature {
  text: string
  included: boolean
}

export interface PricingPlan {
  id: string
  name: string
  audience: string
  monthlyPrice: number
  yearlyPrice: number
  description: string
  features: PlanFeature[]
  cta: string
  popular: boolean
}

export interface DashboardStat {
  label: string
  value: string
}

export interface DashboardTab {
  id: string
  label: string
  description: string
  imageUrl: string
  stats: DashboardStat[]
}

export interface ContactInfo {
  companyEmail: string
  supportEmail: string
  phone: string
  address: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  company: string
  subject: string
  message: string
  createdAt: string
  emailSent: boolean
}

export interface SiteContent {
  showTestimonials: boolean
  hero: HeroContent
  featuresHeader: SectionHeader
  features: FeatureItem[]
  whyChooseHeader: SectionHeader
  whyChoose: WhyChooseItem[]
  dashboardHeader: SectionHeader
  dashboardTabs: DashboardTab[]
  pricingHeader: SectionHeader
  pricing: PricingPlan[]
  testimonialsHeader: SectionHeader
  testimonials: TestimonialItem[]
  faqHeader: SectionHeader
  faq: FAQItem[]
  cta: CTAContent
  contactHeader: SectionHeader
  contact: ContactInfo
  navbar: NavbarContent
  footer: FooterContent
}

export const defaultContent: SiteContent = {
  showTestimonials: true,
  hero: {
    badge: 'Trusted by ISPs worldwide',
    headline: 'Complete ISP Billing &',
    headlineHighlight: 'Network Management',
    subheadline:
      'Automate billing, manage customers, monitor payments, control bandwidth, and grow your ISP business with Nixor.',
    ctaPrimary: 'Start Free Trial',
    ctaSecondary: 'Request Demo',
    trustNote1: 'No credit card required',
    trustNote2: '14-day free trial',
  },
  featuresHeader: {
    badge: 'Features',
    title: 'Everything You Need to Run Your ISP',
    subtitle:
      'Powerful tools designed specifically for Internet Service Providers to streamline operations and maximize revenue.',
  },
  features: [
    {
      id: 'customers',
      title: 'Customer Management',
      items: [
        'Manage unlimited customers',
        'Customer profiles',
        'Service activation/deactivation',
        'Customer history tracking',
      ],
    },
    {
      id: 'billing',
      title: 'Billing & Invoicing',
      items: [
        'Automated monthly billing',
        'Invoice generation',
        'Payment tracking',
        'Due notifications',
        'Late fee management',
      ],
    },
    {
      id: 'payments',
      title: 'Payment Collection',
      items: [
        'Online payment integration',
        'Mobile banking support',
        'Payment reports',
        'Transaction history',
      ],
    },
    {
      id: 'isp',
      title: 'ISP Management',
      items: [
        'Package creation',
        'Speed control',
        'Bandwidth management',
        'User authentication',
        'Connection monitoring',
      ],
    },
    {
      id: 'reports',
      title: 'Reports & Analytics',
      items: [
        'Revenue reports',
        'Customer reports',
        'Payment analytics',
        'Growth tracking dashboard',
      ],
    },
    {
      id: 'security',
      title: 'Security',
      items: [
        'Role-based access control',
        'Secure authentication',
        'Data backup',
        'Activity logs',
      ],
    },
  ],
  whyChooseHeader: {
    badge: 'Why Choose Nixor',
    title: 'Built for ISPs, Trusted by Operators',
    subtitle:
      'Join hundreds of ISPs who have transformed their billing and network management with Nixor.',
  },
  whyChoose: [
    {
      id: '1',
      title: 'Easy to Use Interface',
      description: 'Intuitive dashboard designed for ISP operators of all technical levels.',
    },
    {
      id: '2',
      title: 'Fast and Reliable',
      description: 'Built for performance with 99.9% uptime and sub-second response times.',
    },
    {
      id: '3',
      title: 'Automated Billing System',
      description: 'Set it once and let Nixor handle recurring invoices, reminders, and collections.',
    },
    {
      id: '4',
      title: 'Advanced Reporting',
      description: 'Real-time analytics and exportable reports to drive smarter business decisions.',
    },
    {
      id: '5',
      title: 'Scalable Architecture',
      description: 'From 50 to 50,000 customers — Nixor grows seamlessly with your ISP.',
    },
    {
      id: '6',
      title: '24/7 Support',
      description: 'Dedicated support team available around the clock to keep your business running.',
    },
  ],
  dashboardHeader: {
    badge: 'Dashboard Showcase',
    title: 'Powerful Dashboard for Complete Control',
    subtitle: 'Explore the intuitive interfaces that make managing your ISP effortless.',
  },
  dashboardTabs: [
    {
      id: 'admin',
      label: 'Admin Dashboard',
      description: 'Complete overview of your ISP operations at a glance.',
      imageUrl: '',
      stats: [
        { label: 'Active Users', value: '2,847' },
        { label: 'Monthly Revenue', value: '$48,250' },
        { label: 'Pending Invoices', value: '23' },
        { label: 'Network Uptime', value: '99.8%' },
      ],
    },
    {
      id: 'customers',
      label: 'Customer Management',
      description: 'Manage customer profiles, services, and connection history.',
      imageUrl: '',
      stats: [
        { label: 'Total Customers', value: '3,120' },
        { label: 'Active Services', value: '2,847' },
        { label: 'New This Month', value: '142' },
        { label: 'Churn Rate', value: '1.2%' },
      ],
    },
    {
      id: 'billing',
      label: 'Billing Panel',
      description: 'Automated invoicing, payment tracking, and due date management.',
      imageUrl: '',
      stats: [
        { label: 'Invoices Sent', value: '2,650' },
        { label: 'Collected', value: '$46,800' },
        { label: 'Overdue', value: '18' },
        { label: 'Collection Rate', value: '96.4%' },
      ],
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      description: 'Revenue trends, customer growth, and payment analytics.',
      imageUrl: '',
      stats: [
        { label: 'Revenue Growth', value: '+18%' },
        { label: 'Avg. Revenue/User', value: '$16.95' },
        { label: 'Payment Success', value: '97.2%' },
        { label: 'Customer LTV', value: '$408' },
      ],
    },
    {
      id: 'packages',
      label: 'Package Management',
      description: 'Create and manage internet packages with speed and bandwidth controls.',
      imageUrl: '',
      stats: [
        { label: 'Active Packages', value: '12' },
        { label: 'Most Popular', value: '50 Mbps' },
        { label: 'Avg. Speed', value: '35 Mbps' },
        { label: 'Bandwidth Used', value: '78%' },
      ],
    },
  ],
  pricingHeader: {
    badge: 'Pricing',
    title: 'Simple, Transparent Pricing',
    subtitle: 'Choose the plan that fits your ISP. All plans include a 14-day free trial.',
  },
  pricing: [
    {
      id: 'starter',
      name: 'Starter',
      audience: 'For Small ISPs',
      monthlyPrice: 49,
      yearlyPrice: 39,
      description: 'Perfect for small ISPs getting started with automated billing.',
      features: [
        { text: 'Up to 500 customers', included: true },
        { text: 'Automated billing', included: true },
        { text: 'Invoice generation', included: true },
        { text: 'Basic reports', included: true },
        { text: 'Email support', included: true },
        { text: 'Online payments', included: false },
        { text: 'Bandwidth management', included: false },
        { text: 'API access', included: false },
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      id: 'professional',
      name: 'Professional',
      audience: 'For Growing Businesses',
      monthlyPrice: 129,
      yearlyPrice: 99,
      description: 'Full-featured solution for growing ISP businesses.',
      features: [
        { text: 'Up to 5,000 customers', included: true },
        { text: 'Automated billing', included: true },
        { text: 'Invoice generation', included: true },
        { text: 'Advanced reports', included: true },
        { text: 'Priority support', included: true },
        { text: 'Online payments', included: true },
        { text: 'Bandwidth management', included: true },
        { text: 'API access', included: false },
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      audience: 'For Large ISP Networks',
      monthlyPrice: 299,
      yearlyPrice: 249,
      description: 'Enterprise-grade platform for large-scale ISP operations.',
      features: [
        { text: 'Unlimited customers', included: true },
        { text: 'Automated billing', included: true },
        { text: 'Invoice generation', included: true },
        { text: 'Custom reports', included: true },
        { text: '24/7 dedicated support', included: true },
        { text: 'Online payments', included: true },
        { text: 'Bandwidth management', included: true },
        { text: 'Full API access', included: true },
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ],
  testimonialsHeader: {
    badge: 'Testimonials',
    title: 'Loved by ISP Owners Worldwide',
    subtitle: 'See what network administrators and ISP owners say about Nixor.',
  },
  testimonials: [
    {
      id: '1',
      name: 'Ahmed Rahman',
      role: 'Owner, SpeedNet ISP',
      content:
        'Nixor transformed how we handle billing. What used to take our team 3 days now happens automatically. Our collection rate improved by 40% in the first month.',
      rating: 5,
    },
    {
      id: '2',
      name: 'Sarah Mitchell',
      role: 'Network Administrator, ConnectPro',
      content:
        'The bandwidth management and customer monitoring tools are exceptional. We can see exactly what is happening on our network in real time. Highly recommended.',
      rating: 5,
    },
    {
      id: '3',
      name: 'Raj Patel',
      role: 'CEO, FiberLink Broadband',
      content:
        'We migrated from a legacy billing system in under a week. The support team was incredible, and the reporting dashboard gives us insights we never had before.',
      rating: 5,
    },
    {
      id: '4',
      name: 'Maria Gonzalez',
      role: 'Operations Manager, NetWave ISP',
      content:
        'Managing 2,000+ customers used to be a nightmare. Nixor made it simple. The automated invoicing and payment tracking alone saved us 20 hours per week.',
      rating: 5,
    },
  ],
  faqHeader: {
    badge: 'FAQ',
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about Nixor.',
  },
  faq: [
    {
      id: '1',
      question: 'How does automated billing work?',
      answer:
        'Nixor automatically generates invoices based on your billing cycle, sends payment reminders, applies late fees when configured, and tracks all payment statuses. You set up your packages and billing rules once, and Nixor handles the rest.',
    },
    {
      id: '2',
      question: 'Can I manage multiple ISP packages?',
      answer:
        'Yes! Nixor supports unlimited internet packages with customizable speed limits, bandwidth caps, pricing tiers, and validity periods. You can assign different packages to different customers and modify them at any time.',
    },
    {
      id: '3',
      question: 'Does Nixor support online payments?',
      answer:
        'Absolutely. Nixor integrates with popular payment gateways and supports mobile banking. Customers can pay online through their portal, and payments are automatically recorded in the system.',
    },
    {
      id: '4',
      question: 'Is customer management included?',
      answer:
        'Customer management is a core feature of Nixor. You get unlimited customer profiles, service activation/deactivation, connection history, payment history, and detailed customer analytics — all included in every plan.',
    },
    {
      id: '5',
      question: 'Can I migrate from another billing system?',
      answer:
        'Yes, we provide migration tools and dedicated support to help you transfer your customer data, billing history, and package configurations from your existing system. Most migrations are completed within a week.',
    },
    {
      id: '6',
      question: 'Is my data secure with Nixor?',
      answer:
        'Security is our top priority. Nixor uses role-based access control, encrypted data transmission, regular automated backups, and comprehensive activity logs to keep your ISP data safe and compliant.',
    },
  ],
  cta: {
    headline: 'Ready to Simplify Your ISP Business?',
    text: 'Join ISPs using Nixor to automate billing and manage customers efficiently.',
    buttonPrimary: 'Get Started',
    buttonSecondary: 'Schedule Demo',
  },
  contactHeader: {
    badge: 'Contact',
    title: 'Get in Touch',
    subtitle:
      "Have questions? We'd love to hear from you. Send us a message and we'll respond within 24 hours.",
  },
  contact: {
    companyEmail: 'mr.shoron.7514@gmail.com',
    supportEmail: 'mr.shoron.7514@gmail.com',
    phone: '+1 (800) 555-NIXOR',
    address: '123 Tech Park Avenue, San Francisco, CA 94105',
  },
  navbar: {
    brandName: 'Nixor',
    ctaButton: 'Start Free Trial',
  },
  footer: {
    brandName: 'Nixor',
    description:
      'Complete ISP Billing & Network Management Solution. Automate billing, manage customers, and grow your ISP business.',
    copyright: 'Nixor. All rights reserved.',
  },
}

export const CONTENT_STORAGE_KEY = 'nixor-site-content'
export const MESSAGES_STORAGE_KEY = 'nixor-contact-messages'

export function mergeWithDefaults(stored: Partial<SiteContent>): SiteContent {
  return {
    ...defaultContent,
    ...stored,
    hero: { ...defaultContent.hero, ...stored.hero },
    featuresHeader: { ...defaultContent.featuresHeader, ...stored.featuresHeader },
    features: stored.features?.length ? stored.features : defaultContent.features,
    whyChooseHeader: { ...defaultContent.whyChooseHeader, ...stored.whyChooseHeader },
    whyChoose: stored.whyChoose?.length ? stored.whyChoose : defaultContent.whyChoose,
    dashboardHeader: { ...defaultContent.dashboardHeader, ...stored.dashboardHeader },
    dashboardTabs: stored.dashboardTabs?.length ? stored.dashboardTabs : defaultContent.dashboardTabs,
    pricingHeader: { ...defaultContent.pricingHeader, ...stored.pricingHeader },
    pricing: stored.pricing?.length ? stored.pricing : defaultContent.pricing,
    testimonialsHeader: { ...defaultContent.testimonialsHeader, ...stored.testimonialsHeader },
    testimonials: stored.testimonials?.length ? stored.testimonials : defaultContent.testimonials,
    faqHeader: { ...defaultContent.faqHeader, ...stored.faqHeader },
    faq: stored.faq?.length ? stored.faq : defaultContent.faq,
    cta: { ...defaultContent.cta, ...stored.cta },
    contactHeader: { ...defaultContent.contactHeader, ...stored.contactHeader },
    contact: { ...defaultContent.contact, ...stored.contact },
    navbar: { ...defaultContent.navbar, ...stored.navbar },
    footer: { ...defaultContent.footer, ...stored.footer },
    showTestimonials: stored.showTestimonials ?? defaultContent.showTestimonials,
  }
}
