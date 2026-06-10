type AnalyticsEvent = {
  action: string
  category: string
  label?: string
  value?: number
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function initAnalytics() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
  if (!measurementId || typeof window === 'undefined') return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', measurementId, { anonymize_ip: true })
}

export function trackEvent({ action, category, label, value }: AnalyticsEvent) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    })
  }
}

export function trackPageView(path: string) {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
  if (typeof window.gtag === 'function' && measurementId) {
    window.gtag('config', measurementId, { page_path: path })
  }
}
