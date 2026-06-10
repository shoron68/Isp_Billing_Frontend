import {
  Activity,
  BarChart3,
  FileText,
  Users,
  Wifi,
} from 'lucide-react'
import { useContent } from '../context/ContentContext'
import { trackEvent } from '../utils/analytics'

export default function Hero() {
  const { content } = useContent()
  const { hero } = content

  const handleCTA = (label: string) => {
    trackEvent({ action: 'cta_click', category: 'hero', label })
  }

  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute top-40 right-0 h-[400px] w-[400px] rounded-full bg-accent-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="animate-fade-in-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 dark:border-brand-800 dark:bg-brand-900/30 dark:text-brand-300">
              <Wifi className="h-4 w-4" />
              {hero.badge}
            </div>

            <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
              {hero.headline}{' '}
              <span className="gradient-text">{hero.headlineHighlight}</span> Solution
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              {hero.subheadline}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#pricing"
                onClick={() => handleCTA(hero.ctaPrimary)}
                className="rounded-xl gradient-bg px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-brand-500/30 transition-all hover:scale-105 hover:shadow-brand-500/40"
              >
                {hero.ctaPrimary}
              </a>
              <a
                href="#contact"
                onClick={() => handleCTA(hero.ctaSecondary)}
                className="rounded-xl border-2 border-slate-200 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 transition-all hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-brand-600"
              >
                {hero.ctaSecondary}
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                {hero.trustNote1}
              </span>
              <span>{hero.trustNote2}</span>
            </div>
          </div>

          <div className="animate-fade-in-up relative" style={{ animationDelay: '0.2s' }}>
            <div className="animate-float rounded-2xl border border-slate-200/80 bg-white p-1 shadow-2xl shadow-brand-500/10 dark:border-slate-700 dark:bg-slate-800">
              <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs font-medium text-slate-400">Nixor Dashboard</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <DashboardCard
                    icon={<Users className="h-4 w-4 text-brand-500" />}
                    label="Customers"
                    value="2,847"
                    change="+12%"
                  />
                  <DashboardCard
                    icon={<BarChart3 className="h-4 w-4 text-accent-500" />}
                    label="Revenue"
                    value="$48.2K"
                    change="+8%"
                  />
                  <DashboardCard
                    icon={<FileText className="h-4 w-4 text-green-500" />}
                    label="Invoices"
                    value="156"
                    change="Due: 23"
                  />
                  <DashboardCard
                    icon={<Activity className="h-4 w-4 text-orange-500" />}
                    label="Network"
                    value="99.8%"
                    change="Uptime"
                  />
                </div>

                <div className="mt-3 rounded-lg bg-white p-3 dark:bg-slate-800">
                  <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
                    <span>Billing Analytics</span>
                    <span>Last 30 days</span>
                  </div>
                  <div className="flex h-20 items-end gap-1.5">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t gradient-bg opacity-80"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 -bottom-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg dark:border-slate-700 dark:bg-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <span className="text-sm text-green-600">✓</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">
                    Payment Received
                  </p>
                  <p className="text-xs text-slate-500">$89.00 — John D.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DashboardCard({
  icon,
  label,
  value,
  change,
}: {
  icon: React.ReactNode
  label: string
  value: string
  change: string
}) {
  return (
    <div className="rounded-lg bg-white p-3 dark:bg-slate-800">
      <div className="mb-1 flex items-center gap-1.5">
        {icon}
        <span className="text-xs text-slate-500">{label}</span>
      </div>
      <p className="text-lg font-bold text-slate-900 dark:text-white">{value}</p>
      <p className="text-xs text-green-500">{change}</p>
    </div>
  )
}
