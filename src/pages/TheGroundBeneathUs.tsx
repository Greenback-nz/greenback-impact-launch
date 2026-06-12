import { useEffect, useRef, useState } from "react";
import { Choropleth } from "@/components/scrolly/Choropleth";
import { AdaptMap } from "@/components/scrolly/AdaptMap";
import { prefersReducedMotion } from "@/components/scrolly/geo";
import "@/components/scrolly/scrolly.css";

const ROLES = [
  { value: "", label: "I am a…" },
  { value: "farmer", label: "Farmer keen to pilot" },
  { value: "investor", label: "Investor" },
  { value: "funder", label: "Funder / grant body" },
  { value: "partner", label: "Potential partner" },
  { value: "sector-body", label: "Organic sector body" },
  { value: "other", label: "Other" },
];

function ContactForm() {
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const roleLabel = ROLES.find((r) => r.value === role)?.label ?? role;
    const subject = encodeURIComponent(`Interest from: ${roleLabel}`);
    const body = encodeURIComponent(`Role: ${roleLabel}\n\n${message}`);
    window.location.href = `mailto:hello@greenback.solutions?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid var(--line)",
    background: "var(--bg-2)",
    color: "var(--ink)",
    fontFamily: "'Space Grotesk', system-ui, sans-serif",
    fontSize: "14px",
    outline: "none",
    appearance: "none",
    WebkitAppearance: "none",
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="reveal delay-3"
      style={{ marginTop: "48px", maxWidth: "480px" }}
    >
      <div style={{ marginBottom: "16px" }}>
        <label
          className="mono"
          htmlFor="tgbu-role"
          style={{ display: "block", fontSize: "11px", color: "var(--green)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "8px" }}
        >
          I am a…
        </label>
        <div style={{ position: "relative" }}>
          <select
            id="tgbu-role"
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
              <option key={r.value} value={r.value} disabled={r.value === ""} style={{ background: "#0f1714", color: "#f3f5f1" }}>
                {r.label}
              </option>
            ))}
          </select>
          <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--ink-dim)", fontSize: "12px" }}>
            ▾
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label
          className="mono"
          htmlFor="tgbu-message"
          style={{ display: "block", fontSize: "11px", color: "var(--green)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "8px" }}
        >
          Short message
        </label>
        <textarea
          id="tgbu-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Tell us a bit about you and what you're interested in…"
          style={{
            ...inputStyle,
            resize: "vertical",
            minHeight: "80px",
          }}
        />
      </div>

      <button
        type="submit"
        className="btn"
        style={{ border: "none", cursor: "pointer", fontSize: "14px", width: "100%" }}
      >
        {sent ? "Opening your email client…" : "Register your interest →"}
      </button>

      <div className="mono dim" style={{ fontSize: "12px", marginTop: "12px" }}>
        Or email hello@greenback.solutions directly
      </div>
    </form>
  );
}

const TheGroundBeneathUs = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const carbonNumRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);
  const [chapter, setChapter] = useState("01 / The Ground");

  // Per-route document title (no SSR / react-helmet in this SPA).
  useEffect(() => {
    const prev = document.title;
    document.title = "The Ground Beneath Us — Greenback Solutions";
    return () => {
      document.title = prev;
    };
  }, []);

  // Scroll progress bar.
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(100, Math.max(0, (h.scrollTop / max) * 100)) : 0);
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal + chapter-tag observers.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = prefersReducedMotion();

    const revealEls = root.querySelectorAll<HTMLElement>(
      ".reveal, .choropleth, .adapt-map, .bar-stack, .comparison-bar, .bars-drought"
    );

    if (reduce) {
      revealEls.forEach((el) => el.classList.add("in"));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              revealObserver.unobserve(e.target);
            }
          }),
        { threshold: 0.15 }
      );
      revealEls.forEach((el) => revealObserver.observe(el));

      const chapterObserver = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const ch = (e.target as HTMLElement).dataset.chapter;
              if (ch) setChapter(ch);
            }
          }),
        { threshold: 0.5 }
      );
      root
        .querySelectorAll<HTMLElement>("[data-chapter]")
        .forEach((el) => chapterObserver.observe(el));

      return () => {
        revealObserver.disconnect();
        chapterObserver.disconnect();
      };
    }
  }, []);

  // Count-up for the carbon headline (chapter 5).
  useEffect(() => {
    const span = carbonNumRef.current;
    if (!span) return;
    if (prefersReducedMotion()) {
      span.textContent = "22 gigatons";
      return;
    }
    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting || span.dataset.animated) return;
          span.dataset.animated = "1";
          const final = 22;
          const start = performance.now();
          const dur = 1600;
          const step = (t: number) => {
            const k = Math.min(1, (t - start) / dur);
            span.textContent = `${(final * (1 - Math.pow(1 - k, 3))).toFixed(1)} gigatons`;
            if (k < 1) raf = requestAnimationFrame(step);
            else span.textContent = "22 gigatons";
          };
          raf = requestAnimationFrame(step);
        }),
      { threshold: 0.4 }
    );
    observer.observe(span);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="tgbu" ref={rootRef}>
      <div className="progress" style={{ width: `${progress}%` }} />
      <div className="topbar">
        <a className="brand" href="/">
          greenback<span>.</span>solutions
        </a>
        <div className="chapter-tag">{chapter}</div>
      </div>

      {/* 01 — Hero */}
      <section className="stage hero" data-chapter="01 / The Ground">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/tgbu-hero-poster.png"
        >
          <source src="/tgbu-hero.webm" type="video/webm" />
          <source src="/tgbu-hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-scrim" />
        <div className="hero-grid" />
        <div className="hero-bg" />
        <div className="hero-inner">
          <div className="eyebrow reveal">A scrollable atlas</div>
          <h1 className="reveal delay-1">
            The largest
            <br />
            climate opportunity
            <br />
            is <span className="tag">under our feet.</span>
          </h1>
          <p className="lede reveal delay-2" style={{ marginTop: "32px" }}>
            Roughly a third of the planet's land is already farmland. What happens if we farm
            it differently? Scroll to find out.
          </p>
          <div
            className="reveal delay-3 mono dim"
            style={{ marginTop: "80px", fontSize: "12px" }}
          >
            ↓ scroll
          </div>
        </div>
      </section>

      {/* 02 — Scale */}
      <section className="stage" data-chapter="02 / Scale">
        <div className="split">
          <div>
            <div className="eyebrow reveal">02 — Scale</div>
            <h2 className="reveal delay-1">Half the habitable land is already farmland.</h2>
            <p className="reveal delay-2">
              Roughly <strong style={{ color: "var(--green)" }}>38%</strong> of Earth's
              habitable land — about <strong>4.8 billion hectares</strong> — is cropland or
              pasture. An area larger than Africa and South America combined.
            </p>
            <div className="stat-row reveal delay-3">
              <div className="stat">
                <div className="num">38%</div>
                <div className="label">of Earth's habitable land surface is agricultural</div>
              </div>
              <div className="stat">
                <div
                  className="num mono"
                  style={{ fontSize: "clamp(36px,5vw,64px)", color: "var(--ink)" }}
                >
                  4.8B
                </div>
                <div className="label">hectares of cropland and pasture worldwide</div>
              </div>
            </div>
          </div>
          <div>
            <Choropleth />
          </div>
        </div>
      </section>

      {/* 03 — The Split */}
      <section className="stage" data-chapter="03 / The Split">
        <div className="eyebrow reveal">03 — The Split</div>
        <h2 className="reveal delay-1" style={{ maxWidth: "22ch" }}>
          Most of it is grazing land, not cropland.
        </h2>
        <p className="reveal delay-2">
          Of the 4.8 billion hectares, two-thirds is pasture for livestock and one-third grows
          crops. That single ratio shapes our food system — and our climate.
        </p>
        <div className="bar-stack reveal delay-3">
          <div className="track">
            <div className="fill-pasture" />
            <div className="fill-crop" />
          </div>
          <div className="bar-legend">
            <div>
              <span className="legend-dot pasture" />
              Pasture — 3.2 B ha (67%)
            </div>
            <div>
              <span className="legend-dot crop" />
              Cropland — 1.6 B ha (33%)
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Opportunity */}
      <section className="stage" data-chapter="04 / Opportunity">
        <div className="eyebrow reveal">04 — Opportunity</div>
        <h2 className="reveal delay-1" style={{ maxWidth: "22ch" }}>
          Now imagine a different ground.
        </h2>
        <p className="reveal delay-2">
          Regenerative organic agriculture rebuilds soil through cover crops, rotational
          grazing, no-till and diversity. It turns farms from carbon sources into carbon
          sinks — without sacrificing yield.
        </p>
        <p className="reveal delay-3 mono dim" style={{ marginTop: "24px" }}>
          The math, three ways:
        </p>
      </section>

      {/* 05 — Carbon */}
      <section className="stage" data-chapter="05 / Carbon">
        <div className="eyebrow reveal">05 — Carbon</div>
        <h2 className="reveal delay-1">
          Up to{" "}
          <span ref={carbonNumRef} style={{ color: "var(--green)" }}>
            22 gigatons
          </span>{" "}
          of CO₂ drawn down by 2050.
        </h2>
        <p className="reveal delay-2">
          Project Drawdown estimates regenerative annual cropping alone could sequester or
          avoid <strong>14.5–22 Gt CO₂</strong> by 2050 — an opportunity larger than
          electrifying every car on the road.
        </p>
        <div className="comparison-bar reveal delay-3">
          <div className="row row-emissions">
            <div className="mono dim">Annual emissions</div>
            <div className="meter">
              <div />
            </div>
            <div className="mono">~37 Gt</div>
          </div>
          <div className="row row-low">
            <div className="mono dim">Regen — low</div>
            <div className="meter">
              <div />
            </div>
            <div className="mono">14.5 Gt</div>
          </div>
          <div className="row row-high">
            <div className="mono dim">Regen — high</div>
            <div className="meter">
              <div />
            </div>
            <div className="mono">22 Gt</div>
          </div>
        </div>
        <p className="dim mono reveal delay-3" style={{ fontSize: "12px", marginTop: "32px" }}>
          Source: Project Drawdown — Regenerative Annual Cropping
        </p>
      </section>

      {/* 06 — Adaptation */}
      <section className="stage" data-chapter="06 / Adaptation">
        <div className="eyebrow reveal">06 — Adaptation</div>
        <h2 className="reveal delay-1" style={{ maxWidth: "22ch" }}>
          What <span style={{ color: "var(--green)" }}>1% more soil carbon</span> could do.
        </h2>
        <p className="reveal delay-2">
          Every percentage gain in soil organic matter lets farmland hold roughly 20,000 more
          gallons of water per acre. Across 4.8 billion hectares of agricultural land, that's
          an extra <strong>~900 km³</strong> of underground water storage — nearly twice the
          volume of Lake Erie — concentrated where climate risk hits hardest.
        </p>
        <AdaptMap />
      </section>

      {/* 07 — Resilience */}
      <section className="stage" data-chapter="07 / Resilience">
        <div className="eyebrow reveal">07 — Resilience</div>
        <h2 className="reveal delay-1" style={{ maxWidth: "24ch" }}>
          When drought hits, regenerative plots{" "}
          <em style={{ fontStyle: "normal", color: "var(--green)" }}>hold</em>.
        </h2>
        <p className="reveal delay-2">
          In the Rodale Institute's 40-year farming systems trial, organic plots out-yielded
          conventional by up to 40% in drought years. Resilience isn't a slogan — it's a soil
          property.
        </p>
        <div className="bars-drought reveal delay-3">
          <div className="b-row">
            <div>Conv · normal</div>
            <div className="b-track">
              <div className="b-fill conv-normal" />
            </div>
            <div>100</div>
          </div>
          <div className="b-row">
            <div>Conv · drought</div>
            <div className="b-track">
              <div className="b-fill conv-drought" />
            </div>
            <div>32</div>
          </div>
          <div className="b-row">
            <div>Regen · normal</div>
            <div className="b-track">
              <div className="b-fill regen-normal" />
            </div>
            <div>104</div>
          </div>
          <div className="b-row">
            <div>Regen · drought</div>
            <div className="b-track">
              <div className="b-fill regen-drought" />
            </div>
            <div>95</div>
          </div>
        </div>
        <p className="dim mono reveal delay-3" style={{ fontSize: "12px", marginTop: "32px" }}>
          Indexed yield (conv · normal = 100). Source: Rodale Farming Systems Trial.
        </p>
      </section>

      {/* 08 — Get Involved */}
      <section className="stage" data-chapter="08 / Get Involved" style={{ minHeight: "auto", paddingBottom: "6vh" }}>
        <div className="eyebrow reveal">08 — Get Involved</div>
        <h2 className="reveal delay-1" style={{ maxWidth: "22ch" }}>
          We're looking for{" "}
          <span style={{ color: "var(--green)" }}>people ready to prove it.</span>
        </h2>
        <p className="reveal delay-2" style={{ maxWidth: "52ch" }}>
          Greenback is building the verification layer that connects what happens on-farm to the
          payments farmers deserve. Whether you farm, fund, certify, or partner — we want to
          hear from you.
        </p>

        <div className="reveal delay-3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginTop: "48px", maxWidth: "820px" }}>
          <div style={{ padding: "24px", border: "1px solid var(--line)", borderRadius: "8px", background: "linear-gradient(180deg, rgba(163, 230, 53, 0.06), transparent)" }}>
            <div className="mono" style={{ fontSize: "13px", color: "var(--green)", marginBottom: "8px" }}>01</div>
            <div style={{ fontWeight: 600, marginBottom: "6px" }}>Share your OMP data</div>
            <div style={{ fontSize: "14px", color: "var(--ink-dim)" }}>
              A lightweight data-sharing agreement gives us access to your Organic Management Plan
              information. Easiest if you're already AsureQuality certified.
            </div>
          </div>
          <div style={{ padding: "24px", border: "1px solid var(--line)", borderRadius: "8px", background: "linear-gradient(180deg, rgba(163, 230, 53, 0.06), transparent)" }}>
            <div className="mono" style={{ fontSize: "13px", color: "var(--green)", marginBottom: "8px" }}>02</div>
            <div style={{ fontWeight: 600, marginBottom: "6px" }}>Co-design the tests</div>
            <div style={{ fontSize: "14px", color: "var(--ink-dim)" }}>
              Together we decide which soil, water, and biodiversity indicators to measure on your
              land — grounded in what matters to your operation.
            </div>
          </div>
          <div style={{ padding: "24px", border: "1px solid var(--line)", borderRadius: "8px", background: "linear-gradient(180deg, rgba(163, 230, 53, 0.06), transparent)" }}>
            <div className="mono" style={{ fontSize: "13px", color: "var(--green)", marginBottom: "8px" }}>03</div>
            <div style={{ fontWeight: 600, marginBottom: "6px" }}>3-year partnership</div>
            <div style={{ fontSize: "14px", color: "var(--ink-dim)" }}>
              A three-year contract gives us the time-series data needed to quantify change — and
              positions you first in line when ecosystem services payments go live.
            </div>
          </div>
        </div>

        {/* Contact form */}
        <ContactForm />
      </section>

      {/* 09 — Explore Greenback */}
      <section className="stage cta" data-chapter="09 / Greenback">
        <div>
          <div className="eyebrow reveal">09 — The Company</div>
          <h2
            className="reveal delay-1"
            style={{ fontSize: "clamp(40px,6.5vw,80px)", maxWidth: "18ch", margin: "16px auto 0" }}
          >
            The opportunity isn't somewhere else.
            <br />
            It's <span style={{ color: "var(--green)" }}>already under our boots.</span>
          </h2>
          <p className="reveal delay-2" style={{ margin: "24px auto 0" }}>
            Greenback is building the verification infrastructure to make regenerative agriculture
            pay — for farmers, for capital, for the climate.
          </p>
          <a className="btn reveal delay-3" href="/solutions">
            Explore Greenback Solutions →
          </a>
        </div>
      </section>

      <footer>
        Sources: FAO State of the World's Land &amp; Water 2025 · Our World in Data · Project
        Drawdown · Rodale Institute Farming Systems Trial · INFORM Risk Index 2024 · Fields of
        the World dataset. &nbsp;·&nbsp; Figures are approximate; the ~900 km³ estimate assumes
        a uniform 187 m³/ha gain per 1% soil organic matter.
      </footer>
    </div>
  );
};

export default TheGroundBeneathUs;
