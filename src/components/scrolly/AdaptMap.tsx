import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { AG_LAND, CLIMATE_RISK, adaptScore, type AdaptMode } from "./data";
import { WORLD_COUNTRIES, geoPathGen, colorAdapt } from "./geo";

// Chapter 6 — toggleable adaptation-benefit map (drought / flood).
export function AdaptMap() {
  const [mode, setMode] = useState<AdaptMode>("drought");
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const modeRef = useRef<AdaptMode>(mode);
  modeRef.current = mode;

  // Build the geometry once; tooltip reads the current mode via ref.
  useEffect(() => {
    const svgEl = svgRef.current;
    const tip = tipRef.current;
    const wrap = wrapRef.current;
    if (!svgEl || !tip || !wrap) return;

    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();

    svg
      .append("g")
      .attr("class", "adapt-layer")
      .selectAll("path")
      .data(WORLD_COUNTRIES)
      .join("path")
      .attr("class", "country")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr("d", geoPathGen as any)
      .style("transition-delay", () => `${(Math.random() * 0.8).toFixed(2)}s`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .on("mousemove", function (event: MouseEvent, d: any) {
        const n = d.properties.name as string;
        const ag = AG_LAND[n];
        const r = CLIMATE_RISK[n];
        const m = modeRef.current;
        const h = r ? (m === "drought" ? r.d : r.f) : null;
        const s = adaptScore(n, m);
        tip.innerHTML =
          `<strong style="color:#a3e635">${n}</strong><br/>` +
          (ag == null ? "no farmland data<br/>" : `farmland: ${ag}% &middot; `) +
          (h == null ? "no risk data" : `${m} risk: ${h.toFixed(1)} / 10`) +
          (s != null ? `<br/>benefit score: ${s.toFixed(2)}` : "");
        const re = wrap.getBoundingClientRect();
        tip.style.left = `${event.clientX - re.left}px`;
        tip.style.top = `${event.clientY - re.top}px`;
        tip.style.opacity = "1";
      })
      .on("mouseleave", () => {
        tip.style.opacity = "0";
      });
  }, []);

  // Recolor when the mode changes.
  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;
    d3.select(svgEl)
      .selectAll<SVGPathElement, unknown>("g.adapt-layer path")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr("fill", (d: any) => {
        const s = adaptScore(d.properties.name, mode);
        return s == null ? "#141a17" : colorAdapt(s);
      });
  }, [mode]);

  const topList = useMemo(
    () =>
      WORLD_COUNTRIES.map((d) => ({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        name: (d as any).properties.name as string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        s: adaptScore((d as any).properties.name, mode),
      }))
        .filter((x): x is { name: string; s: number } => x.s != null)
        .sort((a, b) => b.s - a.s)
        .slice(0, 10),
    [mode]
  );

  const headlineSmall =
    mode === "drought"
      ? "EXTRA SOIL WATER STORAGE · BUFFERS DROUGHT WHERE FARMS NEED IT MOST"
      : "EXTRA SOIL WATER STORAGE · ABSORBS STORM RAIN BEFORE IT BECOMES FLOOD";

  return (
    <>
      <div
        className="toggle-bar reveal delay-3"
        role="tablist"
        aria-label="View"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === "drought"}
          className={mode === "drought" ? "active" : ""}
          onClick={() => setMode("drought")}
        >
          Drought adaptation
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "flood"}
          className={mode === "flood" ? "active" : ""}
          onClick={() => setMode("flood")}
        >
          Flood mitigation
        </button>
      </div>

      <div className="adapt-wrap reveal delay-3">
        <div className="adapt-map" ref={wrapRef}>
          <svg
            ref={svgRef}
            viewBox="0 0 960 500"
            preserveAspectRatio="xMidYMid meet"
            aria-label="World map of adaptation benefit"
          />
          <div className="tip" ref={tipRef} />
          <div className="legend-row">
            <span>low</span>
            <div className="legend-bar" />
            <span>high</span>
            <span style={{ marginLeft: "auto" }}>
              Benefit = farmland share &times; {mode === "drought" ? "drought" : "flood"} risk
            </span>
          </div>
        </div>

        <aside className="adapt-panel">
          <div className="headline-stat">
            <div className="big">~900 km&sup3;</div>
            <div className="small">{headlineSmall}</div>
          </div>
          <div className="top-list">
            <h4>
              Top 10 &mdash; {mode === "drought" ? "drought adaptation" : "flood mitigation"} benefit
            </h4>
            {topList.map((c, i) => (
              <div className="row" key={c.name}>
                <div className="rank">{String(i + 1).padStart(2, "0")}</div>
                <div className="name">{c.name}</div>
                <div className="score">{c.s.toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="mono dim" style={{ fontSize: "11px", lineHeight: 1.6 }}>
            Score = country's INFORM hazard risk (0&ndash;10) &times; share of land under
            agriculture. Higher = more people and food systems shielded per percent of soil
            carbon gained. Source: INFORM Risk Index 2024 &middot; FAO via World Bank.
          </div>
        </aside>
      </div>
    </>
  );
}
