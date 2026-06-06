import { Layout } from "@/components/layout";
import { useRef, useState, useEffect, ReactNode } from "react";
import { Compass, Code, Rocket, Check } from "lucide-react";

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

const services = [
  {
    icon: Compass,
    title: "Strategic Advisory",
    pricing: "Session or package pricing",
    description: "Get clarity on what to build and why before you write a line of code",
    features: [
      "Business model canvas workshops",
      "Competitive analysis and positioning",
      "Go-to-market strategy",
      "Operational process design",
      "Pricing strategy"
    ],
    idealFor: "Founders with a concept who need clarity before building"
  },
  {
    icon: Code,
    title: "Technical Build Support",
    pricing: "Project-based pricing",
    description: "Hands-on build help or technical guidance for your MVP",
    features: [
      "MVP builds in Lovable, Django, or React",
      "No-code/low-code solution architecture",
      "Database design and API integrations",
      "Technical decision guidance for non-technical founders",
      "Code handover and documentation"
    ],
    idealFor: "Founders who need hands-on build help or technical guidance"
  },
  {
    icon: Rocket,
    title: "Launch Partnership",
    pricing: "Retainer or equity arrangements",
    description: "Full strategic and technical support from concept to launch",
    features: [
      "Full strategic and technical support",
      "Weekly check-ins and milestone planning",
      "Build sprints with rapid iteration",
      "Launch preparation and user feedback loops"
    ],
    idealFor: "Founders who want a committed partner through to launch"
  }
];

const processSteps = [
  { number: "01", title: "Discovery Call", description: "We chat about your vision, where you're at, and what you need" },
  { number: "02", title: "Scope & Proposal", description: "I put together a clear plan with timeline and investment" },
  { number: "03", title: "Build Sprints", description: "We work in focused sprints with regular check-ins" },
  { number: "04", title: "Launch & Handover", description: "Your product goes live with full documentation and support" },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 md:py-32" style={{ background: "#0a0f0d" }}>
        <div className="max-w-[1000px] mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <div
              className="font-dm-mono text-xs tracking-widest uppercase mb-6"
              style={{ color: "#a3e635", letterSpacing: "0.18em" }}
            >
              Services
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1
              className="text-4xl md:text-5xl font-semibold mb-6"
              style={{ color: "#f3f5f1", letterSpacing: "-0.03em" }}
            >
              Flexible support tailored to your stage
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base md:text-lg max-w-[560px] mx-auto" style={{ color: "#8a948c" }}>
              From strategic clarity to technical builds &mdash; pick the level of support that fits.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 md:py-32" style={{ background: "#0f1714", borderTop: "1px solid #1f2a25" }}>
        <div className="max-w-[1000px] mx-auto px-6 md:px-12 space-y-6">
          {services.map((service, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div
                className="rounded-lg border overflow-hidden"
                style={{ borderColor: "#1f2a25", background: "rgba(163, 230, 53, 0.02)" }}
              >
                <div className="grid md:grid-cols-3">
                  <div className="p-8" style={{ background: "rgba(163, 230, 53, 0.04)" }}>
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      style={{ background: "rgba(163, 230, 53, 0.1)", border: "1px solid rgba(163, 230, 53, 0.15)" }}
                    >
                      <service.icon className="h-6 w-6" style={{ color: "#a3e635" }} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: "#f3f5f1" }}>
                      {service.title}
                    </h3>
                    <div className="font-dm-mono text-xs tracking-wider" style={{ color: "#a3e635" }}>
                      {service.pricing}
                    </div>
                  </div>
                  <div className="md:col-span-2 p-8">
                    <p className="text-sm mb-6" style={{ color: "#8a948c" }}>{service.description}</p>
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-3">
                          <Check className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "#a3e635" }} />
                          <span className="text-sm" style={{ color: "#f3f5f1" }}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div
                      className="p-4 rounded-lg"
                      style={{ background: "rgba(163, 230, 53, 0.05)", border: "1px solid #1f2a25" }}
                    >
                      <p className="text-sm">
                        <span className="font-semibold" style={{ color: "#f3f5f1" }}>Ideal for: </span>
                        <span style={{ color: "#8a948c" }}>{service.idealFor}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* How I Work */}
      <section className="py-24 md:py-32" style={{ background: "#0a0f0d", borderTop: "1px solid #1f2a25" }}>
        <div className="max-w-[1000px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div
              className="font-dm-mono text-xs tracking-widest uppercase mb-6 text-center"
              style={{ color: "#a3e635", letterSpacing: "0.18em" }}
            >
              Process
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2
              className="text-3xl md:text-4xl font-semibold text-center mb-16"
              style={{ color: "#f3f5f1", letterSpacing: "-0.025em" }}
            >
              How I Work
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <FadeIn key={index} delay={0.15 + index * 0.08}>
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
                  <h3 className="font-semibold mb-2" style={{ color: "#f3f5f1" }}>{step.title}</h3>
                  <p className="text-sm" style={{ color: "#8a948c" }}>{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 md:py-32 text-center"
        style={{
          background: "radial-gradient(ellipse at center, rgba(163, 230, 53, 0.08), transparent 60%), #0f1714",
          borderTop: "1px solid #1f2a25",
        }}
      >
        <div className="max-w-[600px] mx-auto px-6 md:px-12">
          <FadeIn>
            <h2
              className="text-3xl md:text-4xl font-semibold mb-4"
              style={{ color: "#f3f5f1", letterSpacing: "-0.025em" }}
            >
              Ready to get started?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mb-8" style={{ color: "#8a948c" }}>
              Let's talk about your project and find the right support package for you.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <a
              href="https://calendly.com/hello-greenback/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold rounded-full no-underline transition-all duration-300"
              style={{ background: "#a3e635", color: "#0a0f0d" }}
            >
              Book a Discovery Call &rarr;
            </a>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
