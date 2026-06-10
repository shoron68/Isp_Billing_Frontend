import { Check, X } from 'lucide-react'
import { useContent } from '../context/ContentContext'
import type { PricingPlan, PlanFeature, SectionHeader } from '../data/defaultContent'

export default function OwnServer() {
  const { content } = useContent()
  const { ownServerHeader, ownServer } = content as { ownServerHeader?: SectionHeader; ownServer?: PricingPlan[] }

  return (
    <section id="own-server" className="bg-slate-900 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-green-400 uppercase">{ownServerHeader?.badge}</p>
          <h2 className="mt-3 text-3xl font-bold">{ownServerHeader?.title}</h2>
          <p className="mt-2 text-sm text-slate-300">{ownServerHeader?.subtitle}</p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-4">
          {ownServer?.map((plan: PricingPlan) => (
            <div key={plan.id} className="rounded-lg border border-slate-700 bg-slate-800 p-6 flex flex-col">
              <h3 className="text-xl font-bold text-green-400">{plan.name}</h3>
              <p className="mt-1 text-sm text-yellow-300">{plan.audience}</p>
              <p className="mt-4 text-2xl font-extrabold">
                {plan.priceValue ? (
                  <>
                    ৳ {plan.priceValue}
                    {plan.priceUnit && <span className="mx-2">|</span>}
                    {plan.priceUnit && <span>{plan.priceUnit.toUpperCase()}</span>}
                    {plan.pricePeriod && <span className="mx-2">|</span>}
                    {plan.pricePeriod && <span>{plan.pricePeriod.toUpperCase()}</span>}
                  </>
                ) : (
                  plan.monthlyPrice ? `৳ ${plan.monthlyPrice.toLocaleString()}` : '৳ CALL FOR PRICE'
                )}
              </p>
              <p className="mt-4 text-sm text-slate-400">{plan.description}</p>
              <ul className="mt-6 space-y-2 flex-1">
                {plan.features?.map((f: PlanFeature) => (
                  <li key={f.text} className="flex items-center gap-3 text-sm text-slate-300">
                    {f.included ? <Check className="h-4 w-4 text-green-400" /> : <X className="h-4 w-4 text-slate-500" />}
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex justify-center">
                <a href="#contact" className="inline-block w-40 text-center rounded bg-blue-500 px-4 py-2 text-sm font-semibold text-white">
                  {plan.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
