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
    tags: ["Django/Python", "Full-stack", "Climate Tech"],
    image: plantmeImage,
    url: "https://plantme.io/"
  },
  {
    title: "ANZOC",
    description: "Platform connecting and supporting New Zealand's organic sector",
    tags: ["Community Platform", "Organic Agriculture"],
    image: oanzImage,
    url: "https://www.oanz.org/"
  },
  {
    title: "Telehealth MVP",
    description: "Technical build support for a fellow founder's telehealth platform",
    tags: ["Lovable Build", "React", "Startup Support"],
    image: null,
    url: null
  }
];

export const PortfolioSection = () => {
  return (
    <Section className="bg-secondary/30">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Products I've Built & Shipped
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Real products, real impact — from concept to live deployment
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {projects.map((project, index) => (
          <Card 
            key={index} 
            className="group border-border overflow-hidden hover:shadow-xl transition-all duration-300 bg-card"
          >
            <div className="aspect-video overflow-hidden bg-muted">
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-forest/10">
                  <span className="text-muted-foreground text-sm">Coming Soon</span>
                </div>
              )}
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-foreground">{project.title}</CardTitle>
                {project.url && (
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-ochre hover:text-ochre/80 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
              <CardDescription className="text-muted-foreground">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <Button 
          asChild
          variant="outline"
          className="border-forest text-forest hover:bg-forest hover:text-forest-foreground"
        >
          <Link to="/portfolio">
            View Full Portfolio
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
};
