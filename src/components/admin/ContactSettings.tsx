import { useState } from 'react'
import { Save } from 'lucide-react'
import { useContent } from '../../context/ContentContext'
import type { SectionHeader } from '../../data/defaultContent'
import { HeaderFields } from './admin-ui'

export default function ContactSettings() {
  const { content, updateContact, updateContent } = useContent()
  const [header, setHeader] = useState<SectionHeader>(content.contactHeader)
  const [form, setForm] = useState(content.contact)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    updateContent({ contactHeader: header })
    updateContact(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Contact Settings</h2>
          <p className="mt-1 text-sm text-slate-500">
            Set your company email. Contact form messages are sent to the Company Email below.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-lg gradient-bg px-5 py-2.5 text-sm font-semibold text-white"
        >
          <Save className="h-4 w-4" />
          {saved ? 'Saved!' : 'Save'}
        </button>
      </div>

      <div className="mb-6 max-w-xl rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">Section Header</h3>
        <HeaderFields
          badge={header.badge}
          title={header.title}
          subtitle={header.subtitle}
          onChange={(field, value) => setHeader({ ...header, [field]: value })}
        />
      </div>

      <div className="max-w-xl space-y-4 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Company Email (receives contact form messages)
          </label>
          <input
            type="email"
            value={form.companyEmail}
            onChange={(e) => setForm({ ...form, companyEmail: e.target.value })}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            placeholder="your@company.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Support Email (shown on website)
          </label>
          <input
            type="email"
            value={form.supportEmail}
            onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Phone
          </label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Address
          </label>
          <textarea
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            rows={2}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      <div className="mt-6 max-w-xl rounded-xl border border-brand-200 bg-brand-50 p-5 dark:border-brand-800 dark:bg-brand-900/20">
        <h3 className="font-medium text-brand-800 dark:text-brand-300">Email Delivery Setup</h3>
        <p className="mt-2 text-sm text-brand-700 dark:text-brand-400">
          To receive contact form messages in your inbox, sign up at{' '}
          <a
            href="https://web3forms.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            web3forms.com
          </a>{' '}
          (free), get your access key, and add it to your <code>.env</code> file:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-white p-3 text-xs text-slate-700 dark:bg-slate-900 dark:text-slate-300">
          VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
        </pre>
        <p className="mt-2 text-xs text-brand-600 dark:text-brand-400">
          Messages are always saved in the Messages Inbox even without email setup.
        </p>
      </div>
    </div>
  )
}
