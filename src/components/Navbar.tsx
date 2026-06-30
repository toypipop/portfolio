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
    const sections = document.querySelectorAll<HTMLElement>('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) return
        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        )
        setActiveId(topmost.target.id)
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0 }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <nav className={styles.navbar}>
        <a href="#hero" className={styles.logo}>
          PONGY<span>A</span>NIN
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
