import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import PageTransition from '../components/PageTransition'
import VineSVG from '../components/VineSVG'
import styles from './About.module.css'

export default function About(): React.JSX.Element {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' }
      )
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', delay: 0.1 }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <PageTransition>
      <section className={styles.about}>
        <VineSVG position="top-right" width={160} height={220} opacity={0.4} />

        <p className={styles.sectionLabel}>About</p>
        <h2 className={styles.title}>Survivor Log</h2>

        <div className={styles.grid}>
          <div ref={leftRef} className={styles.photoWrapper}>
            {/* Replace src with actual photo path when available */}
            <div className={styles.photoPlaceholder} aria-hidden="true">[ PHOTO ]</div>
          </div>

          <div ref={rightRef} className={styles.bio}>
            <div className={styles.logCard}>
              <div className={styles.logLabel}>// Field Notes</div>
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
      </section>
    </PageTransition>
  )
}
