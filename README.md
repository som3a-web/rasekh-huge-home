# RASEKH — Rooted Intelligence

Editorial homepage for **RASEKH**, built as a standalone project.

## Stack

- **React 18** + **TypeScript**
- **Vite** for dev server and build
- **Plain CSS** (single stylesheet, no framework)
- **lucide-react** for icons

## Run Locally

```bash
npm install
npm run dev
```

Vite prints the local URL (the project is usually run on `http://127.0.0.1:5180`).

## Build

```bash
npm run build      # tsc -b && vite build  -> dist/
npm run typecheck  # types only, no emit
```

## Structure

```
index.html          Entry document
src/
  App.tsx           The entire homepage — every section lives here
  main.tsx          React root
  styles.css        Complete visual system
public/
  rasekh-hero.mp4   Hero film
  work/             Case-study photography (see PEXELS_CREDITS.md)
```

The homepage is deliberately a single `App.tsx`. Sections are anchored by id:
`#top`, `#work`, `#approach`, `#capabilities`, `#company`.

## Design Notes

- Editorial pacing at scale, with original RASEKH structure, copy and visuals
- Hero has a cursor-following "Scroll down" marquee — disabled for touch and reduced-motion
- Manifesto uses a scroll-driven word sweep plus a cursor-triggered capability-card trail
- Our Work pins for four viewport-length panels, converting vertical scroll into a horizontal sequence
- Partnership section pins a radial six-card marquee
- Solutions uses six full-width sticky cards that layer during scroll
- Palette: near-black, cool white, teal, emerald, restrained gold
- All motion respects `prefers-reduced-motion`

## Image Credits

Case-study photography comes from Pexels under the
[Pexels license](https://www.pexels.com/license/). Individual source links are
recorded in [`PEXELS_CREDITS.md`](PEXELS_CREDITS.md) — keep that file updated
if images change.

## Related Docs

- [`HANDOFF.md`](HANDOFF.md) — original build handoff notes
- [`BUILD_STATUS.md`](BUILD_STATUS.md) — feature checklist
