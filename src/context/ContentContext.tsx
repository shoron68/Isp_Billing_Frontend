import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import {
  CONTENT_STORAGE_KEY,
  MESSAGES_STORAGE_KEY,
  defaultContent,
  mergeWithDefaults,
  type ContactMessage,
  type DashboardTab,
  type PricingPlan,
  type SiteContent,
} from '../data/defaultContent'

type ContentContextType = {
  content: SiteContent
  messages: ContactMessage[]
  updateContent: (updates: Partial<SiteContent>) => void
  updatePricing: (plans: PricingPlan[]) => void
  updateDashboardTab: (id: string, updates: Partial<DashboardTab>) => void
  updateContact: (updates: Partial<SiteContent['contact']>) => void
  addMessage: (message: Omit<ContactMessage, 'id' | 'createdAt' | 'emailSent'>) => ContactMessage
  markMessageEmailSent: (id: string) => void
  deleteMessage: (id: string) => void
  resetContent: () => void
}

const ContentContext = createContext<ContentContextType | null>(null)

function loadContent(): SiteContent {
  try {
    const stored = localStorage.getItem(CONTENT_STORAGE_KEY)
    if (stored) return mergeWithDefaults(JSON.parse(stored) as Partial<SiteContent>)
  } catch {
    /* use defaults */
  }
  return defaultContent
}

function loadMessages(): ContactMessage[] {
  try {
    const stored = localStorage.getItem(MESSAGES_STORAGE_KEY)
    if (stored) return JSON.parse(stored) as ContactMessage[]
  } catch {
    /* use empty */
  }
  return []
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(loadContent)
  const [messages, setMessages] = useState<ContactMessage[]>(loadMessages)

  useEffect(() => {
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content))
  }, [content])

  /*
  Content editing notes:
  - The `content` object contains all editable site text and data (see `src/data/defaultContent.ts`).
  - Changes made through the Admin UI call `updateContent`, `updatePricing`, `updateDashboardTab`, etc.
  - All updates are persisted to `localStorage` under `CONTENT_STORAGE_KEY` so they apply instantly to the live site preview.
  - To programmatically change content from code, call `updateContent({ ... })` with a partial `SiteContent` object.
  - To reset to defaults call `resetContent()` which clears the stored content and reloads defaults.
  - Keep `id` values stable for list items to prevent UI reordering or data loss.
  */

  useEffect(() => {
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages))
  }, [messages])

  const updateContent = useCallback((updates: Partial<SiteContent>) => {
    setContent((prev) => mergeWithDefaults({ ...prev, ...updates }))
  }, [])

  const updatePricing = useCallback((plans: PricingPlan[]) => {
    setContent((prev) => ({ ...prev, pricing: plans }))
  }, [])

  const updateDashboardTab = useCallback((id: string, updates: Partial<DashboardTab>) => {
    setContent((prev) => ({
      ...prev,
      dashboardTabs: prev.dashboardTabs.map((tab) =>
        tab.id === id ? { ...tab, ...updates } : tab,
      ),
    }))
  }, [])

  const updateContact = useCallback((updates: Partial<SiteContent['contact']>) => {
    setContent((prev) => ({ ...prev, contact: { ...prev.contact, ...updates } }))
  }, [])

  const addMessage = useCallback(
    (message: Omit<ContactMessage, 'id' | 'createdAt' | 'emailSent'>) => {
      const newMessage: ContactMessage = {
        ...message,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        emailSent: false,
      }
      setMessages((prev) => [newMessage, ...prev])
      return newMessage
    },
    [],
  )

  const markMessageEmailSent = useCallback((id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, emailSent: true } : m)),
    )
  }, [])

  const deleteMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }, [])

  const resetContent = useCallback(() => {
    setContent(defaultContent)
    localStorage.removeItem(CONTENT_STORAGE_KEY)
  }, [])

  return (
    <ContentContext.Provider
      value={{
        content,
        messages,
        updateContent,
        updatePricing,
        updateDashboardTab,
        updateContact,
        addMessage,
        markMessageEmailSent,
        deleteMessage,
        resetContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const context = useContext(ContentContext)
  if (!context) throw new Error('useContent must be used within ContentProvider')
  return context
}
