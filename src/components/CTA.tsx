import { useContent } from '../context/ContentContext'
import { trackEvent } from '../utils/analytics'

export default function CTA() {
  const { content } = useContent()
  const { cta } = content

  const handleClick = (label: string) => {
    trackEvent({ action: 'cta_click', category: 'bottom_cta', label })
  }

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl gradient-bg px-8 py-16 text-center sm:px-16">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

          <div className="relative">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{cta.headline}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-blue-100">{cta.text}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="#pricing"
                onClick={() => handleClick(cta.buttonPrimary)}
                className="rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-brand-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                {cta.buttonPrimary}
              </a>
              <a
                href="#contact"
                onClick={() => handleClick(cta.buttonSecondary)}
                className="rounded-xl border-2 border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-white hover:bg-white/10"
              >
                {cta.buttonSecondary}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
