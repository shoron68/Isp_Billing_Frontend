import {
  Cloud,
  Headphones,
  Layers,
  LineChart,
  Rocket,
  Sparkles,
} from 'lucide-react'
import { useContent } from '../context/ContentContext'

const reasonIcons = [Sparkles, Rocket, Layers, LineChart, Cloud, Headphones]

export default function WhyChoose() {
  const { content } = useContent()
  const { whyChooseHeader, whyChoose } = content

  return (
    <section id="why-nixor" className="bg-slate-50 py-20 lg:py-28 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase dark:text-brand-400">
            {whyChooseHeader.badge}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            {whyChooseHeader.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            {whyChooseHeader.subtitle}
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((reason, i) => {
            const Icon = reasonIcons[i % reasonIcons.length]
            return (
              <div key={reason.id} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl gradient-bg text-white shadow-lg shadow-brand-500/20">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{reason.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {reason.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
