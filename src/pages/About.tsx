import { Layout } from "@/components/layout";
import { useRef, useState, useEffect, ReactNode } from "react";
import { Linkedin } from "lucide-react";

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

const credentials = [
  "MBA (Sustainability)",
  "Python/Django Developer",
  "React/Lovable Builder",
  "Operations Management",
  "Climate Tech Focus"
];

const values = [
  {
    title: "Ship fast, learn faster",
    description: "Getting something in front of users is more valuable than perfecting it in isolation."
  },
  {
    title: "Climate impact matters",
    description: "I prioritise work that moves the needle on sustainability and environmental outcomes."
  },
  {
    title: "Founders helping founders",
    description: "I've been in your shoes. I know what it takes and I'm here to share what I've learned."
  }
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24" style={{ background: "#0a0f0d" }}>
        <div className="max-w-[1000px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <FadeIn>
              <div className="flex justify-center">
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-full blur-3xl"
                    style={{ background: "rgba(163, 230, 53, 0.08)" }}
                  />
                  <div
                    className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-xl"
                    style={{ border: "2px solid rgba(163, 230, 53, 0.15)" }}
                  >
                    <img
                      src="/lovable-uploads/f631e360-095f-42e8-9d6f-2376ccde695a.png"
                      alt="Fliss Roberts"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Intro */}
            <div>
              <FadeIn delay={0.1}>
                <div
                  className="font-dm-mono text-xs tracking-widest uppercase mb-6"
                  style={{ color: "#a3e635", letterSpacing: "0.18em" }}
                >
                  About
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h1
                  className="text-4xl md:text-5xl font-semibold mb-6"
                  style={{ color: "#f3f5f1", letterSpacing: "-0.03em" }}
                >
                  Hi, I'm Fliss
                </h1>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="text-lg leading-relaxed" style={{ color: "#8a948c" }}>
                  Operations specialist turned technical founder, based in the Bay of Plenty, New Zealand.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="py-16 md:py-24" style={{ background: "#0f1714", borderTop: "1px solid #1f2a25" }}>
        <div className="max-w-[700px] mx-auto px-6 md:px-12">
          <div className="space-y-6">
            {[
              "My journey to becoming a founder wasn't linear. I spent years in operations management, optimising complex business processes and learning what it really takes to make organisations work. Along the way, I completed an MBA in Sustainability, driven by a belief that business can — and must — be a force for environmental good.",
              "When I decided to build my own products, I taught myself to code. I learned Python and Django, then React and modern no-code tools like Lovable. I shipped PlantMe.io, worked with OANZ on sector strategy, and supported fellow founders with their technical builds.",
              "Now I combine all of that experience — operations, sustainability, technical building — to help other founders go from idea to live product. I know the challenges because I've faced them myself. I know what works because I've done it.",
              "If you're a founder with an idea and the drive to make it real, I'd love to hear from you."
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <p className="text-base leading-relaxed" style={{ color: "#8a948c" }}>{p}</p>
              </FadeIn>
            ))}
          </div>

          {/* Credentials */}
          <FadeIn delay={0.4}>
            <div className="mt-12">
              <h2
                className="font-dm-mono text-xs tracking-widest uppercase mb-6"
                style={{ color: "#a3e635", letterSpacing: "0.18em" }}
              >
                Skills & Background
              </h2>
              <div className="flex flex-wrap gap-3">
                {credentials.map((credential, index) => (
                  <span
                    key={index}
                    className="text-sm px-4 py-2 rounded-full"
                    style={{
                      background: "rgba(163, 230, 53, 0.1)",
                      color: "#a3e635",
                      border: "1px solid rgba(163, 230, 53, 0.15)",
                    }}
                  >
                    {credential}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* LinkedIn */}
          <FadeIn delay={0.5}>
            <div className="mt-8">
              <a
                href="https://www.linkedin.com/in/felicityroberts/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium no-underline transition-all duration-300"
                style={{
                  border: "1px solid rgba(163, 230, 53, 0.2)",
                  color: "#a3e635",
                  background: "transparent",
                }}
              >
                <Linkedin className="h-4 w-4" />
                Connect on LinkedIn
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24" style={{ background: "#0a0f0d", borderTop: "1px solid #1f2a25" }}>
        <div className="max-w-[1000px] mx-auto px-6 md:px-12">
          <FadeIn>
            <div
              className="font-dm-mono text-xs tracking-widest uppercase mb-6 text-center"
              style={{ color: "#a3e635", letterSpacing: "0.18em" }}
            >
              Values
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2
              className="text-3xl md:text-4xl font-semibold text-center mb-16"
              style={{ color: "#f3f5f1", letterSpacing: "-0.025em" }}
            >
              What I Believe
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <FadeIn key={index} delay={0.15 + index * 0.1}>
                <div
                  className="text-center p-8 rounded-lg border"
                  style={{
                    borderColor: "#1f2a25",
                    background: "rgba(163, 230, 53, 0.02)",
                  }}
                >
                  <h3 className="text-lg font-semibold mb-3" style={{ color: "#f3f5f1" }}>
                    {value.title}
                  </h3>
                  <p className="text-sm" style={{ color: "#8a948c" }}>
                    {value.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 md:py-24 text-center"
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
              Let's work together
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mb-8" style={{ color: "#8a948c" }}>
              Ready to turn your idea into a real product? I'd love to hear about your project.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold rounded-full no-underline transition-all duration-300"
              style={{ background: "#a3e635", color: "#0a0f0d" }}
            >
              Get in Touch &rarr;
            </a>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default About;
