# Stardew Valley 8-bit Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the post-apocalyptic dark theme with a Stardew Valley daytime 8-bit aesthetic across the entire portfolio.

**Architecture:** All color values live in `tokens.css` — update tokens first, then each page/component consumes them automatically. Component changes are mechanical: remove old decorative components (VineSVG, SporeCanvas, GlitchText, BurnPhoto), update flavor text, rewrite CSS modules to use new tokens and pixel-sharp borders.

**Tech Stack:** React 18, TypeScript, CSS Modules, Google Fonts (Press Start 2P + VT323), Vitest + Testing Library

## Global Constraints

- Layout structure unchanged — only visual styling and text content changes
- `border-radius: 0` everywhere — pixel-sharp, no rounded corners
- No neon glow colors — warm gold/green shadows only
- Old component files (VineSVG, SporeCanvas, GlitchText, BurnPhoto) stay on disk — only imports removed
- Font sizes using Press Start 2P must be ~35% smaller than current clamp values (font renders larger)
- VT323 body text minimum `18px` for readability

---

### Task 1: Foundation — tokens, fonts, globals

**Files:**
- Modify: `index.html`
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/globals.css`

**Interfaces:**
- Produces: all new CSS custom properties consumed by every later task

- [ ] **Step 1: Update `index.html` — replace Google Fonts link**

Replace line 10 of `index.html`:
```html
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
```
With:
```html
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Rewrite `src/styles/tokens.css`**

Replace entire file content:
```css
:root {
  /* Backgrounds */
  --color-bg-main: #1c1208;
  --color-bg-alt: #0e1a08;
  --color-bg-nav: rgba(28, 18, 8, 0.96);
  --color-bg-overlay: rgba(14, 26, 8, 0.98);
  --color-card-bg: rgba(43, 29, 14, 0.7);

  /* Text */
  --color-text-primary: #f5e6b4;
  --color-text-secondary: #c9a96e;
  --color-text-muted: rgba(201, 169, 110, 0.5);

  /* Accents */
  --color-accent-gold: #f0c040;
  --color-accent-green: #6aaa38;
  --color-accent-coral: #e87a5a;

  /* Borders */
  --color-border-wood: #8b5e2c;
  --color-border-wood-light: rgba(139, 94, 44, 0.4);

  /* Warm glow */
  --color-gold-glow: rgba(240, 192, 64, 0.25);
  --color-gold-shadow: rgba(240, 192, 64, 0.15);

  /* Fonts */
  --font-heading: 'Press Start 2P', cursive;
  --font-mono: 'VT323', monospace;

  --navbar-height: 60px;
}
```

- [ ] **Step 3: Update `src/styles/globals.css` body background**

Change:
```css
body {
  background-color: var(--color-bg-overgrown);
```
To:
```css
body {
  background-color: var(--color-bg-main);
```

- [ ] **Step 4: Run tests — verify nothing broken**

Run: `npx vitest run`
Expected: same results as before (CSS-only changes don't affect render output)

- [ ] **Step 5: Commit**

```bash
git add index.html src/styles/tokens.css src/styles/globals.css
git commit -m "feat(theme): switch to Stardew Valley 8-bit token palette and fonts"
```

---

### Task 2: Hero page

**Files:**
- Modify: `src/pages/Hero/Hero.tsx`
- Modify: `src/pages/Hero/Hero.module.css`
- Modify: `src/pages/Hero/Hero.test.tsx`

**Interfaces:**
- Consumes: `--color-bg-main`, `--color-accent-gold`, `--color-accent-green`, `--color-border-wood`, `--font-heading`, `--font-mono` from Task 1

- [ ] **Step 1: Update Hero.test.tsx — change VIEW WORK to VIEW HARVEST**

Replace full file:
```tsx
import { render, screen } from '@testing-library/react'
import Hero from './Hero'

test('renders hero content', () => {
  render(<Hero />)
  expect(screen.getByText('PONGYANIN')).toBeInTheDocument()
  expect(screen.getByText('AUSSWAPIPOP')).toBeInTheDocument()
  expect(screen.getByText(/VIEW HARVEST/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run Hero test — verify it fails**

Run: `npx vitest run src/pages/Hero/Hero.test.tsx`
Expected: FAIL — Hero still renders "VIEW WORK"

- [ ] **Step 3: Replace Hero.tsx**

Replace full file:
```tsx
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
```

- [ ] **Step 4: Replace Hero.module.css**

Replace full file:
```css
.hero {
  scroll-snap-align: start;
  position: relative;
  min-height: calc(100vh - var(--navbar-height));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 60px 320px;
  overflow: hidden;
  background-color: var(--color-bg-main);
}

.content {
  position: relative;
  z-index: 2;
  max-width: 640px;
}

.contentInner {
  position: relative;
  z-index: 2;
}

.eyebrow {
  font-family: var(--font-mono);
  font-size: 20px;
  color: var(--color-accent-green);
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.eyebrow::before { content: '[ '; opacity: 0.7; }
.eyebrow::after  { content: ' ]'; opacity: 0.7; }

.name {
  font-family: var(--font-heading);
  font-size: clamp(22px, 3.5vw, 44px);
  font-weight: 400;
  color: var(--color-text-primary);
  line-height: 1.5;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.role {
  font-family: var(--font-mono);
  font-size: clamp(18px, 2vw, 24px);
  color: var(--color-text-secondary);
  letter-spacing: 6px;
  text-transform: uppercase;
  margin-bottom: 28px;
}

.role::after {
  content: '_';
  color: var(--color-accent-gold);
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.divider {
  width: 80px;
  height: 3px;
  background: var(--color-accent-gold);
  margin-bottom: 24px;
}

.summary {
  font-family: var(--font-mono);
  font-size: 20px;
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin-bottom: 40px;
  max-width: 480px;
}

.cta {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.btnPrimary {
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  background: transparent;
  border: 3px solid var(--color-accent-gold);
  color: var(--color-accent-gold);
  padding: 12px 32px;
  font-family: var(--font-mono);
  font-size: 20px;
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: background 200ms ease;
}

.btnPrimary:hover {
  background: var(--color-gold-shadow);
}

.btnSecondary {
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  background: transparent;
  border: 3px solid var(--color-border-wood);
  color: var(--color-text-primary);
  padding: 12px 32px;
  font-family: var(--font-mono);
  font-size: 20px;
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: border-color 200ms ease;
}

.btnSecondary:hover {
  border-color: var(--color-text-secondary);
}

@media (max-width: 768px) {
  .hero {
    padding: 40px 32px;
    align-items: center;
    text-align: center;
  }
  .cta { justify-content: center; }
}

@media (max-width: 480px) {
  .cta { flex-direction: column; align-items: stretch; }
  .btnPrimary, .btnSecondary { text-align: center; }
}
```

- [ ] **Step 5: Run Hero test — verify it passes**

Run: `npx vitest run src/pages/Hero/Hero.test.tsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/pages/Hero/Hero.tsx src/pages/Hero/Hero.module.css src/pages/Hero/Hero.test.tsx
git commit -m "feat(theme): Hero — remove SporeCanvas/GlitchText, apply Stardew style"
```

---

### Task 3: About page

**Files:**
- Modify: `src/pages/About/About.tsx`
- Modify: `src/pages/About/About.module.css`
- Modify: `src/pages/About/About.test.tsx`

**Interfaces:**
- Consumes: `--color-bg-alt`, `--color-accent-gold`, `--color-accent-green`, `--color-border-wood`, `--color-card-bg` from Task 1
- Note: `profile.png` lives at `src/assets/profile.png` — import it directly

- [ ] **Step 1: Update About.test.tsx**

Replace full file:
```tsx
import { render, screen } from '@testing-library/react'
import About from './About'

test('renders about content', () => {
  render(<About />)
  expect(screen.getByText("Farmer's Journal")).toBeInTheDocument()
  expect(screen.getByText(/PONGYANIN AUSSWAPIPOP/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run About test — verify it fails**

Run: `npx vitest run src/pages/About/About.test.tsx`
Expected: FAIL — About still renders "Survivor Log"

- [ ] **Step 3: Replace About.tsx**

Replace full file:
```tsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import profileImg from '../../assets/profile.png'
import styles from './About.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function About(): React.JSX.Element {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 80%' },
        }
      )
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', delay: 0.1,
          scrollTrigger: { trigger: rightRef.current, start: 'top 80%' },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className={styles.about}>
      <p className={styles.sectionLabel}>About</p>
      <h2 className={styles.title}>{"Farmer's Journal"}</h2>

      <div className={styles.grid}>
        <div ref={leftRef} className={styles.photoWrapper}>
          <img
            src={profileImg}
            alt="Pongyanin Ausswapipop"
            className={styles.photo}
          />
        </div>

        <div ref={rightRef} className={styles.bio}>
          <div className={styles.logCard}>
            <div className={styles.logLabel}>// Journal Entry</div>
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
  )
}
```

- [ ] **Step 4: Replace About.module.css**

Replace full file:
```css
.about {
  scroll-snap-align: start;
  position: relative;
  min-height: calc(100vh - var(--navbar-height));
  background-color: var(--color-bg-alt);
  padding: 80px 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sectionLabel {
  font-family: var(--font-mono);
  font-size: 20px;
  color: var(--color-accent-green);
  letter-spacing: 5px;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.sectionLabel::before { content: '// '; opacity: 0.6; }

.title {
  font-family: var(--font-heading);
  font-size: clamp(18px, 3vw, 32px);
  font-weight: 400;
  color: var(--color-text-primary);
  text-transform: uppercase;
  margin-bottom: 48px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 60px;
  align-items: start;
}

.photoWrapper {
  position: relative;
}

.photo {
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  display: block;
  border: 3px solid var(--color-border-wood);
}

.bio {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.logCard {
  border: 3px solid var(--color-border-wood);
  background: var(--color-card-bg);
  padding: 28px 32px;
}

.logLabel {
  font-family: var(--font-mono);
  font-size: 18px;
  color: var(--color-accent-green);
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 16px;
  opacity: 0.9;
}

.bioName {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text-primary);
  letter-spacing: 2px;
  margin-bottom: 8px;
  line-height: 1.6;
}

.bioRole {
  font-family: var(--font-mono);
  font-size: 18px;
  color: var(--color-accent-gold);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.bioText {
  font-family: var(--font-mono);
  font-size: 18px;
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .about { padding: 48px 32px; }
  .grid { grid-template-columns: 1fr; gap: 32px; }
}
```

- [ ] **Step 5: Run About test — verify it passes**

Run: `npx vitest run src/pages/About/About.test.tsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/pages/About/About.tsx src/pages/About/About.module.css src/pages/About/About.test.tsx
git commit -m "feat(theme): About — remove VineSVG/BurnPhoto, apply Stardew style"
```

---

### Task 4: Skills page

**Files:**
- Modify: `src/pages/Skills/Skills.tsx`
- Modify: `src/pages/Skills/Skills.module.css`

**Interfaces:**
- Consumes: `--color-bg-main`, `--color-accent-gold`, `--color-accent-green`, `--color-border-wood`, `--color-text-primary`, `--color-text-secondary` from Task 1

- [ ] **Step 1: Update Skills.tsx — remove VineSVG, change title to Inventory**

Replace the return statement in `src/pages/Skills/Skills.tsx`. Remove `import VineSVG from '../../components/VineSVG'` at the top and remove `<VineSVG ... />` from the JSX. Change the title text.

Full updated file:
```tsx
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
```

- [ ] **Step 2: Replace Skills.module.css**

Replace full file:
```css
.skills {
  scroll-snap-align: start;
  height: calc(100vh - var(--navbar-height));
  overflow-y: auto;
  background-color: var(--color-bg-main);
  padding: 48px 200px;
  position: relative;
}

.sectionLabel {
  font-family: var(--font-mono);
  font-size: 20px;
  color: var(--color-accent-green);
  letter-spacing: 5px;
  text-transform: uppercase;
  margin-bottom: 8px;
  position: relative;
  z-index: 1;
}

.sectionLabel::before { content: '// '; opacity: 0.6; }

.title {
  font-family: var(--font-heading);
  font-size: clamp(18px, 3vw, 32px);
  font-weight: 400;
  color: var(--color-text-primary);
  text-transform: uppercase;
  margin-bottom: 28px;
  position: relative;
  z-index: 1;
}

.group {
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
}

.groupHeader {
  font-family: var(--font-mono);
  font-size: 20px;
  color: var(--color-accent-gold);
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.vineDivider {
  width: 100%;
  height: 2px;
  background: var(--color-border-wood-light);
  margin-bottom: 12px;
}

.skillList {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0px 32px;
}

.skillRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid var(--color-border-wood-light);
}

.skillName {
  font-family: var(--font-mono);
  font-size: 18px;
  color: var(--color-text-primary);
  letter-spacing: 1px;
}

.pips {
  display: flex;
  gap: 5px;
  flex-shrink: 0;
}

.pipFilled {
  font-size: 10px;
  color: var(--color-accent-gold);
  text-shadow: 0 0 6px var(--color-gold-glow);
}

.pipEmpty {
  font-size: 10px;
  color: var(--color-border-wood);
}

@media (max-width: 768px) {
  .skills { padding: 48px 32px; }
  .skillList { grid-template-columns: repeat(2, 1fr); }
}
```

- [ ] **Step 3: Run Skills test**

Run: `npx vitest run src/pages/Skills`
Expected: PASS (test checks category/skill names, not title text)

- [ ] **Step 4: Commit**

```bash
git add src/pages/Skills/Skills.tsx src/pages/Skills/Skills.module.css
git commit -m "feat(theme): Skills — remove VineSVG, rename to Inventory, apply Stardew style"
```

---

### Task 5: Projects page

**Files:**
- Modify: `src/pages/Projects/Projects.tsx`
- Modify: `src/pages/Projects/Projects.module.css`
- Modify: `src/pages/Projects/Projects.test.tsx`

**Interfaces:**
- Consumes: `--color-bg-alt`, `--color-accent-gold`, `--color-border-wood`, `--color-card-bg` from Task 1

- [ ] **Step 1: Update Projects.test.tsx**

Replace full file:
```tsx
import { render, screen } from '@testing-library/react'
import Projects from './Projects'

test('renders projects page', () => {
  render(<Projects />)
  expect(screen.getByText('Harvest')).toBeInTheDocument()
  expect(screen.getByText('Payroll System')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run Projects test — verify it fails**

Run: `npx vitest run src/pages/Projects/Projects.test.tsx`
Expected: FAIL — Projects still renders "Field Work"

- [ ] **Step 3: Replace Projects.tsx**

Replace full file:
```tsx
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
```

- [ ] **Step 4: Replace Projects.module.css**

Replace full file:
```css
.projects {
  scroll-snap-align: start;
  min-height: calc(100vh - var(--navbar-height));
  background-color: var(--color-bg-alt);
  padding: 80px 320px;
  position: relative;
  overflow: hidden;
}

.sectionLabel {
  font-family: var(--font-mono);
  font-size: 20px;
  color: var(--color-accent-green);
  letter-spacing: 5px;
  text-transform: uppercase;
  margin-bottom: 12px;
  position: relative;
  z-index: 1;
}

.sectionLabel::before { content: '// '; opacity: 0.6; }

.title {
  font-family: var(--font-heading);
  font-size: clamp(18px, 3vw, 32px);
  font-weight: 400;
  color: var(--color-text-primary);
  text-transform: uppercase;
  margin-bottom: 48px;
  position: relative;
  z-index: 1;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
  position: relative;
  z-index: 1;
}

.card {
  border: 3px solid var(--color-border-wood);
  background: var(--color-card-bg);
  transition: border-color 200ms ease, transform 200ms ease;
  overflow: hidden;
}

.card:hover {
  border-color: var(--color-accent-gold);
  transform: scale(1.02);
}

.cardImage {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  object-position: left top;
  display: block;
}

.cardImagePlaceholder {
  width: 100%;
  aspect-ratio: 16/9;
  background: var(--color-bg-main);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 18px;
  color: var(--color-text-muted);
  letter-spacing: 2px;
  text-transform: uppercase;
  border-bottom: 2px solid var(--color-border-wood-light);
}

.cardBody {
  padding: 24px;
}

.cardTitle {
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 400;
  color: var(--color-text-primary);
  margin-bottom: 10px;
  line-height: 1.6;
}

.cardDesc {
  font-family: var(--font-mono);
  font-size: 18px;
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin-bottom: 16px;
}

.cardTags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.tag {
  font-family: var(--font-mono);
  font-size: 16px;
  color: var(--color-text-primary);
  background: rgba(139, 94, 44, 0.15);
  border: 2px solid var(--color-border-wood);
  padding: 3px 10px;
  letter-spacing: 1px;
}

.cardLink {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 18px;
  color: var(--color-accent-gold);
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  transition: opacity 200ms ease;
}

.cardLink:hover { opacity: 0.7; }

.cardLinkDisabled {
  font-family: var(--font-mono);
  font-size: 16px;
  color: var(--color-text-muted);
  letter-spacing: 2px;
  text-transform: uppercase;
}

@media (max-width: 768px) {
  .projects { padding: 48px 32px; }
  .grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 5: Run Projects test — verify it passes**

Run: `npx vitest run src/pages/Projects/Projects.test.tsx`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/pages/Projects/Projects.tsx src/pages/Projects/Projects.module.css src/pages/Projects/Projects.test.tsx
git commit -m "feat(theme): Projects — remove VineSVG, rename to Harvest, apply Stardew style"
```

---

### Task 6: Contact page

**Files:**
- Modify: `src/pages/Contact/Contact.tsx`
- Modify: `src/pages/Contact/Contact.module.css`

**Interfaces:**
- Consumes: `--color-bg-main`, `--color-accent-gold`, `--color-border-wood`, `--color-card-bg` from Task 1

- [ ] **Step 1: Replace Contact.tsx**

Replace full file:
```tsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Contact.module.css'

gsap.registerPlugin(ScrollTrigger)

const CONTACT_LINKS = [
  {
    href: null as string | null,
    label: 'GitHub',
    value: 'github.com/[username]',
    icon: '⌥',
  },
  {
    href: 'mailto:2509pipop4951pi@gmail.com',
    label: 'Email',
    value: '2509pipop4951pi@gmail.com',
    icon: '✉',
  },
  {
    href: null as string | null,
    label: 'Phone',
    value: '[coming soon]',
    icon: '◈',
  },
]

export default function Contact(): React.JSX.Element {
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!linksRef.current) return
      const items = linksRef.current.querySelectorAll(':scope > *')
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: linksRef.current, start: 'top 80%' },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" className={styles.contact}>
      <p className={styles.signal}>// Message Board</p>
      <h2 className={styles.title}>Contact</h2>
      <p className={styles.subtitle}>
        Leave a note at the bulletin board.
      </p>

      <div ref={linksRef} className={styles.links}>
        {CONTACT_LINKS.map(({ href, label, value, icon }) =>
          href ? (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={styles.link}
            >
              <span className={styles.linkIcon}>{icon}</span>
              <div className={styles.linkContent}>
                <div className={styles.linkLabel}>{label}</div>
                <div className={styles.linkValue}>{value}</div>
              </div>
            </a>
          ) : (
            <div key={label} className={`${styles.link} ${styles.linkDisabled}`}>
              <span className={styles.linkIcon}>{icon}</span>
              <div className={styles.linkContent}>
                <div className={styles.linkLabel}>{label}</div>
                <div className={styles.linkValue}>{value}</div>
              </div>
            </div>
          )
        )}
      </div>

      <div className={styles.footer}>
        © {new Date().getFullYear()} Pongyanin Ausswapipop
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Replace Contact.module.css**

Replace full file:
```css
.contact {
  scroll-snap-align: start;
  min-height: calc(100vh - var(--navbar-height));
  background-color: var(--color-bg-main);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.signal {
  font-family: var(--font-mono);
  font-size: 20px;
  color: var(--color-accent-green);
  letter-spacing: 5px;
  text-transform: uppercase;
  margin-bottom: 16px;
  opacity: 0.9;
}

.title {
  font-family: var(--font-heading);
  font-size: clamp(18px, 3vw, 32px);
  font-weight: 400;
  color: var(--color-text-primary);
  text-transform: uppercase;
  margin-bottom: 12px;
}

.subtitle {
  font-family: var(--font-mono);
  font-size: 20px;
  color: var(--color-text-secondary);
  margin-bottom: 60px;
  max-width: 360px;
  line-height: 1.8;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 380px;
}

.link {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 24px;
  border: 3px solid var(--color-border-wood);
  background: var(--color-card-bg);
  text-decoration: none;
  transition: border-color 200ms ease, background 200ms ease;
}

.link:hover {
  border-color: var(--color-accent-gold);
  background: rgba(240, 192, 64, 0.05);
}

.linkIcon {
  font-size: 20px;
  color: var(--color-accent-gold);
  width: 28px;
  text-align: center;
  flex-shrink: 0;
}

.linkContent {
  text-align: left;
}

.linkLabel {
  font-family: var(--font-mono);
  font-size: 16px;
  color: var(--color-accent-green);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 2px;
}

.linkValue {
  font-family: var(--font-mono);
  font-size: 18px;
  color: var(--color-text-primary);
  letter-spacing: 1px;
}

.linkDisabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

.footer {
  position: absolute;
  bottom: 24px;
  font-family: var(--font-mono);
  font-size: 16px;
  color: var(--color-text-muted);
  letter-spacing: 3px;
  text-transform: uppercase;
}
```

- [ ] **Step 3: Run Contact test**

Run: `npx vitest run src/pages/Contact/Contact.test.tsx`
Expected: PASS (test checks for "Contact", "GitHub", "Email", "Phone" — all unchanged)

- [ ] **Step 4: Commit**

```bash
git add src/pages/Contact/Contact.tsx src/pages/Contact/Contact.module.css
git commit -m "feat(theme): Contact — remove VineSVGs, update text, apply Stardew style"
```

---

### Task 7: Navbar

**Files:**
- Modify: `src/components/Navbar.module.css`

**Interfaces:**
- Consumes: `--color-bg-nav`, `--color-border-wood`, `--color-accent-gold`, `--color-text-primary`, `--color-text-secondary`, `--color-bg-overlay` from Task 1

- [ ] **Step 1: Replace Navbar.module.css**

Replace full file:
```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--navbar-height);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  background: var(--color-bg-nav);
  backdrop-filter: blur(4px);
  border-bottom: 3px solid var(--color-border-wood);
}

.logo {
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 400;
  color: var(--color-text-primary);
  letter-spacing: 3px;
  text-transform: uppercase;
  text-decoration: none;
}

.logo span {
  color: var(--color-accent-gold);
}

.links {
  display: flex;
  gap: 28px;
  list-style: none;
}

.link {
  font-family: var(--font-mono);
  font-size: 20px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 150ms ease;
  padding-bottom: 2px;
  border-bottom: 2px solid transparent;
}

.link:hover {
  color: var(--color-text-primary);
}

.link.active {
  color: var(--color-accent-gold);
  border-bottom-color: var(--color-accent-gold);
}

/* Hamburger — hidden on desktop */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-text-primary);
  transition: transform 200ms ease, opacity 200ms ease;
}

/* Mobile overlay */
.overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: var(--color-bg-overlay);
  z-index: 99;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
}

.overlay.open {
  display: flex;
}

.overlayLink {
  font-family: var(--font-heading);
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--color-text-primary);
  text-decoration: none;
}

.overlayLink.active {
  color: var(--color-accent-gold);
}

@media (max-width: 768px) {
  .links { display: none; }
  .hamburger { display: flex; }
}
```

- [ ] **Step 2: Run Navbar test**

Run: `npx vitest run src/components/Navbar.test.tsx`
Expected: PASS (CSS-only change, no render output affected)

- [ ] **Step 3: Run full suite**

Run: `npx vitest run`
Expected: 15/16 pass (pre-existing `projects.test.ts` count failure only)

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.module.css
git commit -m "feat(theme): Navbar — apply Stardew gold/wood style"
```

---

## Self-Review

**Spec coverage:**
- ✅ Color palette — Task 1 (tokens.css)
- ✅ Press Start 2P + VT323 fonts — Task 1 (index.html + tokens.css)
- ✅ Remove background images — Tasks 2-6 (all section CSS modules)
- ✅ Remove VineSVG — Tasks 3, 4, 5, 6
- ✅ Remove SporeCanvas — Task 2
- ✅ Remove GlitchText → plain h1 — Task 2
- ✅ Remove BurnPhoto → img — Task 3
- ✅ border-radius: 0, pixel-sharp borders — Tasks 2-7 (no border-radius in any CSS)
- ✅ Warm gold glow only — Tasks 2-7 (no neon, only `--color-gold-glow`)
- ✅ Flavor text: "VIEW HARVEST" — Task 2
- ✅ Flavor text: "Farmer's Journal" — Task 3
- ✅ Flavor text: "// Journal Entry" — Task 3
- ✅ Flavor text: "Inventory" — Task 4
- ✅ Flavor text: "Harvest" — Task 5
- ✅ Flavor text: "// Message Board" — Task 6
- ✅ Flavor text: "Leave a note at the bulletin board." — Task 6
- ✅ Section bg alternating — Tasks 2-6 (main/alt/main/alt/main)
- ✅ Old component files kept on disk — no delete steps in any task

**Placeholder scan:** No TBD, all code blocks complete.

**Type consistency:** `Skill` type from `skills.ts` used correctly in Skills.tsx Task 4 (`skill.name`, `skill.level`). `Project` type from `projects.ts` used correctly in Projects.tsx Task 5.
