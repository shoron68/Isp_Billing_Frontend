import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { useContent } from '../context/ContentContext'
import { trackEvent } from '../utils/analytics'

export default function Pricing() {
  const { content } = useContent()
  const { pricingHeader } = content
  const [yearly, setYearly] = useState(false)

  const handlePlanClick = (plan: string) => {
    trackEvent({ action: 'pricing_click', category: 'pricing', label: plan })
  }

  return (
    <section id="pricing" className="bg-slate-50 py-20 lg:py-28 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase dark:text-brand-400">
            {pricingHeader.badge}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            {pricingHeader.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            {pricingHeader.subtitle}
          </p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-800">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                !yearly
                  ? 'gradient-bg text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                yearly
                  ? 'gradient-bg text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Yearly
              <span className="ml-1.5 text-xs text-green-500">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {content.pricing.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border bg-white p-8 dark:bg-slate-800 ${
                plan.popular
                  ? 'border-brand-500 shadow-xl shadow-brand-500/10'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-bg px-4 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
              <p className="mt-1 text-sm text-brand-600 dark:text-brand-400">{plan.audience}</p>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{plan.description}</p>

              <div className="mt-6">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                  ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-slate-500">/month</span>
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-3 text-sm">
                    {feature.included ? (
                      <Check className="h-4 w-4 shrink-0 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 shrink-0 text-slate-300 dark:text-slate-600" />
                    )}
                    <span
                      className={
                        feature.included
                          ? 'text-slate-700 dark:text-slate-300'
                          : 'text-slate-400 dark:text-slate-600'
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={() => handlePlanClick(plan.name)}
                className={`mt-8 block rounded-xl py-3 text-center text-sm font-semibold transition-all hover:scale-105 ${
                  plan.popular
                    ? 'gradient-bg text-white shadow-lg shadow-brand-500/25'
                    : 'border-2 border-slate-200 text-slate-700 hover:border-brand-300 dark:border-slate-600 dark:text-slate-200'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
