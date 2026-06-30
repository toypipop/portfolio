import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import skills from '../../data/skills'
import type { Skill } from '../../data/skills'
import styles from './Skills.module.css'

gsap.registerPlugin(ScrollTrigger)

const SLOT_WIDTH = 62
const SLOT_GAP = 4

const LEVEL_CLASS: Record<1 | 2 | 3, string> = {
  1: styles.slotSilver,
  2: styles.slotGold,
  3: styles.slotRainbow,
}

const RARITY: Record<1 | 2 | 3, { label: string; color: string }> = {
  1: { label: 'COMMON',    color: '#94a3b8' },
  2: { label: 'RARE',      color: '#f0c040' },
  3: { label: 'LEGENDARY', color: '#e879f9' },
}

function ItemSlot({ skill }: { skill: Skill }): React.JSX.Element {
  const rarity = RARITY[skill.level]
  return (
    <div className={`${styles.slot} ${LEVEL_CLASS[skill.level]}`}>
      <span className={styles.slotIcon}>{skill.icon}</span>
      <span className={styles.slotName}>{skill.name}</span>
      <div className={styles.tooltip}>
        <span className={styles.tooltipName}>{skill.name}</span>
        <span className={styles.tooltipRarity} style={{ color: rarity.color }}>
          {rarity.label}
        </span>
        <div className={styles.tooltipPips}>
          {[1, 2, 3].map((p) => (
            <span key={p} className={p <= skill.level ? styles.pipFilled : styles.pipEmpty}>●</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function EmptySlot(): React.JSX.Element {
  return <div className={`${styles.slot} ${styles.slotEmpty}`} />
}

export default function Skills(): React.JSX.Element {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRefs = useRef<(HTMLDivElement | null)[]>([])
  const [emptyCounts, setEmptyCounts] = useState<number[]>(skills.map(() => 0))

  useEffect(() => {
    const recalc = () => {
      setEmptyCounts(
        skills.map((group, i) => {
          const grid = gridRefs.current[i]
          if (!grid) return 0
          const cols = Math.floor((grid.clientWidth + SLOT_GAP) / (SLOT_WIDTH + SLOT_GAP))
          if (cols <= 0) return 0
          const remainder = group.items.length % cols
          return remainder === 0 ? 0 : cols - remainder
        })
      )
    }

    const ro = new ResizeObserver(recalc)
    gridRefs.current.forEach((g) => g && ro.observe(g))
    recalc()
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return
      const slots = sectionRef.current.querySelectorAll(
        `.${styles.slot}:not(.${styles.slotEmpty})`
      )
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
        {skills.map((group, i) => (
          <div key={group.category} className={styles.bag}>
            <div className={styles.bagHeader}>{group.category}</div>
            <div
              className={styles.slotGrid}
              ref={(el) => { gridRefs.current[i] = el }}
            >
              {group.items.map((skill) => (
                <ItemSlot key={skill.name} skill={skill} />
              ))}
              {Array.from({ length: emptyCounts[i] ?? 0 }).map((_, j) => (
                <EmptySlot key={j} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
