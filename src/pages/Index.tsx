import { Layout } from "@/components/layout";
import { HeroSection } from "@/components/hero-section";
import { ProblemSection } from "@/components/problem-section";
import { ServicesSection } from "@/components/services-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { AboutSection } from "@/components/about-section";
import { CTASection } from "@/components/cta-section";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <PortfolioSection />
      <AboutSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
