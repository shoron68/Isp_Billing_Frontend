import { useState } from 'react'
import {
  BarChart3,
  LayoutDashboard,
  Package,
  Users,
  Wallet,
} from 'lucide-react'
import { useContent } from '../context/ContentContext'

const iconMap = {
  admin: LayoutDashboard,
  customers: Users,
  billing: Wallet,
  reports: BarChart3,
  packages: Package,
}

export default function DashboardShowcase() {
  const { content } = useContent()
  const { dashboardHeader } = content
  const [active, setActive] = useState(content.dashboardTabs[0]?.id || 'admin')
  const current = content.dashboardTabs.find((t) => t.id === active)!

  return (
    <section id="dashboard" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase dark:text-brand-400">
            {dashboardHeader.badge}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            {dashboardHeader.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            {dashboardHeader.subtitle}
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {content.dashboardTabs.map((tab) => {
            const Icon = iconMap[tab.id as keyof typeof iconMap] || LayoutDashboard
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  active === tab.id
                    ? 'gradient-bg text-white shadow-lg shadow-brand-500/25'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-brand-500/5 dark:border-slate-700 dark:bg-slate-800">
          <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-4 text-sm font-medium text-slate-500">{current.label}</span>
            </div>
          </div>

          <div className="p-6 lg:p-8">
            <p className="mb-6 text-slate-600 dark:text-slate-400">{current.description}</p>

            {current.imageUrl ? (
              <img
                src={current.imageUrl}
                alt={current.label}
                className="w-full rounded-xl border border-slate-200 object-contain dark:border-slate-600"
              />
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {current.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900"
                    >
                      <p className="text-sm text-slate-500">{stat.label}</p>
                      <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl bg-slate-50 p-6 dark:bg-slate-900">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Performance Overview
                    </span>
                    <span className="text-xs text-slate-500">Last 12 months</span>
                  </div>
                  <div className="flex h-32 items-end gap-2">
                    {[35, 50, 42, 65, 55, 78, 68, 85, 72, 92, 80, 95].map((h, i) => (
                      <div key={i} className="flex flex-1 flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t gradient-bg transition-all"
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
