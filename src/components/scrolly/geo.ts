import * as d3 from "d3";
import { feature } from "topojson-client";
// Self-hosted (bundled) so the page never depends on a third-party CDN being up.
import worldData from "world-atlas/countries-110m.json";

interface CountryProps {
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const world = worldData as any;

export const WORLD_COUNTRIES = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  feature(world, world.objects.countries) as any
).features as Array<d3.GeoPermissibleObjects & { properties: CountryProps }>;

export const projection = d3.geoNaturalEarth1().scale(170).translate([480, 250]);
export const geoPathGen = d3.geoPath(projection);

export const colorAg = d3
  .scaleSequential()
  .domain([0, 80])
  .interpolator(
    d3.interpolateRgbBasis(["#1f2a25", "#2d4a3a", "#4ade80", "#a3e635", "#f59e0b"])
  );

export const colorAdapt = d3
  .scaleSequential()
  .domain([0, 7])
  .interpolator(
    d3.interpolateRgbBasis(["#1f2a25", "#2d4a3a", "#4ade80", "#a3e635", "#f59e0b"])
  );

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
