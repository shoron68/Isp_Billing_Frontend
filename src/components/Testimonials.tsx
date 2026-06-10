import { Quote, Star } from 'lucide-react'
import { useContent } from '../context/ContentContext'

export default function Testimonials() {
  const { content } = useContent()
  const { testimonialsHeader, testimonials } = content

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase dark:text-brand-400">
            {testimonialsHeader.badge}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            {testimonialsHeader.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            {testimonialsHeader.subtitle}
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-brand-100 dark:text-brand-900" />
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-bg text-sm font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
