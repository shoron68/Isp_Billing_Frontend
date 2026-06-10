import { useState, type FormEvent } from 'react'
import { AlertCircle, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useContent } from '../context/ContentContext'
import { trackEvent } from '../utils/analytics'
import { sendContactEmail } from '../utils/contactEmail'

export default function ContactForm() {
  const { content, addMessage, markMessageEmailSent } = useContent()
  const { contactHeader } = content
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = e.currentTarget
    const data = new FormData(form)

    const messageData = {
      name: data.get('name') as string,
      email: data.get('email') as string,
      company: (data.get('company') as string) || '',
      subject: data.get('subject') as string,
      message: data.get('message') as string,
    }

    trackEvent({
      action: 'form_submit',
      category: 'contact',
      label: messageData.subject,
    })

    const savedMessage = addMessage(messageData)

    const emailSent = await sendContactEmail(messageData, content.contact.companyEmail)
    if (emailSent) {
      markMessageEmailSent(savedMessage.id)
    }

    setLoading(false)
    setSubmitted(true)
    form.reset()
  }

  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase dark:text-brand-400">
            {contactHeader.badge}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            {contactHeader.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            {contactHeader.subtitle}
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/30">
                <Mail className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Email</h3>
                <p className="mt-1 text-slate-600 dark:text-slate-400">
                  {content.contact.supportEmail}
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  {content.contact.companyEmail}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/30">
                <Phone className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Phone</h3>
                <p className="mt-1 text-slate-600 dark:text-slate-400">{content.contact.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/30">
                <MapPin className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Office</h3>
                <p className="mt-1 text-slate-600 dark:text-slate-400">{content.contact.address}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <Send className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Message Sent!
                </h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </div>
                )}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                      placeholder="john@isp.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    ISP Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                    placeholder="Your ISP Name"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                  >
                    <option value="demo">Request a Demo</option>
                    <option value="trial">Start Free Trial</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                    placeholder="Tell us about your ISP and how we can help..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl gradient-bg py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:scale-[1.02] disabled:opacity-70"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                  {!loading && <Send className="h-4 w-4" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
