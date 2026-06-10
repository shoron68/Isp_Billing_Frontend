import { Link } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'

export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-950">
      <div className="w-full max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-bg text-lg font-bold text-white">
            N
          </div>
          <span className="text-2xl font-bold text-slate-900 dark:text-white">Nixor</span>
        </Link>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-700 dark:bg-slate-800">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
            <ShieldAlert className="h-7 w-7 text-amber-600" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Registration Closed
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Public account registration is not available. Only the site administrator can manage
            this website. Please use the contact form if you need to reach us.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href="/#contact"
              className="rounded-xl gradient-bg py-3 text-sm font-semibold text-white"
            >
              Contact Us
            </a>
            <Link
              to="/"
              className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
