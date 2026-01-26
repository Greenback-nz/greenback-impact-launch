import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <Section className="bg-forest text-forest-foreground">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to ship?
        </h2>
        <p className="text-lg md:text-xl text-forest-foreground/80 mb-8">
          Let's talk about where you're at and how I can help you get to launch.
        </p>
        
        <Button 
          asChild
          size="lg"
          className="bg-ochre hover:bg-ochre/90 text-ochre-foreground px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          <Link to="/contact">
            Book a Free Discovery Call
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        
        <p className="mt-6 text-sm text-forest-foreground/60">
          No commitment required — let's just chat about your project
        </p>
      </div>
    </Section>
  );
};
