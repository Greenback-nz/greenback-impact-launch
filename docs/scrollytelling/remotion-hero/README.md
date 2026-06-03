# Greenback Hero Loop (Remotion)

A 12-second looping hero video for **greenback.solutions**. Renders to MP4 or WebM. Frame 0 ≈ frame 359 so it loops seamlessly when set to `loop muted autoplay` on the site.

## What you get

- 1920×1080, 30 fps, 12 s loop
- Bold-modern aesthetic that matches the scrollytelling page (dark, lime-green accents, JetBrains Mono labels)
- Animated counter (0 → 38%), subtitle reveal, "4.8B hectares" beat, closing tagline
- Animated dot-grid backdrop that breathes

## One-time setup (run these once in order)

You need Node.js 18+ and npm. Open a terminal in this folder.

```bash
# 1. install dependencies
npm install

# 2. open the visual studio to preview / scrub the timeline
npm start
```

The Remotion Studio opens at `http://localhost:3000`. Drag the playhead to scrub through the 12 seconds. Hot-reload works — edit `src/HeroLoop.tsx` and watch it update.

## Rendering the final video

```bash
# MP4 (best browser support, larger file)
npm run build

# WebM with VP9 (smaller file, ideal for hero backgrounds)
npm run build-webm

# Single PNG still at frame 270 — use as a poster image / OG card
npm run build-poster
```

Outputs land in `./out/`. First render takes a minute or two; subsequent renders are faster.

## Dropping the loop into the website

Once you have `out/hero.webm` (or `.mp4`), copy it next to your site's assets. In the hero section of `greenback.solutions`, replace the existing hero markup with:

```html
<video
  autoplay muted loop playsinline
  poster="/hero-poster.png"
  style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0;"
>
  <source src="/hero.webm" type="video/webm" />
  <source src="/hero.mp4"  type="video/mp4" />
</video>
```

`muted` is required for autoplay in every modern browser. `playsinline` keeps mobile Safari from going fullscreen.

## Common edits — what to change and where

| Want to change | File | What to edit |
|---|---|---|
| The headline copy | `src/HeroLoop.tsx` | the JSX inside each "Stage" block |
| The accent green | `src/HeroLoop.tsx` | search for `#a3e635` and replace |
| The data figure (currently 38, 4.8B) | `src/HeroLoop.tsx` | the `interpolate(..., [0, 38], ...)` call and the `4.8B` literal |
| Total duration | `src/Root.tsx` | `durationInFrames={360}` — must match the beat sheet in `HeroLoop.tsx` |
| Output resolution | `src/Root.tsx` | `width` and `height` props |

## Beat sheet

| Time | Frames | What happens |
|---|---|---|
| 0.0–1.5s | 0–45 | Grid + brand fade in |
| 1.0–4.0s | 30–120 | "38" counts up to 38, with `%` |
| 3.5–6.5s | 100–210 | Subtitle: "of Earth's habitable land is farmland" |
| 6.0–8.5s | 175–285 | "4.8B" hectares headline beat |
| 8.0–11.5s | 245–355 | Closing line: "under our feet." |
| 11.5–12.0s | 355–359 | Seam fade so loop is clean |

## Troubleshooting

**`npm install` fails on Apple Silicon.** Remotion needs FFmpeg. `npm install` ships it automatically; if it doesn't, run `brew install ffmpeg`.

**Fonts look wrong on render.** Remotion renders in headless Chromium and doesn't load your system fonts. If you want pixel-perfect Space Grotesk, install `@remotion/google-fonts` and call `loadFont` inside `HeroLoop.tsx`. The current setup falls back to system fonts gracefully.

**Loop has a visible jump.** Frame 0 and frame 359 should be visually identical. If you change durations, also adjust the `seam` interpolation at the bottom of `HeroLoop.tsx`.

**Studio shows a blank screen.** Make sure `npm install` completed and you're running Node 18+. `node --version` should print v18 or higher.

## Files in this project

```
remotion-hero/
├── package.json          # deps + npm scripts
├── tsconfig.json         # TypeScript config
├── remotion.config.ts    # Remotion build settings
├── README.md             # you are here
└── src/
    ├── index.ts          # entry — calls registerRoot(Root)
    ├── Root.tsx          # registers the HeroLoop composition
    └── HeroLoop.tsx      # all the animation logic (this is what you'll edit)
```
