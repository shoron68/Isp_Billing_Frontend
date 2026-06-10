import { Mail, Trash2 } from 'lucide-react'
import { useContent } from '../../context/ContentContext'

const SUBJECT_LABELS: Record<string, string> = {
  demo: 'Request a Demo',
  trial: 'Start Free Trial',
  sales: 'Sales Inquiry',
  support: 'Technical Support',
  other: 'Other',
}

export default function MessagesInbox() {
  const { messages, deleteMessage } = useContent()

  if (messages.length === 0) {
    return (
      <div>
        <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">Messages Inbox</h2>
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-16 dark:border-slate-700">
          <Mail className="h-12 w-12 text-slate-300" />
          <p className="mt-4 text-slate-500">No messages yet</p>
          <p className="mt-1 text-sm text-slate-400">
            Contact form submissions will appear here
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Messages Inbox</h2>
        <p className="mt-1 text-sm text-slate-500">
          {messages.length} message{messages.length !== 1 ? 's' : ''} received
        </p>
      </div>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{msg.name}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      msg.emailSent
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}
                  >
                    {msg.emailSent ? 'Email sent' : 'Saved locally'}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  {msg.email} {msg.company && `· ${msg.company}`}
                </p>
              </div>
              <button
                onClick={() => {
                  if (confirm('Delete this message?')) deleteMessage(msg.id)
                }}
                className="text-slate-400 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-brand-50 px-2.5 py-1 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
                {SUBJECT_LABELS[msg.subject] || msg.subject}
              </span>
              <span className="text-slate-400">
                {new Date(msg.createdAt).toLocaleString()}
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {msg.message}
            </p>

            <a
              href={`mailto:${msg.email}?subject=Re: ${SUBJECT_LABELS[msg.subject] || msg.subject}`}
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
            >
              <Mail className="h-3.5 w-3.5" /> Reply via Email
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
