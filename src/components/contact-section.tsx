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