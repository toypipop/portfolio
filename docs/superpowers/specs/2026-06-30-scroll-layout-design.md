# Single-Page Scroll Layout — Design Spec

**Date:** 2026-06-30  
**Scope:** Convert multi-page React Router portfolio to single-page vertical scroll

---

## Goal

Stack all 5 sections (Hero, About, Skills, Projects, Contact) vertically on one page. Replace route-based navigation with smooth-scroll anchor links. Navbar highlights active section via scroll position.

---

## Architecture

Remove `react-router-dom` entirely. `App.tsx` renders all sections directly:

```tsx
export default function App() {
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

Each section gets an `id` on its `<section>` element matching its name (`hero`, `about`, `skills`, `projects`, `contact`).

---

## Navbar

- Replace `NavLink` with `<a href="#section-id">`
- `IntersectionObserver` watches all 5 sections (threshold: 0.4)
- `activeId` state updates when a section enters viewport
- Active class applied when `activeId === sectionId`
- Mobile overlay: same change, `onClick` still closes overlay
- No `MemoryRouter` dependency

---

## CSS

Add to `globals.css`:
```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: var(--navbar-height);
}
```

`scroll-padding-top` ensures anchored sections aren't hidden under fixed navbar.

---

## Animations

| Section | Before | After |
|---|---|---|
| Hero | no animation | no change |
| About | gsap on mount | gsap + ScrollTrigger `start: 'top 80%'` |
| Skills | ScrollTrigger | no change |
| Projects | ScrollTrigger | no change |
| Contact | gsap on mount | gsap + ScrollTrigger `start: 'top 80%'` |

`PageTransition` wrapper removed from all pages. Component file kept but unused.

---

## Hero CTA

`<Link to="/projects">` and `<Link to="/contact">` → `<a href="#projects">` and `<a href="#contact">`

---

## Files Changed

| File | Change |
|---|---|
| `src/App.tsx` | Remove Router, render 5 sections inline |
| `src/components/Navbar.tsx` | IntersectionObserver + anchor links |
| `src/pages/Hero/Hero.tsx` | Remove PageTransition, Link→a, add id |
| `src/pages/About/About.tsx` | Remove PageTransition, mount→ScrollTrigger, add id |
| `src/pages/Skills/Skills.tsx` | Remove PageTransition, add id |
| `src/pages/Projects/Projects.tsx` | Remove PageTransition, add id |
| `src/pages/Contact/Contact.tsx` | Remove PageTransition, mount→ScrollTrigger, add id |
| `src/styles/globals.css` | scroll-behavior + scroll-padding-top |
| `src/components/Navbar.test.tsx` | Rewrite — remove Router, check anchor href |
| `src/App.test.tsx` | Update — remove Router assertions, check 5 sections render |

---

## Out of Scope

- URL hash updates on scroll (decided: URL stays at `/`)
- react-scroll or any new scroll library
- Layout changes to individual sections beyond removing PageTransition
