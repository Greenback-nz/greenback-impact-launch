import { Section } from "@/components/ui/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Leaf, Code, Coins } from "lucide-react";

const services = [
  {
    icon: Users,
    title: "Fractional Ops / GM Leadership",
    description: "Interim or project-based COO support"
  },
  {
    icon: Leaf,
    title: "Climate & ESG Strategy",
    description: "Impact-aligned planning, reporting, and positioning"
  },
  {
    icon: Code,
    title: "Marketplace + SaaS Builds",
    description: "Low-code to full-stack solutions with compliance built in"
  },
  {
    icon: Coins,
    title: "Ecosystem Fund Design",
    description: "DAO, Web3, or trad-finance models for funding climate work"
  }
];

export const ServicesSection = () => {
  return (
    <Section className="bg-secondary/20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Services
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Comprehensive solutions for mission-driven organizations
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {services.map((service, index) => (
          <Card key={index} className="border-border hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-forest/10 rounded-lg w-fit">
                <service.icon className="h-8 w-8 text-forest" />
              </div>
              <CardTitle className="text-lg">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                {service.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>All services are available globally.</strong> Remote-first and New Zealand-based.
        </p>
      </div>
    </Section>
  );
};