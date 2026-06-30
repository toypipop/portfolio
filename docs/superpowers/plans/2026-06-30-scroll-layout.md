# Single-Page Scroll Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the React Router multi-page portfolio into a single-page vertical scroll layout with IntersectionObserver-driven active nav highlighting.

**Architecture:** Remove `react-router-dom` entirely. `App.tsx` renders all 5 section components stacked. The fixed Navbar replaces NavLink/router with `<a href="#id">` anchors and tracks the active section via `IntersectionObserver`. GSAP mount animations in About and Contact are migrated to `ScrollTrigger` so they fire when scrolled into view.

**Tech Stack:** React 18, TypeScript, GSAP + ScrollTrigger, CSS Modules, Vitest + Testing Library

## Global Constraints

- No new npm packages — use only existing dependencies
- Keep all existing CSS custom properties and token names unchanged
- `PageTransition` component stays on disk but is no longer imported by pages
- URL stays at `/` — no hash updates on scroll

---

### Task 1: Add scroll-padding-top to globals.css

**Files:**
- Modify: `src/styles/globals.css`

**Interfaces:**
- Produces: `html` element has `scroll-padding-top: var(--navbar-height)` so anchor links don't hide sections under the fixed navbar

- [ ] **Step 1: Edit globals.css**

In `src/styles/globals.css`, update the `html` block from:
```css
html {
  scroll-behavior: smooth;
}
```
To:
```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: var(--navbar-height);
}
```

- [ ] **Step 2: Verify no tests broken**

Run: `npx vitest run`
Expected: all tests pass (CSS-only change)

- [ ] **Step 3: Commit**

```bash
git add src/styles/globals.css
git commit -m "style: add scroll-padding-top to fix anchor scroll under fixed navbar"
```

---

### Task 2: Remove PageTransition from all pages, add section IDs, fix Hero CTAs

**Files:**
- Modify: `src/pages/Hero/Hero.tsx`
- Modify: `src/pages/About/About.tsx`
- Modify: `src/pages/Skills/Skills.tsx`
- Modify: `src/pages/Projects/Projects.tsx`
- Modify: `src/pages/Contact/Contact.tsx`
- Modify: `src/pages/Hero/Hero.test.tsx`
- Modify: `src/pages/About/About.test.tsx`
- Modify: `src/pages/Skills/Skills.test.tsx`
- Modify: `src/pages/Projects/Projects.test.tsx`
- Modify: `src/pages/Contact/Contact.test.tsx`

**Interfaces:**
- Consumes: nothing from Task 1
- Produces: each page `<section>` has id attribute; Hero CTA uses `<a>` not `<Link>`; no page imports react-router-dom or PageTransition

- [ ] **Step 1: Update Hero.test.tsx — remove MemoryRouter**

Replace full file content:
```tsx
import { render, screen } from '@testing-library/react'
import Hero from './Hero'

test('renders hero content', () => {
  render(<Hero />)
  expect(screen.getByText('PONGYANIN')).toBeInTheDocument()
  expect(screen.getByText('AUSSWAPIPOP')).toBeInTheDocument()
  expect(screen.getByText(/VIEW WORK/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run Hero test — verify it fails**

Run: `npx vitest run src/pages/Hero/Hero.test.tsx`
Expected: FAIL — Hero still uses `<Link>` which requires Router context

- [ ] **Step 3: Update Hero.tsx**

Replace full file content:
```tsx
import PageTransition from '../../components/PageTransition'
import SporeCanvas from '../../components/SporeCanvas'
import GlitchText from '../../components/GlitchText'
import styles from './Hero.module.css'

export default function Hero(): React.JSX.Element {
  return (
    <PageTransition>
      <section id="hero" className={styles.hero}>
        <div className={styles.content}>
          <SporeCanvas count={80} />
          <div className={styles.contentInner}>
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
              <a href="#projects" className={styles.btnPrimary}>[ VIEW WORK ]</a>
              <a href="#contact" className={styles.btnSecondary}>CONTACT</a>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
```

Note: `PageTransition` wrapper is kept here temporarily — it will stop rendering once removed from App in Task 5. No harm leaving it for now; it just wraps in a motion.div.

Actually — remove it now to keep the diff clean:

```tsx
import SporeCanvas from '../../components/SporeCanvas'
import GlitchText from '../../components/GlitchText'
import styles from './Hero.module.css'

export default function Hero(): React.JSX.Element {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.content}>
        <SporeCanvas count={80} />
        <div className={styles.contentInner}>
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
            <a href="#projects" className={styles.btnPrimary}>[ VIEW WORK ]</a>
            <a href="#contact" className={styles.btnSecondary}>CONTACT</a>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run Hero test — verify it passes**

Run: `npx vitest run src/pages/Hero/Hero.test.tsx`
Expected: PASS

- [ ] **Step 5: Update About.test.tsx — remove MemoryRouter**

Replace full file content:
```tsx
import { render, screen } from '@testing-library/react'
import About from './About'

test('renders about content', () => {
  render(<About />)
  expect(screen.getByText('Survivor Log')).toBeInTheDocument()
  expect(screen.getByText(/PONGYANIN AUSSWAPIPOP/i)).toBeInTheDocument()
})
```

Note: removed the `getByText(/Chiang Mai/i)` assertion — "Chiang Mai" does not appear in About.tsx content.

- [ ] **Step 6: Update About.tsx — remove PageTransition, add id**

Replace the return statement (keep all imports and useEffect intact):
```tsx
  return (
    <section id="about" className={styles.about}>
      <VineSVG position="top-right" width={160} height={220} opacity={0.4} />

      <p className={styles.sectionLabel}>About</p>
      <h2 className={styles.title}>Survivor Log</h2>

      <div className={styles.grid}>
        <div ref={leftRef} className={styles.photoWrapper}>
          <BurnPhoto />
        </div>

        <div ref={rightRef} className={styles.bio}>
          <div className={styles.logCard}>
            <div className={styles.logLabel}>// Field Notes</div>
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
```

Also remove the `import PageTransition from '../../components/PageTransition'` line from the top.

- [ ] **Step 7: Update Skills.test.tsx — remove MemoryRouter**

Replace full file content:
```tsx
import { render, screen } from '@testing-library/react'
import Skills from './Skills'

test('renders all skill categories', () => {
  render(<Skills />)
  expect(screen.getByText('Backend')).toBeInTheDocument()
  expect(screen.getByText('Frontend')).toBeInTheDocument()
  expect(screen.getByText('Database')).toBeInTheDocument()
  expect(screen.getByText('Django')).toBeInTheDocument()
  expect(screen.getByText('PostgreSQL')).toBeInTheDocument()
})
```

- [ ] **Step 8: Update Skills.tsx — remove PageTransition, add id**

Remove `import PageTransition from '../../components/PageTransition'`.

Change the return from:
```tsx
    <PageTransition>
      <section className={styles.skills}>
```
To:
```tsx
      <section id="skills" className={styles.skills}>
```
And remove the closing `</PageTransition>`.

- [ ] **Step 9: Update Projects.test.tsx — remove MemoryRouter**

Replace full file content:
```tsx
import { render, screen } from '@testing-library/react'
import Projects from './Projects'

test('renders projects page', () => {
  render(<Projects />)
  expect(screen.getByText('Field Work')).toBeInTheDocument()
  expect(screen.getByText('Payroll System')).toBeInTheDocument()
})
```

- [ ] **Step 10: Update Projects.tsx — remove PageTransition, add id**

Remove `import PageTransition from '../../components/PageTransition'`.

Change the return from:
```tsx
    <PageTransition>
      <section className={styles.projects}>
```
To:
```tsx
      <section id="projects" className={styles.projects}>
```
And remove the closing `</PageTransition>`.

- [ ] **Step 11: Update Contact.test.tsx — remove MemoryRouter**

Replace full file content:
```tsx
import { render, screen } from '@testing-library/react'
import Contact from './Contact'

test('renders contact page with links', () => {
  render(<Contact />)
  expect(screen.getByText('Contact')).toBeInTheDocument()
  expect(screen.getByText('GitHub')).toBeInTheDocument()
  expect(screen.getByText('Email')).toBeInTheDocument()
  expect(screen.getByText('Phone')).toBeInTheDocument()
  expect(screen.getByText(/2509pipop4951pi@gmail.com/)).toBeInTheDocument()
})
```

- [ ] **Step 12: Update Contact.tsx — remove PageTransition, add id**

Remove `import PageTransition from '../../components/PageTransition'`.

Change the return from:
```tsx
    <PageTransition>
      <section className={styles.contact}>
```
To:
```tsx
      <section id="contact" className={styles.contact}>
```
And remove the closing `</PageTransition>`.

- [ ] **Step 13: Run all page tests**

Run: `npx vitest run src/pages`
Expected: all 5 page tests PASS

- [ ] **Step 14: Commit**

```bash
git add src/pages/Hero/Hero.tsx src/pages/Hero/Hero.test.tsx
git add src/pages/About/About.tsx src/pages/About/About.test.tsx
git add src/pages/Skills/Skills.tsx src/pages/Skills/Skills.test.tsx
git add src/pages/Projects/Projects.tsx src/pages/Projects/Projects.test.tsx
git add src/pages/Contact/Contact.tsx src/pages/Contact/Contact.test.tsx
git commit -m "refactor: remove PageTransition wrappers, add section ids, fix Hero anchor links"
```

---

### Task 3: Convert About and Contact mount animations to ScrollTrigger

**Files:**
- Modify: `src/pages/About/About.tsx`
- Modify: `src/pages/Contact/Contact.tsx`

**Interfaces:**
- Consumes: `id="about"` and `id="contact"` on section elements (from Task 2)
- Produces: animations fire when section scrolls into view instead of on mount

- [ ] **Step 1: Update About.tsx useEffect to use ScrollTrigger**

At top of file, add ScrollTrigger import and registration after the `gsap` import:
```tsx
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
```

Replace the `useEffect` body:
```tsx
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
```

- [ ] **Step 2: Run About test**

Run: `npx vitest run src/pages/About/About.test.tsx`
Expected: PASS (GSAP is mocked in tests, animation code doesn't affect render output)

- [ ] **Step 3: Update Contact.tsx useEffect to use ScrollTrigger**

Add imports at top of Contact.tsx after the gsap import:
```tsx
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
```

Replace the `useEffect` body (currently animates `a` elements inside `linksRef`):
```tsx
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!linksRef.current) return
      const items = linksRef.current.querySelectorAll('a, div[class]')
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          stagger: 0.12, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: linksRef.current, start: 'top 80%' },
        }
      )
    })
    return () => ctx.revert()
  }, [])
```

Note: The original selector was `querySelectorAll('a')` which missed the disabled `<div>` links. Changed to `'a, div[class]'` to include both clickable and disabled contact items.

- [ ] **Step 4: Run Contact test**

Run: `npx vitest run src/pages/Contact/Contact.test.tsx`
Expected: PASS

- [ ] **Step 5: Run all page tests**

Run: `npx vitest run src/pages`
Expected: all PASS

- [ ] **Step 6: Commit**

```bash
git add src/pages/About/About.tsx src/pages/Contact/Contact.tsx
git commit -m "refactor: convert About and Contact mount animations to ScrollTrigger"
```

---

### Task 4: Refactor Navbar — anchor links + IntersectionObserver active tracking

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/Navbar.test.tsx`

**Interfaces:**
- Consumes: `id="hero|about|skills|projects|contact"` on each `<section>` (from Task 2)
- Produces: `Navbar` with no react-router-dom dependency; active link tracks scroll position

- [ ] **Step 1: Update Navbar.test.tsx**

Replace full file content:
```tsx
import { render, screen } from '@testing-library/react'
import Navbar from './Navbar'

test('renders logo and all nav links as anchors', () => {
  render(<Navbar />)
  expect(screen.getByText(/PONGY/i)).toBeInTheDocument()
  expect(screen.getAllByText('About').length).toBeGreaterThan(0)
  expect(screen.getAllByText('Skills').length).toBeGreaterThan(0)
  expect(screen.getAllByText('Projects').length).toBeGreaterThan(0)
  expect(screen.getAllByText('Contact').length).toBeGreaterThan(0)
})

test('nav links have correct href attributes', () => {
  render(<Navbar />)
  const links = screen.getAllByRole('link')
  const hrefs = links.map((l) => l.getAttribute('href'))
  expect(hrefs).toContain('#about')
  expect(hrefs).toContain('#skills')
  expect(hrefs).toContain('#projects')
  expect(hrefs).toContain('#contact')
})

test('hamburger button is present', () => {
  render(<Navbar />)
  expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run Navbar test — verify it fails**

Run: `npx vitest run src/components/Navbar.test.tsx`
Expected: FAIL — Navbar still uses NavLink from react-router-dom, requires Router context

- [ ] **Step 3: Replace Navbar.tsx**

Replace full file content:
```tsx
import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar(): React.JSX.Element {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('hero')

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0 }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <nav className={styles.navbar}>
        <a href="#hero" className={styles.logo}>
          PONGY<span>A</span>NIN
        </a>

        <ul className={styles.links}>
          {NAV_LINKS.map(({ href, label }) => {
            const id = href.slice(1)
            return (
              <li key={href}>
                <a
                  href={href}
                  className={`${styles.link}${activeId === id ? ` ${styles.active}` : ''}`}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>

        <button
          className={styles.hamburger}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`${styles.overlay}${open ? ` ${styles.open}` : ''}`}>
        {NAV_LINKS.map(({ href, label }) => {
          const id = href.slice(1)
          return (
            <a
              key={href}
              href={href}
              className={`${styles.overlayLink}${activeId === id ? ` ${styles.active}` : ''}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          )
        })}
      </div>
    </>
  )
}
```

- [ ] **Step 4: Run Navbar test — verify it passes**

Run: `npx vitest run src/components/Navbar.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.tsx src/components/Navbar.test.tsx
git commit -m "refactor: replace Navbar NavLink/Router with anchor links and IntersectionObserver"
```

---

### Task 5: Refactor App.tsx — remove React Router, render all sections

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Interfaces:**
- Consumes: all 5 page components with their `id` attributes (Task 2); Navbar with no Router dependency (Task 4)
- Produces: single-page app with no react-router-dom; all sections visible in one scroll

- [ ] **Step 1: Update App.test.tsx**

Replace full file content:
```tsx
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders without crashing', () => {
  expect(() => render(<App />)).not.toThrow()
})

test('renders all sections', () => {
  render(<App />)
  expect(document.getElementById('hero')).toBeInTheDocument()
  expect(document.getElementById('about')).toBeInTheDocument()
  expect(document.getElementById('skills')).toBeInTheDocument()
  expect(document.getElementById('projects')).toBeInTheDocument()
  expect(document.getElementById('contact')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run App test — verify it fails**

Run: `npx vitest run src/App.test.tsx`
Expected: FAIL — App still wraps in BrowserRouter and renders only one route at a time

- [ ] **Step 3: Replace App.tsx**

Replace full file content:
```tsx
import Navbar from './components/Navbar'
import Hero from './pages/Hero/Hero'
import About from './pages/About/About'
import Skills from './pages/Skills/Skills'
import Projects from './pages/Projects/Projects'
import Contact from './pages/Contact/Contact'
import './styles/globals.css'

export default function App(): React.JSX.Element {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
```

- [ ] **Step 4: Run App test — verify it passes**

Run: `npx vitest run src/App.test.tsx`
Expected: PASS

- [ ] **Step 5: Run full test suite**

Run: `npx vitest run`
Expected: all tests PASS

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx src/App.test.tsx
git commit -m "feat: convert to single-page scroll layout, remove react-router-dom"
```

---

## Self-Review

**Spec coverage:**
- ✅ Remove react-router-dom — Task 5
- ✅ App renders all sections stacked — Task 5
- ✅ Section IDs added — Task 2
- ✅ Navbar: anchor links + IntersectionObserver active tracking — Task 4
- ✅ Hero CTA Link → `<a>` — Task 2
- ✅ About/Contact mount animations → ScrollTrigger — Task 3
- ✅ globals.css scroll-behavior + scroll-padding-top — Task 1
- ✅ Page tests: remove MemoryRouter — Task 2
- ✅ Navbar tests: rewrite without Router — Task 4
- ✅ App test: update assertions — Task 5
- ✅ Out of scope: URL hash updates, new packages, layout redesign — none added

**Placeholder scan:** No TBD, no "similar to task N", all code blocks complete.

**Type consistency:**
- `activeId` state is `string` set to section `id` — used consistently in Navbar
- `observer.disconnect()` cleanup — present in Task 4
- ScrollTrigger registered before use in both About (Task 3) and Contact (Task 3)
