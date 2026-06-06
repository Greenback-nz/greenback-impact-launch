import { Layout } from "@/components/layout";
import { useRef, useState, useEffect, ReactNode } from "react";
import { ExternalLink } from "lucide-react";

import plantmeImage from "/lovable-uploads/53f3ab09-9fa7-469a-8ef3-34b69a54e489.png";
import oanzImage from "/lovable-uploads/91f31926-eff7-4532-a697-2d74b0666d65.png";

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

const projects = [
  {
    title: "PlantMe.io",
    description: "A digital planting diary and marketplace for home growers in Aotearoa",
    challenge: "Home gardeners needed a way to track their planting progress, measure climate impact, and connect with local growers.",
    approach: "Built a full-stack Django/Python application with user accounts, planting logs, weather integration, and a peer-to-peer marketplace.",
    outcome: "Live platform with active users tracking thousands of plants and their environmental impact.",
    tags: ["Django/Python", "Full-stack", "Climate Tech"],
    image: plantmeImage,
    url: "https://plantme.io/"
  },
  {
    title: "ANZOC",
    description: "Platform connecting and supporting New Zealand's organic sector",
    challenge: "The organic sector needed a central hub for resources, member connection, and advocacy coordination.",
    approach: "Developed ecosystem services strategy and platform architecture to connect farmers, certifiers, and consumers.",
    outcome: "Strengthened sector collaboration and improved resource accessibility for organic operators.",
    tags: ["Community Platform", "Organic Agriculture", "Strategy"],
    image: oanzImage,
    url: "https://www.oanz.org/"
  },
  {
    title: "Telehealth MVP",
    description: "Technical build support for a fellow founder's telehealth platform",
    challenge: "A non-technical founder needed to validate their telehealth concept quickly without burning through runway.",
    approach: "Partnered on technical decisions, built the MVP using Lovable and React, and set up for future scaling.",
    outcome: "Launched MVP within budget, enabling founder to start user testing and fundraising.",
    tags: ["Lovable Build", "React", "Startup Support"],
    image: null,
    url: null
  }
];

const Portfolio = () => {
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
              Portfolio
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1
              className="text-4xl md:text-5xl font-semibold mb-6"
              style={{ color: "#f3f5f1", letterSpacing: "-0.03em" }}
            >
              Products built and shipped
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base md:text-lg max-w-[560px] mx-auto" style={{ color: "#8a948c" }}>
              From concept to live deployment
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Projects */}
      <section className="py-24 md:py-32" style={{ background: "#0f1714", borderTop: "1px solid #1f2a25" }}>
        <div className="max-w-[1000px] mx-auto px-6 md:px-12 space-y-12">
          {projects.map((project, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div
                className="rounded-lg border overflow-hidden"
                style={{ borderColor: "#1f2a25", background: "rgba(163, 230, 53, 0.02)" }}
              >
                <div className="grid md:grid-cols-2">
                  {/* Image */}
                  <div className="aspect-video md:aspect-auto overflow-hidden" style={{ background: "#1f2a25" }}>
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full min-h-[300px] flex items-center justify-center"
                        style={{ background: "rgba(163, 230, 53, 0.04)" }}
                      >
                        <span className="font-dm-mono text-xs" style={{ color: "#8a948c" }}>
                          Screenshot coming soon
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-semibold" style={{ color: "#f3f5f1", letterSpacing: "-0.025em" }}>
                        {project.title}
                      </h2>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors"
                          style={{ color: "#a3e635" }}
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>

                    <p className="mb-6 text-sm" style={{ color: "#8a948c" }}>{project.description}</p>

                    <div className="space-y-4 mb-6">
                      {[
                        { label: "Challenge", text: project.challenge },
                        { label: "Approach", text: project.approach },
                        { label: "Outcome", text: project.outcome },
                      ].map((item) => (
                        <div key={item.label}>
                          <h3
                            className="font-dm-mono text-[10px] tracking-widest uppercase mb-1"
                            style={{ color: "#a3e635", letterSpacing: "0.18em" }}
                          >
                            {item.label}
                          </h3>
                          <p className="text-sm" style={{ color: "#8a948c" }}>{item.text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs px-3 py-1 rounded-full"
                          style={{
                            background: "rgba(163, 230, 53, 0.1)",
                            color: "#a3e635",
                            border: "1px solid rgba(163, 230, 53, 0.15)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 md:py-32 text-center"
        style={{
          background: "radial-gradient(ellipse at center, rgba(163, 230, 53, 0.08), transparent 60%), #0a0f0d",
          borderTop: "1px solid #1f2a25",
        }}
      >
        <div className="max-w-[600px] mx-auto px-6 md:px-12">
          <FadeIn>
            <h2
              className="text-3xl md:text-4xl font-semibold mb-4"
              style={{ color: "#f3f5f1", letterSpacing: "-0.025em" }}
            >
              Want something built?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mb-8" style={{ color: "#8a948c" }}>
              Let's talk about your MVP and how we can bring it to life.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold rounded-full no-underline transition-all duration-300"
              style={{ background: "#a3e635", color: "#0a0f0d" }}
            >
              Start a Conversation &rarr;
            </a>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
