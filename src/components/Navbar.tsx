import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { useContent } from '../context/ContentContext'
import { trackEvent } from '../utils/analytics'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Why Nixor', href: '#why-nixor' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const { content } = useContent()
  const { navbar } = content
  const [open, setOpen] = useState(false)

  const handleNavClick = (label: string) => {
    trackEvent({ action: 'nav_click', category: 'navigation', label })
    setOpen(false)
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-50 glass border-b border-slate-200/60 dark:border-slate-700/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-bg text-lg font-bold text-white">
            {navbar.brandName.charAt(0)}
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white">{navbar.brandName}</span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleNavClick(link.label)}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <a
            href="#pricing"
            className="rounded-lg gradient-bg px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-transform hover:scale-105"
          >
            {navbar.ctaButton}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="rounded-lg p-2 text-slate-600 dark:text-slate-300"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-200/60 bg-white px-4 py-4 lg:hidden dark:border-slate-700/60 dark:bg-slate-900">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.label)}
                className="text-sm font-medium text-slate-600 dark:text-slate-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pricing"
              className="rounded-lg gradient-bg px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              {navbar.ctaButton}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
