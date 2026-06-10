import { Link, useNavigate } from 'react-router-dom'
import {
  DollarSign,
  Server,
  ExternalLink,
  HelpCircle,
  Home,
  Image,
  Inbox,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useContent } from '../../context/ContentContext'

export type AdminTab =
  | 'hero'
  | 'features'
  | 'whyChoose'
  | 'dashboard'
  | 'pricing'
  | 'ownServer'
  | 'faq'
  | 'cta'
  | 'general'
  | 'contact'
  | 'messages'

const navItems: { id: AdminTab; label: string; icon: typeof Home }[] = [
  { id: 'hero', label: 'Hero Section', icon: Home },
  { id: 'features', label: 'Features', icon: Zap },
  { id: 'whyChoose', label: 'Why Choose Nixor', icon: Sparkles },
  { id: 'dashboard', label: 'Dashboard Showcase', icon: Image },
  { id: 'pricing', label: 'Package Pricing', icon: DollarSign },
  { id: 'ownServer', label: 'Own Server', icon: Server },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
  { id: 'cta', label: 'Call To Action', icon: MessageSquare },
  { id: 'general', label: 'Navbar & Footer', icon: LayoutDashboard },
  { id: 'contact', label: 'Contact Settings', icon: Settings },
  { id: 'messages', label: 'Messages Inbox', icon: Inbox },
]

export default function AdminLayout({
  activeTab,
  onTabChange,
  children,
}: {
  activeTab: AdminTab
  onTabChange: (tab: AdminTab) => void
  children: React.ReactNode
}) {
  const { logout } = useAuth()
  const { messages } = useContent()
  const navigate = useNavigate()
  const unreadCount = messages.length

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      <aside className="fixed top-0 left-0 z-40 flex h-full w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 p-5 dark:border-slate-800">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-bg text-lg font-bold text-white">
              N
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">Nixor</span>
              <p className="text-xs text-slate-500">Live Content Editor</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                  : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
              {item.id === 'messages' && unreadCount > 0 && (
                <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="space-y-1 border-t border-slate-200 p-3 dark:border-slate-800">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <ExternalLink className="h-4 w-4" />
            View Live Site
          </a>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <main className="ml-64 flex-1">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 px-8 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="h-5 w-5 text-brand-600" />
              <div>
                <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Website Content Manager
                </h1>
                <p className="text-xs text-slate-500">
                  Changes apply instantly — no site downtime needed
                </p>
              </div>
            </div>
          </div>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
