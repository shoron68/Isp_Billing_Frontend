import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ContentProvider } from './context/ContentContext'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LiveChat from './components/LiveChat'
import Home from './pages/Home'
import Login from './pages/Login'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import Register from './pages/Register'
import { initAnalytics, trackPageView } from './utils/analytics'

function PageTracker() {
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname)
    window.scrollTo(0, 0)
  }, [location.pathname])

  return null
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {children}
    </div>
  )
}

function MarketingLayout() {
  return (
    <Layout>
      <Navbar />
      <main>
        <Home />
      </main>
      <Footer />
      <LiveChat />
    </Layout>
  )
}

export default function App() {
  useEffect(() => {
    initAnalytics()
  }, [])

  return (
    <ThemeProvider>
      <ContentProvider>
        <AuthProvider>
          <BrowserRouter>
            <PageTracker />
            <Routes>
              <Route path="/" element={<MarketingLayout />} />
              <Route
                path="/login"
                element={
                  <Layout>
                    <Login />
                  </Layout>
                }
              />
              <Route
                path="/admin"
                element={
                  <Layout>
                    <AdminLogin />
                  </Layout>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <Layout>
                    <Register />
                  </Layout>
                }
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ContentProvider>
    </ThemeProvider>
  )
}
