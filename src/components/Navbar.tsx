import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar(): React.JSX.Element {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('hero')

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'))
    const navH = 60

    const updateActive = () => {
      let current = sections[0]?.id ?? 'hero'
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= navH + 1) {
          current = section.id
        }
      }
      setActiveId(current)
    }

    window.addEventListener('scroll', updateActive, { passive: true })
    updateActive()
    return () => window.removeEventListener('scroll', updateActive)
  }, [])

  return (
    <>
      <nav className={styles.navbar}>
        <a href="#hero" className={styles.logo}>
          PONG<span>YA</span>NIN
        </a>

        <ul className={styles.links}>
          {NAV_LINKS.map(({ href, label }) => {
            const id = href.slice(1)
            return (
              <li key={href}>
                <a
                  href={href}
                  className={`${styles.link}${activeId === id ? ` ${styles.active}` : ''}`}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>

        <button
          className={styles.hamburger}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`${styles.overlay}${open ? ` ${styles.open}` : ''}`}>
        {NAV_LINKS.map(({ href, label }) => {
          const id = href.slice(1)
          return (
            <a
              key={href}
              href={href}
              className={`${styles.overlayLink}${activeId === id ? ` ${styles.active}` : ''}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          )
        })}
      </div>
    </>
  )
}
