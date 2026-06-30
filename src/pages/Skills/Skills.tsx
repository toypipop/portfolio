import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import skills from '../../data/skills'
import type { Skill } from '../../data/skills'
import styles from './Skills.module.css'

gsap.registerPlugin(ScrollTrigger)

const SLOT_COLS = 10

function Pips({ level }: { level: 1 | 2 | 3 }): React.JSX.Element {
  return (
    <span className={styles.pips}>
      {([1, 2, 3] as const).map((n) => (
        <span key={n} className={n <= level ? styles.pipFilled : styles.pipEmpty}>◆</span>
      ))}
    </span>
  )
}

const LEVEL_CLASS: Record<1 | 2 | 3, string> = {
  1: styles.slotBronze,
  2: styles.slotSilver,
  3: styles.slotGold,
}

function ItemSlot({ skill }: { skill: Skill }): React.JSX.Element {
  return (
    <div className={`${styles.slot} ${LEVEL_CLASS[skill.level]}`}>
      <span className={styles.slotIcon}>{skill.icon}</span>
      <span className={styles.slotName}>{skill.name}</span>
      <div className={styles.tooltip}>
        <span className={styles.tooltipName}>{skill.name}</span>
      </div>
    </div>
  )
}

function EmptySlot(): React.JSX.Element {
  return <div className={`${styles.slot} ${styles.slotEmpty}`} />
}

export default function Skills(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return
      const slots = sectionRef.current.querySelectorAll(`.${styles.slot}:not(.${styles.slotEmpty})`)
      gsap.fromTo(
        slots,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.03,
          duration: 0.3,
          ease: 'back.out(1.2)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" className={styles.skills} ref={sectionRef}>
      <p className={styles.sectionLabel}>Skills</p>
      <h2 className={styles.title}>Inventory</h2>

      <div className={styles.inventory}>
        {skills.map((group) => {
          const remainder = group.items.length % SLOT_COLS
          const emptyCount = remainder === 0 ? 0 : SLOT_COLS - remainder

          return (
            <div key={group.category} className={styles.bag}>
              <div className={styles.bagHeader}>{group.category}</div>
              <div className={styles.slotGrid}>
                {group.items.map((skill) => (
                  <ItemSlot key={skill.name} skill={skill} />
                ))}
                {Array.from({ length: emptyCount }).map((_, i) => (
                  <EmptySlot key={`empty-${i}`} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
