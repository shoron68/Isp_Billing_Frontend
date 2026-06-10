import { Moon, Sun } from 'lucide-react'
import { useThemeContext } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
    >
      {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </button>
  )
}
