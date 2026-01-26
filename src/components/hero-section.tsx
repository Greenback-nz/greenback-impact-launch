import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-bg" />
      
      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-ochre/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-forest/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-ochre/5 blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/ce85fb2f-a254-43d3-9953-15556cb15361.png" 
              alt="Greenback Logo" 
              className="h-16 w-16 md:h-20 md:w-20"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-tight">
            Get Your MVP Live
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Strategic guidance and hands-on technical build support for founders ready to ship
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button 
              asChild
              size="lg"
              className="bg-ochre hover:bg-ochre/90 text-ochre-foreground px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <Link to="/contact">
                Book a Discovery Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="border-forest text-forest hover:bg-forest hover:text-forest-foreground px-8 py-6 text-lg rounded-lg"
            >
              <Link to="/portfolio">
                See My Work
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
