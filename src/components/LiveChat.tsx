import { useState } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'
import { trackEvent } from '../utils/analytics'

type Message = { from: 'user' | 'bot'; text: string }

const botReplies: Record<string, string> = {
  default:
    'Thanks for reaching out! A support agent will be with you shortly. In the meantime, you can also email us at support@nixor.io.',
  demo: 'Great! You can schedule a demo by filling out the contact form or emailing sales@nixor.io. We typically respond within 2 hours.',
  pricing:
    'Our plans start at ৳49/month for small ISPs. Check out the pricing section on our homepage for full details, or I can connect you with sales.',
  trial:
    'You can start a 14-day free trial with no credit card required. Click "Start Free Trial" on our homepage to get started!',
}

export default function LiveChat() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      from: 'bot',
      text: 'Hi! Welcome to Nixor support. How can I help you today? Ask about pricing, demos, or free trials.',
    },
  ])

  const toggleChat = () => {
    setOpen(!open)
    if (!open) trackEvent({ action: 'chat_open', category: 'live_chat' })
  }

  const getBotReply = (text: string) => {
    const lower = text.toLowerCase()
    if (lower.includes('demo')) return botReplies.demo
    if (lower.includes('price') || lower.includes('cost') || lower.includes('plan'))
      return botReplies.pricing
    if (lower.includes('trial') || lower.includes('free'))
      return botReplies.trial
    return botReplies.default
  }

  const sendMessage = () => {
    if (!input.trim()) return

    const userMsg = input.trim()
    setMessages((prev) => [...prev, { from: 'user', text: userMsg }])
    setInput('')

    trackEvent({ action: 'chat_message', category: 'live_chat' })

    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: getBotReply(userMsg) }])
    }, 800)
  }

  return (
    <>
      {open && (
        <div className="fixed right-6 bottom-24 z-50 flex h-[420px] w-[360px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800 max-sm:right-4 max-sm:bottom-20 max-sm:w-[calc(100vw-2rem)]">
          <div className="flex items-center justify-between gradient-bg px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-white">Nixor Support</p>
              <p className="text-xs text-blue-100">Typically replies instantly</p>
            </div>
            <button onClick={toggleChat} aria-label="Close chat" className="text-white/80 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.from === 'user'
                      ? 'gradient-bg text-white'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 p-3 dark:border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
              />
              <button
                onClick={sendMessage}
                aria-label="Send message"
                className="flex h-10 w-10 items-center justify-center rounded-lg gradient-bg text-white"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={toggleChat}
        aria-label="Open live chat"
        className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full gradient-bg text-white shadow-xl shadow-brand-500/30 transition-transform hover:scale-110 animate-pulse-glow"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  )
}
