import { Layout } from "@/components/layout";
import { Section } from "@/components/ui/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Compass, Code, Rocket, ArrowRight, Check } from "lucide-react";

const services = [
  {
    icon: Compass,
    title: "Strategic Advisory",
    pricing: "Session or package pricing",
    description: "Get clarity on what to build and why before you write a line of code",
    features: [
      "Business model canvas workshops",
      "Competitive analysis and positioning",
      "Go-to-market strategy",
      "Operational process design",
      "Pricing strategy"
    ],
    idealFor: "Founders with a concept who need clarity before building"
  },
  {
    icon: Code,
    title: "Technical Build Support",
    pricing: "Project-based pricing",
    description: "Hands-on build help or technical guidance for your MVP",
    features: [
      "MVP builds in Lovable, Django, or React",
      "No-code/low-code solution architecture",
      "Database design and API integrations",
      "Technical decision guidance for non-technical founders",
      "Code handover and documentation"
    ],
    idealFor: "Founders who need hands-on build help or technical guidance"
  },
  {
    icon: Rocket,
    title: "Launch Partnership",
    pricing: "Retainer or equity arrangements",
    description: "Full strategic and technical support from concept to launch",
    features: [
      "Full strategic and technical support",
      "Weekly check-ins and milestone planning",
      "Build sprints with rapid iteration",
      "Launch preparation and user feedback loops"
    ],
    idealFor: "Founders who want a committed partner through to launch"
  }
];

const processSteps = [
  {
    number: "1",
    title: "Discovery Call",
    description: "We chat about your vision, where you're at, and what you need"
  },
  {
    number: "2",
    title: "Scope & Proposal",
    description: "I put together a clear plan with timeline and investment"
  },
  {
    number: "3",
    title: "Build Sprints",
    description: "We work in focused sprints with regular check-ins"
  },
  {
    number: "4",
    title: "Launch & Handover",
    description: "Your product goes live with full documentation and support"
  }
];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <Section className="bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Services
          </h1>
          <p className="text-xl text-muted-foreground">
            Flexible support tailored to your stage and needs
          </p>
        </div>
      </Section>

      {/* Services Detail */}
      <Section className="bg-background">
        <div className="space-y-12">
          {services.map((service, index) => (
            <Card key={index} className="border-border overflow-hidden">
              <div className="grid md:grid-cols-3">
                <CardHeader className="bg-forest/5 md:col-span-1">
                  <div className="p-4 bg-forest/10 rounded-xl w-fit mb-4">
                    <service.icon className="h-10 w-10 text-forest" />
                  </div>
                  <CardTitle className="text-2xl text-foreground">{service.title}</CardTitle>
                  <CardDescription className="text-ochre font-medium">
                    {service.pricing}
                  </CardDescription>
                </CardHeader>
                <CardContent className="md:col-span-2 p-6">
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-forest flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-4 bg-ochre/10 rounded-lg">
                    <p className="text-sm">
                      <span className="font-semibold text-foreground">Ideal for: </span>
                      <span className="text-muted-foreground">{service.idealFor}</span>
                    </p>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* How I Work */}
      <Section className="bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            How I Work
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-ochre text-ochre-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-forest text-forest-foreground">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-forest-foreground/80 mb-8">
            Let's talk about your project and find the right support package for you.
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-ochre hover:bg-ochre/90 text-ochre-foreground"
          >
            <Link to="/contact">
              Book a Discovery Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Section>
    </Layout>
  );
};

export default Services;
