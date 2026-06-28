import { useState, useEffect, useRef, useCallback, ReactNode } from "react";
import { Layout } from "@/components/layout";

/* ── Hooks ─────────────────────────────────────────────────────────── */

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduce;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

/* ── Reusable components ───────────────────────────────────────────── */

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, inView] = useInView();
  const reduce = usePrefersReducedMotion();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: reduce || inView ? 1 : 0,
        transform: reduce || inView ? "translateY(0)" : "translateY(24px)",
        transition: reduce
          ? "none"
          : `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <FadeIn>
      <div
        className="font-dm-mono text-xs tracking-widest uppercase mb-6"
        style={{ color: "#a3e635", letterSpacing: "0.18em" }}
      >
        {number} / {label}
      </div>
    </FadeIn>
  );
}

function SectionHeading({
  children,
  delay = 0.1,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <FadeIn delay={delay}>
      <h2
        className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.05] mb-6 max-w-[800px]"
        style={{ color: "#f3f5f1", letterSpacing: "-0.025em" }}
      >
        {children}
      </h2>
    </FadeIn>
  );
}

function SectionIntro({
  children,
  delay = 0.15,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <FadeIn delay={delay}>
      <p
        className="text-base md:text-lg leading-relaxed max-w-[640px] mb-12"
        style={{ color: "#8a948c" }}
      >
        {children}
      </p>
    </FadeIn>
  );
}

function CountUp({
  end,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1600,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const span = ref.current;
    if (!span) return;
    if (reduce) {
      span.textContent = `${prefix}${end.toFixed(decimals)}${suffix}`;
      return;
    }
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || span.dataset.animated) return;
        span.dataset.animated = "1";
        const start = performance.now();
        const step = (t: number) => {
          const k = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - k, 3);
          const val = (end * eased).toFixed(decimals);
          span.textContent = `${prefix}${val}${suffix}`;
          if (k < 1) raf = requestAnimationFrame(step);
          else span.textContent = `${prefix}${end.toFixed(decimals)}${suffix}`;
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    observer.observe(span);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end, prefix, suffix, decimals, duration, reduce]);

  return (
    <span ref={ref}>
      {prefix}
      {end.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function SourceNote({ children }: { children: ReactNode }) {
  return (
    <div
      className="font-dm-mono text-[10px] tracking-wide mt-4"
      style={{ color: "#8a948c" }}
    >
      {children}
    </div>
  );
}

/* ── Sections ──────────────────────────────────────────────────────── */

function CoverSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#0a0f0d" }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(#1f2a25 1px, transparent 1px), linear-gradient(90deg, #1f2a25 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(163, 230, 53, 0.12), transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(245, 158, 11, 0.08), transparent 55%)",
        }}
      />

      <div
        className="relative z-10 max-w-[900px] mx-auto px-6 md:px-12 text-center"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="mb-6">
          <span
            className="font-dm-mono text-xs tracking-widest uppercase inline-block px-4 py-2 rounded-full border"
            style={{
              color: "#a3e635",
              borderColor: "rgba(163, 230, 53, 0.2)",
              background: "rgba(163, 230, 53, 0.05)",
              letterSpacing: "0.15em",
            }}
          >
            00 / Cover
          </span>
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.02] mb-6"
          style={{ color: "#f3f5f1", letterSpacing: "-0.03em" }}
        >
          Verification infrastructure for payments for{" "}
          <span style={{ color: "#a3e635" }}>ecosystem services.</span>
        </h1>

        <p
          className="text-xl md:text-2xl font-medium mb-4"
          style={{ color: "#f3f5f1" }}
        >
          Farming that feeds forever.
        </p>

        <p
          className="font-dm-mono text-xs tracking-wider mb-10"
          style={{ color: "#8a948c", letterSpacing: "0.08em" }}
        >
          Aotearoa New Zealand // United Kingdom // Phase 1 Pacific Islands
        </p>

        <div
          className="flex flex-col sm:flex-row gap-6 justify-center mb-10 text-sm"
          style={{ color: "#8a948c" }}
        >
          <div>
            <div className="font-semibold" style={{ color: "#f3f5f1" }}>
              Fliss Roberts
            </div>
            <div className="font-dm-mono text-xs" style={{ color: "#a3e635" }}>
              Founder & CEO
            </div>
            <a
              href="mailto:hello@greenback.solutions"
              className="no-underline text-xs"
              style={{ color: "#8a948c" }}
            >
              hello@greenback.solutions
            </a>
          </div>
          <div>
            <div className="font-semibold" style={{ color: "#f3f5f1" }}>
              Dr Rhianon Jones
            </div>
            <div className="font-dm-mono text-xs" style={{ color: "#a3e635" }}>
              Co-founder & UK Director
            </div>
            <a
              href="mailto:rhianon@greenback.solutions"
              className="no-underline text-xs"
              style={{ color: "#8a948c" }}
            >
              rhianon@greenback.solutions
            </a>
          </div>
        </div>

        <a
          href="https://calendly.com/hello-greenback/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold rounded-full no-underline transition-all duration-300"
          style={{ background: "#a3e635", color: "#0a0f0d" }}
        >
          Book a 30-minute call
        </a>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section
      className="py-16 md:py-24"
      style={{ background: "#0a0f0d", borderTop: "1px solid #1f2a25" }}
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <SectionLabel number="01" label="THE PROBLEM" />
        <SectionHeading>
          Mandated demand. Collapsing supply.{" "}
          <span style={{ color: "#a3e635" }}>No infrastructure.</span>
        </SectionHeading>
        <SectionIntro>
          Agriculture and food systems drive 21 to 37 percent of global
          greenhouse gas emissions (IPCC AR6) and the largest share of
          biodiversity loss. The world needs 60 percent more food by 2050.
          Demand for verified outcomes is being mandated onto corporate balance
          sheets faster than supply can be built.
        </SectionIntro>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* DEMAND MANDATED */}
          <FadeIn delay={0.2}>
            <div
              className="p-8 rounded-lg border h-full"
              style={{
                borderColor: "#1f2a25",
                background:
                  "linear-gradient(180deg, rgba(163, 230, 53, 0.06), transparent)",
              }}
            >
              <div
                className="font-dm-mono text-xs tracking-wider mb-4"
                style={{ color: "#a3e635", letterSpacing: "0.12em" }}
              >
                DEMAND MANDATED
              </div>
              <div className="text-sm leading-relaxed" style={{ color: "#8a948c" }}>
                <p className="mb-3">
                  <strong style={{ color: "#f3f5f1" }}>CSRD:</strong> 50,000+
                  EU companies must report verified outcomes.
                </p>
                <p className="mb-3">
                  <strong style={{ color: "#f3f5f1" }}>SBTi FLAG:</strong>{" "}
                  audit-grade Scope 3 land accounting.
                </p>
                <p className="mb-3">
                  <strong style={{ color: "#f3f5f1" }}>EU CRCF (Feb 2026):</strong>{" "}
                  a new certifiable asset class.
                </p>
                <p>
                  <strong style={{ color: "#f3f5f1" }}>EU mandate:</strong> 25%
                  organic farmland by 2030.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* SUPPLY COLLAPSING */}
          <FadeIn delay={0.3}>
            <div
              className="p-8 rounded-lg border h-full"
              style={{
                borderColor: "#1f2a25",
                background:
                  "linear-gradient(180deg, rgba(163, 230, 53, 0.06), transparent)",
              }}
            >
              <div
                className="font-dm-mono text-xs tracking-wider mb-4"
                style={{ color: "#a3e635", letterSpacing: "0.12em" }}
              >
                SUPPLY COLLAPSING
              </div>
              <div className="text-sm leading-relaxed" style={{ color: "#8a948c" }}>
                <p className="mb-3">
                  Global farmer average age 56 to 58 (FAO).
                </p>
                <p className="mb-3">
                  40%+ of US farmland changes hands by 2035, most without
                  successors (USDA).
                </p>
                <p>
                  A 2 to 3 year income gap during organic conversion locks out
                  the next generation.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* THE STAKES */}
          <FadeIn delay={0.4}>
            <div
              className="p-8 rounded-lg border h-full"
              style={{
                borderColor: "#1f2a25",
                background:
                  "linear-gradient(180deg, rgba(163, 230, 53, 0.06), transparent)",
              }}
            >
              <div
                className="font-dm-mono text-xs tracking-wider mb-4"
                style={{ color: "#a3e635", letterSpacing: "0.12em" }}
              >
                THE STAKES
              </div>
              <div className="text-sm leading-relaxed" style={{ color: "#8a948c" }}>
                <p className="mb-3">
                  Voluntary carbon markets projected $50 to $250B by 2030
                  (MSCI, McKinsey).
                </p>
                <p className="mb-3">
                  Regenerative organic agriculture is the cheapest scaled
                  removal lever.
                </p>
                <p style={{ color: "#f3f5f1", fontWeight: 600 }}>
                  Whoever builds the rails owns the registry.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function SolutionSection() {
  const nodes = [
    {
      name: "Greenback",
      detail:
        "Sets the standard, operates the registry, runs the rails, earns registry and transaction fees.",
    },
    {
      name: "Project developers",
      detail:
        "Peak organic bodies: OANZ, AOL, IFOAM aggregate farms.",
    },
    {
      name: "Independent VVBs",
      detail:
        "AsureQuality and accredited bodies validate outcomes.",
    },
    {
      name: "Corporate buyers",
      detail: "Retire RAIUs against CSRD, SBTi FLAG, EU CRCF.",
    },
  ];

  return (
    <section
      className="py-16 md:py-24"
      style={{ background: "#0f1714", borderTop: "1px solid #1f2a25" }}
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <SectionLabel number="02" label="THE SOLUTION" />
        <SectionHeading>
          The standard. The registry.{" "}
          <span style={{ color: "#a3e635" }}>The rails.</span>
        </SectionHeading>
        <SectionIntro>
          Greenback defines the RAIU methodology, operates the registry, and
          runs the payments rail. We do not own or trade credits. The same
          structural model as Verra and Gold Standard, built natively for
          bundled ecosystem services.
        </SectionIntro>

        {/* Value chain flow */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          {nodes.map((node, i) => (
            <FadeIn key={i} delay={0.2 + i * 0.15} className="flex-1 flex items-stretch">
              <div className="flex items-stretch w-full">
                <div
                  className="flex-1 p-6 rounded-lg border"
                  style={{
                    borderColor:
                      i === 0
                        ? "rgba(163, 230, 53, 0.3)"
                        : "#1f2a25",
                    background:
                      i === 0
                        ? "linear-gradient(180deg, rgba(163, 230, 53, 0.1), rgba(163, 230, 53, 0.02))"
                        : "rgba(163, 230, 53, 0.02)",
                  }}
                >
                  <div
                    className="font-dm-mono text-[10px] tracking-widest uppercase mb-2"
                    style={{ color: "#8a948c" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3
                    className="text-base font-semibold mb-2"
                    style={{ color: i === 0 ? "#a3e635" : "#f3f5f1" }}
                  >
                    {node.name}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "#8a948c" }}
                  >
                    {node.detail}
                  </p>
                </div>
                {i < nodes.length - 1 && (
                  <div
                    className="hidden md:flex items-center px-2"
                    style={{ color: "#a3e635", fontSize: "18px" }}
                  >
                    &rarr;
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Pull quote */}
        <FadeIn delay={0.7}>
          <div
            className="max-w-[700px] mx-auto p-8 rounded-lg border-l-2 text-center"
            style={{
              borderColor: "rgba(163, 230, 53, 0.3)",
              background: "rgba(163, 230, 53, 0.02)",
            }}
          >
            <p
              className="text-lg md:text-xl font-semibold"
              style={{ color: "#f3f5f1" }}
            >
              Farmers earn the credits.{" "}
              <span style={{ color: "#a3e635" }}>Greenback runs the rails.</span>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function UnitSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const layers = [
    {
      name: "Carbon sequestration",
      detail: "Soil organic carbon measured at lab grade, 0 to 30cm depth. About 1 tonne CO2e per hectare per year, measured not modelled.",
      color: "#a3e635",
    },
    {
      name: "Emissions reductions",
      detail: "Reduced nitrous oxide and methane from improved farm practices, quantified against a baseline.",
      color: "#4ade80",
    },
    {
      name: "Soil health",
      detail: "Biological activity, structure, and nutrient cycling indicators tracked over the 3-year verification cycle.",
      color: "#22c55e",
    },
    {
      name: "Water quality",
      detail: "MCI (Macroinvertebrate Community Index), E.coli, nitrogen, and phosphorus monitoring.",
      color: "#16a34a",
    },
    {
      name: "Biodiversity",
      detail: "eDNA metabarcoding and species richness surveys providing a quantified biodiversity baseline and trend.",
      color: "#15803d",
    },
  ];

  const toggle = useCallback(
    (i: number) => setExpanded((prev) => (prev === i ? null : i)),
    []
  );

  return (
    <section
      className="py-16 md:py-24"
      style={{ background: "#0a0f0d", borderTop: "1px solid #1f2a25" }}
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <SectionLabel number="03" label="THE UNIT" />
        <SectionHeading>
          Five bundled outcomes.{" "}
          <span style={{ color: "#a3e635" }}>One verified credit.</span>
        </SectionHeading>
        <SectionIntro>
          The RAIU (Regenerative Agriculture Integrity Unit) is one
          hectare-year, measuring five ecological layers as one inseparable,
          no-unbundling credit.
        </SectionIntro>

        <div className="flex flex-col gap-3 mb-8">
          {layers.map((layer, i) => (
            <FadeIn key={i} delay={0.2 + i * 0.08}>
              <button
                onClick={() => toggle(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle(i);
                  }
                }}
                aria-expanded={expanded === i}
                className="w-full text-left p-6 rounded-lg border transition-all duration-300 cursor-pointer"
                style={{
                  borderColor:
                    expanded === i
                      ? "rgba(163, 230, 53, 0.3)"
                      : "#1f2a25",
                  background:
                    expanded === i
                      ? "linear-gradient(180deg, rgba(163, 230, 53, 0.08), rgba(163, 230, 53, 0.02))"
                      : "rgba(163, 230, 53, 0.02)",
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ background: layer.color }}
                    />
                    <h3
                      className="text-base font-semibold"
                      style={{ color: "#f3f5f1" }}
                    >
                      {layer.name}
                    </h3>
                  </div>
                  <span
                    className="font-dm-mono text-xs flex-shrink-0"
                    style={{
                      color: "#8a948c",
                      transform:
                        expanded === i ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    +
                  </span>
                </div>
                {expanded === i && (
                  <p
                    className="text-sm leading-relaxed mt-4 ml-7"
                    style={{ color: "#8a948c" }}
                  >
                    {layer.detail}
                  </p>
                )}
              </button>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.6}>
          <SourceNote>
            Conservatively: about 1 tonne CO2e per hectare per year, measured
            not modelled; SOC at lab grade 0 to 30cm; 3-year verification cycle.
          </SourceNote>
        </FadeIn>
      </div>
    </section>
  );
}

function OpportunitySection() {
  return (
    <section
      className="py-16 md:py-24"
      style={{ background: "#0f1714", borderTop: "1px solid #1f2a25" }}
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <SectionLabel number="04" label="SIZE OF THE OPPORTUNITY" />
        <SectionHeading>
          The largest climate opportunity is{" "}
          <span style={{ color: "#a3e635" }}>under our feet.</span>
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <FadeIn delay={0.2}>
            <div
              className="p-8 rounded-lg border"
              style={{
                borderColor: "#1f2a25",
                background:
                  "linear-gradient(180deg, rgba(163, 230, 53, 0.06), transparent)",
              }}
            >
              <div
                className="text-4xl md:text-5xl font-semibold mb-3"
                style={{ color: "#a3e635", letterSpacing: "-0.04em" }}
              >
                <CountUp end={4.8} suffix="B ha" decimals={1} />
              </div>
              <div
                className="text-sm leading-relaxed mb-3"
                style={{ color: "#f3f5f1" }}
              >
                of cropland and pasture worldwide (about 38% of habitable land),
                larger than Africa and South America combined.
              </div>
              <SourceNote>
                Source: FAO State of the World's Land and Water, 2025
              </SourceNote>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div
              className="p-8 rounded-lg border"
              style={{
                borderColor: "#1f2a25",
                background:
                  "linear-gradient(180deg, rgba(163, 230, 53, 0.06), transparent)",
              }}
            >
              <div className="flex gap-6 mb-3">
                <div>
                  <div
                    className="text-3xl md:text-4xl font-semibold"
                    style={{ color: "#f59e0b", letterSpacing: "-0.04em" }}
                  >
                    <CountUp end={3.2} suffix="B" decimals={1} />
                  </div>
                  <div
                    className="font-dm-mono text-xs mt-1"
                    style={{ color: "#8a948c" }}
                  >
                    Pasture (67%)
                  </div>
                </div>
                <div>
                  <div
                    className="text-3xl md:text-4xl font-semibold"
                    style={{ color: "#a3e635", letterSpacing: "-0.04em" }}
                  >
                    <CountUp end={1.6} suffix="B" decimals={1} />
                  </div>
                  <div
                    className="font-dm-mono text-xs mt-1"
                    style={{ color: "#8a948c" }}
                  >
                    Cropland (33%)
                  </div>
                </div>
              </div>
              <div
                className="w-full h-6 rounded overflow-hidden flex"
                style={{ background: "#1f2a25" }}
              >
                <div
                  style={{
                    width: "67%",
                    background:
                      "linear-gradient(90deg, #f59e0b, #ea580c)",
                    height: "100%",
                  }}
                />
                <div
                  style={{
                    width: "33%",
                    background:
                      "linear-gradient(90deg, #a3e635, #4ade80)",
                    height: "100%",
                  }}
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div
              className="p-8 rounded-lg border"
              style={{
                borderColor: "#1f2a25",
                background:
                  "linear-gradient(180deg, rgba(163, 230, 53, 0.06), transparent)",
              }}
            >
              <div
                className="text-4xl md:text-5xl font-semibold mb-3"
                style={{ color: "#a3e635", letterSpacing: "-0.04em" }}
              >
                14.5 to 22 Gt
              </div>
              <div
                className="text-sm leading-relaxed mb-3"
                style={{ color: "#f3f5f1" }}
              >
                CO2 drawn down or avoided by 2050 through regenerative annual
                cropping.
              </div>
              <SourceNote>Source: Project Drawdown</SourceNote>
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div
              className="p-8 rounded-lg border"
              style={{
                borderColor: "#1f2a25",
                background:
                  "linear-gradient(180deg, rgba(163, 230, 53, 0.06), transparent)",
              }}
            >
              <div
                className="text-3xl md:text-4xl font-semibold mb-3"
                style={{ color: "#a3e635", letterSpacing: "-0.04em" }}
              >
                $12T
              </div>
              <div
                className="text-sm leading-relaxed mb-3"
                style={{ color: "#f3f5f1" }}
              >
                Global food system turnover. Documented agricultural
                soil-carbon prices USD $60 to $180 per tonne; nature-based
                premiums USD $150 to $200+ per tonne.
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function RevenueAtScaleSection() {
  const adoptionLevels = [
    { label: "5%", value: 0.05 },
    { label: "15%", value: 0.15 },
    { label: "30%", value: 0.3 },
  ];
  const [selectedIdx, setSelectedIdx] = useState(1);

  const markets = [
    {
      name: "New Zealand",
      ha: 90_000,
      revenues: [0.2, 0.6, 1.2],
    },
    {
      name: "Australia",
      ha: 1_000_000,
      revenues: [2.3, 6.8, 13.5],
    },
    {
      name: "United Kingdom",
      ha: 500_000,
      revenues: [1.1, 3.4, 6.8],
    },
    {
      name: "Canada",
      ha: 1_600_000,
      revenues: [3.6, 10.8, 21.6],
    },
  ];

  const totals = [7, 21, 43];
  const maxRevenue = 21.6;

  return (
    <section
      className="py-16 md:py-24"
      style={{ background: "#0a0f0d", borderTop: "1px solid #1f2a25" }}
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <SectionLabel number="05" label="REVENUE AT SCALE" />
        <SectionHeading>
          A four-market beachhead{" "}
          <span style={{ color: "#a3e635" }}>(interactive).</span>
        </SectionHeading>

        <FadeIn delay={0.15}>
          <p
            className="text-sm leading-relaxed mb-8 max-w-[640px]"
            style={{ color: "#8a948c" }}
          >
            Greenback earns about NZD $45 of recurring revenue per enrolled
            hectare per year (15.5% of ~NZD $290 gross RAIU value).
          </p>
        </FadeIn>

        {/* Adoption toggle */}
        <FadeIn delay={0.2}>
          <div className="mb-10">
            <div
              className="font-dm-mono text-[10px] tracking-widest uppercase mb-3"
              style={{ color: "#8a948c" }}
            >
              Adoption rate
            </div>
            <div
              className="inline-flex gap-1 p-1 rounded-full"
              style={{
                background: "#0f1714",
                border: "1px solid #1f2a25",
              }}
              role="radiogroup"
              aria-label="Adoption rate selector"
            >
              {adoptionLevels.map((level, i) => (
                <button
                  key={i}
                  role="radio"
                  aria-checked={selectedIdx === i}
                  onClick={() => setSelectedIdx(i)}
                  className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-250 cursor-pointer"
                  style={{
                    background:
                      selectedIdx === i ? "#a3e635" : "transparent",
                    color: selectedIdx === i ? "#0a0f0d" : "#8a948c",
                    border: "none",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Bar chart */}
        <FadeIn delay={0.3}>
          <div className="flex flex-col gap-5 mb-8">
            {markets.map((market, i) => {
              const rev = market.revenues[selectedIdx];
              const pct = (rev / maxRevenue) * 100;
              return (
                <div key={i}>
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="flex items-baseline gap-3">
                      <span
                        className="text-sm font-medium"
                        style={{ color: "#f3f5f1" }}
                      >
                        {market.name}
                      </span>
                      <span
                        className="font-dm-mono text-[10px]"
                        style={{ color: "#8a948c" }}
                      >
                        {market.ha.toLocaleString()} ha
                      </span>
                    </div>
                    <span
                      className="font-dm-mono text-sm font-medium"
                      style={{ color: "#a3e635" }}
                    >
                      ${rev}M
                    </span>
                  </div>
                  <div
                    className="w-full h-7 rounded overflow-hidden"
                    style={{ background: "#1f2a25" }}
                  >
                    <div
                      className="h-full rounded"
                      style={{
                        width: `${pct}%`,
                        background:
                          "linear-gradient(90deg, #a3e635, #4ade80)",
                        transition: "width 0.6s cubic-bezier(0.2, 0.7, 0.2, 1)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>

        {/* Total */}
        <FadeIn delay={0.4}>
          <div
            className="p-6 rounded-lg border flex items-center justify-between"
            style={{
              borderColor: "rgba(163, 230, 53, 0.3)",
              background:
                "linear-gradient(180deg, rgba(163, 230, 53, 0.08), rgba(163, 230, 53, 0.02))",
            }}
          >
            <span className="text-base font-semibold" style={{ color: "#f3f5f1" }}>
              Total recurring revenue
            </span>
            <span
              className="text-2xl md:text-3xl font-semibold"
              style={{ color: "#a3e635", letterSpacing: "-0.04em" }}
            >
              ~${totals[selectedIdx]}M
              <span
                className="text-sm font-normal ml-2"
                style={{ color: "#8a948c" }}
              >
                /year
              </span>
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <p
            className="font-dm-mono text-[10px] leading-relaxed mt-6 max-w-[640px]"
            style={{ color: "#8a948c" }}
          >
            Illustrative of potential, not a forecast. Australia uses a
            conservative ~1M ha productive subset (its ~35M organic ha is ~97%
            extensive rangeland). ANZOC subscriptions, enterprise API, compliance
            reporting and the EU and US are additional upside. Sources:
            OANZ/FiBL, DEFRA 2024, StatCan.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function ProductSection() {
  return (
    <section
      className="py-16 md:py-24"
      style={{ background: "#0f1714", borderTop: "1px solid #1f2a25" }}
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <SectionLabel number="06" label="THE PRODUCT" />
        <SectionHeading>
          Two platforms.{" "}
          <span style={{ color: "#a3e635" }}>One infrastructure layer.</span>
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ANZOC */}
          <FadeIn delay={0.2}>
            <div
              className="p-8 rounded-lg border h-full flex flex-col"
              style={{
                borderColor: "#1f2a25",
                background:
                  "linear-gradient(180deg, rgba(163, 230, 53, 0.06), transparent)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: "#a3e635",
                    boxShadow: "0 0 8px rgba(163, 230, 53, 0.5)",
                  }}
                />
                <span
                  className="font-dm-mono text-xs tracking-wider"
                  style={{ color: "#a3e635" }}
                >
                  LIVE
                </span>
              </div>
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: "#f3f5f1" }}
              >
                ANZOC
              </h3>
              <p
                className="text-sm leading-relaxed mb-6 flex-1"
                style={{ color: "#8a948c" }}
              >
                Organic certification compliance SaaS. Full OPPA 2023 toolkit,
                certificate verification across NZ, AU, US and EU bodies, recipe
                and label compliance, stocklist and operator management.
                Stripe-integrated, deployed, revenue-generating.
              </p>
              <a
                href="https://anzoc.co.nz"
                target="_blank"
                rel="noopener noreferrer"
                className="font-dm-mono text-sm no-underline self-start"
                style={{
                  color: "#a3e635",
                  borderBottom: "1px solid rgba(163, 230, 53, 0.3)",
                  paddingBottom: "2px",
                }}
              >
                anzoc.co.nz &rarr;
              </a>
            </div>
          </FadeIn>

          {/* RAIU Registry */}
          <FadeIn delay={0.3}>
            <div
              className="p-8 rounded-lg border h-full flex flex-col"
              style={{
                borderColor: "#1f2a25",
                background: "rgba(163, 230, 53, 0.02)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="font-dm-mono text-xs tracking-wider"
                  style={{ color: "#8a948c" }}
                >
                  PHASE 1, FIJI
                </span>
              </div>
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: "#f3f5f1" }}
              >
                RAIU Registry
              </h3>
              <p
                className="text-sm leading-relaxed mb-6 flex-1"
                style={{ color: "#8a948c" }}
              >
                Carbon + biodiversity + water + soil in one verified unit.
                Aligned with Verra VM0042, SD VISta and EU CRCF. Purpose-built
                registry, immutable audit trail. Phase 1: Phoenix Foundation
                (Fiji), Ceres Organics anchor offtake. Seeking year-round,
                both-hemisphere field trials for regenerative crops around buyer
                requirements via UK, Ireland, potentially France/Belgium,
                Australia and New Zealand.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function TractionSection() {
  return (
    <section
      className="py-16 md:py-24"
      style={{ background: "#0a0f0d", borderTop: "1px solid #1f2a25" }}
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <SectionLabel number="07" label="TRACTION" />
        <SectionHeading>
          Live revenue. Signed partners.{" "}
          <span style={{ color: "#a3e635" }}>Institutional backing.</span>
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* COMMERCIAL */}
          <FadeIn delay={0.2}>
            <div
              className="p-8 rounded-lg border h-full"
              style={{
                borderColor: "#1f2a25",
                background:
                  "linear-gradient(180deg, rgba(163, 230, 53, 0.06), transparent)",
              }}
            >
              <div
                className="font-dm-mono text-xs tracking-wider mb-6"
                style={{ color: "#a3e635", letterSpacing: "0.12em" }}
              >
                COMMERCIAL
              </div>
              <ul
                className="text-sm leading-relaxed space-y-4 list-none p-0 m-0"
                style={{ color: "#8a948c" }}
              >
                <li className="flex gap-3">
                  <span style={{ color: "#a3e635" }}>&bull;</span>
                  ANZOC deployed and generating subscription revenue.
                </li>
                <li className="flex gap-3">
                  <span style={{ color: "#a3e635" }}>&bull;</span>
                  Ceres Organics signed Letter of Intent as anchor RAIU offtaker
                  (non-binding, March 2026).
                </li>
                <li className="flex gap-3">
                  <span style={{ color: "#a3e635" }}>&bull;</span>
                  Phoenix Foundation Phase 1 pilot at Gaia Estate, a 250-acre
                  certified-organic farm in Fiji.
                </li>
              </ul>
            </div>
          </FadeIn>

          {/* INSTITUTIONAL */}
          <FadeIn delay={0.3}>
            <div
              className="p-8 rounded-lg border h-full"
              style={{
                borderColor: "#1f2a25",
                background:
                  "linear-gradient(180deg, rgba(163, 230, 53, 0.06), transparent)",
              }}
            >
              <div
                className="font-dm-mono text-xs tracking-wider mb-6"
                style={{ color: "#a3e635", letterSpacing: "0.12em" }}
              >
                INSTITUTIONAL
              </div>
              <ul
                className="text-sm leading-relaxed space-y-4 list-none p-0 m-0"
                style={{ color: "#8a948c" }}
              >
                <li className="flex gap-3">
                  <span style={{ color: "#a3e635" }}>&bull;</span>
                  AsureQuality confirmed as verification and co-development
                  partner.
                </li>
                <li className="flex gap-3">
                  <span style={{ color: "#a3e635" }}>&bull;</span>
                  Tiffany Tompkins (former OANZ Chief Executive) strategic
                  advisor.
                </li>
                <li className="flex gap-3">
                  <span style={{ color: "#a3e635" }}>&bull;</span>
                  OANZ Payments for Ecosystem Services framework,
                  founder-authored.
                </li>
                <li className="flex gap-3">
                  <span style={{ color: "#a3e635" }}>&bull;</span>
                  Greenback (UK) Ltd incorporated (18 June 2026).
                </li>
                <li className="flex gap-3">
                  <span style={{ color: "#a3e635" }}>&bull;</span>
                  C40 Women4Climate and Creative HQ Aurora Climate Tech alumna.
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function BusinessModelSection() {
  const streams = [
    { num: "1", label: "ANZOC SaaS subscriptions, recurring." },
    { num: "2", label: "RAIU transaction fee 15%, at farmer settlement." },
    { num: "3", label: "RAIU issuance fee ~USD $2/unit." },
    { num: "4", label: "Verification coordination ~20% margin." },
    { num: "5", label: "Enterprise API USD $25k to $150k/yr." },
    { num: "6", label: "Compliance reports USD $5k to $50k." },
  ];

  const projections = [
    { label: "Y0 to Y1\nPilot", value: 0.2, display: "$200k" },
    { label: "Y2\nCommercial", value: 1.5, display: "$1.5M" },
    { label: "Y3\nGrowth", value: 5, display: "$5M" },
    { label: "Y5\nScale", value: 23, display: "$23M" },
  ];
  const maxProjection = 23;

  return (
    <section
      className="py-16 md:py-24"
      style={{ background: "#0f1714", borderTop: "1px solid #1f2a25" }}
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <SectionLabel number="08" label="BUSINESS MODEL" />
        <SectionHeading>
          Six revenue streams.{" "}
          <span style={{ color: "#a3e635" }}>Blended 15.5% take rate.</span>
        </SectionHeading>

        {/* Revenue streams */}
        <div className="flex flex-col gap-3 mb-12">
          {streams.map((stream, i) => (
            <FadeIn key={i} delay={0.15 + i * 0.06}>
              <div
                className="flex items-start gap-4 p-5 rounded-lg border"
                style={{
                  borderColor: "#1f2a25",
                  background: "rgba(163, 230, 53, 0.02)",
                }}
              >
                <span
                  className="font-dm-mono text-xs font-medium flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(163, 230, 53, 0.1)",
                    color: "#a3e635",
                    border: "1px solid rgba(163, 230, 53, 0.2)",
                  }}
                >
                  {stream.num}
                </span>
                <span
                  className="text-sm leading-relaxed"
                  style={{ color: "#f3f5f1" }}
                >
                  {stream.label}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <div
            className="p-6 rounded-lg border-l-2 mb-12"
            style={{
              borderColor: "rgba(163, 230, 53, 0.2)",
              background: "rgba(163, 230, 53, 0.02)",
            }}
          >
            <p className="text-sm leading-relaxed" style={{ color: "#8a948c" }}>
              Farmers pay nothing out of pocket; fees come from gross RAIU
              settlement; corporate buyers pay the gross price.
            </p>
          </div>
        </FadeIn>

        {/* Revenue projection chart */}
        <FadeIn delay={0.55}>
          <div
            className="font-dm-mono text-xs tracking-widest uppercase mb-6"
            style={{ color: "#8a948c", letterSpacing: "0.12em" }}
          >
            Phased revenue projection
          </div>
        </FadeIn>

        <div className="flex items-end gap-4 md:gap-8 mb-4" style={{ height: "240px" }}>
          {projections.map((proj, i) => {
            const pct = (proj.value / maxProjection) * 100;
            return (
              <FadeIn
                key={i}
                delay={0.6 + i * 0.12}
                className="flex-1 flex flex-col items-center justify-end h-full"
              >
                <span
                  className="font-dm-mono text-xs font-medium mb-2"
                  style={{ color: "#a3e635" }}
                >
                  {proj.display}
                </span>
                <div
                  className="w-full rounded-t"
                  style={{
                    height: `${Math.max(pct, 4)}%`,
                    background:
                      "linear-gradient(180deg, #a3e635, rgba(163, 230, 53, 0.4))",
                    transition: "height 1s cubic-bezier(0.2, 0.7, 0.2, 1)",
                    minHeight: "8px",
                  }}
                />
                <div
                  className="font-dm-mono text-[10px] text-center mt-3 whitespace-pre-line leading-tight"
                  style={{ color: "#8a948c" }}
                >
                  {proj.label}
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.9}>
          <SourceNote>
            Gross margin moves from ~60% to ~80% by Y5.
          </SourceNote>
        </FadeIn>
      </div>
    </section>
  );
}

function MoatSection() {
  const moats = [
    {
      label: "ACCESS",
      detail:
        "Peak organic-body federation as the project-developer network (OANZ, AOL, IFOAM, UK Soil Association, IOA), a decades-deep distribution moat.",
    },
    {
      label: "PARTNERSHIP",
      detail:
        "AsureQuality, NZ's national assurance provider, as verification and co-development partner.",
    },
    {
      label: "IP",
      detail:
        "Proprietary RAIU bundling and quantification methodology, purpose-built audit-grade registry.",
    },
    {
      label: "POSITIONING",
      detail:
        "Registry operator, not credit trader, neutral infrastructure.",
    },
    {
      label: "CONVERSION BRIDGE",
      detail:
        "RAIU provisional payments close the 2 to 3 year organic-conversion income gap.",
    },
  ];

  return (
    <section
      className="py-16 md:py-24"
      style={{ background: "#0a0f0d", borderTop: "1px solid #1f2a25" }}
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <SectionLabel number="09" label="MOAT" />
        <SectionHeading>
          The only ecosystem-services platform with a{" "}
          <span style={{ color: "#a3e635" }}>
            regulated farmer-acquisition channel.
          </span>
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {moats.map((moat, i) => (
            <FadeIn key={i} delay={0.2 + i * 0.08}>
              <div
                className="p-6 rounded-lg border h-full"
                style={{
                  borderColor: "#1f2a25",
                  background:
                    "linear-gradient(180deg, rgba(163, 230, 53, 0.06), transparent)",
                }}
              >
                <div
                  className="font-dm-mono text-xs tracking-wider mb-3"
                  style={{ color: "#a3e635", letterSpacing: "0.12em" }}
                >
                  {moat.label}
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#8a948c" }}
                >
                  {moat.detail}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamAndAskSection() {
  const ROLES = [
    { value: "", label: "I am a\u2026" },
    { value: "investor", label: "Investor" },
    { value: "funder", label: "Funder / grant body" },
    { value: "partner", label: "Potential partner" },
    { value: "farmer", label: "Farmer keen to pilot" },
    { value: "sector-body", label: "Organic sector body" },
    { value: "other", label: "Other" },
  ];

  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(
      "https://calendly.com/hello-greenback/30min",
      "_blank",
      "noopener,noreferrer"
    );
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #1f2a25",
    background: "#0f1714",
    color: "#f3f5f1",
    fontFamily: "'Space Grotesk', system-ui, sans-serif",
    fontSize: "14px",
    outline: "none",
    appearance: "none",
    WebkitAppearance: "none",
  };

  return (
    <section
      id="s10-contact"
      className="py-16 md:py-24"
      style={{ background: "#0f1714", borderTop: "1px solid #1f2a25" }}
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <SectionLabel number="10" label="TEAM AND ASK" />
        <SectionHeading>
          Built for{" "}
          <span style={{ color: "#a3e635" }}>this moment.</span>
        </SectionHeading>

        {/* Team */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <FadeIn delay={0.2}>
            <div
              className="p-8 rounded-lg border h-full"
              style={{
                borderColor: "#1f2a25",
                background:
                  "linear-gradient(180deg, rgba(163, 230, 53, 0.06), transparent)",
              }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold mb-5"
                style={{
                  background: "rgba(163, 230, 53, 0.1)",
                  color: "#a3e635",
                  border: "1px solid rgba(163, 230, 53, 0.2)",
                }}
              >
                FR
              </div>
              <h3
                className="text-xl font-semibold mb-1"
                style={{ color: "#f3f5f1" }}
              >
                Fliss Roberts
              </h3>
              <div
                className="font-dm-mono text-xs tracking-wider mb-4"
                style={{ color: "#a3e635" }}
              >
                Founder & CEO
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#8a948c" }}
              >
                MBA Sustainability (AUT). Three years Operations Manager at
                BioGro NZ, responsible for 850+ organic producers across 18
                sectors. Authored the OANZ PES framework.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div
              className="p-8 rounded-lg border h-full"
              style={{
                borderColor: "#1f2a25",
                background:
                  "linear-gradient(180deg, rgba(163, 230, 53, 0.06), transparent)",
              }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold mb-5"
                style={{
                  background: "rgba(163, 230, 53, 0.1)",
                  color: "#a3e635",
                  border: "1px solid rgba(163, 230, 53, 0.2)",
                }}
              >
                DRJ
              </div>
              <h3
                className="text-xl font-semibold mb-1"
                style={{ color: "#f3f5f1" }}
              >
                Dr Rhianon Jones
              </h3>
              <div
                className="font-dm-mono text-xs tracking-wider mb-4"
                style={{ color: "#a3e635" }}
              >
                Co-founder & UK Director (London)
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#8a948c" }}
              >
                Doctoral researcher; senior tech advisor at GrantTree (R&D tax,
                HMRC compliance); leading Greenback's EU Horizon strategy.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Advisors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <FadeIn delay={0.35}>
            <div
              className="p-6 rounded-lg border"
              style={{
                borderColor: "#1f2a25",
                background: "rgba(163, 230, 53, 0.02)",
              }}
            >
              <div
                className="font-dm-mono text-[10px] tracking-widest uppercase mb-2"
                style={{ color: "#8a948c" }}
              >
                Advisor
              </div>
              <h4
                className="text-base font-semibold mb-1"
                style={{ color: "#f3f5f1" }}
              >
                Tiffany Tompkins
              </h4>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#8a948c" }}
              >
                Former CEO, Organics Aotearoa NZ.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div
              className="p-6 rounded-lg border"
              style={{
                borderColor: "#1f2a25",
                background: "rgba(163, 230, 53, 0.02)",
              }}
            >
              <div
                className="font-dm-mono text-[10px] tracking-widest uppercase mb-2"
                style={{ color: "#8a948c" }}
              >
                Verification Partner
              </div>
              <h4
                className="text-base font-semibold mb-1"
                style={{ color: "#f3f5f1" }}
              >
                AsureQuality
              </h4>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#8a948c" }}
              >
                Simon Love, Head of Sustainability Assurance.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Exit */}
        <FadeIn delay={0.45}>
          <div
            className="p-6 rounded-lg border-l-2 mb-12"
            style={{
              borderColor: "rgba(163, 230, 53, 0.2)",
              background: "rgba(163, 230, 53, 0.02)",
            }}
          >
            <div
              className="font-dm-mono text-[10px] tracking-widest uppercase mb-2"
              style={{ color: "#8a948c" }}
            >
              The way out
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#8a948c" }}>
              Returns via trade sale to carbon and nature registries, global
              certification and assurance groups, or agri-food majors pursuing
              supply-chain insetting.
            </p>
          </div>
        </FadeIn>

        {/* Contact / CTA */}
        <FadeIn delay={0.5}>
          <div
            className="p-8 md:p-10 rounded-lg border"
            style={{
              borderColor: "rgba(163, 230, 53, 0.2)",
              background:
                "linear-gradient(135deg, rgba(163, 230, 53, 0.06) 0%, rgba(163, 230, 53, 0.02) 100%)",
            }}
          >
            <h3
              className="text-2xl font-semibold mb-6"
              style={{ color: "#f3f5f1" }}
            >
              Book a 30-minute call
            </h3>

            <form
              onSubmit={handleSubmit}
              style={{ maxWidth: "480px" }}
            >
              <div style={{ marginBottom: "16px" }}>
                <label
                  className="font-dm-mono"
                  htmlFor="pd-role"
                  style={{
                    display: "block",
                    fontSize: "11px",
                    color: "#a3e635",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  I am a...
                </label>
                <div style={{ position: "relative" }}>
                  <select
                    id="pd-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    style={{
                      ...inputStyle,
                      cursor: "pointer",
                      paddingRight: "40px",
                    }}
                  >
                    {ROLES.map((r) => (
                      <option
                        key={r.value}
                        value={r.value}
                        disabled={r.value === ""}
                        style={{ background: "#0f1714", color: "#f3f5f1" }}
                      >
                        {r.label}
                      </option>
                    ))}
                  </select>
                  <div
                    style={{
                      position: "absolute",
                      right: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#8a948c",
                      fontSize: "12px",
                    }}
                  >
                    &#9662;
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  className="font-dm-mono"
                  htmlFor="pd-message"
                  style={{
                    display: "block",
                    fontSize: "11px",
                    color: "#a3e635",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  Short message
                </label>
                <textarea
                  id="pd-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Tell us a bit about you and what you're interested in..."
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: "80px",
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-3.5 text-sm font-semibold rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  background: "#a3e635",
                  color: "#0a0f0d",
                  border: "none",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {sent
                  ? "Opening Calendly..."
                  : "Book a 30-minute call \u2192"}
              </button>
            </form>

            <div
              className="flex flex-col sm:flex-row gap-6 mt-8 pt-6"
              style={{ borderTop: "1px solid #1f2a25" }}
            >
              <div>
                <a
                  href="mailto:hello@greenback.solutions"
                  className="text-sm no-underline"
                  style={{
                    color: "#f3f5f1",
                    borderBottom: "1px solid rgba(163, 230, 53, 0.2)",
                    paddingBottom: "1px",
                  }}
                >
                  hello@greenback.solutions
                </a>
              </div>
              <div>
                <span className="text-sm" style={{ color: "#f3f5f1" }}>
                  +64 27 537 4194
                </span>
              </div>
            </div>

            <p
              className="text-lg font-medium mt-8"
              style={{ color: "#a3e635" }}
            >
              Nga mihi nui.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Main Page ─────────────────────────────────────────────────────── */

const PitchDeck = () => {
  useEffect(() => {
    const prev = document.title;
    document.title = "Greenback \u2014 Investor Pitch Deck";

    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(
        `meta[property="${property}"], meta[name="${property}"]`
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        if (property.startsWith("og:") || property.startsWith("twitter:")) {
          el.setAttribute("property", property);
        } else {
          el.setAttribute("name", property);
        }
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", "Greenback builds verification infrastructure for payments for ecosystem services. Interactive investor pitch deck.");
    setMeta("og:title", "Greenback \u2014 Investor Pitch Deck");
    setMeta("og:description", "Verification infrastructure for payments for ecosystem services. Farming that feeds forever.");
    setMeta("og:type", "website");
    setMeta("og:url", "https://greenback.solutions/pitch-deck");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Greenback \u2014 Investor Pitch Deck");
    setMeta("twitter:description", "Verification infrastructure for payments for ecosystem services. Farming that feeds forever.");

    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <Layout>
      <div style={{ scrollBehavior: "smooth" }}>
        <CoverSection />
        <ProblemSection />
        <SolutionSection />
        <UnitSection />
        <OpportunitySection />
        <RevenueAtScaleSection />
        <ProductSection />
        <TractionSection />
        <BusinessModelSection />
        <MoatSection />
        <TeamAndAskSection />
      </div>
    </Layout>
  );
};

export default PitchDeck;
