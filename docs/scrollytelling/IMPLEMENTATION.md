# Implementation brief — "The Ground Beneath Us" scrollytelling for greenback.solutions

A handover document for Claude Code. Read top to bottom before editing anything.

---

## 1. Mission

Ship an interactive scrollytelling section on **greenback.solutions** titled **"The Ground Beneath Us"** that communicates the scale of global agricultural land and the climate-resilience potential of regenerative organic agriculture. Aesthetic: bold modern, dark background, lime-green accents. Length: roughly 8 vertical "chapters" at 100vh each, ending in a CTA back to the rest of the site.

The deliverable already exists as a working prototype. Your job is to integrate it into the production site, refine the data sources, optionally add a Remotion hero loop, and pass the verification checklist at the end of this document.

---

## 2. Inputs (everything you need is in this folder)

```
outputs/
├── regenerative-scrollytelling-mockup.html   ← full working prototype, ~31 KB, self-contained
├── remotion-hero/                            ← Remotion project for the optional looping hero video
│   ├── package.json
│   ├── tsconfig.json
│   ├── remotion.config.ts
│   ├── README.md
│   └── src/
│       ├── index.ts
│       ├── Root.tsx
│       └── HeroLoop.tsx
└── IMPLEMENTATION.md                         ← this file
```

Open `regenerative-scrollytelling-mockup.html` in a browser first. Scroll it end to end. That is the target experience. Everything below is in service of porting it cleanly into the production site.

---

## 3. Phase 0 — Discover the production stack

Before writing anything, determine:

1. Run `git remote -v` and `cat package.json` (or look for `astro.config.*`, `next.config.*`, `gatsby-config.*`, `_config.yml`, `wp-config.php`, `framer.json`) at the repo root. Report what you find.
2. Locate the existing hero section file. Search for the site's main headline copy (try `rg "Verification Infrastructure"` or `rg "regenerative"`).
3. Identify the build command, dev server command, and deploy pipeline (Vercel, Netlify, Cloudflare Pages, custom).
4. Note the existing typography stack and primary palette. The mockup uses Space Grotesk + JetBrains Mono and a green/amber accent system. Decide whether to keep these or remap to the site's existing tokens.

Output a one-paragraph summary before proceeding to Phase 1.

---

## 4. Phase 1 — Integrate the scrollytelling

Choose **one** of the paths below based on what Phase 0 found. The prototype is framework-agnostic — only the wiring changes.

### Path A — Next.js (App Router, the most likely case for a modern marketing site)

1. Create `app/the-ground-beneath-us/page.tsx`. This becomes the route at `/the-ground-beneath-us`.
2. Convert each `<section class="stage">` from the mockup into its own React component under `components/scrolly/`. Suggested split: `Hero.tsx`, `Scale.tsx` (chapter 2 — d3 choropleth), `Split.tsx`, `Opportunity.tsx`, `Carbon.tsx`, `Adaptation.tsx` (chapter 6 — toggleable d3 map), `Resilience.tsx`, `CTA.tsx`.
3. The d3 + topojson scripts in the mockup load from a CDN. In React, install instead: `npm i d3 topojson-client world-atlas`. Then `import * as d3 from 'd3'`, `import { feature } from 'topojson-client'`, and `import world from 'world-atlas/countries-110m.json'`.
4. Wrap the d3 rendering in a `useEffect` keyed to a `ref`. Convert the `IntersectionObserver` block to a custom hook `useRevealOnScroll()`.
5. Wrap each d3-bearing component in `dynamic(() => import(...), { ssr: false })` from `next/dynamic` to avoid hydration errors — d3 manipulates the DOM imperatively.
6. Move the `<style>` block in the mockup to a CSS module `scrolly.module.css`, or convert to Tailwind classes if the site already uses Tailwind. The CSS custom properties (`--bg`, `--green`, etc.) should become CSS variables in `globals.css`.
7. Move the embedded fonts to `app/layout.tsx` using `next/font/google` — `Space_Grotesk` and `JetBrains_Mono`.
8. Add the new route to the main navigation if appropriate, or surface it from the homepage with a teaser block.

### Path B — Astro

1. Create `src/pages/the-ground-beneath-us.astro`.
2. The mockup is mostly static HTML — paste it inside an Astro layout almost as-is. Put the `<script>` in an `<script type="module">` tag with `is:inline` or use Astro's client directives.
3. For d3, either keep the CDN tags (simplest) or `npm i d3 topojson-client world-atlas` and import in a `client:load` island.
4. Move the `<style>` block to `<style is:global>` or scope it to the page.

### Path C — Plain static HTML / Eleventy / Jekyll

1. Drop the entire `regenerative-scrollytelling-mockup.html` into the site's `public/` or `src/` directory, renamed to something like `ground.html`.
2. Strip the top-level `<html><head><body>` wrappers if the site has a base layout — keep only the contents of `<body>` and merge the `<style>` block into the site's global CSS or include it as a partial.
3. Link to it from the homepage or main nav.

### Path D — WordPress / Webflow / Framer

1. Use a custom HTML embed block. Paste the entire mockup into it.
2. The Google Fonts and d3 CDN scripts in the file will load automatically.
3. Verify the embed container is allowed `position: relative` and `overflow: visible` so the sticky chapter chip isn't clipped.

---

## 5. Phase 2 — Replace inline data with live sources (recommended)

The prototype embeds approximate values inline so the page works offline. For production credibility, swap to live data.

### 5a. Agricultural land share — Our World in Data CSV

Replace the `AG_LAND` object with a runtime fetch:

```js
const AG_LAND = {};
await d3.csv(
  "https://ourworldindata.org/grapher/share-of-land-area-used-for-agriculture.csv?v=1&csvType=full",
  (row) => {
    // OWID puts most-recent year per country; pick the last row per Entity.
    AG_LAND[row.Entity] = +row["Agricultural land (% of land area)"];
  }
);
```

The OWID column header may shift over time — verify with `console.log(Object.keys(d3.csv(...)[0]))` and adjust. Map OWID's country names to Natural Earth names where they diverge (DR Congo, Côte d'Ivoire, Czechia, Eswatini, Myanmar). Keep the inline object as a fallback for when the fetch fails.

### 5b. Climate hazard — INFORM Risk Index

The official INFORM dataset is published as Excel and CSV at `https://drmkc.jrc.ec.europa.eu/inform-index/INFORM-Risk/Country-Risk-Profile`. Pull the most recent year's "Drought" and "Flood" hazard sub-component scores (0–10), key by ISO-3 code, and merge with the country geometry via `d.id` (Natural Earth numeric ISO).

Suggested workflow: do this once at build time and emit `public/data/inform-risk.json` so the page doesn't depend on JRC's CDN being up. Add a tiny build script `scripts/fetch-inform.ts` that downloads + transforms the source.

### 5c. The 900 km³ headline figure — sanity check

The current number assumes a uniform gain of ~187 m³ extra water storage per hectare per 1% increase in soil organic matter (≈ 20,000 gal/acre, the USDA NRCS figure). Multiplied across 4.8 B ha that gives ~898 km³; we round to 900. **Caveat:** real-world gains vary widely by soil type, climate, and starting SOM. If editorial wants precision, refine using Stocker et al.'s ESA-CCI soil moisture work or Lal (2020) on soil water retention. Otherwise, leave the figure with a footnote: "approximate, assumes uniform 187 m³/ha gain per 1% SOM."

### 5d. Carbon — the 14.5–22 Gt figure

This is Project Drawdown's number for **Regenerative Annual Cropping**. If the user wants to include grazing land too (the much larger 67%), the upper bound rises. Decide whether the headline should reflect cropping only (defensible) or all-agriculture (more ambitious but contested).

---

## 6. Phase 3 — Remotion hero loop (optional but recommended)

A short looping MP4/WebM in the hero section before the scrollytelling chapter 1 adds significant cinematic weight.

### Build steps

```bash
cd outputs/remotion-hero
npm install
npm start           # opens Remotion Studio at localhost:3000 for preview
npm run build       # renders out/hero.mp4
npm run build-webm  # renders out/hero.webm (smaller, better for hero loops)
npm run build-poster # renders out/poster.png (first-frame fallback)
```

Node 18+ required. The first render takes ~60–90 seconds. The README inside `remotion-hero/` is the authoritative reference for editing the composition.

### Integration

Copy the three output files to the site's static assets directory (`public/`, `static/`, or equivalent). In the hero JSX/HTML:

```html
<section class="hero-with-video">
  <video autoplay muted loop playsinline poster="/hero-poster.png" class="hero-bg-video">
    <source src="/hero.webm" type="video/webm" />
    <source src="/hero.mp4"  type="video/mp4" />
  </video>
  <div class="hero-overlay">
    <!-- existing hero copy lives on top -->
  </div>
</section>
```

CSS: `.hero-bg-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }` and the overlay needs `position: relative; z-index: 1;` with a semi-opaque background (`rgba(10,15,13,0.5)`) so text remains readable.

If autoplay restrictions are a worry on iOS Safari, the `muted` + `playsinline` combination is what unlocks it.

---

## 7. Phase 4 — Accessibility, performance, SEO

Mandatory before shipping:

- **Reduced motion**: respect `prefers-reduced-motion`. Wrap the `IntersectionObserver` and d3 transitions in a check; if the user prefers reduced motion, set all chapter content to `opacity: 1; transform: none` immediately and skip the staggered reveals.
- **Keyboard navigation**: every chapter must be reachable via scroll alone; the toggle in chapter 6 needs working keyboard focus states (`:focus-visible` outline in the project palette).
- **Screen readers**: add `aria-label` to both SVG maps (already present in the mockup). The toggle is wired with `role="tablist"`. Verify with NVDA or VoiceOver.
- **Color contrast**: green-on-dark and amber-on-dark both pass WCAG AA at the sizes used. Verify with the Axe DevTools extension after porting.
- **Performance**: d3 + topojson + world-atlas = ~120 KB gzipped. Lazy-load chapters 2 and 6 with dynamic import; only fetch the topojson when the section is within 200vh of the viewport. The Remotion video should be < 2 MB for WebM, < 4 MB for MP4 — re-encode with `ffmpeg -c:v libvpx-vp9 -crf 32 -b:v 0` if it exceeds.
- **SEO**: this page is high-value, link-worthy content. Add OG image (use `out/poster.png` from Remotion), Twitter card meta, and a brief description. Consider also publishing as a standalone post in the site's blog or "research" section.

---

## 8. Phase 5 — Verification checklist

Before declaring done, confirm:

- [ ] Renders correctly in Chrome, Safari, Firefox, and mobile Safari at 375 px width.
- [ ] Both maps load and color correctly in production (not just local) — the topojson CDN may be blocked by some corporate firewalls; consider self-hosting the file.
- [ ] The toggle in chapter 6 swaps the map colours and the top-10 list together.
- [ ] Hover tooltips on both maps display country name, the relevant data point, and stay within the map's bounding box.
- [ ] The scroll-triggered progress bar at the top reaches 100% only when the CTA is fully visible.
- [ ] No console errors. No unused d3 imports left over.
- [ ] `prefers-reduced-motion` skips animations.
- [ ] Sources/citations are visible in the footer.
- [ ] If Remotion video is included, it autoplays muted on mobile Safari without user gesture.
- [ ] Lighthouse scores: Performance ≥ 85, Accessibility ≥ 95, Best Practices = 100, SEO ≥ 95.

---

## 9. Editorial / copy notes

- The **Rodale "100% of emissions" claim** is widely cited but contested (Civil Eats 2020, Lal 2020). The mockup uses Project Drawdown's more conservative 14.5–22 Gt — keep this unless the brand voice deliberately wants the more ambitious framing.
- "Regenerative organic" and "regenerative" are sometimes used interchangeably. The Rodale FST results come from **certified-organic** regenerative systems. Be precise: where the data is organic-specific, say so; where it covers conventional regenerative practices (cover crops, no-till), use the broader term.
- The 38% / 4.8 B ha headline figure comes from FAO via World Bank (most recent year: 2023, published Feb 2026). It will drift slightly year-to-year; refresh annually.
- The hero closing line "under our feet" / "under our boots" is doubled deliberately for rhythm. Don't dedupe.

---

## 10. Sources to credit (already in the page footer)

| Source | URL | Used for |
|---|---|---|
| FAO via World Bank | https://data.worldbank.org/indicator/AG.LND.AGRI.ZS | Ag land share per country |
| Our World in Data | https://ourworldindata.org/grapher/share-of-land-area-used-for-agriculture | Same, processed |
| Project Drawdown | https://drawdown.org/solutions/regenerative-annual-cropping | 14.5–22 Gt CO₂ |
| Rodale Institute Farming Systems Trial | https://rodaleinstitute.org/science/farming-systems-trial/ | 40% drought yield gap |
| INFORM Risk Index 2024 | https://drmkc.jrc.ec.europa.eu/inform-index/INFORM-Risk | Drought + flood hazard scores |
| USDA NRCS | https://www.nrcs.usda.gov/sites/default/files/2022-10/Soil%20Organic%20Matter.pdf | 20K gal/acre figure |
| Fields of the World | https://fieldsofthe.world/ | Cropland delineation imagery (future addition) |
| world-atlas TopoJSON | https://github.com/topojson/world-atlas | Map geometry |

---

## 11. Open questions to surface to the user

Ask these only if they block progress:

1. Is the page a new top-level route, a blog post, or a section of the homepage?
2. Should the hero loop replace the current homepage hero, or sit only on the dedicated page?
3. Are we standing up the build-time data refresh script (Phase 5b) now, or shipping with embedded approximate data and refreshing later?
4. Final headline number: 900 km³ (uniform assumption, clear footnote) or compute a properly weighted figure from FAO soil-type maps?

---

End of brief. When implementation is complete, run the verification checklist (Section 8) and post the PR with screenshots of each chapter at 1440 px and 375 px viewports.
