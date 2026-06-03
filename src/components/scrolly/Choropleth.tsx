import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { AG_LAND } from "./data";
import {
  WORLD_COUNTRIES,
  geoPathGen,
  colorAg,
  prefersReducedMotion,
} from "./geo";

// Chapter 2 — agricultural land share choropleth.
export function Choropleth() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svgEl = svgRef.current;
    const tip = tipRef.current;
    const wrap = wrapRef.current;
    if (!svgEl || !tip || !wrap) return;

    const reduce = prefersReducedMotion();
    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();

    svg
      .append("g")
      .selectAll("path")
      .data(WORLD_COUNTRIES)
      .join("path")
      .attr("class", "country")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr("d", geoPathGen as any)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr("fill", (d: any) => {
        const v = AG_LAND[d.properties.name];
        return v == null ? "#141a17" : colorAg(v);
      })
      .style("transition-delay", () =>
        reduce ? "0s" : `${(Math.random() * 0.8).toFixed(2)}s`
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .on("mousemove", function (event: MouseEvent, d: any) {
        const v = AG_LAND[d.properties.name];
        tip.innerHTML =
          `<strong style="color:#a3e635">${d.properties.name}</strong><br/>` +
          (v == null ? "no data" : `${v}% agricultural land`);
        const r = wrap.getBoundingClientRect();
        tip.style.left = `${event.clientX - r.left}px`;
        tip.style.top = `${event.clientY - r.top}px`;
        tip.style.opacity = "1";
      })
      .on("mouseleave", () => {
        tip.style.opacity = "0";
      });
  }, []);

  return (
    <div className="choropleth" ref={wrapRef}>
      <svg
        ref={svgRef}
        viewBox="0 0 960 500"
        preserveAspectRatio="xMidYMid meet"
        aria-label="World map of agricultural land share"
      />
      <div className="tip" ref={tipRef} />
      <div className="legend">
        <span>0%</span>
        <div className="legend-bar" />
        <span>80%+</span>
        <span style={{ marginLeft: "auto" }}>% of land used for agriculture</span>
      </div>
    </div>
  );
}
