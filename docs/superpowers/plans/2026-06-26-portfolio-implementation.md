# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a post-apocalyptic TLoU2-themed portfolio site for Pongyanin Ausswapipop using React 19 + TypeScript + Vite with GSAP animations, Framer Motion page transitions, and SVG vine decorations.

**Architecture:** Single-page React app with React Router v6 client-side routing. Five pages share a fixed Navbar via a Layout wrapper. GSAP handles per-element animations and vine SVG path draws; Framer Motion handles page-level transitions. No SSR, no backend.

**Tech Stack:** React 19, TypeScript, Vite 8, React Router v6, GSAP 3 + ScrollTrigger, Framer Motion, Vitest + @testing-library/react

## Global Constraints

- Node target: ES2020+
- CSS: plain CSS modules — no Tailwind, no CSS-in-JS
- Fonts: Space Grotesk + JetBrains Mono from Google Fonts CDN (loaded in `index.html`)
- Colors: always reference `var(--color-*)` tokens from `tokens.css`, never hardcode hex
- GSAP cleanup: every `useEffect` that registers GSAP animations must return a cleanup that calls `.revert()` or `.kill()`
- All SVG vine elements animated with `stroke-dashoffset` starting at `getTotalLength()` → 0
- Canvas particle count: capped at 50

---

## File Map

| File | Responsibility |
|---|---|
| `src/styles/tokens.css` | CSS custom properties for all design tokens |
| `src/styles/globals.css` | Reset, base typography, body background |
| `src/data/skills.ts` | Typed skill group data |
| `src/data/projects.ts` | Typed project list |
| `src/components/VineSVG.tsx` | Reusable positioned vine SVG |
| `src/components/SporeCanvas.tsx` | Canvas particle effect |
| `src/components/GlitchText.tsx` | GSAP glitch text wrapper |
| `src/components/PageTransition.tsx` | Framer Motion page wrapper |
| `src/components/Navbar.tsx` | Fixed top navigation |
| `src/pages/Hero.tsx` | `/` — hero page |
| `src/pages/About.tsx` | `/about` — two-column bio |
| `src/pages/Skills.tsx` | `/skills` — tag grid |
| `src/pages/Projects.tsx` | `/projects` — card grid |
| `src/pages/Contact.tsx` | `/contact` — icon links |
| `src/App.tsx` | Router setup + Layout |
| `index.html` | Font CDN links |

---

## Task 1: Foundation — deps, tokens, styles, test setup

**Files:**
- Modify: `package.json`
- Modify: `index.html`
- Create: `src/styles/tokens.css`
- Create: `src/styles/globals.css`
- Modify: `src/main.tsx`
- Create: `src/App.tsx` (shell only)
- Create: `vite.config.ts` (add test config)

**Interfaces:**
- Produces: CSS custom properties `--color-bg-ruin`, `--color-bg-overgrown`, `--color-text-bleached`, `--color-text-dust`, `--color-text-dust-light`, `--color-accent-bio`, `--color-accent-vine`, `--color-danger-rust` — available globally

- [ ] **Step 1: Install dependencies**

```bash
npm install react-router-dom framer-motion gsap
npm install -D vitest @testing-library/react @testing-library/jest-dom @vitest/coverage-v8 jsdom
```

Expected: `node_modules/` updated, no peer dep errors

- [ ] **Step 2: Update package.json name and add test script**

In `package.json`, change `"name": "temp-react"` → `"name": "portfolio"` and add `"test": "vitest"` to scripts:

```json
{
  "name": "portfolio",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "oxlint"
  }
}
```

- [ ] **Step 3: Configure Vitest in vite.config.ts**

Replace `vite.config.ts` entirely:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
})
```

- [ ] **Step 4: Create test setup file**

Create `src/test-setup.ts`:

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Add fonts to index.html**

In `index.html`, add inside `<head>` before the closing `</head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
```

- [ ] **Step 6: Create tokens.css**

Create `src/styles/tokens.css`:

```css
:root {
  --color-bg-ruin: #1a1a14;
  --color-bg-overgrown: #2b2d1e;
  --color-text-bleached: #d4c9a8;
  --color-text-dust: #b5a07a;
  --color-text-dust-light: #c4b898;
  --color-accent-bio: #5a8c7a;
  --color-accent-vine: #4a6741;
  --color-danger-rust: #a85c3a;

  --font-heading: 'Space Grotesk', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --navbar-height: 60px;
}
```

- [ ] **Step 7: Create globals.css**

Create `src/styles/globals.css`:

```css
@import './tokens.css';

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-bg-overgrown);
  color: var(--color-text-dust-light);
  font-family: var(--font-mono);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  color: var(--color-text-bleached);
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  cursor: pointer;
  font-family: inherit;
}

main {
  padding-top: var(--navbar-height);
  min-height: 100vh;
}
```

- [ ] **Step 8: Create shell App.tsx**

Replace `src/App.tsx` entirely:

```tsx
import './styles/globals.css'

export default function App() {
  return <div>Portfolio — coming soon</div>
}
```

- [ ] **Step 9: Update main.tsx**

Replace `src/main.tsx` entirely:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 10: Write smoke test**

Create `src/App.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders without crashing', () => {
  render(<App />)
  expect(screen.getByText(/Portfolio/i)).toBeInTheDocument()
})
```

- [ ] **Step 11: Run tests**

```bash
npm test
```

Expected: 1 test passes

- [ ] **Step 12: Run dev server, confirm fonts load**

```bash
npm run dev
```

Open browser → check DevTools Network tab → `fonts.googleapis.com` request present

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "feat: project foundation — tokens, globals, fonts, test setup"
```

---

## Task 2: Data files

**Files:**
- Create: `src/data/skills.ts`
- Create: `src/data/projects.ts`

**Interfaces:**
- Produces:
  - `SkillGroup: { category: string; items: string[] }`
  - `skills: SkillGroup[]` (default export)
  - `Project: { id: string; title: string; description: string; tags: string[]; url: string | null; image: string | null }`
  - `projects: Project[]` (default export)

- [ ] **Step 1: Create skills.ts**

Create `src/data/skills.ts`:

```ts
export interface SkillGroup {
  category: string
  items: string[]
}

const skills: SkillGroup[] = [
  {
    category: 'Backend',
    items: ['Python', 'Django', 'REST API', 'Go', 'Gin'],
  },
  {
    category: 'Frontend',
    items: ['JavaScript', 'TypeScript', 'React', 'HTML', 'CSS', 'Axios', 'SPA Routing'],
  },
  {
    category: 'Database',
    items: ['PostgreSQL', 'MySQL', 'SQL Server', 'Schema Migration', 'Query Optimization'],
  },
  {
    category: 'DevOps & Infrastructure',
    items: [
      'Docker', 'Docker Compose', 'Nginx', 'Caddy',
      'GitHub Actions CI/CD', 'Linux (Ubuntu)',
      'VPS Deployment', 'Reverse Proxy',
      'AWS EC2', 'AWS IAM', 'AWS VPC', 'AWS ECR',
    ],
  },
  {
    category: 'Tools',
    items: ['Git', 'Postman', 'Git Workflow', 'AI-assisted Development'],
  },
]

export default skills
```

- [ ] **Step 2: Create projects.ts**

Create `src/data/projects.ts`:

```ts
export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  url: string | null
  image: string | null
}

const projects: Project[] = [
  {
    id: 'payroll',
    title: 'Payroll System',
    description:
      'Full-stack payroll web application. Manages employee records, salary calculation, and monthly payslip generation.',
    tags: ['Django', 'React', 'PostgreSQL', 'Docker'],
    url: null,   // TODO: add live URL
    image: null, // TODO: add screenshot path e.g. '/projects/payroll.png'
  },
  {
    id: 'placeholder-1',
    title: 'Coming Soon',
    description: 'Project details coming soon.',
    tags: [],
    url: null,
    image: null,
  },
  {
    id: 'placeholder-2',
    title: 'Coming Soon',
    description: 'Project details coming soon.',
    tags: [],
    url: null,
    image: null,
  },
]

export default projects
```

- [ ] **Step 3: Write data tests**

Create `src/data/skills.test.ts`:

```ts
import skills from './skills'

test('skills has 5 categories', () => {
  expect(skills).toHaveLength(5)
})

test('every category has at least one item', () => {
  skills.forEach(g => expect(g.items.length).toBeGreaterThan(0))
})
```

Create `src/data/projects.test.ts`:

```ts
import projects from './projects'

test('projects has 3 entries', () => {
  expect(projects).toHaveLength(3)
})

test('every project has id and title', () => {
  projects.forEach(p => {
    expect(p.id).toBeTruthy()
    expect(p.title).toBeTruthy()
  })
})
```

- [ ] **Step 4: Run tests**

```bash
npm test
```

Expected: 5 tests pass

- [ ] **Step 5: Commit**

```bash
git add src/data/
git commit -m "feat: add skills and projects data"
```

---

## Task 3: Shared visual components — VineSVG, SporeCanvas, GlitchText, PageTransition

**Files:**
- Create: `src/components/VineSVG.tsx`
- Create: `src/components/SporeCanvas.tsx`
- Create: `src/components/GlitchText.tsx`
- Create: `src/components/PageTransition.tsx`
- Create: `src/components/VineSVG.module.css`
- Create: `src/components/SporeCanvas.module.css`
- Create: `src/components/GlitchText.module.css`

**Interfaces:**
- Produces:
  - `VineSVG`: `({ position: 'top-right' | 'bottom-left' | 'top-left' | 'bottom-right', opacity?: number }) => JSX.Element`
  - `SporeCanvas`: `({ count?: number }) => JSX.Element`
  - `GlitchText`: `({ children: string, tag?: 'h1'|'h2'|'span', className?: string }) => JSX.Element`
  - `PageTransition`: `({ children: React.ReactNode }) => JSX.Element`

- [ ] **Step 1: Create VineSVG.module.css**

Create `src/components/VineSVG.module.css`:

```css
.vine {
  position: absolute;
  pointer-events: none;
  z-index: 1;
}

.vine.topRight {
  top: 0;
  right: 0;
}

.vine.bottomLeft {
  bottom: 0;
  left: 0;
}

.vine.topLeft {
  top: 0;
  left: 0;
}

.vine.bottomRight {
  bottom: 0;
  right: 0;
}
```

- [ ] **Step 2: Create VineSVG.tsx**

Create `src/components/VineSVG.tsx`:

```tsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './VineSVG.module.css'

interface VineSVGProps {
  position: 'top-right' | 'bottom-left' | 'top-left' | 'bottom-right'
  width?: number
  height?: number
  opacity?: number
}

const positionClass: Record<VineSVGProps['position'], string> = {
  'top-right': styles.topRight,
  'bottom-left': styles.bottomLeft,
  'top-left': styles.topLeft,
  'bottom-right': styles.bottomRight,
}

export default function VineSVG({ position, width = 200, height = 280, opacity = 0.7 }: VineSVGProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const isRight = position.includes('right')
  const isBottom = position.includes('bottom')

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const paths = svg.querySelectorAll('path[data-vine]')
    const ctx = gsap.context(() => {
      paths.forEach((path) => {
        const el = path as SVGPathElement
        const length = el.getTotalLength()
        gsap.set(el, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(el, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.out',
          delay: Math.random() * 0.4,
        })
      })
    }, svg)
    return () => ctx.revert()
  }, [])

  const scaleX = isRight ? 1 : -1
  const scaleY = isBottom ? -1 : 1
  const transform = `scale(${scaleX}, ${scaleY})`

  return (
    <svg
      ref={svgRef}
      className={`${styles.vine} ${positionClass[position]}`}
      width={width}
      height={height}
      viewBox={`0 0 200 280`}
      fill="none"
      aria-hidden="true"
      style={{ opacity, transform, transformOrigin: 'center center' }}
    >
      {/* Main climbing stem */}
      <path
        data-vine
        d="M200 0 C180 35 190 75 168 108 C150 135 162 165 140 192 C124 212 136 244 114 268"
        stroke="var(--color-accent-vine)"
        strokeWidth="1.8"
        fill="none"
        opacity="0.75"
      />
      {/* Secondary stem */}
      <path
        data-vine
        d="M200 0 C196 45 184 88 174 118 C162 148 168 178 152 204"
        stroke="var(--color-accent-vine)"
        strokeWidth="1"
        fill="none"
        opacity="0.45"
      />
      {/* Tendrils */}
      <path
        data-vine
        d="M168 108 C152 94 136 98 132 112"
        stroke="var(--color-accent-vine)"
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />
      <path
        data-vine
        d="M140 192 C122 176 106 180 102 196"
        stroke="var(--color-accent-vine)"
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />
      <path
        data-vine
        d="M152 204 C172 192 184 202 180 216"
        stroke="var(--color-accent-vine)"
        strokeWidth="0.8"
        fill="none"
        opacity="0.4"
      />
      {/* Leaves */}
      <path d="M168 108 C152 94 136 98 132 112 C148 104 160 106 168 108Z" fill="var(--color-accent-vine)" opacity="0.55" />
      <path d="M140 192 C122 176 106 180 102 196 C118 188 130 190 140 192Z" fill="var(--color-accent-vine)" opacity="0.5" />
      <path d="M152 204 C172 192 184 202 180 216 C170 206 160 204 152 204Z" fill="var(--color-accent-vine)" opacity="0.45" />
      {/* Bioluminescent spore dots */}
      <circle cx="168" cy="108" r="2.5" fill="var(--color-accent-bio)" opacity="0.6" />
      <circle cx="140" cy="192" r="2" fill="var(--color-accent-bio)" opacity="0.5" />
      <circle cx="114" cy="268" r="3" fill="var(--color-accent-bio)" opacity="0.4" />
      <circle cx="152" cy="204" r="1.5" fill="var(--color-accent-bio)" opacity="0.45" />
    </svg>
  )
}
```

- [ ] **Step 3: Create SporeCanvas.module.css**

Create `src/components/SporeCanvas.module.css`:

```css
.canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}
```

- [ ] **Step 4: Create SporeCanvas.tsx**

Create `src/components/SporeCanvas.tsx`:

```tsx
import { useEffect, useRef } from 'react'
import styles from './SporeCanvas.module.css'

interface Spore {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  alphaDir: number
}

interface SporeCanvasProps {
  count?: number
}

export default function SporeCanvas({ count = 50 }: SporeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let spores: Spore[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const init = () => {
      spores = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.1,
        radius: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      spores.forEach((s) => {
        s.x += s.vx
        s.y += s.vy
        s.alpha += 0.003 * s.alphaDir
        if (s.alpha > 0.6 || s.alpha < 0.05) s.alphaDir *= -1
        if (s.x < 0) s.x = canvas.width
        if (s.x > canvas.width) s.x = 0
        if (s.y < 0) s.y = canvas.height
        if (s.y > canvas.height) s.y = 0

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(90, 140, 122, ${s.alpha})`
        ctx.shadowBlur = 6
        ctx.shadowColor = 'rgba(90, 140, 122, 0.8)'
        ctx.fill()
        ctx.shadowBlur = 0
      })
      animId = requestAnimationFrame(draw)
    }

    resize()
    init()
    draw()

    const observer = new ResizeObserver(() => {
      resize()
      init()
    })
    observer.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      observer.disconnect()
    }
  }, [count])

  return <canvas ref={canvasRef} className={styles.canvas} />
}
```

- [ ] **Step 5: Create GlitchText.module.css**

Create `src/components/GlitchText.module.css`:

```css
.glitch {
  position: relative;
  display: inline-block;
}
```

- [ ] **Step 6: Create GlitchText.tsx**

Create `src/components/GlitchText.tsx`:

```tsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './GlitchText.module.css'

interface GlitchTextProps {
  children: string
  tag?: 'h1' | 'h2' | 'span'
  className?: string
}

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#'

export default function GlitchText({ children, tag: Tag = 'h1', className }: GlitchTextProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const original = children
    let frame = 0
    let rafId: number

    const scramble = () => {
      el.textContent = original
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          if (i < Math.floor(frame / 3)) return original[i]
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        })
        .join('')
      frame++
      if (frame < original.length * 3) rafId = requestAnimationFrame(scramble)
      else el.textContent = original
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.2,
          onComplete: () => {
            frame = 0
            scramble()
          },
        }
      )
    }, el)

    return () => {
      ctx.revert()
      cancelAnimationFrame(rafId)
    }
  }, [children])

  return (
    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
    <Tag ref={ref as any} className={`${styles.glitch}${className ? ` ${className}` : ''}`}>
      {children}
    </Tag>
  )
}
```

- [ ] **Step 7: Create PageTransition.tsx**

Create `src/components/PageTransition.tsx`:

```tsx
import { motion } from 'framer-motion'

interface PageTransitionProps {
  children: React.ReactNode
}

const variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 8: Write smoke tests for shared components**

Create `src/components/VineSVG.test.tsx`:

```tsx
import { render } from '@testing-library/react'
import VineSVG from './VineSVG'

test('renders vine SVG for each position', () => {
  const positions = ['top-right', 'bottom-left', 'top-left', 'bottom-right'] as const
  positions.forEach((pos) => {
    const { container } = render(<VineSVG position={pos} />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
```

Create `src/components/PageTransition.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import PageTransition from './PageTransition'

test('renders children', () => {
  render(<PageTransition><p>hello</p></PageTransition>)
  expect(screen.getByText('hello')).toBeInTheDocument()
})
```

- [ ] **Step 9: Run tests**

```bash
npm test
```

Expected: all tests pass (canvas/GSAP are no-ops in jsdom)

- [ ] **Step 10: Commit**

```bash
git add src/components/
git commit -m "feat: add VineSVG, SporeCanvas, GlitchText, PageTransition components"
```

---

## Task 4: App router + Layout + Navbar

**Files:**
- Create: `src/components/Navbar.tsx`
- Create: `src/components/Navbar.module.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `PageTransition` from Task 3
- Produces: `<App />` — full router with all routes registered, `<Navbar />` rendered on every page

- [ ] **Step 1: Create Navbar.module.css**

Create `src/components/Navbar.module.css`:

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
  background: rgba(26, 26, 20, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-accent-vine);
}

.logo {
  font-family: var(--font-heading);
  font-size: 16px;
  font-weight: 900;
  color: var(--color-text-bleached);
  letter-spacing: 4px;
  text-transform: uppercase;
  text-decoration: none;
}

.logo span {
  color: var(--color-accent-bio);
  text-shadow: 0 0 8px rgba(90, 140, 122, 0.5);
}

.links {
  display: flex;
  gap: 28px;
  list-style: none;
}

.link {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--color-text-dust);
  text-decoration: none;
  transition: color 150ms ease;
  padding-bottom: 2px;
  border-bottom: 1px solid transparent;
}

.link:hover {
  color: var(--color-text-bleached);
}

.link.active {
  color: var(--color-accent-bio);
  border-bottom-color: var(--color-accent-bio);
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
  background: var(--color-text-bleached);
  transition: transform 200ms ease, opacity 200ms ease;
}

/* Mobile overlay */
.overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(26, 26, 20, 0.98);
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
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--color-text-bleached);
  text-decoration: none;
}

.overlayLink.active {
  color: var(--color-accent-bio);
}

@media (max-width: 768px) {
  .links {
    display: none;
  }

  .hamburger {
    display: flex;
  }
}
```

- [ ] **Step 2: Create Navbar.tsx**

Create `src/components/Navbar.tsx`:

```tsx
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.link}${isActive ? ` ${styles.active}` : ''}`

  const getOverlayClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.overlayLink}${isActive ? ` ${styles.active}` : ''}`

  return (
    <>
      <nav className={styles.navbar}>
        <NavLink to="/" className={styles.logo}>
          PONGY<span>A</span>NIN
        </NavLink>

        <ul className={styles.links}>
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'} className={getLinkClass}>
                {label}
              </NavLink>
            </li>
          ))}
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

      {/* Mobile overlay */}
      <div className={`${styles.overlay}${open ? ` ${styles.open}` : ''}`}>
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={getOverlayClass}
            onClick={() => setOpen(false)}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </>
  )
}
```

- [ ] **Step 3: Update App.tsx with full router**

Replace `src/App.tsx` entirely:

```tsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './pages/Hero'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import './styles/globals.css'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
    </BrowserRouter>
  )
}
```

- [ ] **Step 4: Create page stubs** (needed for App to compile)

Create `src/pages/Hero.tsx`:

```tsx
export default function Hero() {
  return <div style={{ padding: '40px', color: 'var(--color-text-bleached)' }}>Hero</div>
}
```

Create `src/pages/About.tsx`:

```tsx
export default function About() {
  return <div style={{ padding: '40px', color: 'var(--color-text-bleached)' }}>About</div>
}
```

Create `src/pages/Skills.tsx`:

```tsx
export default function Skills() {
  return <div style={{ padding: '40px', color: 'var(--color-text-bleached)' }}>Skills</div>
}
```

Create `src/pages/Projects.tsx`:

```tsx
export default function Projects() {
  return <div style={{ padding: '40px', color: 'var(--color-text-bleached)' }}>Projects</div>
}
```

Create `src/pages/Contact.tsx`:

```tsx
export default function Contact() {
  return <div style={{ padding: '40px', color: 'var(--color-text-bleached)' }}>Contact</div>
}
```

- [ ] **Step 5: Write Navbar test**

Create `src/components/Navbar.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

test('renders logo and all nav links', () => {
  render(<MemoryRouter><Navbar /></MemoryRouter>)
  expect(screen.getByText(/PONGY/i)).toBeInTheDocument()
  expect(screen.getAllByText('About').length).toBeGreaterThan(0)
  expect(screen.getAllByText('Skills').length).toBeGreaterThan(0)
  expect(screen.getAllByText('Projects').length).toBeGreaterThan(0)
  expect(screen.getAllByText('Contact').length).toBeGreaterThan(0)
})

test('hamburger button is present', () => {
  render(<MemoryRouter><Navbar /></MemoryRouter>)
  expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument()
})
```

- [ ] **Step 6: Run tests**

```bash
npm test
```

Expected: all tests pass

- [ ] **Step 7: Run dev, verify routing**

```bash
npm run dev
```

Navigate to `/about`, `/skills`, `/projects`, `/contact` — each shows stub text, navbar highlights active link

- [ ] **Step 8: Commit**

```bash
git add src/App.tsx src/components/Navbar.tsx src/components/Navbar.module.css src/pages/
git commit -m "feat: add router, layout, and navbar with mobile overlay"
```

---

## Task 5: Hero page

**Files:**
- Modify: `src/pages/Hero.tsx`
- Create: `src/pages/Hero.module.css`

**Interfaces:**
- Consumes: `VineSVG` (position prop), `SporeCanvas`, `GlitchText`, `PageTransition`

- [ ] **Step 1: Create Hero.module.css**

Create `src/pages/Hero.module.css`:

```css
.hero {
  position: relative;
  min-height: calc(100vh - var(--navbar-height));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 60px 80px;
  overflow: hidden;
  background-color: var(--color-bg-overgrown);
  background-size: cover;
  background-position: center;
}

/* Dark overlay on top of bg image */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(26, 26, 20, 0.65);
  z-index: 0;
}

.content {
  position: relative;
  z-index: 2;
  max-width: 640px;
}

.eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-accent-bio);
  letter-spacing: 5px;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.eyebrow::before { content: '[ '; opacity: 0.6; }
.eyebrow::after  { content: ' ]'; opacity: 0.6; }

.name {
  font-family: var(--font-heading);
  font-size: clamp(40px, 7vw, 80px);
  font-weight: 900;
  color: var(--color-text-bleached);
  line-height: 1;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.role {
  font-family: var(--font-mono);
  font-size: clamp(12px, 2vw, 16px);
  color: var(--color-text-dust);
  letter-spacing: 8px;
  text-transform: uppercase;
  margin-bottom: 28px;
}

.role::after {
  content: '|';
  color: var(--color-accent-bio);
  margin-left: 2px;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.divider {
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, var(--color-accent-bio), var(--color-accent-vine), transparent);
  margin-bottom: 24px;
}

.summary {
  font-size: 14px;
  color: var(--color-text-dust-light);
  line-height: 1.9;
  margin-bottom: 40px;
  max-width: 480px;
}

.cta {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.btnPrimary {
  background: transparent;
  border: 1px solid var(--color-accent-bio);
  color: var(--color-accent-bio);
  padding: 12px 32px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 3px;
  text-transform: uppercase;
  box-shadow: 0 0 16px rgba(90, 140, 122, 0.2);
  transition: box-shadow 200ms ease, background 200ms ease;
}

.btnPrimary:hover {
  background: rgba(90, 140, 122, 0.1);
  box-shadow: 0 0 28px rgba(90, 140, 122, 0.4);
}

.btnSecondary {
  background: transparent;
  border: 1px solid rgba(212, 201, 168, 0.3);
  color: var(--color-text-bleached);
  padding: 12px 32px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 3px;
  text-transform: uppercase;
  transition: border-color 200ms ease;
}

.btnSecondary:hover {
  border-color: rgba(212, 201, 168, 0.6);
}

.scrollHint {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-mono);
  font-size: 10px;
  color: rgba(212, 201, 168, 0.35);
  letter-spacing: 4px;
  text-transform: uppercase;
  animation: bounce 2s ease-in-out infinite;
  z-index: 2;
}

.scrollHint::after {
  content: ' ↓';
  color: var(--color-accent-bio);
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%       { transform: translateX(-50%) translateY(6px); }
}

@media (max-width: 768px) {
  .hero {
    padding: 40px 24px;
    align-items: center;
    text-align: center;
  }

  .cta {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .cta {
    flex-direction: column;
    align-items: stretch;
  }

  .btnPrimary,
  .btnSecondary {
    text-align: center;
  }
}
```

- [ ] **Step 2: Implement Hero.tsx**

Replace `src/pages/Hero.tsx` entirely:

```tsx
import { useNavigate } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import VineSVG from '../components/VineSVG'
import SporeCanvas from '../components/SporeCanvas'
import GlitchText from '../components/GlitchText'
import styles from './Hero.module.css'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <section className={styles.hero}>
        <SporeCanvas count={50} />
        <VineSVG position="top-right" width={200} height={280} opacity={0.7} />
        <VineSVG position="bottom-left" width={160} height={220} opacity={0.55} />

        <div className={styles.content}>
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
            <button className={styles.btnPrimary} onClick={() => navigate('/projects')}>
              [ VIEW WORK ]
            </button>
            <button className={styles.btnSecondary} onClick={() => navigate('/contact')}>
              CONTACT
            </button>
          </div>
        </div>

        <span className={styles.scrollHint}>SCROLL</span>
      </section>
    </PageTransition>
  )
}
```

- [ ] **Step 3: Write Hero smoke test**

Create `src/pages/Hero.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Hero from './Hero'

test('renders hero content', () => {
  render(<MemoryRouter><Hero /></MemoryRouter>)
  expect(screen.getByText('PONGYANIN')).toBeInTheDocument()
  expect(screen.getByText('AUSSWAPIPOP')).toBeInTheDocument()
  expect(screen.getByText(/VIEW WORK/i)).toBeInTheDocument()
})
```

- [ ] **Step 4: Run tests**

```bash
npm test
```

Expected: all pass

- [ ] **Step 5: Visual check in browser**

```bash
npm run dev
```

Verify: vine SVGs in corners, spore particles drifting, glitch animation on "PONGYANIN", typewriter cursor on role

- [ ] **Step 6: Commit**

```bash
git add src/pages/Hero.tsx src/pages/Hero.module.css
git commit -m "feat: implement Hero page with GSAP glitch, vine SVGs, spore canvas"
```

---

## Task 6: About page

**Files:**
- Modify: `src/pages/About.tsx`
- Create: `src/pages/About.module.css`

**Interfaces:**
- Consumes: `PageTransition`, `VineSVG`

- [ ] **Step 1: Create About.module.css**

Create `src/pages/About.module.css`:

```css
.about {
  min-height: calc(100vh - var(--navbar-height));
  background: var(--color-bg-ruin);
  padding: 80px 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sectionLabel {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-accent-bio);
  letter-spacing: 5px;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.sectionLabel::before { content: '// '; opacity: 0.5; }

.title {
  font-family: var(--font-heading);
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 900;
  color: var(--color-text-bleached);
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
  border: 1px solid var(--color-accent-vine);
  box-shadow: 0 0 40px rgba(74, 103, 65, 0.2);
  display: block;
}

.photoPlaceholder {
  width: 100%;
  aspect-ratio: 3/4;
  background: var(--color-bg-overgrown);
  border: 1px solid var(--color-accent-vine);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-dust);
  letter-spacing: 3px;
  text-transform: uppercase;
  box-shadow: 0 0 40px rgba(74, 103, 65, 0.2);
}

.bio {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.logCard {
  border: 1px solid rgba(74, 103, 65, 0.3);
  background: rgba(43, 45, 30, 0.4);
  padding: 28px 32px;
}

.logLabel {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--color-accent-vine);
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 16px;
  opacity: 0.8;
}

.bioName {
  font-family: var(--font-heading);
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text-bleached);
  letter-spacing: 2px;
  margin-bottom: 4px;
}

.bioRole {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-accent-bio);
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.bioText {
  font-size: 13px;
  color: var(--color-text-dust-light);
  line-height: 1.9;
  margin-bottom: 20px;
}

.coords {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-dust);
  letter-spacing: 2px;
  border-top: 1px solid rgba(74, 103, 65, 0.2);
  padding-top: 16px;
}

.coords span { color: var(--color-accent-bio); }

@media (max-width: 768px) {
  .about {
    padding: 48px 24px;
  }

  .grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .photoPlaceholder {
    aspect-ratio: 1/1;
  }
}
```

- [ ] **Step 2: Implement About.tsx**

Replace `src/pages/About.tsx` entirely:

```tsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import PageTransition from '../components/PageTransition'
import VineSVG from '../components/VineSVG'
import styles from './About.module.css'

export default function About() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' }
      )
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', delay: 0.1 }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <PageTransition>
      <section className={styles.about} style={{ position: 'relative', overflow: 'hidden' }}>
        <VineSVG position="top-right" width={160} height={220} opacity={0.4} />

        <p className={styles.sectionLabel}>About</p>
        <h2 className={styles.title}>Survivor Log</h2>

        <div className={styles.grid}>
          <div ref={leftRef} className={styles.photoWrapper}>
            {/* Replace src with actual photo path when available */}
            <div className={styles.photoPlaceholder}>[ PHOTO ]</div>
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
              <div className={styles.coords}>
                Location: <span>Chiang Mai 50120</span>
                &nbsp;&nbsp;·&nbsp;&nbsp;
                <span>18.7953° N, 98.9932° E</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
```

- [ ] **Step 3: Write About test**

Create `src/pages/About.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import About from './About'

test('renders about content', () => {
  render(<MemoryRouter><About /></MemoryRouter>)
  expect(screen.getByText('Survivor Log')).toBeInTheDocument()
  expect(screen.getByText(/PONGYANIN AUSSWAPIPOP/i)).toBeInTheDocument()
  expect(screen.getByText(/Chiang Mai/i)).toBeInTheDocument()
})
```

- [ ] **Step 4: Run tests + visual check**

```bash
npm test
npm run dev
```

Navigate to `/about` — two columns, left col slides from left, right col from right

- [ ] **Step 5: Commit**

```bash
git add src/pages/About.tsx src/pages/About.module.css
git commit -m "feat: implement About page with two-column bio layout"
```

---

## Task 7: Skills page

**Files:**
- Modify: `src/pages/Skills.tsx`
- Create: `src/pages/Skills.module.css`

**Interfaces:**
- Consumes: `skills` from `src/data/skills.ts`, `SkillGroup` type, `PageTransition`, `VineSVG`

- [ ] **Step 1: Create Skills.module.css**

Create `src/pages/Skills.module.css`:

```css
.skills {
  min-height: calc(100vh - var(--navbar-height));
  background: var(--color-bg-overgrown);
  padding: 80px 80px;
  position: relative;
  overflow: hidden;
}

.sectionLabel {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-accent-bio);
  letter-spacing: 5px;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.sectionLabel::before { content: '// '; opacity: 0.5; }

.title {
  font-family: var(--font-heading);
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 900;
  color: var(--color-text-bleached);
  text-transform: uppercase;
  margin-bottom: 60px;
}

.group {
  margin-bottom: 48px;
}

.groupHeader {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-accent-bio);
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.vineDivider {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, var(--color-accent-vine), rgba(74, 103, 65, 0.3), transparent);
  margin-bottom: 20px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-bleached);
  background: rgba(74, 103, 65, 0.1);
  border: 1px solid var(--color-accent-vine);
  padding: 6px 16px;
  letter-spacing: 1px;
  transition: background 200ms ease, border-color 200ms ease;
}

.tag:hover {
  background: rgba(74, 103, 65, 0.2);
  border-color: var(--color-accent-bio);
}

@media (max-width: 768px) {
  .skills {
    padding: 48px 24px;
  }
}
```

- [ ] **Step 2: Implement Skills.tsx**

Replace `src/pages/Skills.tsx` entirely:

```tsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageTransition from '../components/PageTransition'
import VineSVG from '../components/VineSVG'
import skills from '../data/skills'
import styles from './Skills.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
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
```

- [ ] **Step 3: Write Skills test**

Create `src/pages/Skills.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Skills from './Skills'

test('renders all skill categories', () => {
  render(<MemoryRouter><Skills /></MemoryRouter>)
  expect(screen.getByText('Backend')).toBeInTheDocument()
  expect(screen.getByText('Frontend')).toBeInTheDocument()
  expect(screen.getByText('Database')).toBeInTheDocument()
  expect(screen.getByText('Django')).toBeInTheDocument()
  expect(screen.getByText('PostgreSQL')).toBeInTheDocument()
})
```

- [ ] **Step 4: Run tests + visual check**

```bash
npm test
npm run dev
```

Navigate to `/skills` — groups reveal on scroll, tags stagger in

- [ ] **Step 5: Commit**

```bash
git add src/pages/Skills.tsx src/pages/Skills.module.css
git commit -m "feat: implement Skills page with GSAP ScrollTrigger stagger"
```

---

## Task 8: Projects page

**Files:**
- Modify: `src/pages/Projects.tsx`
- Create: `src/pages/Projects.module.css`

**Interfaces:**
- Consumes: `projects` from `src/data/projects.ts`, `Project` type, `PageTransition`

- [ ] **Step 1: Create Projects.module.css**

Create `src/pages/Projects.module.css`:

```css
.projects {
  min-height: calc(100vh - var(--navbar-height));
  background: var(--color-bg-ruin);
  padding: 80px 80px;
  position: relative;
  overflow: hidden;
}

.sectionLabel {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-accent-bio);
  letter-spacing: 5px;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.sectionLabel::before { content: '// '; opacity: 0.5; }

.title {
  font-family: var(--font-heading);
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 900;
  color: var(--color-text-bleached);
  text-transform: uppercase;
  margin-bottom: 48px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}

.card {
  border: 1px solid rgba(74, 103, 65, 0.3);
  background: rgba(43, 45, 30, 0.3);
  transition: border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease;
  overflow: hidden;
}

.card:hover {
  border-color: var(--color-accent-bio);
  transform: scale(1.02);
  box-shadow: 0 0 24px rgba(90, 140, 122, 0.15);
}

.cardImage {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  display: block;
}

.cardImagePlaceholder {
  width: 100%;
  aspect-ratio: 16/9;
  background: var(--color-bg-overgrown);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-dust);
  letter-spacing: 3px;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(74, 103, 65, 0.2);
}

.cardBody {
  padding: 24px;
}

.cardTitle {
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text-bleached);
  margin-bottom: 8px;
}

.cardDesc {
  font-size: 13px;
  color: var(--color-text-dust);
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
  font-size: 11px;
  color: var(--color-text-bleached);
  background: rgba(74, 103, 65, 0.1);
  border: 1px solid var(--color-accent-vine);
  padding: 4px 12px;
  letter-spacing: 1px;
}

.cardLink {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-accent-bio);
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  transition: opacity 200ms ease;
}

.cardLink:hover { opacity: 0.7; }

.cardLinkDisabled {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-dust);
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0.4;
}

@media (max-width: 768px) {
  .projects {
    padding: 48px 24px;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Implement Projects.tsx**

Replace `src/pages/Projects.tsx` entirely:

```tsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageTransition from '../components/PageTransition'
import VineSVG from '../components/VineSVG'
import projects from '../data/projects'
import type { Project } from '../data/projects'
import styles from './Projects.module.css'

gsap.registerPlugin(ScrollTrigger)

function ProjectCard({ project }: { project: Project }) {
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

export default function Projects() {
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
    <PageTransition>
      <section className={styles.projects}>
        <VineSVG position="top-left" width={140} height={200} opacity={0.4} />

        <p className={styles.sectionLabel}>Projects</p>
        <h2 className={styles.title}>Field Work</h2>

        <div ref={gridRef} className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
```

- [ ] **Step 3: Write Projects test**

Create `src/pages/Projects.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Projects from './Projects'

test('renders projects page', () => {
  render(<MemoryRouter><Projects /></MemoryRouter>)
  expect(screen.getByText('Field Work')).toBeInTheDocument()
  expect(screen.getByText('Payroll System')).toBeInTheDocument()
})
```

- [ ] **Step 4: Run tests + visual check**

```bash
npm test
npm run dev
```

Navigate to `/projects` — 3 cards, hover scales up with bioluminescent glow

- [ ] **Step 5: Commit**

```bash
git add src/pages/Projects.tsx src/pages/Projects.module.css
git commit -m "feat: implement Projects page with card grid"
```

---

## Task 9: Contact page

**Files:**
- Modify: `src/pages/Contact.tsx`
- Create: `src/pages/Contact.module.css`

**Interfaces:**
- Consumes: `PageTransition`, `VineSVG`

- [ ] **Step 1: Create Contact.module.css**

Create `src/pages/Contact.module.css`:

```css
.contact {
  min-height: calc(100vh - var(--navbar-height));
  background: var(--color-bg-overgrown);
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
  font-size: 11px;
  color: var(--color-accent-bio);
  letter-spacing: 6px;
  text-transform: uppercase;
  margin-bottom: 16px;
  opacity: 0.7;
}

.title {
  font-family: var(--font-heading);
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 900;
  color: var(--color-text-bleached);
  text-transform: uppercase;
  margin-bottom: 12px;
}

.subtitle {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--color-text-dust);
  margin-bottom: 60px;
  max-width: 360px;
  line-height: 1.8;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 340px;
}

.link {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 24px;
  border: 1px solid rgba(74, 103, 65, 0.3);
  background: rgba(43, 45, 30, 0.3);
  text-decoration: none;
  transition: border-color 200ms ease, box-shadow 200ms ease, background 200ms ease;
}

.link:hover {
  border-color: var(--color-accent-bio);
  background: rgba(43, 45, 30, 0.6);
  box-shadow: 0 0 20px rgba(90, 140, 122, 0.15);
}

.linkIcon {
  font-size: 18px;
  color: var(--color-accent-bio);
  width: 24px;
  text-align: center;
  flex-shrink: 0;
}

.linkContent {
  text-align: left;
}

.linkLabel {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--color-accent-vine);
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 2px;
}

.linkValue {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-bleached);
  letter-spacing: 1px;
}

.footer {
  position: absolute;
  bottom: 24px;
  font-family: var(--font-mono);
  font-size: 10px;
  color: rgba(181, 160, 122, 0.25);
  letter-spacing: 3px;
  text-transform: uppercase;
}
```

- [ ] **Step 2: Implement Contact.tsx**

Replace `src/pages/Contact.tsx` entirely:

```tsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import PageTransition from '../components/PageTransition'
import VineSVG from '../components/VineSVG'
import styles from './Contact.module.css'

const CONTACT_LINKS = [
  {
    href: 'https://github.com/[username]', // TODO: replace with actual username
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
    href: 'tel:+66[number]', // TODO: replace with actual number
    label: 'Phone',
    value: '[phone number]',
    icon: '◈',
  },
]

export default function Contact() {
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!linksRef.current) return
      const items = linksRef.current.querySelectorAll('a')
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.2,
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <PageTransition>
      <section className={styles.contact}>
        <VineSVG position="top-right" width={140} height={200} opacity={0.4} />
        <VineSVG position="bottom-left" width={120} height={160} opacity={0.35} />

        <p className={styles.signal}>// Signal Detected</p>
        <h2 className={styles.title}>Contact</h2>
        <p className={styles.subtitle}>
          Transmission open. Find me through any of these channels.
        </p>

        <div ref={linksRef} className={styles.links}>
          {CONTACT_LINKS.map(({ href, label, value, icon }) => (
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
          ))}
        </div>

        <div className={styles.footer}>
          © {new Date().getFullYear()} Pongyanin Ausswapipop
        </div>
      </section>
    </PageTransition>
  )
}
```

- [ ] **Step 3: Write Contact test**

Create `src/pages/Contact.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Contact from './Contact'

test('renders contact page with links', () => {
  render(<MemoryRouter><Contact /></MemoryRouter>)
  expect(screen.getByText('Contact')).toBeInTheDocument()
  expect(screen.getByText('GitHub')).toBeInTheDocument()
  expect(screen.getByText('Email')).toBeInTheDocument()
  expect(screen.getByText('Phone')).toBeInTheDocument()
  expect(screen.getByText(/2509pipop4951pi@gmail.com/)).toBeInTheDocument()
})
```

- [ ] **Step 4: Run all tests**

```bash
npm test
```

Expected: all tests pass

- [ ] **Step 5: Visual check all pages**

```bash
npm run dev
```

Click through all 5 pages. Verify:
- Page transitions slide left/fade
- Vine SVGs in corners on each page
- Spore particles on Hero only
- Contact links stagger slide-up
- Glitch text fires on Hero name

- [ ] **Step 6: Commit**

```bash
git add src/pages/Contact.tsx src/pages/Contact.module.css
git commit -m "feat: implement Contact page with icon links and GSAP stagger"
```

---

## Task 10: Final cleanup + asset slots + build check

**Files:**
- Modify: `src/data/projects.ts` — add TODO comments for URL/image
- Modify: `src/pages/About.tsx` — add TODO comment for photo
- Modify: `src/pages/Contact.tsx` — add TODO comments for GitHub username + phone
- Modify: `src/App.test.tsx` — update to match actual App

- [ ] **Step 1: Update App test**

Replace `src/App.test.tsx`:

```tsx
import { render } from '@testing-library/react'
import App from './App'

test('renders without crashing', () => {
  expect(() => render(<App />)).not.toThrow()
})
```

- [ ] **Step 2: Run full test suite**

```bash
npm test
```

Expected: all tests pass

- [ ] **Step 3: Run build**

```bash
npm run build
```

Expected: no TypeScript errors, no build errors. Output in `dist/`

- [ ] **Step 4: Add .superpowers to .gitignore**

In `.gitignore`, add at the bottom:

```
.superpowers/
```

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: portfolio site complete — all pages, animations, responsive layout"
```

---

## Remaining Asset TODOs (post-implementation)

After implementation, user must supply:

| Item | Where to add |
|---|---|
| Hero background image | Place in `public/` → set as `style={{ backgroundImage: "url('/your-image.jpg')" }}` on `.hero` in `Hero.tsx` |
| Profile photo | Place in `public/` → replace `<div className={styles.photoPlaceholder}>` with `<img className={styles.photo} src="/your-photo.jpg" alt="Pongyanin" />` in `About.tsx` |
| Payroll screenshot | Place in `public/projects/` → set `image: '/projects/payroll.png'` in `src/data/projects.ts` |
| Payroll live URL | Set `url: 'https://your-url.com'` in `src/data/projects.ts` |
| GitHub username | Replace `[username]` in `src/pages/Contact.tsx` CONTACT_LINKS |
| Phone number | Replace `[phone number]` and `tel:+66[number]` in `src/pages/Contact.tsx` |
