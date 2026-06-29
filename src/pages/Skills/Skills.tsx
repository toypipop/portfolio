import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageTransition from '../../components/PageTransition'
import VineSVG from '../../components/VineSVG'
import skills from '../../data/skills'
import styles from './Skills.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Skills(): React.JSX.Element {
  const groupRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      groupRefs.current.forEach((group) => {
        if (!group) return
        const tags = group.querySelectorAll(`.${styles.tag}`)
        gsap.fromTo(
          tags,
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
    <PageTransition>
      <section className={styles.skills}>
        <VineSVG position="bottom-right" width={140} height={200} opacity={0.35} />

        <p className={styles.sectionLabel}>Skills</p>
        <h2 className={styles.title}>Arsenal</h2>

        {skills.map((group, i) => (
          <div
            key={group.category}
            className={styles.group}
            ref={(el) => { groupRefs.current[i] = el }}
          >
            <div className={styles.groupHeader}>{group.category}</div>
            <div className={styles.vineDivider} />
            <div className={styles.tags}>
              {group.items.map((item) => (
                <span key={item} className={styles.tag}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </PageTransition>
  )
}
