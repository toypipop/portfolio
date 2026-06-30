import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VineSVG from '../../components/VineSVG'
import styles from './Contact.module.css'

gsap.registerPlugin(ScrollTrigger)

const CONTACT_LINKS = [
  {
    href: null as string | null,
    label: 'GitHub',
    value: 'github.com/[username]',
    icon: '⌥',
  },
  {
    href: 'mailto:2509pipop4951pi@gmail.com',
    label: 'Email',
    value: '2509pipop4951pi@gmail.com',
    icon: '✉',
  },
  {
    href: null as string | null,
    label: 'Phone',
    value: '[coming soon]',
    icon: '◈',
  },
]

export default function Contact(): React.JSX.Element {
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!linksRef.current) return
      const items = linksRef.current.querySelectorAll('a, div[class]')
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          stagger: 0.12, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: linksRef.current, start: 'top 80%' },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" className={styles.contact}>
        <VineSVG position="top-right" width={140} height={200} opacity={0.4} />
        <VineSVG position="bottom-left" width={120} height={160} opacity={0.35} />

        <p className={styles.signal}>// Signal Detected</p>
        <h2 className={styles.title}>Contact</h2>
        <p className={styles.subtitle}>
          Transmission open. Find me through any of these channels.
        </p>

        <div ref={linksRef} className={styles.links}>
          {CONTACT_LINKS.map(({ href, label, value, icon }) =>
            href ? (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={styles.link}
              >
                <span className={styles.linkIcon}>{icon}</span>
                <div className={styles.linkContent}>
                  <div className={styles.linkLabel}>{label}</div>
                  <div className={styles.linkValue}>{value}</div>
                </div>
              </a>
            ) : (
              <div key={label} className={`${styles.link} ${styles.linkDisabled}`}>
                <span className={styles.linkIcon}>{icon}</span>
                <div className={styles.linkContent}>
                  <div className={styles.linkLabel}>{label}</div>
                  <div className={styles.linkValue}>{value}</div>
                </div>
              </div>
            )
          )}
        </div>

        <div className={styles.footer}>
          © {new Date().getFullYear()} Pongyanin Ausswapipop
        </div>
    </section>
  )
}
