import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import projects from '../../data/projects'
import type { Project } from '../../data/projects'
import styles from './Projects.module.css'

gsap.registerPlugin(ScrollTrigger)

function ProjectCard({ project }: { project: Project }): React.JSX.Element {
  return (
    <div className={styles.card}>
      {project.image ? (
        <img className={styles.cardImage} src={project.image} alt={project.title} />
      ) : (
        <div className={styles.cardImagePlaceholder}>[ screenshot ]</div>
      )}
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
            ↗ Live Demo
          </a>
        ) : (
          <span className={styles.cardLinkDisabled}>[ url coming soon ]</span>
        )}
      </div>
    </div>
  )
}

export default function Projects(): React.JSX.Element {
  const gridRef = useRef<HTMLDivElement>(null)

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
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" className={styles.projects}>
      <p className={styles.sectionLabel}>Projects</p>
      <h2 className={styles.title}>Harvest</h2>

      <div ref={gridRef} className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
