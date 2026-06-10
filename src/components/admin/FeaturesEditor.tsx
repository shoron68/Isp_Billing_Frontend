import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useContent } from '../../context/ContentContext'
import type { FeatureItem } from '../../data/defaultContent'
import { Field, HeaderFields, Input, SectionCard } from './admin-ui'

export default function FeaturesEditor() {
  const { content, updateContent } = useContent()
  const [header, setHeader] = useState(content.featuresHeader)
  const [features, setFeatures] = useState<FeatureItem[]>(content.features)
  const [saved, setSaved] = useState(false)

  const save = () => {
    updateContent({ featuresHeader: header, features })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const updateFeature = (index: number, field: keyof FeatureItem, value: string | string[]) => {
    setFeatures((prev) =>
      prev.map((f, i) => (i === index ? { ...f, [field]: value } : f)),
    )
    setSaved(false)
  }

  return (
    <div className="space-y-6">
      <SectionCard title="Features Section Header" onSave={save} saved={saved}>
        <HeaderFields
          badge={header.badge}
          title={header.title}
          subtitle={header.subtitle}
          onChange={(field, value) => setHeader({ ...header, [field]: value })}
        />
      </SectionCard>

      {features.map((feature, fi) => (
        <div
          key={feature.id}
          className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800"
        >
          <Field label="Feature Title">
            <Input
              value={feature.title}
              onChange={(v) => updateFeature(fi, 'title', v)}
            />
          </Field>
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Bullet Points</span>
              <button
                onClick={() =>
                  updateFeature(fi, 'items', [...feature.items, 'New item'])
                }
                className="flex items-center gap-1 text-xs text-brand-600"
              >
                <Plus className="h-3 w-3" /> Add
              </button>
            </div>
            {feature.items.map((item, ii) => (
              <div key={ii} className="mb-2 flex gap-2">
                <Input
                  value={item}
                  onChange={(v) => {
                    const items = [...feature.items]
                    items[ii] = v
                    updateFeature(fi, 'items', items)
                  }}
                />
                <button
                  onClick={() =>
                    updateFeature(
                      fi,
                      'items',
                      feature.items.filter((_, i) => i !== ii),
                    )
                  }
                  className="text-slate-400 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button onClick={save} className="rounded-lg gradient-bg px-6 py-2.5 text-sm font-semibold text-white">
        {saved ? 'All Saved!' : 'Save Features'}
      </button>
    </div>
  )
}
