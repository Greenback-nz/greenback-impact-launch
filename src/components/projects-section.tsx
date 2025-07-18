import { Section } from "@/components/ui/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "PlantMe.io",
    description: "Built and launched a peer-to-peer marketplace allowing users to record and measure success and climate impact of what they grow at home."
  },
  {
    title: "OANZ Ecosystem Services Strategy",
    description: "Led research, design and funding frameworks for organic sectoral body"
  },
  {
    title: "Robot Head & Neck Surgery",
    description: "Supported commercial strategy for NZ first robotic surgical startup"
  },
  {
    title: "The Organic Collective",
    description: "Developed MVP for B2B/B2C certified organic marketplace"
  },
  {
    title: "Girls Club DAO",
    description: "Web3 co-op experimenting in next-gen funding models for female led startups"
  },
  {
    title: "EcoNarrative Kitset",
    description: "ESG Reporting & Storytelling tools to help businesses communicate value and impact"
  }
];

export const ProjectsSection = () => {
  return (
    <Section id="projects" className="bg-background">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Real Projects. Measurable Impact.
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A selection of high-impact projects at the intersection of technology, climate, and equity
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card key={index} className="border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-xl text-forest">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-sm leading-relaxed">
                {project.description}
              </CardDescription>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-forest text-forest hover:bg-forest hover:text-forest-foreground"
              >
                Learn More <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
};