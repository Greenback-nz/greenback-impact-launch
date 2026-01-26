import { Section } from "@/components/ui/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Compass, Code, Rocket, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Compass,
    title: "Strategic Advisory",
    tagline: "From positioning to pricing, get clarity on what to build and why",
    description: "Business model validation, go-to-market strategy, operational setup"
  },
  {
    icon: Code,
    title: "Technical Build Support",
    tagline: "I'll build it with you or guide your team through the technical decisions",
    description: "MVP development, no-code/low-code solutions, Lovable builds, API integrations"
  },
  {
    icon: Rocket,
    title: "Launch Partnership",
    tagline: "Strategy + build + launch. Ideal for founders who want a partner, not just a contractor",
    description: "End-to-end support from concept to live product"
  }
];

export const ServicesSection = () => {
  return (
    <Section className="bg-background">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          How I Can Help
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Flexible support tailored to where you are in your founder journey
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {services.map((service, index) => (
          <Card 
            key={index} 
            className="group border-border hover:border-ochre/50 hover:shadow-xl transition-all duration-300 bg-card"
          >
            <CardHeader>
              <div className="mb-4 p-4 bg-forest/10 rounded-xl w-fit group-hover:bg-ochre/10 transition-colors">
                <service.icon className="h-8 w-8 text-forest group-hover:text-ochre transition-colors" />
              </div>
              <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80 italic">
                "{service.tagline}"
              </p>
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
          <Link to="/services">
            View All Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
};
