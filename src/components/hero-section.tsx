import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-muted/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmNGY0ZjQiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-center mb-8">
            <img 
              src="/lovable-uploads/ce85fb2f-a254-43d3-9953-15556cb15361.png" 
              alt="Greenback Logo" 
              className="h-20 w-20 md:h-24 md:w-24"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
            Greenback
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-semibold text-forest mb-6">
            Strategy. Systems. Climate Solutions.
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Helping purpose-led businesses and organisations unlock growth, funding, 
            and climate-positive impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              onClick={scrollToContact}
              className="bg-coral hover:bg-coral/90 text-coral-foreground px-8 py-6 text-lg rounded-lg"
            >
              Work With Me
            </Button>
            <Button 
              variant="outline" 
              onClick={scrollToProjects}
              className="border-forest text-forest hover:bg-forest hover:text-forest-foreground px-8 py-6 text-lg rounded-lg"
            >
              View Projects <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};