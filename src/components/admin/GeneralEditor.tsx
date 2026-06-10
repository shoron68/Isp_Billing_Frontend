import { useState } from 'react'
import { useContent } from '../../context/ContentContext'
import { Field, Input, SectionCard, Textarea } from './admin-ui'

export default function GeneralEditor() {
  const { content, updateContent, resetContent } = useContent()
  const [navbar, setNavbar] = useState(content.navbar)
  const [footer, setFooter] = useState(content.footer)
  const [saved, setSaved] = useState(false)

  const save = () => {
    updateContent({ navbar, footer })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <SectionCard title="Navbar & Brand" onSave={save} saved={saved}>
        <Field label="Brand Name">
          <Input value={navbar.brandName} onChange={(v) => setNavbar({ ...navbar, brandName: v })} />
        </Field>
        <Field label="CTA Button Text">
          <Input
            value={navbar.ctaButton}
            onChange={(v) => setNavbar({ ...navbar, ctaButton: v })}
          />
        </Field>
      </SectionCard>

      <SectionCard title="Footer" onSave={save} saved={saved}>
        <Field label="Brand Name">
          <Input value={footer.brandName} onChange={(v) => setFooter({ ...footer, brandName: v })} />
        </Field>
        <Field label="Description">
          <Textarea
            value={footer.description}
            onChange={(v) => setFooter({ ...footer, description: v })}
          />
        </Field>
        <Field label="Copyright Text">
          <Input
            value={footer.copyright}
            onChange={(v) => setFooter({ ...footer, copyright: v })}
          />
        </Field>
      </SectionCard>

      <div className="rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-900 dark:bg-red-900/20">
        <h3 className="font-medium text-red-800 dark:text-red-300">Reset All Website Content</h3>
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          Restore everything to factory defaults. Cannot be undone.
        </p>
        <button
          onClick={() => {
            if (confirm('Reset ALL website content to defaults?')) resetContent()
          }}
          className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  )
}
