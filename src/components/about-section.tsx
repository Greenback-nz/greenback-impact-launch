import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const credentials = [
  "MBA (Sustainability)",
  "Python/Django Developer",
  "React/Lovable Builder",
  "Operations Management",
  "Climate Tech Focus"
];

export const AboutSection = () => {
  return (
    <Section className="bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Hi, I'm Fliss
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                I'm an operations specialist turned technical founder based in the Bay of Plenty, NZ. 
                I've built multiple products from scratch, hold an MBA in Sustainability, and spent 
                years optimising complex business operations before launching my own climate-tech ventures.
              </p>
              <p>
                I know what it takes to go from idea to live product because I've done it myself — 
                multiple times. Now I help other founders do the same.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {credentials.map((credential, index) => (
                <span 
                  key={index}
                  className="text-sm px-3 py-1.5 bg-forest/10 text-forest rounded-full border border-forest/20"
                >
                  {credential}
                </span>
              ))}
            </div>
            
            <Button 
              asChild
              variant="outline"
              className="border-forest text-forest hover:bg-forest hover:text-forest-foreground"
            >
              <Link to="/about">
                Learn More About Me
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-ochre/20 rounded-full blur-3xl" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-forest/20 shadow-xl">
                <img 
                  src="/lovable-uploads/f631e360-095f-42e8-9d6f-2376ccde695a.png" 
                  alt="Fliss Roberts"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
