import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import projects from '../../data/projects'
import type { Project } from '../../data/projects'
import styles from './Projects.module.css'

gsap.registerPlugin(ScrollTrigger)

const TIER_CLASS: Record<'normal' | 'boss', string> = {
  normal: styles.cardNormal,
  boss:   styles.cardBoss,
}

const TIER_LABEL: Record<'normal' | 'boss', { label: string; color: string }> = {
  normal: { label: 'MOB',  color: '#94a3b8' },
  boss:   { label: 'BOSS', color: '#f87171' },
}

function MonsterDisplay({
  tier,
  hasImage,
  onClick,
}: {
  tier: 'normal' | 'boss'
  hasImage: boolean
  onClick: () => void
}): React.JSX.Element {
  return (
    <div
      className={`${styles.monsterDisplay} ${tier === 'boss' ? styles.monsterBoss : styles.monsterNormal}`}
      onClick={hasImage ? onClick : undefined}
      style={{ cursor: hasImage ? 'pointer' : 'default' }}
    >
      <div className={styles.monsterIcon}>{tier === 'boss' ? '👹' : '👾'}</div>
      {hasImage && (
        <div className={styles.screenshotHint}>[ click to view screenshot ]</div>
      )}
      <div className={styles.scanlines} />
    </div>
  )
}

function ProjectCard({
  project,
  onImageClick,
}: {
  project: Project
  onImageClick: (src: string) => void
}): React.JSX.Element {
  const tier = TIER_LABEL[project.tier]
  return (
    <div className={`${styles.card} ${TIER_CLASS[project.tier]}`}>
      <div className={styles.cardMeta}>
        <span className={styles.cardType}>{project.type}</span>
        <span className={styles.cardRarity} style={{ color: tier.color }}>{tier.label}</span>
      </div>

      <MonsterDisplay
        tier={project.tier}
        hasImage={!!project.image}
        onClick={() => project.image && onImageClick(project.image)}
      />

      <div className={styles.hpRow}>
        <span className={styles.hpLabel}>HP</span>
        {project.tier === 'boss' ? (
          <div className={styles.hpBar}><div className={styles.hpFill} /></div>
        ) : (
          <span className={styles.hpUnknown}>???</span>
        )}
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>
        {project.tags.length > 0 && (
          <div className={styles.cardTags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cardLink}
          >
            [ FIGHT ]
          </a>
        ) : (
          <span className={styles.cardLinkDisabled}>[ LOCKED ]</span>
        )}
      </div>
    </div>
  )
}

export default function Projects(): React.JSX.Element {
  const gridRef = useRef<HTMLDivElement>(null)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!gridRef.current) return
      const cards = gridRef.current.querySelectorAll(`.${styles.card}`)
      gsap.fromTo(
        cards,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!lightboxSrc) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightboxSrc(null) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxSrc])

  return (
    <section id="projects" className={styles.projects}>
      <p className={styles.sectionLabel}>Projects</p>
      <h2 className={styles.title}>Encounter Log</h2>

      <div ref={gridRef} className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onImageClick={setLightboxSrc} />
        ))}
      </div>

      {lightboxSrc && (
        <div className={styles.lightboxBackdrop} onClick={() => setLightboxSrc(null)}>
          <img
            src={lightboxSrc}
            alt="project screenshot"
            className={styles.lightboxImg}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
