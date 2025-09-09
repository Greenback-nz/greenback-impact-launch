import { Section } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        organization: formData.organization,
        message: formData.message,
        to_email: 'hello.greenback@gmail.com'
      };

      await emailjs.send(
        'service_91uergm',
        'template_ftzuv06',
        templateParams,
        'zaskn9roVmiB4SKmZ'
      );
      
      toast({
        title: "Thanks for your message!",
        description: "I'll be in touch soon.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        organization: '',
        message: ''
      });

    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or email directly at hello.greenback@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Section id="contact" className="bg-background">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Let's Build Something
        </h2>
        <p className="text-lg text-muted-foreground mb-12">
          Ready to create impact? Get in touch to discuss your project.
        </p>
        
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-left">Contact Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="organization">Organization/Project</Label>
                <Input
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-coral hover:bg-coral/90 text-coral-foreground flex-1"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="border-forest text-forest hover:bg-forest hover:text-forest-foreground"
                  onClick={() => window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&text=Meeting%20with%20Greenback%20Solutions&details=Let%27s%20discuss%20your%20project&add=hello.greenback@gmail.com', '_blank')}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Book a Call
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
};