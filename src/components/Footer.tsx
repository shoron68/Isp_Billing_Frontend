import { Link } from 'react-router-dom'
import { Globe, Mail, MessageCircle, Share2 } from 'lucide-react'
import { useContent } from '../context/ContentContext'

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Documentation', href: '#' },
  ],
  Company: [
    { label: 'About Nixor', href: '#' },
    { label: 'Contact', href: '#contact' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
}

const socialLinks = [
  { icon: Share2, href: '#', label: 'Twitter / X' },
  { icon: Globe, href: '#', label: 'LinkedIn' },
  { icon: MessageCircle, href: '#', label: 'Community' },
  { icon: Mail, href: '#', label: 'Email' },
]

export default function Footer() {
  const { content } = useContent()
  const { footer, contact } = content

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-bg text-lg font-bold text-white">
                {footer.brandName.charAt(0)}
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                {footer.brandName}
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {footer.description}
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.label === 'Email' ? `mailto:${contact.supportEmail}` : social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:hover:border-brand-600 dark:hover:text-brand-400"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-600 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row dark:border-slate-800">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} {footer.copyright}
          </p>
          <Link to="/admin" className="text-sm text-slate-500 hover:text-brand-600 dark:hover:text-brand-400">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
