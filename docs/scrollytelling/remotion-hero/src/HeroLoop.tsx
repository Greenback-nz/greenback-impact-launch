import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
  spring,
  useVideoConfig,
} from "remotion";

/**
 * Greenback hero loop — 12s @ 30fps.
 * Designed to play as a muted, autoplaying loop in the hero section of greenback.solutions.
 *
 * Beat sheet:
 *  0.0–1.5s   Background fades in, ambient grid pulses.
 *  1.0–4.0s   "38%" counts up from 0 to 38 with a soft pop.
 *  3.5–6.5s   Counter shrinks up; "of habitable land is farmland" reveals.
 *  6.0–8.5s   Crossfade to "4.8 billion hectares" hero label.
 *  8.0–11.5s  Closing line: "The largest climate opportunity is under our feet."
 * 11.0–12.0s  Everything eases back to baseline so the loop is seamless.
 */
export const HeroLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // Helpers ----------------------------------------------------------------
  const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
  const inOut = (start: number, end: number) =>
    interpolate(frame, [start, start + 12, end - 12, end], [0, 1, 1, 0], {
      easing: Easing.bezier(0.22, 1, 0.36, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  // 1. Background gradient breath
  const breath = (Math.sin((frame / fps) * 0.6) + 1) / 2; // 0..1
  const bgGlow = 0.08 + breath * 0.05;

  // 2. Counter 0 → 38 between frames 30 and 120
  const counterRaw = interpolate(frame, [30, 120], [0, 38], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const counter = Math.round(counterRaw);
  const counterOpacity = inOut(20, 200);
  const counterScale = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14, stiffness: 110, mass: 0.6 },
  });

  // 3. Subtitle "of habitable land is farmland" appears at 110, fades 200
  const subOpacity = inOut(100, 210);
  const subY = interpolate(frame, [100, 130], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 4. "4.8 billion hectares" beat between 175 and 285
  const heroOpacity = inOut(175, 285);
  const heroY = interpolate(frame, [175, 205], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 5. Final tagline 245–355
  const taglineOpacity = inOut(245, 355);
  const taglineY = interpolate(frame, [245, 280], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Loop seam: fade everything to 0 by the last 5 frames so frame 0 ≈ frame N
  const seam = interpolate(frame, [durationInFrames - 10, durationInFrames - 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#0a0f0d",
        fontFamily: "Space Grotesk, -apple-system, system-ui, sans-serif",
        color: "#f3f5f1",
        overflow: "hidden",
      }}
    >
      {/* Ambient gradient backdrop */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(ellipse at 25% 35%, rgba(163,230,53,${bgGlow * 1.4}), transparent 55%),
            radial-gradient(ellipse at 80% 70%, rgba(245,158,11,${bgGlow * 0.7}), transparent 60%)
          `,
        }}
      />

      {/* Animated grid mesh */}
      <Grid frame={frame} width={width} height={height} />

      {/* Top-left brand mark */}
      <div
        style={{
          position: "absolute",
          top: 64,
          left: 80,
          fontSize: 22,
          letterSpacing: "-0.01em",
          fontWeight: 600,
          opacity: clamp01(frame / 30) * seam,
        }}
      >
        greenback<span style={{ color: "#a3e635" }}>.</span>solutions
      </div>

      {/* Top-right eyebrow */}
      <div
        style={{
          position: "absolute",
          top: 64,
          right: 80,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 14,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#a3e635",
          opacity: clamp01(frame / 30) * seam,
        }}
      >
        The Ground Beneath Us
      </div>

      {/* Center stage */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: seam }}>
        {/* Stage 1: huge counter */}
        <div
          style={{
            opacity: counterOpacity,
            transform: `scale(${0.85 + counterScale * 0.15})`,
            display: "flex",
            alignItems: "baseline",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 360,
              lineHeight: 1,
              fontWeight: 600,
              letterSpacing: "-0.05em",
              color: "#a3e635",
              textShadow: "0 0 80px rgba(163,230,53,0.25)",
            }}
          >
            {counter}
          </span>
          <span
            style={{
              fontSize: 200,
              fontWeight: 500,
              color: "#a3e635",
              opacity: 0.9,
            }}
          >
            %
          </span>
        </div>

        {/* Stage 2: subtitle */}
        <div
          style={{
            position: "absolute",
            bottom: 320,
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            fontSize: 36,
            letterSpacing: "-0.01em",
            color: "#8a948c",
          }}
        >
          of Earth's habitable land is farmland
        </div>

        {/* Stage 3: 4.8 billion hectares */}
        <div
          style={{
            position: "absolute",
            opacity: heroOpacity,
            transform: `translateY(${heroY}px)`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 240,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "#f3f5f1",
            }}
          >
            4.8B
          </div>
          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 26,
              letterSpacing: "0.06em",
              color: "#8a948c",
              marginTop: 24,
            }}
          >
            hectares — cropland &amp; pasture worldwide
          </div>
        </div>

        {/* Stage 4: tagline */}
        <div
          style={{
            position: "absolute",
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            textAlign: "center",
            maxWidth: 1500,
            padding: "0 80px",
          }}
        >
          <div
            style={{
              fontSize: 110,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            The largest climate opportunity
            <br />
            is <span style={{ color: "#a3e635" }}>under our feet.</span>
          </div>
          <div
            style={{
              marginTop: 36,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 18,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#8a948c",
            }}
          >
            greenback.solutions
          </div>
        </div>
      </AbsoluteFill>

      {/* Bottom-left progress mark, mirrors website chapter chip */}
      <div
        style={{
          position: "absolute",
          bottom: 64,
          left: 80,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 14,
          letterSpacing: "0.15em",
          color: "#8a948c",
          opacity: 0.8 * seam,
        }}
      >
        FAO · World Bank · Project Drawdown · Rodale
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Animated grid backdrop
// ---------------------------------------------------------------------------
const Grid: React.FC<{ frame: number; width: number; height: number }> = ({
  frame,
  width,
  height,
}) => {
  const cell = 80;
  const cols = Math.ceil(width / cell) + 1;
  const rows = Math.ceil(height / cell) + 1;
  const sway = Math.sin(frame / 40) * 4;

  // Build a subtle moving dot grid in SVG
  const dots: JSX.Element[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * cell + sway * Math.sin((r + c) / 4);
      const y = r * cell + sway * Math.cos((r + c) / 5);
      // pseudo-random highlight for a few cells, modulated by time
      const seed = (r * 13 + c * 7) % 17;
      const lit = seed === (Math.floor(frame / 18) % 17);
      dots.push(
        <circle
          key={`${r}-${c}`}
          cx={x}
          cy={y}
          r={lit ? 2.4 : 1.1}
          fill={lit ? "#a3e635" : "#1f2a25"}
          opacity={lit ? 0.7 : 0.55}
        />
      );
    }
  }
  return (
    <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
      {dots}
    </svg>
  );
};
