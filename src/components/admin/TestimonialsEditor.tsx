import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useContent } from '../../context/ContentContext'
import type { TestimonialItem } from '../../data/defaultContent'
import { Field, HeaderFields, Input, SectionCard, Textarea } from './admin-ui'

export default function TestimonialsEditor() {
  const { content, updateContent, setShowTestimonials } = useContent()
  const [header, setHeader] = useState(content.testimonialsHeader)
  const [items, setItems] = useState<TestimonialItem[]>(content.testimonials)
  const [saved, setSaved] = useState(false)

  const save = () => {
    updateContent({ testimonialsHeader: header, testimonials: items })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
        <div>
          <h3 className="font-medium text-slate-900 dark:text-white">Show Testimonials on Website</h3>
          <p className="text-sm text-slate-500">Turn off to hide the entire section</p>
        </div>
        <button
          onClick={() => setShowTestimonials(!content.showTestimonials)}
          className={`relative h-7 w-12 rounded-full transition-colors ${
            content.showTestimonials ? 'bg-brand-500' : 'bg-slate-300 dark:bg-slate-600'
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
              content.showTestimonials ? 'translate-x-5' : ''
            }`}
          />
        </button>
      </div>

      <SectionCard title="Testimonials Header" onSave={save} saved={saved}>
        <HeaderFields
          badge={header.badge}
          title={header.title}
          subtitle={header.subtitle}
          onChange={(field, value) => setHeader({ ...header, [field]: value })}
        />
      </SectionCard>

      {items.map((item, i) => (
        <div
          key={item.id}
          className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="grid flex-1 gap-3 sm:grid-cols-2">
              <Field label="Name">
                <Input
                  value={item.name}
                  onChange={(v) =>
                    setItems((prev) =>
                      prev.map((x, j) => (j === i ? { ...x, name: v } : x)),
                    )
                  }
                />
              </Field>
              <Field label="Role">
                <Input
                  value={item.role}
                  onChange={(v) =>
                    setItems((prev) =>
                      prev.map((x, j) => (j === i ? { ...x, role: v } : x)),
                    )
                  }
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Review Text">
                  <Textarea
                    value={item.content}
                    onChange={(v) =>
                      setItems((prev) =>
                        prev.map((x, j) => (j === i ? { ...x, content: v } : x)),
                      )
                    }
                  />
                </Field>
              </div>
            </div>
            <button
              onClick={() => setItems((prev) => prev.filter((_, j) => j !== i))}
              className="text-slate-400 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}

      <div className="flex gap-3">
        <button
          onClick={() =>
            setItems((prev) => [
              ...prev,
              {
                id: crypto.randomUUID(),
                name: 'New Name',
                role: 'ISP Owner',
                content: 'Great product!',
                rating: 5,
              },
            ])
          }
          className="flex items-center gap-1 rounded-lg border border-slate-200 px-4 py-2 text-sm dark:border-slate-600"
        >
          <Plus className="h-4 w-4" /> Add Testimonial
        </button>
        <button onClick={save} className="rounded-lg gradient-bg px-6 py-2 text-sm font-semibold text-white">
          {saved ? 'Saved!' : 'Save'}
        </button>
      </div>
    </div>
  )
}
