import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import skills from '../../data/skills'
import styles from './Skills.module.css'

gsap.registerPlugin(ScrollTrigger)

function Pips({ level }: { level: 1 | 2 | 3 }): React.JSX.Element {
  return (
    <span className={styles.pips} aria-label={`Level ${level} of 3`}>
      {([1, 2, 3] as const).map((n) => (
        <span key={n} className={n <= level ? styles.pipFilled : styles.pipEmpty}>◆</span>
      ))}
    </span>
  )
}

export default function Skills(): React.JSX.Element {
  const groupRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      groupRefs.current.forEach((group) => {
        if (!group) return
        const rows = group.querySelectorAll(`.${styles.skillRow}`)
        gsap.fromTo(
          rows,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 85%',
            },
          }
        )
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" className={styles.skills}>
      <p className={styles.sectionLabel}>Skills</p>
      <h2 className={styles.title}>Inventory</h2>

      {skills.map((group, i) => (
        <div
          key={group.category}
          className={styles.group}
          ref={(el) => { groupRefs.current[i] = el }}
        >
          <div className={styles.groupHeader}>{group.category}</div>
          <div className={styles.vineDivider} />
          <div className={styles.skillList}>
            {group.items.map((skill) => (
              <div key={skill.name} className={styles.skillRow}>
                <span className={styles.skillName}>{skill.name}</span>
                <Pips level={skill.level} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
