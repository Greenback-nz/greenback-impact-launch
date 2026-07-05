import { Layout } from "@/components/layout";
import { useRef, useState, useEffect, ReactNode } from "react";
import { Check, ArrowRight, Zap, Code, Bot, Briefcase } from "lucide-react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
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
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
    }}>{children}</div>
  );
}

const CALENDLY = "https://calendly.com/hello-greenback/30min";
const EMAIL = "hello@greenback.solutions";

const whoItems = [
  "Founders and small teams drowning in work that a good system would absorb",
  "Companies that need a capability built but can't justify a full-time role for it",
  "Operators who know AI should be doing more of their busywork and want someone to actually wire it up",
];

const whatItems = [
  {
    icon: Code,
    title: "Build for hire",
    description:
      "Web apps, internal tools, APIs, and customer-facing sites, shipped and hosted. Live examples below.",
  },
  {
    icon: Bot,
    title: "AI automation",
    description:
      "Agent workflows that run outreach, admin, content, and monitoring in the background, so your team stops doing the repetitive parts by hand.",
  },
  {
    icon: Briefcase,
    title: "Fractional operations",
    description:
      "I step in on a specific outcome, deliver it, and leave you with something that keeps working. No retainer you have to babysit.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Quick call",
    description:
      "You tell me the outcome you need. I tell you honestly whether I'm the right person and how fast it can happen.",
  },
  {
    number: "02",
    title: "Fixed scope, fixed price",
    description:
      "No open-ended hourly drift. You know what you're getting and what it costs before we start.",
  },
  {
    number: "03",
    title: "Shipped and handed over",
    description:
      "It goes live, you own it, and I show you how to run it.",
  },
];

const packages = [
  {
    name: "Automation audit",
    best: "A fast, paid first step: I map where AI can save your team hours and give you a prioritised plan",
    price: "$500",
    note: "Credited to any build you book within 30 days",
    highlight: true,
  },
  {
    name: "Sprint build",
    best: "One tool, automation, or site scoped, built, and shipped in days",
    price: "From $1,500",
    note: "Typical $2,500 to $5,000",
    highlight: false,
  },
  {
    name: "AI automation setup",
    best: "A background agent workflow that runs a specific process for you",
    price: "From $2,000",
    note: "Typical $3,000 to $6,000",
    highlight: false,
  },
  {
    name: "Fractional ops block",
    best: "A month of focused delivery on your priority list, roughly a day a week",
    price: "From $3,500/month",
    note: "",
    highlight: false,
  },
];

const proofBullets = [
  "A multi-market organic status API letting anyone in the organic assurance space check certification across markets from one place. As far as I can find, the first of its kind.",
  "A free, open-source web analytics tool, customisable across multiple sites, running live on my own portfolio.",
  "A portfolio of working apps built and shipped solo, from employment-rights guidance (workrights.nz) to diet-diversity tracking (30plantschallenge.com), with more in the pipeline.",
];

const Consultancy = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-32" style={{ background: "#0a0f0d" }}>
        <div className="max-w-[760px] mx-auto px-6 md:px-12">
          <FadeIn>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6"
              style={{ color: "#f3f5f1", letterSpacing: "-0.03em", lineHeight: 1.1 }}
            >
              Get the thing done.
              <br />
              Without hiring for it.
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p
              className="text-lg md:text-xl mb-8"
              style={{ color: "#a3e635", lineHeight: 1.5 }}
            >
              Fractional AI operator and builder for companies that need results, not another salary on the books.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base md:text-lg mb-4" style={{ color: "#8a948c", lineHeight: 1.7 }}>
              Most teams have a list of things that should exist by now: the internal tool, the automation, the site that actually converts, the process that runs itself. What they don't have is a spare pair of hands who can build it, ship it, and hand it back working. That is what I do.
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p className="text-base md:text-lg mb-10" style={{ color: "#8a948c", lineHeight: 1.7 }}>
              I pair years of operational experience with fast, practical AI build skills. I turn &ldquo;we keep meaning to sort that out&rdquo; into something live, in days rather than quarters, for a fraction of a permanent hire.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-full no-underline transition-all duration-300 hover:scale-105"
              style={{ background: "#a3e635", color: "#0a0f0d" }}
            >
              Start with the $500 automation audit <ArrowRight className="h-4 w-4" />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Who this is for */}
      <section className="py-16 md:py-24" style={{ background: "#0f1714", borderTop: "1px solid #1f2a25" }}>
        <div className="max-w-[760px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div
              className="font-dm-mono text-xs tracking-widest uppercase mb-6"
              style={{ color: "#a3e635", letterSpacing: "0.18em" }}
            >
              Who this is for
            </div>
          </FadeIn>
          <ul className="space-y-5">
            {whoItems.map((item, i) => (
              <FadeIn key={i} delay={0.08 + i * 0.06}>
                <li className="flex items-start gap-4">
                  <Check className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "#a3e635" }} />
                  <span className="text-base md:text-lg" style={{ color: "#f3f5f1", lineHeight: 1.6 }}>
                    {item}
                  </span>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      {/* What I do */}
      <section className="py-16 md:py-24" style={{ background: "#0a0f0d", borderTop: "1px solid #1f2a25" }}>
        <div className="max-w-[1000px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div
              className="font-dm-mono text-xs tracking-widest uppercase mb-6"
              style={{ color: "#a3e635", letterSpacing: "0.18em" }}
            >
              What I do
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {whatItems.map((item, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.08}>
                <div
                  className="rounded-lg p-8 h-full"
                  style={{ background: "rgba(163, 230, 53, 0.03)", border: "1px solid #1f2a25" }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                    style={{ background: "rgba(163, 230, 53, 0.1)", border: "1px solid rgba(163, 230, 53, 0.15)" }}
                  >
                    <item.icon className="h-6 w-6" style={{ color: "#a3e635" }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: "#f3f5f1" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm" style={{ color: "#8a948c", lineHeight: 1.7 }}>
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Proof, not promises */}
      <section className="py-16 md:py-24" style={{ background: "#0f1714", borderTop: "1px solid #1f2a25" }}>
        <div className="max-w-[760px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div
              className="font-dm-mono text-xs tracking-widest uppercase mb-6"
              style={{ color: "#a3e635", letterSpacing: "0.18em" }}
            >
              Proof, not promises
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-base md:text-lg mb-8" style={{ color: "#f3f5f1", lineHeight: 1.6 }}>
              Everything I offer, I have already built and run:
            </p>
          </FadeIn>

          {/* ANZOC highlight card */}
          <FadeIn delay={0.15}>
            <div
              className="rounded-lg p-8 mb-8"
              style={{ background: "rgba(163, 230, 53, 0.05)", border: "1px solid rgba(163, 230, 53, 0.15)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5" style={{ color: "#a3e635" }} />
                <h3 className="text-lg font-semibold" style={{ color: "#a3e635" }}>ANZOC</h3>
              </div>
              <p className="text-sm md:text-base" style={{ color: "#f3f5f1", lineHeight: 1.7 }}>
                An organic assurance directory I built and run solo. A deliberate growth strategy went in mid-May 2026, and in under two months it grew monthly site visits by <strong>over 500%</strong> and buyer views of producer profiles by <strong>over 1,900%</strong>, across 43 countries. A growth engine built and proven in seven weeks, with the numbers pulled live from analytics, not estimated.
              </p>
            </div>
          </FadeIn>

          <ul className="space-y-5 mb-8">
            {proofBullets.map((bullet, i) => (
              <FadeIn key={i} delay={0.2 + i * 0.06}>
                <li className="flex items-start gap-4">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2.5"
                    style={{ background: "#a3e635" }}
                  />
                  <span className="text-sm md:text-base" style={{ color: "#8a948c", lineHeight: 1.7 }}>
                    {bullet}
                  </span>
                </li>
              </FadeIn>
            ))}
          </ul>

          <FadeIn delay={0.35}>
            <p className="text-base md:text-lg font-medium" style={{ color: "#f3f5f1" }}>
              If I can build and run this for my own ventures, I can build it for yours.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24" style={{ background: "#0a0f0d", borderTop: "1px solid #1f2a25" }}>
        <div className="max-w-[1000px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div
              className="font-dm-mono text-xs tracking-widest uppercase mb-6 text-center"
              style={{ color: "#a3e635", letterSpacing: "0.18em" }}
            >
              How it works
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.08}>
                <div className="text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-dm-mono text-sm font-medium mx-auto mb-4"
                    style={{
                      background: "rgba(163, 230, 53, 0.1)",
                      color: "#a3e635",
                      border: "1px solid rgba(163, 230, 53, 0.2)",
                    }}
                  >
                    {step.number}
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: "#f3f5f1" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm" style={{ color: "#8a948c", lineHeight: 1.6 }}>
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 md:py-24" style={{ background: "#0f1714", borderTop: "1px solid #1f2a25" }}>
        <div className="max-w-[1000px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div
              className="font-dm-mono text-xs tracking-widest uppercase mb-6"
              style={{ color: "#a3e635", letterSpacing: "0.18em" }}
            >
              Packages
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-6">
            {packages.map((pkg, i) => (
              <FadeIn key={i} delay={0.08 + i * 0.06}>
                <div
                  className="rounded-lg p-8 h-full flex flex-col"
                  style={{
                    background: pkg.highlight
                      ? "rgba(163, 230, 53, 0.06)"
                      : "rgba(163, 230, 53, 0.02)",
                    border: pkg.highlight
                      ? "1px solid rgba(163, 230, 53, 0.25)"
                      : "1px solid #1f2a25",
                  }}
                >
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#f3f5f1" }}>
                    {pkg.name}
                  </h3>
                  <p className="text-sm mb-4 flex-1" style={{ color: "#8a948c", lineHeight: 1.6 }}>
                    {pkg.best}
                  </p>
                  <div>
                    <span
                      className="text-2xl font-semibold"
                      style={{ color: "#a3e635" }}
                    >
                      {pkg.price}
                    </span>
                    <span className="text-xs ml-1" style={{ color: "#8a948c" }}>
                      NZD
                    </span>
                  </div>
                  {pkg.note && (
                    <p className="text-xs mt-2" style={{ color: "#8a948c" }}>
                      {pkg.note}
                    </p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.4}>
            <p className="text-xs mt-6" style={{ color: "rgba(138, 148, 140, 0.6)" }}>
              Indicative NZD bands, benchmarked to the NZ market. Every job is quoted on the outcome, not the hours.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-20 md:py-28 text-center"
        style={{
          background: "radial-gradient(ellipse at center, rgba(163, 230, 53, 0.08), transparent 60%), #0a0f0d",
          borderTop: "1px solid #1f2a25",
        }}
      >
        <div className="max-w-[600px] mx-auto px-6 md:px-12">
          <FadeIn>
            <h2
              className="text-3xl md:text-4xl font-semibold mb-6"
              style={{ color: "#f3f5f1", letterSpacing: "-0.025em" }}
            >
              Ready to get the thing done?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-full no-underline transition-all duration-300 hover:scale-105 mb-6"
              style={{ background: "#a3e635", color: "#0a0f0d" }}
            >
              Start with the $500 automation audit <ArrowRight className="h-4 w-4" />
            </a>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-sm" style={{ color: "#8a948c" }}>
              Or email{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="no-underline transition-colors duration-300"
                style={{ color: "#a3e635" }}
              >
                {EMAIL}
              </a>
              {" "}&middot; See the work:{" "}
              <a
                href="https://greenback.solutions"
                className="no-underline transition-colors duration-300"
                style={{ color: "#a3e635" }}
              >
                greenback.solutions
              </a>
            </p>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Consultancy;
