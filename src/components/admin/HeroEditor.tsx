import { useState } from 'react'
import { useContent } from '../../context/ContentContext'
import { Field, Input, SectionCard, Textarea } from './admin-ui'

export default function HeroEditor() {
  const { content, updateContent } = useContent()
  const [hero, setHero] = useState(content.hero)
  const [saved, setSaved] = useState(false)

  const save = () => {
    updateContent({ hero })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <SectionCard
      title="Hero Section"
      description="Main headline, subheadline, and call-to-action buttons at the top of the page."
      onSave={save}
      saved={saved}
    >
      <Field label="Badge Text">
        <Input value={hero.badge} onChange={(v) => setHero({ ...hero, badge: v })} />
      </Field>
      <Field label="Headline (before highlight)">
        <Input value={hero.headline} onChange={(v) => setHero({ ...hero, headline: v })} />
      </Field>
      <Field label="Headline Highlight (colored text)">
        <Input
          value={hero.headlineHighlight}
          onChange={(v) => setHero({ ...hero, headlineHighlight: v })}
        />
      </Field>
      <Field label="Subheadline">
        <Textarea value={hero.subheadline} onChange={(v) => setHero({ ...hero, subheadline: v })} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Primary Button">
          <Input value={hero.ctaPrimary} onChange={(v) => setHero({ ...hero, ctaPrimary: v })} />
        </Field>
        <Field label="Secondary Button">
          <Input value={hero.ctaSecondary} onChange={(v) => setHero({ ...hero, ctaSecondary: v })} />
        </Field>
        <Field label="Trust Note 1">
          <Input value={hero.trustNote1} onChange={(v) => setHero({ ...hero, trustNote1: v })} />
        </Field>
        <Field label="Trust Note 2">
          <Input value={hero.trustNote2} onChange={(v) => setHero({ ...hero, trustNote2: v })} />
        </Field>
      </div>
    </SectionCard>
  )
}
