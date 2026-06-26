import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './pages/Hero'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import './styles/globals.css'


function NotFound(): React.JSX.Element {
  return (
    <div style={{ padding: '120px 40px', textAlign: 'center', color: 'var(--color-text-dust)', fontFamily: 'var(--font-mono)' }}>
      <p style={{ color: 'var(--color-accent-bio)', letterSpacing: '4px', marginBottom: '16px' }}>// 404</p>
      <p style={{ marginBottom: '32px' }}>Signal lost. Page not found.</p>
      <Link to="/" style={{ color: 'var(--color-accent-bio)' }}>← Return to base</Link>
    </div>
  )
}

function AnimatedRoutes(): React.JSX.Element {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
    </BrowserRouter>
  )
}
