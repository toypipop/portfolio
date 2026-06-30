import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import profileImg from '../../assets/profile.png'
import realProfileImg from '../../assets/old_profile.png'
import styles from './About.module.css'

gsap.registerPlugin(ScrollTrigger)

function StatBar({ pct }: { pct: number }) {
  return (
    <span className={styles.statBar}>
      <span className={styles.statFill} style={{ width: `${pct}%` }} />
    </span>
  )
}

export default function About(): React.JSX.Element {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 80%' },
        }
      )
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', delay: 0.1,
          scrollTrigger: { trigger: rightRef.current, start: 'top 80%' },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!lightboxOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxOpen])

  return (
    <section id="about" className={styles.about}>
      <p className={styles.sectionLabel}>About</p>
      <h2 className={styles.title}>{"Character"}</h2>

      <div className={styles.grid}>
        <div ref={leftRef} className={styles.photoWrapper} onClick={() => setLightboxOpen(true)}>
          <img
            src={profileImg}
            alt="Pongyanin Ausswapipop"
            className={styles.photo}
          />
          <div className={styles.photoOverlay}>
            <div className={styles.overlayLabel}>// CHARACTER STATUS</div>
            <div className={styles.overlayName}>PONGYANIN</div>
            <div className={styles.overlayDivider} />
            <div className={styles.overlayStat}>
              <span className={styles.overlayKey}>CLASS</span>
              <span className={styles.overlayVal}>Backend Berserker</span>
            </div>
            <div className={styles.overlayStat}>
              <span className={styles.overlayKey}>LV</span>
              <span className={styles.overlayVal}>2+ yrs EXP</span>
            </div>
            <div className={styles.overlayStat}>
              <span className={styles.overlayKey}>HP</span>
              <span className={styles.overlayVal}>
                <StatBar pct={100} /> MAX
              </span>
            </div>
            <div className={styles.overlayStat}>
              <span className={styles.overlayKey}>STA</span>
              <span className={styles.overlayVal}>
                <StatBar pct={50} /> 50
              </span>
            </div>
            <div className={styles.overlayStat}>
              <span className={styles.overlayKey}>MANA</span>
              <span className={styles.overlayVal}>
                <StatBar pct={0} /> 0
              </span>
            </div>
            <div className={styles.overlayStat}>
              <span className={styles.overlayKey}>BUFF</span>
              <span className={styles.overlayVal}>Coffee +3 / Edamame +2</span>
            </div>
            <div className={styles.overlayHint}>[ Click to view real photo ]</div>
          </div>
        </div>

        <div ref={rightRef} className={styles.bio}>
          <div className={styles.logCard}>
            <div className={styles.logLabel}>// Combat Record</div>
            <div className={styles.bioName}>PONGYANIN AUSSWAPIPOP</div>
            <div className={styles.bioRole}>Backend-focused Web Developer</div>
            <p className={styles.bioText}>
              Backend-focused Web Developer with hands-on experience building full-stack
              applications using Django, Go, React, PostgreSQL, and Docker. Experienced
              in RESTful API development and modern web application architecture, with
              personal hands-on practice in CI/CD workflows, VPS deployment, and web
              infrastructure.
            </p>
            <p className={styles.bioText}>
              Currently at Softnetwork (Dec 2023 – Present), developing and maintaining
              full-stack web applications using Django and the MVT architecture. Implementing
              business workflows for loan, hire purchase, and asset management systems.
            </p>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div className={styles.lightboxBackdrop} onClick={() => setLightboxOpen(false)}>
          <img
            src={realProfileImg}
            alt="Pongyanin real photo"
            className={styles.lightboxImg}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
