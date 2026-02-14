import { Layout } from "@/components/layout";
import { Section } from "@/components/ui/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Calendar, Linkedin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero */}
      <Section className="bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Let's Talk
          </h1>
          <p className="text-xl text-muted-foreground">
            Ready to get your MVP off the ground? Book a free discovery call or send me a message.
          </p>
        </div>
      </Section>

      {/* Contact Options */}
      <Section className="bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>
                  Tell me about your project and I'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Tell me about your project</Label>
                    <Textarea 
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="What are you building? Where are you at? What support do you need?"
                      rows={5}
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-ochre hover:bg-ochre/90 text-ochre-foreground"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Other Contact Options */}
            <div className="space-y-8">
              {/* Discovery Call */}
              <Card className="border-border bg-forest/5">
                <CardHeader>
                  <div className="p-3 bg-ochre/10 rounded-lg w-fit mb-2">
                    <Calendar className="h-6 w-6 text-ochre" />
                  </div>
                  <CardTitle>Book a Discovery Call</CardTitle>
                  <CardDescription>
                    A free 30-minute call to discuss your project and how I can help.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Calendly booking widget coming soon. In the meantime, email me to schedule.
                  </p>
                  <Button 
                    asChild
                    variant="outline"
                    className="w-full border-forest text-forest hover:bg-forest hover:text-forest-foreground"
                  >
                    <a href="mailto:hello@greenback.solutions?subject=Discovery%20Call%20Request">
                      Request a Call
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Direct Contact */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Direct Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <a 
                    href="mailto:hello@greenback.solutions"
                    className="flex items-center gap-3 text-muted-foreground hover:text-ochre transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                    <span>hello@greenback.solutions</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/felicityroberts/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-ochre transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span>Connect on LinkedIn</span>
                  </a>
                </CardContent>
              </Card>

              {/* Location */}
              <div className="p-6 bg-muted rounded-xl">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Based in:</strong> Bay of Plenty, Aotearoa New Zealand
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong className="text-foreground">Working hours:</strong> Flexible across time zones. 
                  I work with founders globally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Contact;
