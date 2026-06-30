import styles from './Hero.module.css'

export default function Hero(): React.JSX.Element {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.contentInner}>
          <p className={styles.eyebrow}>Web Developer · Chiang Mai</p>
          <h1 className={styles.name}>PONGYANIN</h1>
          <p className={styles.role}>AUSSWAPIPOP</p>
          <div className={styles.divider} />
          <p className={styles.summary}>
            Backend-focused Web Developer with hands-on experience building full-stack
            applications using Django, Go, React, PostgreSQL, and Docker.
            Crafting software with care, one commit at a time.
          </p>
          <div className={styles.cta}>
            <a href="#projects" className={styles.btnPrimary}>[ VIEW HARVEST ]</a>
            <a href="#contact" className={styles.btnSecondary}>CONTACT</a>
          </div>
        </div>
      </div>
    </section>
  )
}
