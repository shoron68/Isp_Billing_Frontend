import type { ContactMessage } from '../data/defaultContent'

const SUBJECT_LABELS: Record<string, string> = {
  demo: 'Request a Demo',
  trial: 'Start Free Trial',
  sales: 'Sales Inquiry',
  support: 'Technical Support',
  other: 'Other',
}

export async function sendContactEmail(
  data: Omit<ContactMessage, 'id' | 'createdAt' | 'emailSent'>,
  recipientEmail: string,
): Promise<boolean> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

  if (!accessKey) {
    console.warn('VITE_WEB3FORMS_ACCESS_KEY not set — message saved locally only')
    return false
  }

  const subjectLabel = SUBJECT_LABELS[data.subject] || data.subject

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `[Nixor Contact] ${subjectLabel} — ${data.name}`,
        from_name: data.name,
        email: data.email,
        company: data.company || 'N/A',
        message: data.message,
        to: recipientEmail,
      }),
    })

    const result = await response.json()
    return result.success === true
  } catch {
    return false
  }
}
