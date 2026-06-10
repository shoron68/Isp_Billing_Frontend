import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'

const AUTH_KEY = 'nixor-admin-auth'

const ADMIN_EMAIL = 'mr.shoron.7514@gmail.com'
const ADMIN_PASSWORD = '12345678'

type AuthContextType = {
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

function getAdminCredentials() {
  return {
    email: (import.meta.env.VITE_ADMIN_EMAIL || ADMIN_EMAIL).toLowerCase().trim(),
    password: import.meta.env.VITE_ADMIN_PASSWORD || ADMIN_PASSWORD,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === 'true',
  )

  const login = useCallback((email: string, password: string) => {
    const creds = getAdminCredentials()
    const normalizedEmail = email.toLowerCase().trim()

    if (normalizedEmail === creds.email && password === creds.password) {
      sessionStorage.setItem(AUTH_KEY, 'true')
      setIsAuthenticated(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_KEY)
    setIsAuthenticated(false)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
