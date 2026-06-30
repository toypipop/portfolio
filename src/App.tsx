import Navbar from './components/Navbar'
import Hero from './pages/Hero/Hero'
import About from './pages/About/About'
import Skills from './pages/Skills/Skills'
import Projects from './pages/Projects/Projects'
import Contact from './pages/Contact/Contact'
import './styles/globals.css'

export default function App(): React.JSX.Element {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
