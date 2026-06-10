import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useContent } from '../context/ContentContext'

export default function FAQ() {
  const { content } = useContent()
  const { faqHeader, faq } = content
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-slate-50 py-20 lg:py-28 dark:bg-slate-900/50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase dark:text-brand-400">
            {faqHeader.badge}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            {faqHeader.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">{faqHeader.subtitle}</p>
        </div>

        <div className="mt-12 space-y-3">
          {faq.map((item, index) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
              >
                <span className="pr-4 font-medium text-slate-900 dark:text-white">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="border-t border-slate-100 px-6 py-4 dark:border-slate-700">
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
