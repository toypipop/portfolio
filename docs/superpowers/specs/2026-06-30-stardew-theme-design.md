# Stardew Valley 8-bit Theme — Design Spec

**Date:** 2026-06-30  
**Scope:** Full visual theme rewrite to Stardew Valley daytime 8-bit aesthetic. Layout unchanged.

---

## Goal

Replace the post-apocalyptic dark theme with a warm Stardew Valley daytime pixel-art aesthetic. Remove all background images and decorative components that don't fit. Update flavor text to match new concept.

---

## Color Palette (`src/styles/tokens.css`)

Replace all existing tokens with:

```css
:root {
  /* Backgrounds */
  --color-bg-main: #1c1208;        /* dark warm wood brown */
  --color-bg-alt: #0e1a08;         /* deep forest green-black */
  --color-bg-nav: rgba(28, 18, 8, 0.96);
  --color-bg-overlay: rgba(14, 26, 8, 0.98);
  --color-card-bg: rgba(43, 29, 14, 0.7);

  /* Text */
  --color-text-primary: #f5e6b4;   /* warm cream/parchment */
  --color-text-secondary: #c9a96e; /* warm tan */
  --color-text-muted: rgba(201, 169, 110, 0.5);

  /* Accents */
  --color-accent-gold: #f0c040;    /* coin gold */
  --color-accent-green: #6aaa38;   /* lush grass */
  --color-accent-coral: #e87a5a;   /* warm coral/sunset */

  /* Borders */
  --color-border-wood: #8b5e2c;
  --color-border-wood-light: rgba(139, 94, 44, 0.4);

  /* Shadows / glow (warm, not neon) */
  --color-gold-glow: rgba(240, 192, 64, 0.25);
  --color-gold-shadow: rgba(240, 192, 64, 0.15);

  /* Fonts */
  --font-heading: 'Press Start 2P', cursive;
  --font-mono: 'VT323', monospace;

  --navbar-height: 60px;
}
```

---

## Typography

Add to `index.html` `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323:wght@400&display=swap" rel="stylesheet">
```

- **Press Start 2P** → all headings (h1, h2, Navbar logo). Reduce heading `font-size` ~35% vs current values due to this font rendering larger.
- **VT323** → all body text, nav links, labels, mono text. Best at `18px+`.

---

## Components Removed (files kept, imports removed)

| Component | Was Used In | Replacement |
|---|---|---|
| `VineSVG` | About, Skills, Projects, Contact | nothing |
| `SporeCanvas` | Hero | nothing |
| `GlitchText` | Hero | plain `<h1>` |
| `BurnPhoto` | About | plain `<img>` or pixel placeholder box |

---

## Section Backgrounds

Remove all `background-image` from every section CSS module. Replace with solid colors:

| Section | Background |
|---|---|
| Hero | `#1c1208` |
| About | `#0e1a08` |
| Skills | `#1c1208` |
| Projects | `#0e1a08` |
| Contact | `#1c1208` |

---

## Card / Border Style

All cards, panels, boxes:
```css
border: 3px solid var(--color-border-wood);
border-radius: 0;
background: var(--color-card-bg);
```

No border-radius anywhere. No neon glow — only warm gold shadow where needed.

---

## Flavor Text Changes

| Location | Old | New |
|---|---|---|
| Hero summary | `Systems built to last through the collapse.` | `Crafting software with care, one commit at a time.` |
| Hero CTA primary | `[ VIEW WORK ]` | `[ VIEW HARVEST ]` |
| About title | `Survivor Log` | `Farmer's Journal` |
| About log label | `// Field Notes` | `// Journal Entry` |
| Skills title | `Arsenal` | `Inventory` |
| Projects title | `Field Work` | `Harvest` |
| Contact signal label | `// Signal Detected` | `// Message Board` |
| Contact subtitle | `Transmission open. Find me through any of these channels.` | `Leave a note at the bulletin board.` |

Hero eyebrow (`Web Developer · Chiang Mai`) and all bio text kept unchanged (factual content).

---

## Files Changed

| File | Change |
|---|---|
| `index.html` | Add Google Fonts link tags |
| `src/styles/tokens.css` | Full token rewrite |
| `src/styles/globals.css` | Update body background to `--color-bg-main` |
| `src/components/Navbar.module.css` | New bg, border, font sizes |
| `src/pages/Hero/Hero.tsx` | Remove SporeCanvas, GlitchText → plain h1, update text |
| `src/pages/Hero/Hero.module.css` | Remove bg-image, new colors, pixel borders |
| `src/pages/About/About.tsx` | Remove VineSVG, BurnPhoto → img placeholder, update text |
| `src/pages/About/About.module.css` | Remove bg-image, new colors |
| `src/pages/Skills/Skills.tsx` | Remove VineSVG, update title text |
| `src/pages/Skills/Skills.module.css` | Remove bg-image, new colors |
| `src/pages/Projects/Projects.tsx` | Remove VineSVG, update title text |
| `src/pages/Projects/Projects.module.css` | Remove bg-image, new colors |
| `src/pages/Contact/Contact.tsx` | Remove VineSVGs, update text |
| `src/pages/Contact/Contact.module.css` | Remove bg-image, new colors |

---

## Out of Scope

- Pixel art animations / sprite sheets
- New layout structure (layout unchanged)
- Deleting old component files (VineSVG, SporeCanvas, GlitchText, BurnPhoto stay on disk)
- Changing section order
