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
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
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
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navItems = [
    { id: "thesis", label: "Thesis" },
    { id: "platform", label: "What We Build" },
    { id: "traction", label: "Traction" },
    { id: "team", label: "Team" },
    { id: "contact", label: "Contact" },
  ];

  const serviceLinks = [
    { href: "/the-ground-beneath-us", label: "The Ground" },
    { href: "/services", label: "Services" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10, 15, 13, 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(163, 230, 53, 0.08)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <a
          href="#hero"
          className="flex items-center gap-2.5 no-underline"
        >
          <img src="/logo.png" alt="Greenback" className="h-7 w-7" />
          <span
            className="font-dm-mono text-sm"
            style={{ color: "#a3e635", letterSpacing: "0.12em" }}
          >
            greenback.solutions
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="font-dm-mono text-xs tracking-wider no-underline transition-colors duration-300"
              style={{
                color: active === item.id ? "#a3e635" : "#8a948c",
                letterSpacing: "0.08em",
              }}
            >
              {item.label}
            </a>
          ))}
          <span
            className="w-px h-4"
            style={{ background: "rgba(163, 230, 53, 0.15)" }}
          />
          {serviceLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-dm-mono text-xs tracking-wider no-underline transition-colors duration-300"
              style={{
                color: "#8a948c",
                letterSpacing: "0.08em",
              }}
            >
              {link.label}
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
      style={{ background: "#0a0f0d" }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "linear-gradient(#1f2a25 1px, transparent 1px), linear-gradient(90deg, #1f2a25 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Gradient orbs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 20% 30%, rgba(163, 230, 53, 0.12), transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(245, 158, 11, 0.08), transparent 55%)",
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
              color: "#a3e635",
              borderColor: "rgba(163, 230, 53, 0.2)",
              background: "rgba(163, 230, 53, 0.05)",
              letterSpacing: "0.15em",
            }}
          >
            Verification Infrastructure for Ecosystem Services
          </span>
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.02] mb-8"
          style={{ color: "#f3f5f1", letterSpacing: "-0.03em" }}
        >
          Farming that feeds
          <br />
          <span style={{ color: "#a3e635" }}>forever</span>
        </h1>

        <p
          className="text-base md:text-lg leading-relaxed max-w-[640px] mx-auto mb-10"
          style={{ color: "#8a948c" }}
        >
          We build the data infrastructure that connects agricultural
          certification, environmental verification, and climate finance
          so the farmers doing the right thing get paid for it.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#traction"
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold rounded-full no-underline transition-all duration-300"
            style={{
              background: "#a3e635",
              color: "#0a0f0d",
            }}
          >
            See what we've built &darr;
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium rounded-full no-underline transition-all duration-300 border"
            style={{
              color: "#f3f5f1",
              borderColor: "rgba(163, 230, 53, 0.15)",
              background: "transparent",
            }}
          >
            Get in touch
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
      className="py-16 md:py-24"
      style={{ background: "#0a0f0d", borderTop: "1px solid #1f2a25" }}
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeIn>
          <div
            className="font-dm-mono text-xs tracking-widest uppercase mb-6"
            style={{ color: "#a3e635", letterSpacing: "0.18em" }}
          >
            The Problem
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.05] mb-16 max-w-[800px]"
            style={{ color: "#f3f5f1", letterSpacing: "-0.025em" }}
          >
            In New Zealand, the only way to earn nature credits is to stop farming.
            There is no system that rewards{" "}
            <span style={{ color: "#a3e635" }}>
              how you farm.
            </span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((item, i) => (
            <FadeIn key={i} delay={0.15 + i * 0.1}>
              <div
                className="p-8 rounded-lg border"
                style={{
                  borderColor: "#1f2a25",
                  background: "linear-gradient(180deg, rgba(163, 230, 53, 0.06), transparent)",
                }}
              >
                <div
                  className="text-4xl md:text-5xl font-semibold mb-3"
                  style={{ color: "#a3e635", letterSpacing: "-0.04em" }}
                >
                  {item.stat}
                </div>
                <div
                  className="text-sm leading-relaxed mb-3"
                  style={{ color: "#f3f5f1" }}
                >
                  {item.label}
                </div>
                <div
                  className="font-dm-mono text-[10px] tracking-wide"
                  style={{ color: "#8a948c" }}
                >
                  {item.note}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div
            className="max-w-[700px] mx-auto p-8 rounded-lg border-l-2 text-center"
            style={{
              borderColor: "rgba(163, 230, 53, 0.2)",
              background: "rgba(163, 230, 53, 0.02)",
            }}
          >
            <p
              className="text-base leading-relaxed"
              style={{ color: "#8a948c" }}
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
      className="py-16 md:py-24"
      style={{ background: "#0f1714", borderTop: "1px solid #1f2a25" }}
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeIn>
          <div
            className="font-dm-mono text-xs tracking-widest uppercase mb-6"
            style={{ color: "#a3e635", letterSpacing: "0.18em" }}
          >
            What We Build
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.05] mb-6 max-w-[800px]"
            style={{ color: "#f3f5f1", letterSpacing: "-0.025em" }}
          >
            Verification infrastructure for
            <br />
            <span style={{ color: "#a3e635" }}>
              ecosystem services payments
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p
            className="text-base md:text-lg leading-relaxed max-w-[640px] mb-16"
            style={{ color: "#8a948c" }}
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
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 rounded-lg border transition-all duration-300"
                style={{
                  borderColor: "#1f2a25",
                  background:
                    i === 0
                      ? "linear-gradient(180deg, rgba(163, 230, 53, 0.06), transparent)"
                      : "rgba(163, 230, 53, 0.02)",
                }}
              >
                <div className="flex-1 mb-4 md:mb-0">
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: "#f3f5f1" }}
                  >
                    {layer.name}
                  </h3>
                  <p
                    className="text-sm leading-relaxed max-w-[500px]"
                    style={{ color: "#8a948c" }}
                  >
                    {layer.desc}
                  </p>
                </div>
                <span
                  className="font-dm-mono text-xs tracking-wider flex items-center gap-2 whitespace-nowrap"
                  style={{
                    color:
                      layer.status === "Live"
                        ? "#a3e635"
                        : "#8a948c",
                  }}
                >
                  {layer.status === "Live" && (
                    <span
                      className="w-2 h-2 rounded-full inline-block"
                      style={{
                        background: "#a3e635",
                        boxShadow: "0 0 8px rgba(163, 230, 53, 0.5)",
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
                  borderColor: "#1f2a25",
                  background: "rgba(163, 230, 53, 0.02)",
                }}
              >
                <div
                  className="font-dm-mono text-xs font-medium tracking-wider mb-1"
                  style={{ color: "#a3e635" }}
                >
                  {item.label}
                </div>
                <div
                  className="text-[11px]"
                  style={{ color: "#8a948c" }}
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
    { value: "850+", label: "Producers supported through certification" },
    { value: "18", label: "Sectors across organic certification" },
    { value: "1,000+", label: "NZ food businesses surveyed" },
    { value: "6", label: "Global certification databases integrated" },
  ];

  return (
    <section
      id="traction"
      className="py-16 md:py-24"
      style={{ background: "#0a0f0d", borderTop: "1px solid #1f2a25" }}
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeIn>
          <div
            className="font-dm-mono text-xs tracking-widest uppercase mb-6"
            style={{ color: "#a3e635", letterSpacing: "0.18em" }}
          >
            Traction
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.05] mb-16 max-w-[800px]"
            style={{ color: "#f3f5f1", letterSpacing: "-0.025em" }}
          >
            Building in production,
            <br />
            <span style={{ color: "#a3e635" }}>
              not in theory
            </span>
          </h2>
        </FadeIn>

        {/* Live product callout */}
        <FadeIn delay={0.2}>
          <div
            className="p-8 md:p-10 rounded-lg border mb-16"
            style={{
              borderColor: "#1f2a25",
              background: "linear-gradient(135deg, rgba(163, 230, 53, 0.06) 0%, rgba(163, 230, 53, 0.02) 100%)",
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
                Live Product
              </span>
            </div>

            <h3
              className="text-2xl md:text-3xl font-semibold mb-4"
              style={{ color: "#f3f5f1", letterSpacing: "-0.025em" }}
            >
              ANZ Organic Collective (ANZOC)
            </h3>

            <p
              className="text-sm md:text-base leading-relaxed max-w-[600px] mb-6"
              style={{ color: "#8a948c" }}
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
                color: "#a3e635",
                borderBottom: "1px solid rgba(163, 230, 53, 0.3)",
                paddingBottom: "2px",
              }}
            >
              anzoc.co.nz &rarr;
            </a>
          </div>
        </FadeIn>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {metrics.map((item, i) => (
            <FadeIn key={i} delay={0.25 + i * 0.08}>
              <div
                className="text-center p-6 rounded-lg border"
                style={{
                  borderColor: "#1f2a25",
                  background: "rgba(163, 230, 53, 0.02)",
                }}
              >
                <div
                  className="text-3xl md:text-4xl font-semibold mb-2"
                  style={{ color: "#a3e635", letterSpacing: "-0.04em" }}
                >
                  {item.value}
                </div>
                <div
                  className="text-xs leading-relaxed"
                  style={{ color: "#8a948c" }}
                >
                  {item.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// === TEAM ===
function TeamSection() {
  const team = [
    {
      name: "Fliss Roberts",
      role: "Founder",
      bio: "3 years running organic certification operations at BioGro NZ. Supported organic certification for over 850+ producers. 10 years operations management across healthcare and entrepreneurship. Full-stack developer.",
    },
  ];

  return (
    <section
      id="team"
      className="py-16 md:py-24"
      style={{ background: "#0f1714", borderTop: "1px solid #1f2a25" }}
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <FadeIn>
          <div
            className="font-dm-mono text-xs tracking-widest uppercase mb-6"
            style={{ color: "#a3e635", letterSpacing: "0.18em" }}
          >
            Team
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.05] mb-6 max-w-[800px]"
            style={{ color: "#f3f5f1", letterSpacing: "-0.025em" }}
          >
            Built by operators,
            <br />
            <span style={{ color: "#a3e635" }}>
              not observers
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p
            className="text-base md:text-lg leading-relaxed max-w-[640px] mb-16"
            style={{ color: "#8a948c" }}
          >
            We've been inside the certification system. We know where the
            process breaks, what auditors actually check, and why operators
            abandon compliance. That's why we're the ones building the fix.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 max-w-[500px] gap-6">
          {team.map((person, i) => (
            <FadeIn key={i} delay={0.2 + i * 0.1}>
              <div
                className="p-8 rounded-lg border"
                style={{
                  borderColor: "#1f2a25",
                  background: "linear-gradient(180deg, rgba(163, 230, 53, 0.06), transparent)",
                }}
              >
                {/* Initials avatar */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-semibold mb-5"
                  style={{
                    background: "rgba(163, 230, 53, 0.1)",
                    color: "#a3e635",
                    border: "1px solid rgba(163, 230, 53, 0.2)",
                  }}
                >
                  {person.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                <h3
                  className="text-xl font-semibold mb-1"
                  style={{ color: "#f3f5f1" }}
                >
                  {person.name}
                </h3>

                <div
                  className="font-dm-mono text-xs tracking-wider mb-4"
                  style={{ color: "#a3e635" }}
                >
                  {person.role}
                </div>

                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#8a948c" }}
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
  const audiences = [
    {
      label: "Investor",
      desc: "Request the investor one-pager with our thesis, traction, and capital strategy.",
      cta: "Request the investor one-pager →",
      subject: "Investor enquiry",
    },
    {
      label: "Research partner",
      desc: "We're looking for research collaborators in soil science, remote sensing, and agricultural economics.",
      cta: "Explore a partnership →",
      subject: "Research partnership enquiry",
    },
    {
      label: "Funder / grant body",
      desc: "We're grant-ready and open to co-funded programmes aligned with regenerative agriculture outcomes.",
      cta: "Grant and funding enquiries →",
      subject: "Funding enquiry",
    },
  ];

  return (
    <section
      id="contact"
      className="py-16 md:py-24"
      style={{ background: "#0a0f0d", borderTop: "1px solid #1f2a25" }}
    >
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <FadeIn>
          <div
            className="font-dm-mono text-xs tracking-widest uppercase mb-6"
            style={{ color: "#a3e635", letterSpacing: "0.18em" }}
          >
            Contact
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6"
            style={{ color: "#f3f5f1", letterSpacing: "-0.025em" }}
          >
            Talk to us
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p
            className="text-base leading-relaxed mb-12 max-w-[560px]"
            style={{ color: "#8a948c" }}
          >
            We're talking to investors, research partners and grant bodies who want
            regenerative agriculture to be economically viable. Tell us which you
            are and we'll send the relevant brief.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {audiences.map((a, i) => (
            <FadeIn key={i} delay={0.2 + i * 0.08}>
              <div
                className="p-6 rounded-lg border flex flex-col h-full"
                style={{
                  borderColor: "#1f2a25",
                  background: "linear-gradient(180deg, rgba(163, 230, 53, 0.06), transparent)",
                }}
              >
                <div
                  className="font-dm-mono text-xs tracking-wider mb-3"
                  style={{ color: "#a3e635" }}
                >
                  {a.label}
                </div>
                <p
                  className="text-sm leading-relaxed mb-6 flex-1"
                  style={{ color: "#8a948c" }}
                >
                  {a.desc}
                </p>
                <a
                  href={`mailto:hello@greenback.solutions?subject=${encodeURIComponent(a.subject)}`}
                  className="text-sm font-semibold no-underline transition-colors duration-200"
                  style={{
                    color: "#a3e635",
                    borderBottom: "1px solid rgba(163, 230, 53, 0.3)",
                    paddingBottom: "2px",
                    alignSelf: "flex-start",
                  }}
                >
                  {a.cta}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center" style={{ color: "#8a948c" }}>
            <div className="flex flex-col gap-1">
              <span
                className="font-dm-mono text-[10px] tracking-widest uppercase"
                style={{ color: "#8a948c" }}
              >
                General
              </span>
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
            <div className="flex flex-col gap-1">
              <span
                className="font-dm-mono text-[10px] tracking-widest uppercase"
                style={{ color: "#8a948c" }}
              >
                Base
              </span>
              <span className="text-sm" style={{ color: "#f3f5f1" }}>
                Bay of Plenty, Aotearoa New Zealand
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span
                className="font-dm-mono text-[10px] tracking-widest uppercase"
                style={{ color: "#8a948c" }}
              >
                Product
              </span>
              <a
                href="https://anzoc.co.nz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm no-underline"
                style={{
                  color: "#f3f5f1",
                  borderBottom: "1px solid rgba(163, 230, 53, 0.2)",
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
        background: "#0f1714",
        borderTop: "1px solid #1f2a25",
      }}
    >
      <p
        className="font-dm-mono text-xs"
        style={{ color: "#8a948c" }}
      >
        &copy; {new Date().getFullYear()} Greenback Ltd. All rights reserved.
      </p>
      <p
        className="font-dm-mono text-[10px] mt-1"
        style={{ color: "rgba(138, 148, 140, 0.5)" }}
      >
        Bay of Plenty, NZ &middot; NZBN registered
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
