import homeBg from '../../assets/home_bg.png'
import styles from './Hero.module.css'

export default function Hero(): React.JSX.Element {
  return (
    <section id="hero" className={styles.hero} style={{ backgroundImage: `url(${homeBg})` }}>
      <div className={styles.content}>
        <div className={styles.contentInner}>
          <p className={styles.eyebrow}>Web Developer · Chiang Mai</p>
          <h1 className={styles.name}>PONGYANIN</h1>
          <p className={styles.role}>AUSSWAPIPOP [V.1.26.7.1]</p>
          <div className={styles.divider} />
          <p className={styles.summary}>
            Backend-focused Web Developer with hands-on experience
            building full-stack applications.
            Crafting software with care, one commit at a time.
          </p>
          <div className={styles.cta}>
            <a href="#projects" className={styles.btnPrimary}>[ VIEW ENCOUNTERS ]</a>
            <a href="#contact" className={styles.btnSecondary}>CONTACT</a>
          </div>
        </div>
      </div>
    </section>
  )
}
