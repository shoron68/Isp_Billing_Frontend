import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useContent } from '../../context/ContentContext'
import type { FAQItem } from '../../data/defaultContent'
import { Field, HeaderFields, Input, SectionCard, Textarea } from './admin-ui'

export default function FAQEditor() {
  const { content, updateContent } = useContent()
  const [header, setHeader] = useState(content.faqHeader)
  const [faq, setFaq] = useState<FAQItem[]>(content.faq)
  const [saved, setSaved] = useState(false)

  const save = () => {
    updateContent({ faqHeader: header, faq })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <SectionCard title="FAQ Section Header" onSave={save} saved={saved}>
        <HeaderFields
          badge={header.badge}
          title={header.title}
          subtitle={header.subtitle}
          onChange={(field, value) => setHeader({ ...header, [field]: value })}
        />
      </SectionCard>

      {faq.map((item, i) => (
        <div
          key={item.id}
          className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <Field label="Question">
                <Input
                  value={item.question}
                  onChange={(v) =>
                    setFaq((prev) =>
                      prev.map((x, j) => (j === i ? { ...x, question: v } : x)),
                    )
                  }
                />
              </Field>
              <Field label="Answer">
                <Textarea
                  value={item.answer}
                  onChange={(v) =>
                    setFaq((prev) =>
                      prev.map((x, j) => (j === i ? { ...x, answer: v } : x)),
                    )
                  }
                  rows={4}
                />
              </Field>
            </div>
            <button
              onClick={() => setFaq((prev) => prev.filter((_, j) => j !== i))}
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
            setFaq((prev) => [
              ...prev,
              { id: crypto.randomUUID(), question: 'New question?', answer: '' },
            ])
          }
          className="flex items-center gap-1 rounded-lg border border-slate-200 px-4 py-2 text-sm dark:border-slate-600"
        >
          <Plus className="h-4 w-4" /> Add FAQ
        </button>
        <button onClick={save} className="rounded-lg gradient-bg px-6 py-2 text-sm font-semibold text-white">
          {saved ? 'Saved!' : 'Save'}
        </button>
      </div>
    </div>
  )
}
