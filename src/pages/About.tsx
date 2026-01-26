import { Layout } from "@/components/layout";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Linkedin } from "lucide-react";

const credentials = [
  "MBA (Sustainability)",
  "Python/Django Developer",
  "React/Lovable Builder",
  "Operations Management",
  "Climate Tech Focus"
];

const values = [
  {
    title: "Ship fast, learn faster",
    description: "Getting something in front of users is more valuable than perfecting it in isolation."
  },
  {
    title: "Climate impact matters",
    description: "I prioritise work that moves the needle on sustainability and environmental outcomes."
  },
  {
    title: "Founders helping founders",
    description: "I've been in your shoes. I know what it takes and I'm here to share what I've learned."
  }
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <Section className="bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <div className="flex justify-center">
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
            
            {/* Intro */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Hi, I'm Fliss
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Operations specialist turned technical founder, based in the Bay of Plenty, New Zealand.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Bio */}
      <Section className="bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
            <p>
              My journey to becoming a founder wasn't linear. I spent years in operations management, 
              optimising complex business processes and learning what it really takes to make organisations work. 
              Along the way, I completed an MBA in Sustainability, driven by a belief that business can — and must — 
              be a force for environmental good.
            </p>
            <p>
              When I decided to build my own products, I taught myself to code. I learned Python and Django, 
              then React and modern no-code tools like Lovable. I shipped PlantMe.io, worked with OANZ on sector 
              strategy, and supported fellow founders with their technical builds.
            </p>
            <p>
              Now I combine all of that experience — operations, sustainability, technical building — to help 
              other founders go from idea to live product. I know the challenges because I've faced them myself. 
              I know what works because I've done it.
            </p>
            <p>
              If you're a founder with an idea and the drive to make it real, I'd love to hear from you.
            </p>
          </div>
          
          {/* Credentials */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Skills & Background</h2>
            <div className="flex flex-wrap gap-3">
              {credentials.map((credential, index) => (
                <span 
                  key={index}
                  className="text-sm px-4 py-2 bg-forest/10 text-forest rounded-full border border-forest/20"
                >
                  {credential}
                </span>
              ))}
            </div>
          </div>
          
          {/* LinkedIn */}
          <div className="mt-8">
            <Button 
              asChild
              variant="outline"
              className="border-forest text-forest hover:bg-forest hover:text-forest-foreground"
            >
              <a 
                href="https://www.linkedin.com/in/felicityroberts/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Linkedin className="mr-2 h-4 w-4" />
                Connect on LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            What I Believe
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-card rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-forest text-forest-foreground">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Let's work together</h2>
          <p className="text-forest-foreground/80 mb-8">
            Ready to turn your idea into a real product? I'd love to hear about your project.
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-ochre hover:bg-ochre/90 text-ochre-foreground"
          >
            <Link to="/contact">
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Section>
    </Layout>
  );
};

export default About;
