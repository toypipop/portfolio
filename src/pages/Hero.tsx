import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import VineSVG from '../components/VineSVG'
import SporeCanvas from '../components/SporeCanvas'
import GlitchText from '../components/GlitchText'
import styles from './Hero.module.css'

export default function Hero(): React.JSX.Element {
  return (
    <PageTransition>
      <section className={styles.hero}>
        <SporeCanvas count={50} />
        <VineSVG position="top-right" width={200} height={280} opacity={0.7} />
        <VineSVG position="bottom-left" width={160} height={220} opacity={0.55} />

        <div className={styles.content}>
          <p className={styles.eyebrow}>Web Developer · Chiang Mai</p>
          <GlitchText tag="h1" className={styles.name}>PONGYANIN</GlitchText>
          <p className={styles.role}>AUSSWAPIPOP</p>
          <div className={styles.divider} />
          <p className={styles.summary}>
            Backend-focused Web Developer with hands-on experience building full-stack
            applications using Django, Go, React, PostgreSQL, and Docker.
            Systems built to last through the collapse.
          </p>
          <div className={styles.cta}>
            <Link to="/projects" className={styles.btnPrimary}>[ VIEW WORK ]</Link>
            <Link to="/contact" className={styles.btnSecondary}>CONTACT</Link>
          </div>
        </div>

      </section>
    </PageTransition>
  )
}
