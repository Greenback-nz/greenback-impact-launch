import { Section } from "@/components/ui/section";
import { Lightbulb, Users, Clock } from "lucide-react";

const painPoints = [
  {
    icon: Lightbulb,
    title: "Stuck between idea and execution",
    description: "You have a vision but aren't sure how to turn it into a working product"
  },
  {
    icon: Users,
    title: "Technical co-founder gap",
    description: "You need someone who can build, not just advise from the sidelines"
  },
  {
    icon: Clock,
    title: "Burning runway on the wrong priorities",
    description: "Limited time and resources mean every decision counts"
  }
];

export const ProblemSection = () => {
  return (
    <Section className="bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Building is hard. You don't have to do it alone.
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {painPoints.map((point, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="mx-auto mb-4 p-4 bg-ochre/10 rounded-full w-fit">
                <point.icon className="h-8 w-8 text-ochre" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {point.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {point.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I help founders cut through the noise, prioritise ruthlessly, and get their product into users' hands.
          </p>
        </div>
      </div>
    </Section>
  );
};
