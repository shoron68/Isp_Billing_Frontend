import { useState } from 'react'
import { Check, Plus, Save, Trash2, X } from 'lucide-react'
import { useContent } from '../../context/ContentContext'
import type { PricingPlan, SectionHeader } from '../../data/defaultContent'
import { HeaderFields } from './admin-ui'

export default function PricingEditor() {
  const { content, updatePricing, updateContent } = useContent()
  const [header, setHeader] = useState<SectionHeader>(content.pricingHeader)
  const [plans, setPlans] = useState<PricingPlan[]>(content.pricing)
  const [saved, setSaved] = useState(false)

  const updatePlan = (index: number, field: keyof PricingPlan, value: unknown) => {
    setPlans((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)),
    )
    setSaved(false)
  }

  const updateFeature = (
    planIndex: number,
    featureIndex: number,
    field: 'text' | 'included',
    value: string | boolean,
  ) => {
    setPlans((prev) =>
      prev.map((p, i) => {
        if (i !== planIndex) return p
        const features = p.features.map((f, fi) =>
          fi === featureIndex ? { ...f, [field]: value } : f,
        )
        return { ...p, features }
      }),
    )
    setSaved(false)
  }

  const addFeature = (planIndex: number) => {
    setPlans((prev) =>
      prev.map((p, i) =>
        i === planIndex
          ? { ...p, features: [...p.features, { text: 'New feature', included: true }] }
          : p,
      ),
    )
    setSaved(false)
  }

  const removeFeature = (planIndex: number, featureIndex: number) => {
    setPlans((prev) =>
      prev.map((p, i) =>
        i === planIndex
          ? { ...p, features: p.features.filter((_, fi) => fi !== featureIndex) }
          : p,
      ),
    )
    setSaved(false)
  }

  const setPopular = (index: number) => {
    setPlans((prev) => prev.map((p, i) => ({ ...p, popular: i === index })))
    setSaved(false)
  }

  const handleSave = () => {
    updateContent({ pricingHeader: header })
    updatePricing(plans)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Package Pricing</h2>
          <p className="mt-1 text-sm text-slate-500">
            Edit plan names, monthly/yearly prices, and features shown on the website.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-lg gradient-bg px-5 py-2.5 text-sm font-semibold text-white shadow-md"
        >
          <Save className="h-4 w-4" />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">Section Header</h3>
        <HeaderFields
          badge={header.badge}
          title={header.title}
          subtitle={header.subtitle}
          onChange={(field, value) => setHeader({ ...header, [field]: value })}
        />
      </div>

      <div className="space-y-8">
        {plans.map((plan, planIndex) => (
          <div
            key={plan.id}
            className={`rounded-xl border bg-white p-6 dark:bg-slate-800 ${
              plan.popular ? 'border-brand-500' : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-slate-900 dark:text-white">{plan.name}</h3>
              <button
                onClick={() => setPopular(planIndex)}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  plan.popular
                    ? 'bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-700'
                }`}
              >
                {plan.popular ? 'Most Popular' : 'Set as Popular'}
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500">Plan Name</label>
                <input
                  value={plan.name}
                  onChange={(e) => updatePlan(planIndex, 'name', e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500">Audience</label>
                <input
                  value={plan.audience}
                  onChange={(e) => updatePlan(planIndex, 'audience', e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500">CTA Button</label>
                <input
                  value={plan.cta}
                  onChange={(e) => updatePlan(planIndex, 'cta', e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500">
                  Monthly Price (৳)
                </label>
                <input
                  type="number"
                  value={plan.monthlyPrice}
                  onChange={(e) => updatePlan(planIndex, 'monthlyPrice', Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500">
                  Yearly Price (৳/mo)
                </label>
                <input
                  type="number"
                  value={plan.yearlyPrice}
                  onChange={(e) => updatePlan(planIndex, 'yearlyPrice', Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="mb-1 block text-xs font-medium text-slate-500">Description</label>
                <input
                  value={plan.description}
                  onChange={(e) => updatePlan(planIndex, 'description', e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500">Price Label</label>
                <input
                  value={plan.priceLabel ?? ''}
                  onChange={(e) => updatePlan(planIndex, 'priceLabel', e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500">Price Value</label>
                <input
                  value={plan.priceValue ?? ''}
                  onChange={(e) => updatePlan(planIndex, 'priceValue', e.target.value)}
                  placeholder="e.g. 4.5 or 2,500"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500">Price Unit</label>
                <input
                  value={plan.priceUnit ?? ''}
                  onChange={(e) => updatePlan(planIndex, 'priceUnit', e.target.value)}
                  placeholder="e.g. USER"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500">Price Period</label>
                <input
                  value={plan.pricePeriod ?? ''}
                  onChange={(e) => updatePlan(planIndex, 'pricePeriod', e.target.value)}
                  placeholder="e.g. MONTH"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500">Setup Charge</label>
                <input
                  value={plan.setupCharge ?? ''}
                  onChange={(e) => updatePlan(planIndex, 'setupCharge', e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="mb-1 block text-xs font-medium text-slate-500">Server Configuration</label>
                <input
                  value={plan.serverConfig ?? ''}
                  onChange={(e) => updatePlan(planIndex, 'serverConfig', e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-medium text-slate-500">Features</label>
                <button
                  onClick={() => addFeature(planIndex)}
                  className="flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700"
                >
                  <Plus className="h-3 w-3" /> Add Feature
                </button>
              </div>
              <div className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateFeature(planIndex, featureIndex, 'included', !feature.included)
                      }
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        feature.included
                          ? 'bg-green-100 text-green-600 dark:bg-green-900/30'
                          : 'bg-slate-100 text-slate-400 dark:bg-slate-700'
                      }`}
                    >
                      {feature.included ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    </button>
                    <input
                      value={feature.text}
                      onChange={(e) =>
                        updateFeature(planIndex, featureIndex, 'text', e.target.value)
                      }
                      className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                    />
                    <button
                      onClick={() => removeFeature(planIndex, featureIndex)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
