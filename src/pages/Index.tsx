import { useState, useEffect, useRef, ReactNode } from "react";

const SECTIONS = ["hero", "thesis", "platform", "traction", "team", "contact"];

function useScrollSpy() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// === NAV ===
function Nav() {
  const active = useScrollSpy();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navItems = [
    { id: "thesis", label: "Thesis" },
    { id: "platform", label: "What We Build" },
    { id: "traction", label: "Traction" },
    { id: "team", label: "Team" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(8, 12, 8, 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(125, 180, 101, 0.08)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <a
          href="#hero"
          className="font-dm-mono text-sm tracking-wider no-underline"
          style={{ color: "#7db465", letterSpacing: "0.12em" }}
        >
          greenback.solutions
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="font-dm-mono text-xs tracking-wider no-underline transition-colors duration-300"
              style={{
                color: active === item.id ? "#7db465" : "rgba(212, 232, 194, 0.45)",
                letterSpacing: "0.08em",
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// === HERO ===
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#080c08" }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(125,180,101,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(125,180,101,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Gradient orb */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(125,180,101,0.06) 0%, transparent 70%)",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
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
        <div className="mb-10">
          <span
            className="font-dm-mono text-xs tracking-widest uppercase inline-block px-4 py-2 rounded-full border"
            style={{
              color: "#7db465",
              borderColor: "rgba(125, 180, 101, 0.2)",
              background: "rgba(125, 180, 101, 0.05)",
              letterSpacing: "0.15em",
            }}
          >
            Verification Infrastructure for Ecosystem Services
          </span>
        </div>

        <h1
          className="font-instrument text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.1] mb-8"
          style={{ color: "#e8f0e0" }}
        >
          Making regenerative farming
          <br />
          <span style={{ color: "#7db465", fontStyle: "italic" }}>more profitable than</span>
          <br />
          destructive farming
        </h1>

        <p
          className="text-base md:text-lg leading-relaxed max-w-[640px] mx-auto mb-10"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: "rgba(212, 232, 194, 0.6)",
          }}
        >
          We build the data infrastructure that connects agricultural
          certification, environmental verification, and climate finance
          so the farmers doing the right thing get paid for it.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium rounded-lg no-underline transition-all duration-300"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: "#7db465",
              color: "#080c08",
              letterSpacing: "0.02em",
            }}
          >
            Get in Touch
          </a>
          <a
            href="#thesis"
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium rounded-lg no-underline transition-all duration-300 border"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#d4e8c2",
              borderColor: "rgba(212, 232, 194, 0.15)",
              background: "transparent",
            }}
          >
            Learn more →
          </a>
        </div>
      </div>
    </section>
  );
}

// === THESIS ===
function Thesis() {
  const stats = [
    {
      stat: "$2.8T",
      label: "Global agricultural climate finance opportunity",
      note: "Source: Climate Policy Initiative, 2024",
    },
    {
      stat: "100%",
      label: "Of NZ nature credit schemes require retiring productive land, not farming it better",
      note: "Source: NZ ETS & biodiversity credit frameworks",
    },
    {
      stat: "~2,000",
      label: "NZ operators requiring compliance under OPPA 2023 by March 2028",
      note: "Source: NZ MPI, 2025",
    },
  ];

  return (
    <section
      id="thesis"
      className="py-24 md:py-32"
      style={{ background: "#080c08" }}
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeIn>
          <span
            className="font-dm-mono text-xs tracking-widest uppercase block mb-6"
            style={{ color: "#7db465", letterSpacing: "0.15em" }}
          >
            The Problem
          </span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2
            className="font-instrument text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.15] mb-16 max-w-[800px]"
            style={{ color: "#e8f0e0" }}
          >
            In New Zealand, the only way to earn nature credits is to stop farming.
            There is no system that rewards{" "}
            <span style={{ color: "#7db465", fontStyle: "italic" }}>
              how you farm.
            </span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((item, i) => (
            <FadeIn key={i} delay={0.15 + i * 0.1}>
              <div
                className="p-8 rounded-xl border"
                style={{
                  borderColor: "rgba(125, 180, 101, 0.1)",
                  background: "rgba(125, 180, 101, 0.03)",
                }}
              >
                <div
                  className="font-instrument text-4xl md:text-5xl mb-3"
                  style={{ color: "#7db465" }}
                >
                  {item.stat}
                </div>
                <div
                  className="text-sm leading-relaxed mb-3"
                  style={{ color: "rgba(212, 232, 194, 0.75)" }}
                >
                  {item.label}
                </div>
                <div
                  className="font-dm-mono text-[10px] tracking-wide"
                  style={{ color: "rgba(212, 232, 194, 0.3)" }}
                >
                  {item.note}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div
            className="max-w-[700px] mx-auto p-8 rounded-xl border-l-2 text-center"
            style={{
              borderColor: "rgba(125, 180, 101, 0.2)",
              background: "rgba(125, 180, 101, 0.02)",
            }}
          >
            <p
              className="text-base leading-relaxed"
              style={{ color: "rgba(212, 232, 194, 0.65)" }}
            >
              Every nature credit scheme in New Zealand requires taking land out of production. Plant trees, retire pasture, fence off waterways. None of them measure or reward the farming practices that actually build soil health, sequester carbon, or protect biodiversity on working land. Certification data sits in disconnected systems. Verification is manual and expensive. The result: farmers doing the right thing get nothing for it. Greenback exists to fix that.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// === PLATFORM ===
function PlatformSection() {
  const layers = [
    {
      name: "Certification Data Layer",
      desc: "Aggregated organic and agricultural certification records across the ANZ Pacific region. Live supplier verification and compliance automation.",
      status: "Live",
    },
    {
      name: "Environmental Verification Layer",
      desc: "Integration of satellite remote sensing, soil carbon monitoring, water quality data, and biodiversity indicators into a unified verification framework.",
      status: "In Development",
    },
    {
      name: "Climate Finance Layer",
      desc: "Infrastructure connecting verified environmental outcomes to ecosystem services payment mechanisms: carbon markets, biodiversity credits, sustainable finance taxonomies.",
      status: "In Development",
    },
  ];

  const regulations = [
    { label: "OPPA 2023", sub: "NZ Organic Products & Production Act" },
    { label: "EU Taxonomy", sub: "DNSH Agricultural Criteria" },
    { label: "ICVCM", sub: "Core Carbon Principles" },
    { label: "NZ SF Taxonomy", sub: "Sustainable Finance Framework" },
  ];

  return (
    <section
      id="platform"
      className="py-24 md:py-32"
      style={{ background: "#0a0f0a" }}
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeIn>
          <span
            className="font-dm-mono text-xs tracking-widest uppercase block mb-6"
            style={{ color: "#7db465", letterSpacing: "0.15em" }}
          >
            What We Build
          </span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2
            className="font-instrument text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.15] mb-6 max-w-[800px]"
            style={{ color: "#e8f0e0" }}
          >
            Verification infrastructure for
            <br />
            <span style={{ color: "#7db465", fontStyle: "italic" }}>
              ecosystem services payments
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p
            className="text-base md:text-lg leading-relaxed max-w-[640px] mb-16"
            style={{ color: "rgba(212, 232, 194, 0.6)" }}
          >
            We don't originate credits or own data. We build the infrastructure
            that makes verified ecosystem services payments possible,
            connecting farmers, certifiers, verifiers, and buyers through
            interoperable data systems.
          </p>
        </FadeIn>

        {/* Stack visualisation */}
        <div className="flex flex-col gap-3 mb-16">
          {layers.map((layer, i) => (
            <FadeIn key={i} delay={0.2 + i * 0.1}>
              <div
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 rounded-xl border transition-all duration-300"
                style={{
                  borderColor: "rgba(125, 180, 101, 0.1)",
                  background:
                    i === 0
                      ? "rgba(125, 180, 101, 0.06)"
                      : "rgba(125, 180, 101, 0.02)",
                }}
              >
                <div className="flex-1 mb-4 md:mb-0">
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: "#e8f0e0" }}
                  >
                    {layer.name}
                  </h3>
                  <p
                    className="text-sm leading-relaxed max-w-[500px]"
                    style={{ color: "rgba(212, 232, 194, 0.55)" }}
                  >
                    {layer.desc}
                  </p>
                </div>
                <span
                  className="font-dm-mono text-xs tracking-wider flex items-center gap-2 whitespace-nowrap"
                  style={{
                    color:
                      layer.status === "Live"
                        ? "#7db465"
                        : "rgba(212, 232, 194, 0.4)",
                  }}
                >
                  {layer.status === "Live" && (
                    <span
                      className="w-2 h-2 rounded-full inline-block"
                      style={{
                        background: "#7db465",
                        boxShadow: "0 0 8px rgba(125, 180, 101, 0.5)",
                      }}
                    />
                  )}
                  {layer.status}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Regulatory context */}
        <FadeIn delay={0.5}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {regulations.map((item, i) => (
              <div
                key={i}
                className="text-center p-4 rounded-lg border"
                style={{
                  borderColor: "rgba(125, 180, 101, 0.08)",
                  background: "rgba(125, 180, 101, 0.02)",
                }}
              >
                <div
                  className="font-dm-mono text-xs font-medium tracking-wider mb-1"
                  style={{ color: "#7db465" }}
                >
                  {item.label}
                </div>
                <div
                  className="text-[11px]"
                  style={{ color: "rgba(212, 232, 194, 0.35)" }}
                >
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// === TRACTION ===
function Traction() {
  const metrics = [
    { value: "200+", label: "Producers certified by founding team" },
    { value: "18", label: "Sectors across organic certification" },
    { value: "1,000+", label: "NZ food businesses surveyed" },
    { value: "6", label: "Global certification databases integrated" },
  ];

  const partners = [
    "Creative HQ Aurora Accelerator",
    "AsureQuality",
    "OANZ",
    "BioGro NZ (alumni)",
    "MPI Engagement",
  ];

  return (
    <section
      id="traction"
      className="py-24 md:py-32"
      style={{ background: "#080c08" }}
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeIn>
          <span
            className="font-dm-mono text-xs tracking-widest uppercase block mb-6"
            style={{ color: "#7db465", letterSpacing: "0.15em" }}
          >
            Traction
          </span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2
            className="font-instrument text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.15] mb-16 max-w-[800px]"
            style={{ color: "#e8f0e0" }}
          >
            Building in production,
            <br />
            <span style={{ color: "#7db465", fontStyle: "italic" }}>
              not in theory
            </span>
          </h2>
        </FadeIn>

        {/* Live product callout */}
        <FadeIn delay={0.2}>
          <div
            className="p-8 md:p-10 rounded-2xl border mb-16"
            style={{
              borderColor: "rgba(125, 180, 101, 0.15)",
              background: "linear-gradient(135deg, rgba(125,180,101,0.06) 0%, rgba(125,180,101,0.02) 100%)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: "#7db465",
                  boxShadow: "0 0 8px rgba(125, 180, 101, 0.5)",
                }}
              />
              <span
                className="font-dm-mono text-xs tracking-wider"
                style={{ color: "#7db465" }}
              >
                Live Product
              </span>
            </div>

            <h3
              className="font-instrument text-2xl md:text-3xl mb-4"
              style={{ color: "#e8f0e0" }}
            >
              ANZ Organic Compliance Database
            </h3>

            <p
              className="text-sm md:text-base leading-relaxed max-w-[600px] mb-6"
              style={{ color: "rgba(212, 232, 194, 0.6)" }}
            >
              Our first product: real-time supplier verification, recipe
              compliance automation, and certification data aggregation across
              the ANZ Pacific region. Serving organic operators, certifiers,
              and food businesses.
            </p>

            <a
              href="https://anzoc.co.nz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-dm-mono text-sm no-underline transition-opacity"
              style={{
                color: "#7db465",
                borderBottom: "1px solid rgba(125, 180, 101, 0.3)",
                paddingBottom: "2px",
              }}
            >
              anzoc.co.nz →
            </a>
          </div>
        </FadeIn>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {metrics.map((item, i) => (
            <FadeIn key={i} delay={0.25 + i * 0.08}>
              <div
                className="text-center p-6 rounded-xl border"
                style={{
                  borderColor: "rgba(125, 180, 101, 0.08)",
                  background: "rgba(125, 180, 101, 0.02)",
                }}
              >
                <div
                  className="font-instrument text-3xl md:text-4xl mb-2"
                  style={{ color: "#7db465" }}
                >
                  {item.value}
                </div>
                <div
                  className="text-xs leading-relaxed"
                  style={{ color: "rgba(212, 232, 194, 0.5)" }}
                >
                  {item.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Partners */}
        <FadeIn delay={0.5}>
          <div
            className="p-8 rounded-xl border text-center"
            style={{
              borderColor: "rgba(125, 180, 101, 0.08)",
              background: "rgba(125, 180, 101, 0.02)",
            }}
          >
            <h4
              className="font-dm-mono text-xs tracking-widest uppercase mb-6"
              style={{ color: "rgba(212, 232, 194, 0.4)", letterSpacing: "0.12em" }}
            >
              Ecosystem & Partnerships
            </h4>
            <div className="flex flex-wrap justify-center gap-3">
              {partners.map((partner, i) => (
                <span
                  key={i}
                  className="font-dm-mono text-xs px-4 py-2 rounded-full border"
                  style={{
                    color: "rgba(212, 232, 194, 0.55)",
                    borderColor: "rgba(125, 180, 101, 0.12)",
                    background: "rgba(125, 180, 101, 0.04)",
                  }}
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// === TEAM ===
function TeamSection() {
  const team = [
    {
      name: "Fliss Roberts",
      role: "CEO & Co-Founder",
      bio: "3 years running organic certification operations at BioGro NZ. Certified 200+ producers across 18 sectors. 10 years operations management across healthcare and entrepreneurship. Full-stack developer.",
    },
    {
      name: "Maggie Mabon",
      role: "CMO & Co-Founder",
      bio: "3 years leading marketing at BioGro NZ, achieving 45% conversion rates, 3x the industry average. Deep understanding of how to reach and convert organic operators at scale.",
    },
  ];

  return (
    <section
      id="team"
      className="py-24 md:py-32"
      style={{ background: "#0a0f0a" }}
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeIn>
          <span
            className="font-dm-mono text-xs tracking-widest uppercase block mb-6"
            style={{ color: "#7db465", letterSpacing: "0.15em" }}
          >
            Team
          </span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2
            className="font-instrument text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.15] mb-6 max-w-[800px]"
            style={{ color: "#e8f0e0" }}
          >
            Built by operators,
            <br />
            <span style={{ color: "#7db465", fontStyle: "italic" }}>
              not observers
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p
            className="text-base md:text-lg leading-relaxed max-w-[640px] mb-16"
            style={{ color: "rgba(212, 232, 194, 0.6)" }}
          >
            We've been inside the certification system. We know where the
            process breaks, what auditors actually check, and why operators
            abandon compliance. That's why we're the ones building the fix.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.map((person, i) => (
            <FadeIn key={i} delay={0.2 + i * 0.1}>
              <div
                className="p-8 rounded-xl border"
                style={{
                  borderColor: "rgba(125, 180, 101, 0.1)",
                  background: "rgba(125, 180, 101, 0.03)",
                }}
              >
                {/* Initials avatar */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold mb-5"
                  style={{
                    background: "rgba(125, 180, 101, 0.1)",
                    color: "#7db465",
                    border: "1px solid rgba(125, 180, 101, 0.2)",
                  }}
                >
                  {person.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                <h3
                  className="text-xl font-semibold mb-1"
                  style={{ color: "#e8f0e0" }}
                >
                  {person.name}
                </h3>

                <div
                  className="font-dm-mono text-xs tracking-wider mb-4"
                  style={{ color: "#7db465" }}
                >
                  {person.role}
                </div>

                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(212, 232, 194, 0.55)" }}
                >
                  {person.bio}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// === CONTACT ===
function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32"
      style={{ background: "#080c08" }}
    >
      <div className="max-w-[700px] mx-auto px-6 md:px-12 text-center">
        <FadeIn>
          <span
            className="font-dm-mono text-xs tracking-widest uppercase block mb-6"
            style={{ color: "#7db465", letterSpacing: "0.15em" }}
          >
            Contact
          </span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2
            className="font-instrument text-3xl md:text-4xl lg:text-5xl font-normal mb-6"
            style={{ color: "#e8f0e0" }}
          >
            Let's talk
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p
            className="text-base leading-relaxed mb-12 max-w-[520px] mx-auto"
            style={{ color: "rgba(212, 232, 194, 0.6)" }}
          >
            We're open to conversations with investors, research partners, grant
            bodies, and organisations aligned with our mission to make
            regenerative agriculture economically viable.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-col gap-6 items-center text-left max-w-[360px] mx-auto">
            <div className="flex flex-col gap-1">
              <span
                className="font-dm-mono text-[10px] tracking-widest uppercase"
                style={{ color: "rgba(212, 232, 194, 0.35)" }}
              >
                Email
              </span>
              <a
                href="mailto:hello@greenback.solutions"
                className="text-base no-underline"
                style={{
                  color: "#d4e8c2",
                  borderBottom: "1px solid rgba(212, 232, 194, 0.2)",
                  paddingBottom: "1px",
                }}
              >
                hello@greenback.solutions
              </a>
            </div>

            <div className="flex flex-col gap-1">
              <span
                className="font-dm-mono text-[10px] tracking-widest uppercase"
                style={{ color: "rgba(212, 232, 194, 0.35)" }}
              >
                Base
              </span>
              <span style={{ color: "rgba(212, 232, 194, 0.6)" }}>
                Wellington, New Zealand
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span
                className="font-dm-mono text-[10px] tracking-widest uppercase"
                style={{ color: "rgba(212, 232, 194, 0.35)" }}
              >
                Web
              </span>
              <a
                href="https://anzoc.co.nz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base no-underline"
                style={{
                  color: "#d4e8c2",
                  borderBottom: "1px solid rgba(212, 232, 194, 0.2)",
                  paddingBottom: "1px",
                }}
              >
                anzoc.co.nz
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// === STEALTH FOOTER ===
function StealthFooter() {
  return (
    <footer
      className="py-8 text-center"
      style={{
        background: "#060906",
        borderTop: "1px solid rgba(125, 180, 101, 0.06)",
      }}
    >
      <p
        className="font-dm-mono text-xs"
        style={{ color: "rgba(212, 232, 194, 0.3)" }}
      >
        © {new Date().getFullYear()} Greenback Ltd. All rights reserved.
      </p>
      <p
        className="font-dm-mono text-[10px] mt-1"
        style={{ color: "rgba(212, 232, 194, 0.15)" }}
      >
        Wellington, NZ · NZBN registered
      </p>
    </footer>
  );
}

// === MAIN PAGE ===
const Index = () => {
  return (
    <div className="stealth-page" style={{ scrollBehavior: "smooth" }}>
      <Nav />
      <Hero />
      <Thesis />
      <PlatformSection />
      <Traction />
      <TeamSection />
      <ContactSection />
      <StealthFooter />
    </div>
  );
};

export default Index;
