import { Section } from "@/components/ui/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Leaf, Users, Bot, ShoppingCart, Coins, FileText } from "lucide-react";

const projects = [
  {
    title: "PlantMe.io",
    description: "Built and launched a peer-to-peer marketplace allowing users to record and measure success and climate impact of what they grow at home.",
    icon: Leaf,
    gradient: "from-primary/10 to-accent/5"
  },
  {
    title: "OANZ Ecosystem Services Strategy",
    description: "Led research, design and funding frameworks for organic sectoral body",
    icon: Users,
    gradient: "from-forest/10 to-primary/5"
  },
  {
    title: "Robot Head & Neck Surgery",
    description: "Supported commercial strategy for NZ first robotic surgical startup",
    icon: Bot,
    gradient: "from-coral/10 to-forest/5"
  },
  {
    title: "The Organic Collective",
    description: "Developed MVP for B2B/B2C certified organic marketplace",
    icon: ShoppingCart,
    gradient: "from-accent/10 to-coral/5"
  },
  {
    title: "Girls Club DAO",
    description: "Web3 co-op experimenting in next-gen funding models for female led startups",
    icon: Coins,
    gradient: "from-primary/10 to-forest/5"
  },
  {
    title: "EcoNarrative Kitset",
    description: "ESG Reporting & Storytelling tools to help businesses communicate value and impact",
    icon: FileText,
    gradient: "from-forest/10 to-accent/5"
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
        {projects.map((project, index) => {
          const IconComponent = project.icon;
          return (
            <Card key={index} className={`group border-border hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
              <CardHeader className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">{project.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 relative">
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </CardDescription>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground group-hover:shadow-md transition-all"
                >
                  Learn More <ExternalLink className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
};