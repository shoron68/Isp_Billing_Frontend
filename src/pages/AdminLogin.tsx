import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail, ShieldAlert } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { trackEvent } from '../utils/analytics'

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isAuthenticated) navigate('/admin/dashboard', { replace: true })
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    trackEvent({ action: 'admin_login_attempt', category: 'auth' })

    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    const success = login(email, password)
    setLoading(false)

    if (success) {
      navigate('/admin/dashboard')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4 py-12">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/40 via-slate-900 to-slate-900" />
      </div>

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-bg text-lg font-bold text-white">
              N
            </div>
            <span className="text-2xl font-bold text-white">Nixor</span>
          </Link>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm text-red-400">
            <ShieldAlert className="h-4 w-4" />
            Admin Access Only
          </div>
          <h1 className="mt-4 text-2xl font-bold text-white">Administrator Login</h1>
          <p className="mt-2 text-slate-400">Sign in to manage all website content</p>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-8 shadow-2xl backdrop-blur">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
            )}

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border border-slate-600 bg-slate-900 py-2.5 pr-4 pl-10 text-sm text-white outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-slate-600 bg-slate-900 py-2.5 pr-10 pl-10 text-sm text-white outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl gradient-bg py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:scale-[1.02] disabled:opacity-70"
            >
              <ShieldAlert className="h-4 w-4" />
              {loading ? 'Signing in...' : 'Access Admin Panel'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            <Link to="/" className="text-brand-400 hover:text-brand-300">
              Back to website
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
