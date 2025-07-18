import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Download, Linkedin } from "lucide-react";

export const AboutSection = () => {
  return (
    <Section className="bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              About Fliss
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Hi, I'm Fliss — I help mission-led orgs grow, adapt, and build the infrastructure 
                needed for real climate impact. I've led national strategies, shipped marketplaces, 
                created education platforms, and advised startups and non-profits across agriculture, 
                medtech, and sustainability.
              </p>
              <p>
                My background includes leadership at BioGro NZ and partnerships with OANZ, 
                regenerative farmers, and international advocacy groups.
              </p>
            </div>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-forest" />
                <span className="text-sm">New Zealand (remote, flexible across time zones)</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-forest" />
                <span className="text-sm">Open to short- and long-term contracts</span>
              </div>
            </div>
            
            <div className="flex gap-3 mt-8">
              <Button variant="outline" className="border-forest text-forest hover:bg-forest hover:text-forest-foreground">
                <Download className="mr-2 h-4 w-4" />
                Resume
              </Button>
              <Button 
                variant="outline" 
                className="border-forest text-forest hover:bg-forest hover:text-forest-foreground"
                onClick={() => window.open('https://www.linkedin.com/in/felicityroberts/', '_blank')}
              >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Button>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square bg-gradient-to-br from-emerald/10 to-sage/10 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/f631e360-095f-42e8-9d6f-2376ccde695a.png" 
                    alt="Fliss Roberts - Professional headshot"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
};