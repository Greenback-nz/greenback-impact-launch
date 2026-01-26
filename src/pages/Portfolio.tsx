import { Layout } from "@/components/layout";
import { Section } from "@/components/ui/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";

// Import project images
import plantmeImage from "/lovable-uploads/53f3ab09-9fa7-469a-8ef3-34b69a54e489.png";
import oanzImage from "/lovable-uploads/91f31926-eff7-4532-a697-2d74b0666d65.png";

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
      <Section className="bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Portfolio
          </h1>
          <p className="text-xl text-muted-foreground">
            Products I've built and shipped — from concept to live deployment
          </p>
        </div>
      </Section>

      {/* Projects */}
      <Section className="bg-background">
        <div className="space-y-16">
          {projects.map((project, index) => (
            <Card key={index} className="border-border overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="aspect-video md:aspect-auto overflow-hidden bg-muted">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-forest/10">
                      <span className="text-muted-foreground">Screenshot coming soon</span>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-foreground">{project.title}</h2>
                    {project.url && (
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-ochre hover:text-ochre/80 transition-colors"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground mb-6">{project.description}</p>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-1">Challenge</h3>
                      <p className="text-sm text-muted-foreground">{project.challenge}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-1">Approach</h3>
                      <p className="text-sm text-muted-foreground">{project.approach}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-1">Outcome</h3>
                      <p className="text-sm text-muted-foreground">{project.outcome}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="text-xs px-2 py-1 bg-forest/10 text-forest rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-forest text-forest-foreground">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Want something built?</h2>
          <p className="text-forest-foreground/80 mb-8">
            Let's talk about your MVP and how we can bring it to life.
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-ochre hover:bg-ochre/90 text-ochre-foreground"
          >
            <Link to="/contact">
              Start a Conversation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Section>
    </Layout>
  );
};

export default Portfolio;
