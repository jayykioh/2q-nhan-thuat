---
name: cinematic-landing-gsap
description: >
  Build cinematic, editorial dark-mode landing pages with GSAP + Framer Motion animations — the exact
  aesthetic of high-end photography portfolio sites like Luca Mori (lucamori.framer.website): near-black
  backgrounds, serif/sans type pairings, horizontal marquee scrollers, staggered scroll-reveal text,
  magnetic cursor hover, smooth page transitions, and masonry/asymmetric image grids. Use this skill
  whenever the user asks for a portfolio landing page, photographer site, creative agency homepage,
  editorial landing page, cinematic dark website, GSAP scroll animations, Framer Motion page transitions,
  luxury brand website, or any landing page described as "dark", "cinematic", "editorial", "minimal",
  "high-end", or "like Luca Mori / Framer template". Also trigger for "smooth transitions", "scroll
  animations", "stagger reveal", "marquee scroller", "magnetic hover", or "luxury portfolio". Always
  use this skill for these requests even if the user doesn't say "GSAP" or "Framer Motion" explicitly.
---

# Cinematic Landing Page — GSAP + Framer Motion Skill

Reverse-engineered from **lucamori.framer.website** (Focal Framer Template). Produces editorial, cinema-quality dark landing pages for photographers, agencies, and luxury brands.

---

## 0. Read First: Design DNA

The Luca Mori / Focal aesthetic has six defining traits. Internalize all six before writing a single line:

| Trait | Spec |
|---|---|
| **Color** | Background `#0A0A0A` → `#111111`. Text `#F0EDE8` (warm off-white). Accent `#C8B8A2` (muted warm tan). Zero pure-white, zero pure-black. |
| **Type** | Display: `Cormorant Garamond` or `Playfair Display` (italic weight for hero). Body: `Inter` or `DM Sans` (300–400 weight). All-caps labels: `Inter` 400, 0.15em letter-spacing. |
| **Spacing** | Generous. Section padding `120px–160px` desktop, `64px` mobile. No visual clutter. Every element breathes. |
| **Photography** | Portrait-ratio images (3:4, 2:3). Grayscale or muted-color treated. Never rectangular crops. |
| **Motion** | Slow and deliberate. Ease curves `cubic-bezier(0.76, 0, 0.24, 1)`. Durations 0.8s–1.4s. Stagger 0.12s between children. |
| **Signature** | One oversized italic serif word/phrase bleeds across the hero. Everything else is restrained. |

---

## 1. Tech Stack Decisions

### React + GSAP (primary — use for HTML artifacts and full builds)
```
gsap ^3.12 + ScrollTrigger + SplitText (or SplitType free alternative)
framer-motion ^11 (page transitions only)
```

### HTML/CSS/Vanilla JS (use for single-file Claude artifacts)
```
GSAP 3 via CDN:  https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js
ScrollTrigger:   https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js
```

**Rule:** For React artifacts in Claude.ai, always use `framer-motion` for component-level animations and GSAP only for scroll-pinned timeline sequences. For HTML artifacts, GSAP only.

---

## 2. Page Architecture

Build in this exact section order:

```
1. NAV          Fixed, minimal. Name left, links right. Fades in on load.
2. HERO         Full-viewport. Oversized italic serif + role text + location.
                Asymmetric image beside text. Slow parallax on scroll.
3. MARQUEE      Infinite horizontal scroll of client names / categories.
4. GRID         Selected works — masonry or alternating-width grid.
                Each card: project image + hover overlay with title.
5. ABOUT        Two-column. Portrait left, text right with bold pull-quote.
6. SERVICES     Numbered list (01, 02, 03) — accordion or static.
7. CTA          Full-width dark panel with large linked headline.
8. FOOTER       2-column: nav links left, social + copyright right.
```

---

## 3. Animation Playbook

### 3a. Page Load Sequence (fire once, on DOMContentLoaded)

```javascript
// GSAP Timeline — runs sequentially on page load
const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

tl.from("nav", { y: -20, opacity: 0, duration: 0.8 })
  .from(".hero-eyebrow", { y: 30, opacity: 0, duration: 0.9 }, "-=0.4")
  .from(".hero-title .word", {
    y: "100%",          // Clip-reveal: words slide up from below
    opacity: 0,
    duration: 1.1,
    stagger: 0.08,
    ease: "power4.out"
  }, "-=0.5")
  .from(".hero-subtitle", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
  .from(".hero-image", { scale: 1.06, opacity: 0, duration: 1.4, ease: "power2.out" }, "-=1.0")
  .from(".hero-cta", { y: 20, opacity: 0, duration: 0.7 }, "-=0.4");
```

**Clip-reveal trick** (words slide up from invisible container):
```css
.hero-title { overflow: hidden; }
.hero-title .line { overflow: hidden; display: block; }
.hero-title .word { display: inline-block; }
```

### 3b. Scroll-Triggered Section Reveals

```javascript
// Apply to every section with class .reveal-section
gsap.utils.toArray(".reveal-section").forEach(section => {
  const elements = section.querySelectorAll(".reveal-item");
  gsap.from(elements, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    y: 50,
    opacity: 0,
    duration: 1.0,
    stagger: 0.12,
    ease: "power3.out"
  });
});
```

### 3c. Parallax on Hero Image

```javascript
gsap.to(".hero-image", {
  yPercent: -18,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 1.2       // Smooth lag — higher = more lag
  }
});
```

### 3d. Horizontal Marquee (Infinite Loop)

```javascript
// Pure CSS approach (preferred — no JS jank)
```
```css
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 28s linear infinite;
}
.marquee-track:hover { animation-play-state: paused; }

@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }  /* track contains 2× content */
}
```
```html
<!-- Duplicate content for seamless loop -->
<div class="marquee-track" aria-hidden="true">
  <span>DRIVE JOURNAL</span><span class="sep">—</span>
  <span>MAISON VENTURI</span><span class="sep">—</span>
  <!-- ... all items ... -->
  <!-- Duplicate: -->
  <span>DRIVE JOURNAL</span><span class="sep">—</span>
  <!-- ... -->
</div>
```

### 3e. Magnetic Cursor Hover (Project Cards)

```javascript
// Each .project-card gets magnetic pull on hover
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.12;  // 12% pull factor
    const dy = (e.clientY - cy) * 0.12;
    gsap.to(card, { x: dx, y: dy, duration: 0.4, ease: "power2.out" });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
  });
});
```

### 3f. Image Hover Reveal (Project Grid)

```javascript
// Overlay fades in; image scales subtly
gsap.utils.toArray(".project-card").forEach(card => {
  const overlay = card.querySelector(".card-overlay");
  const img = card.querySelector("img");

  card.addEventListener("mouseenter", () => {
    gsap.to(overlay, { opacity: 1, duration: 0.4, ease: "power2.out" });
    gsap.to(img, { scale: 1.04, duration: 0.8, ease: "power2.out" });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(overlay, { opacity: 0, duration: 0.4 });
    gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
  });
});
```

### 3g. Framer Motion Page Transitions (React only)

```jsx
// Wrap pages in AnimatePresence
import { motion, AnimatePresence } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } },
  exit:    { opacity: 0, y: -16, transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } }
};

// Curtain wipe (dark overlay sweeps across viewport):
const curtainVariants = {
  initial: { scaleX: 0, originX: 0 },
  animate: { scaleX: 0, originX: 1 },
  exit:    { scaleX: 1, originX: 0, transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }
};
```

---

## 4. CSS Token System

Always declare these CSS variables at `:root` before any other styles:

```css
:root {
  /* Color */
  --bg:           #0A0A0A;
  --bg-elevated:  #141414;
  --surface:      #1C1C1C;
  --border:       rgba(240, 237, 232, 0.08);
  --text-primary: #F0EDE8;
  --text-muted:   #8A8480;
  --accent:       #C8B8A2;

  /* Type */
  --font-display: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
  --font-body:    'Inter', 'DM Sans', system-ui, sans-serif;

  /* Scale */
  --hero-size:    clamp(4rem, 11vw, 9rem);
  --h2-size:      clamp(2rem, 4.5vw, 3.5rem);
  --h3-size:      clamp(1.2rem, 2vw, 1.6rem);
  --body-size:    clamp(0.9rem, 1.1vw, 1.05rem);
  --label-size:   0.72rem;

  /* Motion */
  --ease-cinematic: cubic-bezier(0.76, 0, 0.24, 1);
  --ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1);
  --dur-fast:   0.35s;
  --dur-med:    0.75s;
  --dur-slow:   1.1s;

  /* Layout */
  --max-w:     1280px;
  --gutter:    clamp(1.5rem, 5vw, 5rem);
  --section-py: clamp(4rem, 10vw, 10rem);
}
```

---

## 5. Structural HTML Patterns

### Nav
```html
<nav class="site-nav reveal-item">
  <a class="nav-logo" href="/">Name Surname</a>
  <ul class="nav-links">
    <li><a href="/projects">Projects</a></li>
    <li><a href="#services">Services</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```
```css
.site-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.5rem var(--gutter);
  background: linear-gradient(to bottom, rgba(10,10,10,0.95), transparent);
}
.nav-links { display: flex; gap: 2.5rem; list-style: none; }
.nav-links a {
  font-family: var(--font-body); font-size: var(--label-size);
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--text-muted); text-decoration: none;
  transition: color var(--dur-fast) var(--ease-cinematic);
}
.nav-links a:hover { color: var(--text-primary); }
```

### Hero
```html
<section class="hero">
  <div class="hero-text">
    <p class="hero-eyebrow">Photographer — City</p>
    <h1 class="hero-title">
      <span class="line"><span class="word">First</span></span>
      <span class="line"><em><span class="word">Last</span></em></span>
    </h1>
    <p class="hero-subtitle">Editorial · Fashion · Commercial</p>
  </div>
  <div class="hero-image-wrap">
    <img class="hero-image" src="portrait.jpg" alt="Name" />
  </div>
</section>
```
```css
.hero {
  min-height: 100vh; display: grid;
  grid-template-columns: 1fr 1fr; align-items: end;
  padding: calc(var(--section-py) + 4rem) var(--gutter) var(--section-py);
  gap: 3rem;
}
.hero-title {
  font-family: var(--font-display); font-size: var(--hero-size);
  line-height: 0.9; font-weight: 300;
  color: var(--text-primary); overflow: hidden;
}
.hero-title em { font-style: italic; color: var(--accent); }
.hero-eyebrow {
  font-family: var(--font-body); font-size: var(--label-size);
  letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--text-muted); margin-bottom: 1.5rem;
}
.hero-image-wrap {
  overflow: hidden; border-radius: 2px;
  aspect-ratio: 3/4; max-height: 80vh;
}
.hero-image { width: 100%; height: 100%; object-fit: cover; }
```

### Project Grid
```html
<section class="works reveal-section" id="works">
  <p class="section-label reveal-item">Selected Works</p>
  <div class="works-grid">
    <!-- Large card (spans 2 cols on desktop) -->
    <article class="project-card project-card--large reveal-item">
      <div class="card-img-wrap">
        <img src="project1.jpg" alt="Lumière" />
        <div class="card-overlay">
          <p class="card-category">Editorial Fashion</p>
          <h3 class="card-title">LUMIÈRE</h3>
        </div>
      </div>
    </article>
    <!-- Normal cards -->
    <article class="project-card reveal-item">...</article>
    <article class="project-card reveal-item">...</article>
  </div>
  <a class="works-all" href="/projects">All Projects →</a>
</section>
```
```css
.works-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 3rem;
}
.project-card--large { grid-column: span 2; }
.card-img-wrap { position: relative; overflow: hidden; border-radius: 2px; aspect-ratio: 2/3; }
.card-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
.card-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 50%);
  opacity: 0; display: flex; flex-direction: column;
  justify-content: flex-end; padding: 1.5rem;
  transition: opacity var(--dur-med) var(--ease-cinematic);
}
.card-title {
  font-family: var(--font-display); font-size: 1.8rem;
  font-weight: 300; letter-spacing: 0.1em;
  color: var(--text-primary);
}
.card-category {
  font-family: var(--font-body); font-size: var(--label-size);
  letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 0.4rem;
}
```

### CTA Footer Banner
```html
<section class="cta">
  <p class="cta-label">Available for commission</p>
  <a class="cta-headline" href="/contact">
    Let's make something<br><em>worth remembering.</em>
  </a>
  <p class="cta-location">CITY — WORLDWIDE</p>
</section>
```
```css
.cta {
  padding: var(--section-py) var(--gutter);
  background: var(--bg-elevated);
  text-align: center;
}
.cta-headline {
  font-family: var(--font-display); font-size: var(--h2-size);
  font-weight: 300; color: var(--text-primary);
  text-decoration: none; line-height: 1.1;
  transition: color var(--dur-fast) var(--ease-cinematic);
  display: block; margin: 1.5rem auto;
}
.cta-headline:hover { color: var(--accent); }
.cta-headline em { font-style: italic; }
```

---

## 6. Services Section Pattern (Numbered List)

```html
<section class="services reveal-section" id="services">
  <p class="section-label reveal-item">What I Offer</p>
  <h2 class="section-heading reveal-item">Available for the work<br>that demands precision.</h2>
  <div class="services-grid">
    <div class="service-item reveal-item">
      <span class="service-number">01</span>
      <h3 class="service-name">Editorial & Fashion</h3>
      <p class="service-desc">Campaigns, lookbooks, and editorial shoots for magazines and fashion houses.</p>
    </div>
    <!-- repeat for 02, 03, 04 -->
  </div>
</section>
```
```css
.services-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 3rem 5rem; margin-top: 4rem; }
.service-number {
  font-family: var(--font-body); font-size: var(--label-size);
  letter-spacing: 0.15em; color: var(--text-muted);
  display: block; margin-bottom: 1rem;
}
.service-name { font-family: var(--font-display); font-size: var(--h3-size); font-weight: 300; margin-bottom: 0.75rem; color: var(--text-primary); }
.service-desc { font-size: var(--body-size); line-height: 1.7; color: var(--text-muted); }
```

---

## 7. Accessibility + Performance Rules

- Always add `prefers-reduced-motion` guard:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
- GSAP: check `window.matchMedia("(prefers-reduced-motion: reduce)").matches` before registering ScrollTrigger animations
- Images: always `loading="lazy"` except hero; always provide `alt` text
- Nav links: keyboard-accessible focus styles (use `outline: 2px solid var(--accent)`)
- Color contrast: `#F0EDE8` on `#0A0A0A` = 17:1 (AAA) ✓

---

## 8. Google Fonts Import

Always include at the top of CSS:
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@300;400;500&display=swap');
```

---

## 9. Reference Files

- `references/react-component.md` — Full React implementation with Framer Motion + GSAP hooks
- `references/motion-recipes.md` — 12 copy-paste animation recipes (text split, curtain wipe, counter, etc.)

Read these when building a complete multi-page React implementation.

---

## 10. Quality Checklist (before delivering)

- [ ] Near-black background (`#0A0A0A`), never pure black
- [ ] At least one Cormorant Garamond italic display heading
- [ ] All-caps labels with `letter-spacing: 0.15em`
- [ ] Marquee section with client names
- [ ] GSAP scroll-stagger on section reveals (`.reveal-item`)
- [ ] Hero image parallax on scroll
- [ ] Project card image-scale + overlay on hover
- [ ] Page load sequence (nav → eyebrow → title words → image)
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 2-col hero stacks on mobile, grid collapses to 1-col