# RASEKH Homepage Handoff

## Project

- Separate project: `rasekh-huge-home` (standalone repo)
- Stack: React, TypeScript, Vite, plain CSS
- Current scope: homepage only
- Existing RASEKH website was not modified

## Direction

- Editorial homepage pacing inspired by Huge's confidence and scale, with original RASEKH structure, copy and visuals.
- Hero uses `public/rasekh-hero.mp4`, the supplied RASEKH glass/root film.
- The desktop hero has a cursor-following “Scroll down” marquee; it is disabled for touch and reduced-motion users.
- The manifesto uses a scroll-driven word sweep and a cursor-triggered RASEKH capability-card trail.
- Its Explore area matches the reference pacing with six staggered links, rolling text/arrow hover states and a functional RASEKH showreel preview.
- The Our Work section pins for four viewport-length panels and converts vertical scrolling into a horizontal case-study sequence.
- Its four concept panels use locally optimized Pexels photography; source links are recorded in `PEXELS_CREDITS.md`.
- The following partnership section pins a radial six-card marquee while its introduction exits on scroll.
- Solutions uses six full-width sticky cards that layer over one another during vertical scrolling.
- Visual system: near-black, cool white, teal, emerald and restrained gold.
- Motion respects `prefers-reduced-motion`.

## Run

```bash
npm install
npm run dev
```

## Next

- Review homepage content and motion.
- Build Work, Capabilities, Approach, Company and Ideas pages one at a time.
