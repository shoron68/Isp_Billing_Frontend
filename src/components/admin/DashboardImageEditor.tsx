import { useRef, useState } from 'react'
import { ImagePlus, Save, Trash2, Upload } from 'lucide-react'
import { useContent } from '../../context/ContentContext'
import type { SectionHeader } from '../../data/defaultContent'
import { HeaderFields } from './admin-ui'

export default function DashboardImageEditor() {
  const { content, updateDashboardTab, updateContent } = useContent()
  const [header, setHeader] = useState<SectionHeader>(content.dashboardHeader)
  const [saved, setSaved] = useState(false)

  const saveHeader = () => {
    updateContent({ dashboardHeader: header })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const handleImageUpload = (tabId: string, file: File) => {
    if (!file.type.startsWith('image/')) return
    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be under 2MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      updateDashboardTab(tabId, { imageUrl: result })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
    reader.readAsDataURL(file)
  }

  const handleUrlChange = (tabId: string, url: string) => {
    updateDashboardTab(tabId, { imageUrl: url })
    setSaved(false)
  }

  const removeImage = (tabId: string) => {
    updateDashboardTab(tabId, { imageUrl: '' })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const updateStat = (tabId: string, statIndex: number, field: 'label' | 'value', value: string) => {
    const tab = content.dashboardTabs.find((t) => t.id === tabId)
    if (!tab) return
    const stats = tab.stats.map((s, i) => (i === statIndex ? { ...s, [field]: value } : s))
    updateDashboardTab(tabId, { stats })
    setSaved(false)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Dashboard Showcase</h2>
          <p className="mt-1 text-sm text-slate-500">
            Upload or link images for each dashboard tab. When set, the image replaces the default
            chart preview on the website.
          </p>
        </div>
        {saved && (
          <span className="flex items-center gap-2 text-sm font-medium text-green-600">
            <Save className="h-4 w-4" /> Saved
          </span>
        )}
      </div>

      <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900 dark:text-white">Section Header</h3>
          <button onClick={saveHeader} className="text-sm font-medium text-brand-600">
            Save Header
          </button>
        </div>
        <HeaderFields
          badge={header.badge}
          title={header.title}
          subtitle={header.subtitle}
          onChange={(field, value) => setHeader({ ...header, [field]: value })}
        />
      </div>

      <div className="space-y-6">
        {content.dashboardTabs.map((tab) => (
          <div
            key={tab.id}
            className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800"
          >
            <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">{tab.label}</h3>

            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-medium text-slate-500">
                  Image URL or Upload
                </label>
                <div className="flex gap-2">
                  <input
                    value={tab.imageUrl.startsWith('data:') ? '' : tab.imageUrl}
                    onChange={(e) => handleUrlChange(tab.id, e.target.value)}
                    placeholder="https://example.com/dashboard.png"
                    className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                  />
                  <input
                    ref={(el) => {
                      fileRefs.current[tab.id] = el
                    }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload(tab.id, file)
                    }}
                  />
                  <button
                    onClick={() => fileRefs.current[tab.id]?.click()}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    <Upload className="h-4 w-4" />
                    Upload
                  </button>
                </div>

                {tab.imageUrl ? (
                  <div className="relative mt-4">
                    <img
                      src={tab.imageUrl}
                      alt={tab.label}
                      className="w-full rounded-lg border border-slate-200 object-cover dark:border-slate-600"
                    />
                    <button
                      onClick={() => removeImage(tab.id)}
                      className="absolute top-2 right-2 flex items-center gap-1 rounded-lg bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                    >
                      <Trash2 className="h-3 w-3" /> Remove
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 flex h-40 items-center justify-center rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-600">
                    <div className="text-center text-slate-400">
                      <ImagePlus className="mx-auto h-8 w-8" />
                      <p className="mt-2 text-sm">No image — default chart shown</p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-500">
                  Description
                </label>
                <textarea
                  value={tab.description}
                  onChange={(e) => updateDashboardTab(tab.id, { description: e.target.value })}
                  rows={2}
                  className="mb-4 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                />

                <label className="mb-2 block text-xs font-medium text-slate-500">
                  Stats (shown when no image)
                </label>
                <div className="space-y-2">
                  {tab.stats.map((stat, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        value={stat.label}
                        onChange={(e) => updateStat(tab.id, i, 'label', e.target.value)}
                        placeholder="Label"
                        className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                      />
                      <input
                        value={stat.value}
                        onChange={(e) => updateStat(tab.id, i, 'value', e.target.value)}
                        placeholder="Value"
                        className="w-28 rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
