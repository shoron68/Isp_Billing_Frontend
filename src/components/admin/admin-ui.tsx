export function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-slate-500">{label}</label>
      {children}
    </div>
  )
}

export function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
    />
  )
}

export function Textarea({
  value,
  onChange,
  rows = 3,
}: {
  value: string
  onChange: (v: string) => void
  rows?: number
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
    />
  )
}

export function SectionCard({
  title,
  description,
  children,
  onSave,
  saved,
}: {
  title: string
  description?: string
  children: React.ReactNode
  onSave: () => void
  saved: boolean
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
          {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
        </div>
        <button
          onClick={onSave}
          className="shrink-0 rounded-lg gradient-bg px-4 py-2 text-sm font-semibold text-white"
        >
          {saved ? 'Saved!' : 'Save'}
        </button>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

export function HeaderFields({
  badge,
  title,
  subtitle,
  onChange,
}: {
  badge: string
  title: string
  subtitle: string
  onChange: (field: 'badge' | 'title' | 'subtitle', value: string) => void
}) {
  return (
    <>
      <Field label="Section Badge">
        <Input value={badge} onChange={(v) => onChange('badge', v)} />
      </Field>
      <Field label="Section Title">
        <Input value={title} onChange={(v) => onChange('title', v)} />
      </Field>
      <Field label="Section Subtitle">
        <Textarea value={subtitle} onChange={(v) => onChange('subtitle', v)} />
      </Field>
    </>
  )
}
