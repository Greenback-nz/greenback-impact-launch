import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Mail, Calendar } from "lucide-react";

export const ContactSection = () => {
  return (
    <Section id="contact" className="bg-background">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Let's Build Something
        </h2>
        <p className="text-lg text-muted-foreground mb-12">
          Ready to create impact? Get in touch to discuss your project.
        </p>
        
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-foreground mb-4">Contact Me</h3>
            <p className="text-muted-foreground mb-6">
              Send me an email or book a call to discuss your project needs.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              className="bg-coral hover:bg-coral/90 text-coral-foreground"
            >
              <a href="mailto:hello.greenback@gmail.com">
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </a>
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              className="border-forest text-forest hover:bg-forest hover:text-forest-foreground"
            >
              <a 
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Meeting%20with%20Greenback%20Solutions&details=Let%27s%20discuss%20your%20project&add=hello.greenback@gmail.com" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book a Call
              </a>
            </Button>
          </div>
          
          <div className="mt-8 p-6 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Email:</strong> hello.greenback@gmail.com
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};