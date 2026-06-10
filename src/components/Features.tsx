import {
  BarChart3,
  CreditCard,
  Network,
  Shield,
  Users,
  Zap,
} from 'lucide-react'
import { useContent } from '../context/ContentContext'

const featureMeta: Record<string, { icon: typeof Users; color: string; bg: string }> = {
  customers: { icon: Users, color: 'text-brand-500', bg: 'bg-brand-50 dark:bg-brand-900/20' },
  billing: { icon: Zap, color: 'text-accent-500', bg: 'bg-accent-50 dark:bg-accent-900/20' },
  payments: { icon: CreditCard, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
  isp: { icon: Network, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  reports: { icon: BarChart3, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  security: { icon: Shield, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
}

export default function Features() {
  const { content } = useContent()
  const { featuresHeader, features } = content

  return (
    <section id="features" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase dark:text-brand-400">
            {featuresHeader.badge}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            {featuresHeader.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            {featuresHeader.subtitle}
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const meta = featureMeta[feature.id] || featureMeta.customers
            const Icon = meta.icon
            return (
              <div
                key={feature.id}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/5 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-brand-700"
              >
                <div className={`mb-4 inline-flex rounded-xl p-3 ${meta.bg}`}>
                  <Icon className={`h-6 w-6 ${meta.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {feature.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
