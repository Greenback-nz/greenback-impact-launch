import { Layout } from "@/components/layout";
import { useRef, useState, useEffect, ReactNode } from "react";
import { Mail, Calendar, Linkedin } from "lucide-react";

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

const Contact = () => {
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
              Contact
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1
              className="text-4xl md:text-5xl font-semibold mb-6"
              style={{ color: "#f3f5f1", letterSpacing: "-0.03em" }}
            >
              Let's Talk
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base md:text-lg max-w-[560px] mx-auto" style={{ color: "#8a948c" }}>
              Ready to get your MVP off the ground? Book a free discovery call or send me a message.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-24 md:py-32" style={{ background: "#0f1714", borderTop: "1px solid #1f2a25" }}>
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Discovery Call */}
            <FadeIn>
              <div
                className="p-8 rounded-lg border"
                style={{
                  borderColor: "#1f2a25",
                  background: "linear-gradient(180deg, rgba(163, 230, 53, 0.06), transparent)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                  style={{ background: "rgba(163, 230, 53, 0.1)", border: "1px solid rgba(163, 230, 53, 0.15)" }}
                >
                  <Calendar className="h-6 w-6" style={{ color: "#a3e635" }} />
                </div>

                <h3 className="text-xl font-semibold mb-3" style={{ color: "#f3f5f1" }}>
                  Book a Discovery Call
                </h3>
                <p className="text-sm mb-6" style={{ color: "#8a948c" }}>
                  A free 30-minute call to discuss your project and how we can help.
                </p>

                <a
                  href="https://calendly.com/hello-greenback/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold rounded-full no-underline transition-all duration-300"
                  style={{ background: "#a3e635", color: "#0a0f0d" }}
                >
                  Book a 30-Minute Call
                </a>
              </div>
            </FadeIn>

            {/* Direct Contact */}
            <FadeIn delay={0.15}>
              <div className="space-y-6">
                <div
                  className="p-8 rounded-lg border"
                  style={{ borderColor: "#1f2a25", background: "rgba(163, 230, 53, 0.02)" }}
                >
                  <h3 className="text-lg font-semibold mb-6" style={{ color: "#f3f5f1" }}>
                    Direct Contact
                  </h3>

                  <div className="space-y-5">
                    <a
                      href="mailto:hello@greenback.solutions"
                      className="flex items-center gap-3 no-underline transition-colors duration-300"
                      style={{ color: "#8a948c" }}
                    >
                      <Mail className="h-5 w-5" style={{ color: "#a3e635" }} />
                      <span className="text-sm">hello@greenback.solutions</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/felicityroberts/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 no-underline transition-colors duration-300"
                      style={{ color: "#8a948c" }}
                    >
                      <Linkedin className="h-5 w-5" style={{ color: "#a3e635" }} />
                      <span className="text-sm">Connect on LinkedIn</span>
                    </a>
                  </div>
                </div>

                <div
                  className="p-6 rounded-lg"
                  style={{ background: "rgba(163, 230, 53, 0.03)", border: "1px solid #1f2a25" }}
                >
                  <div className="space-y-3">
                    <div>
                      <span
                        className="font-dm-mono text-[10px] tracking-widest uppercase"
                        style={{ color: "#a3e635", letterSpacing: "0.18em" }}
                      >
                        Based in
                      </span>
                      <p className="text-sm mt-1" style={{ color: "#f3f5f1" }}>
                        Bay of Plenty, Aotearoa New Zealand
                      </p>
                    </div>
                    <div>
                      <span
                        className="font-dm-mono text-[10px] tracking-widest uppercase"
                        style={{ color: "#a3e635", letterSpacing: "0.18em" }}
                      >
                        Working hours
                      </span>
                      <p className="text-sm mt-1" style={{ color: "#8a948c" }}>
                        Flexible across time zones. I work with founders globally.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
