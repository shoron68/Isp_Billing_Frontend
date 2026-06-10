import { useState } from 'react'
import { useContent } from '../../context/ContentContext'
import { Field, Input, SectionCard, Textarea } from './admin-ui'

export default function CTAEditor() {
  const { content, updateContent } = useContent()
  const [cta, setCta] = useState(content.cta)
  const [saved, setSaved] = useState(false)

  const save = () => {
    updateContent({ cta })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <SectionCard
      title="Call To Action Section"
      description="Bottom banner before the contact form."
      onSave={save}
      saved={saved}
    >
      <Field label="Headline">
        <Input value={cta.headline} onChange={(v) => setCta({ ...cta, headline: v })} />
      </Field>
      <Field label="Description">
        <Textarea value={cta.text} onChange={(v) => setCta({ ...cta, text: v })} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Primary Button">
          <Input
            value={cta.buttonPrimary}
            onChange={(v) => setCta({ ...cta, buttonPrimary: v })}
          />
        </Field>
        <Field label="Secondary Button">
          <Input
            value={cta.buttonSecondary}
            onChange={(v) => setCta({ ...cta, buttonSecondary: v })}
          />
        </Field>
      </div>
    </SectionCard>
  )
}
