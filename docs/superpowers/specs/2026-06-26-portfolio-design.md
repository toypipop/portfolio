# Portfolio Website Design Spec
**Date:** 2026-06-26  
**Owner:** Pongyanin Ausswapipop  
**Stack:** React 19 + TypeScript + Vite

---

## Theme: Post-Collapse / Nature Reclaiming

Reference: The Last of Us 2 — Seattle daytime. Ruined concrete overtaken by vines and overgrowth. Bioluminescent fungi glow in shadow. Wet pavement. Quiet dread.

---

## Color System

| Token | Hex | Usage |
|---|---|---|
| `bg-ruin` | `#1a1a14` | Section dividers, footer, deepest shadow |
| `bg-overgrown` | `#2b2d1e` | Primary page background |
| `text-bleached` | `#d4c9a8` | Headings, navbar logo, UI labels |
| `text-dust` | `#b5a07a` | Body text, secondary labels |
| `text-dust-light` | `#c4b898` | Paragraphs on dark bg |
| `accent-bio` | `#5a8c7a` | CTA buttons, active nav, spore dots, glow |
| `accent-vine` | `#4a6741` | SVG vine/leaf fills, borders, dividers |
| `danger-rust` | `#a85c3a` | Error states, destructive actions |

---

## Typography

- **Heading:** Space Grotesk (700/900) — geometric, modern ruin feel
- **Body/Code:** JetBrains Mono — terminal, survival log aesthetic
- Both via Google Fonts CDN

---

## Architecture

### Routing
React Router v6. All pages are top-level routes:

```
/           → Hero (Home)
/about      → About
/skills     → Skills
/projects   → Projects
/contact    → Contact
```

### Page Transition
Framer Motion `AnimatePresence` — slide + fade between routes (200ms).

### Global Layout
```
<Layout>
  <Navbar />          ← fixed top, always visible
  <main>
    <Outlet />        ← page content
  </main>
</Layout>
```

---

## Component Tree

```
src/
├── components/
│   ├── Navbar.tsx           fixed top nav
│   ├── VineSVG.tsx          reusable vine decoration (left/right/top/bottom variants)
│   ├── SporeCanvas.tsx      lightweight canvas particle effect (~50 particles)
│   ├── GlitchText.tsx       GSAP glitch animation wrapper
│   └── PageTransition.tsx   Framer Motion page wrapper
├── pages/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   └── Contact.tsx
├── data/
│   ├── projects.ts          project list (title, desc, url, image, tags)
│   └── skills.ts            skill groups (Backend/Frontend/Database/DevOps/Tools)
├── styles/
│   ├── tokens.css           CSS custom properties for all color tokens
│   └── globals.css          reset + base typography
└── App.tsx                  router setup + Layout
```

---

## Page Designs

### Navbar
- **Desktop:** Logo left (`PONGYANIN` — "A" in accent-bio) + nav links right
- **Mobile (<768px):** Logo + hamburger → fullscreen overlay menu
- **Active state:** link color `accent-bio` + 1px underline
- **BG:** `bg-ruin` at 95% opacity + `backdrop-filter: blur(8px)`
- **Border-bottom:** 1px `accent-vine`

### Hero (`/`)
- Full viewport height
- **BG:** `bg-overgrown` + `bg-image` slot (user-supplied, `object-fit: cover`, dark overlay `rgba(26,26,20,0.65)`)
- **VineSVG** top-right + bottom-left corners (climbing tendrils, leaves, spore dots)
- **SporeCanvas** — 50 bioluminescent particles drifting slowly
- **Content (centered left-aligned):**
  - Eyebrow: `[ Web Developer · Chiang Mai ]` in `accent-bio` monospace
  - Name: `PONGYANIN` — GSAP glitch on load (chromatic shift + flicker, 1.2s)
  - Role: `AUSSWAPIPOP` typewriter effect
  - Divider: 80px gradient line `accent-bio → accent-vine → transparent`
  - Summary: 1–2 line pitch in `text-dust-light`
  - CTA: `[ VIEW WORK ]` filled `accent-bio` + `CONTACT` ghost border
- **Scroll indicator:** bottom center, fade bounce arrow

### About (`/about`)
- Two-column layout: left = photo, right = bio
- **Photo:** rounded border `accent-vine`, soft glow shadow
- **Photo placeholder** until user supplies image
- **Bio card:** "Survivor Log" — styled like torn field notes
  - Name, role, location
  - Summary paragraph from resume
  - Location tag with coordinates style: `18.7953° N, 98.9932° E`
- **GSAP:** left col slides in from left, right col from right on mount

### Skills (`/skills`)
- 5 groups: Backend / Frontend / Database / DevOps & Infra / Tools
- **Group header:** `accent-bio` monospace + VineSVG horizontal divider below
- **Skill tags:** pill shape, border `accent-vine`, text `text-bleached`, bg `rgba(74,103,65,0.1)`
- **GSAP ScrollTrigger:** tags stagger fade-in per group (0.05s between tags)
- Layout: CSS grid, tags wrap naturally

### Projects (`/projects`)
- 2-column card grid (1-col on mobile)
- **ProjectCard:**
  - Screenshot (or placeholder `bg-ruin` with vine pattern)
  - Title in `text-bleached`
  - Tech tags (same pill style as Skills)
  - Short description `text-dust`
  - Live URL link → `accent-bio` with external icon
  - Hover: vine border glow + slight scale (1.02) via GSAP
- **Initial data:**
  - Payroll web app (URL + screenshot to be supplied)
  - 2 placeholder slots

### Contact (`/contact`)
- Centered layout, full height section
- Flavor text: `// SIGNAL DETECTED` in `accent-bio` monospace
- Three links with icon + label:
  - GitHub → github.com/[username] (user to confirm)
  - Email → 2509pipop4951pi@gmail.com
  - Phone → user to supply number
- Each link: icon left, text right, hover glow `accent-bio`
- GSAP: stagger slide-up on mount

---

## Animation Plan

| Effect | Library | Detail |
|---|---|---|
| Page transition | Framer Motion | slide-left + fade, 200ms |
| Glitch text | GSAP | chromatic offset + opacity flicker on Hero name |
| Typewriter | GSAP | character-by-character, cursor blink |
| ScrollTrigger reveals | GSAP | fade + translateY(20px), per-element stagger |
| Vine path draw | GSAP | `stroke-dashoffset` from full to 0, ease: power2.out |
| Spore particles | Canvas API | 50 particles, random drift, bioluminescent glow |
| Hover states | CSS transition | 150–200ms, no JS needed |

---

## Libraries to Install

```bash
npm install react-router-dom framer-motion gsap
```

No Three.js. No heavy 3D.

---

## Responsive Breakpoints

| Breakpoint | Change |
|---|---|
| `< 768px` | Navbar → hamburger overlay; hero text smaller; cards 1-col; about 1-col |
| `< 480px` | Hero name font-size reduces; CTA stack vertical |

---

## Assets Needed from User

- [ ] Hero background image (nature reclaiming ruins)
- [ ] Profile photo (for About page)
- [ ] Payroll project screenshot
- [ ] Payroll project live URL
- [ ] GitHub username
- [ ] Phone number

---

## Out of Scope

- Blog / posts
- Dark/light mode toggle
- CMS or backend
- Authentication
- Analytics
