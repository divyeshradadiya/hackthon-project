import { Badge } from "@repo/ui/badge";
import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import {
  Lightbulb,
  Gamepad2,
  Trophy,
  Users,
  Brain,
  BarChart,
  ChevronRight,
} from "lucide-react";

export function Features() {
  return (
    <section className="py-20 relative overflow-hidden" id="features">
      <div className="container px-4 mx-auto relative z-content">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-secondary/10 text-secondary border-0 py-1.5 px-3">
            Why students love us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-4">
            Learning Math Has Never Been This Fun
          </h2>
          <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
            Our platform combines engaging content with game mechanics to create
            an immersive learning experience that students actually look forward
            to.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Lightbulb className="h-10 w-10 text-primary" />,
              title: "Interactive Lessons",
              description:
                "Engaging lessons that adapt to your learning style and pace, making complex concepts easy to understand.",
              color: "primary",
            },
            {
              icon: <Gamepad2 className="h-10 w-10 text-secondary" />,
              title: "Fun Math Games",
              description:
                "Learn while playing games designed to reinforce math skills and build confidence through practice.",
              color: "secondary",
            },
            {
              icon: <Trophy className="h-10 w-10 text-success" />,
              title: "Challenges & Rewards",
              description:
                "Complete challenges to earn stars and badges, tracking your progress and celebrating achievements.",
              color: "success",
            },
            {
              icon: <Users className="h-10 w-10 text-destructive" />,
              title: "Multiplayer Competitions",
              description:
                "Compete with friends in real-time math battles to test your skills and learn from each other.",
              color: "destructive",
            },
            {
              icon: <Brain className="h-10 w-10 text-purple-600" />,
              title: "Adaptive Learning",
              description:
                "Our platform adjusts to your skill level, providing the right challenges at the right time.",
              color: "purple",
            },
            {
              icon: <BarChart className="h-10 w-10 text-amber-500" />,
              title: "Progress Tracking",
              description:
                "Detailed insights into your learning journey with visual progress reports and achievement badges.",
              color: "amber",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className={`bg-white rounded-xl shadow-md border border-${feature.color}/20 p-6 hover:shadow-lg transition-all duration-300 hover:border-${feature.color}/40 group overflow-hidden relative h-full`}
            >
              <div
                className={`absolute top-0 left-0 w-2 h-full bg-${feature.color}/50 transition-all duration-300 group-hover:h-2 group-hover:w-full group-hover:opacity-10`}
              ></div>
              <div
                className={`w-16 h-16 rounded-full bg-${feature.color}/10 flex items-center justify-center mb-4 group-hover:bg-${feature.color}/20 transition-colors z-10`}
              >
                {feature.icon}
              </div>
              <h3 className={`text-xl font-bold text-${feature.color} mb-2`}>
                {feature.title}
              </h3>
              <p className="text-neutral-gray">{feature.description}</p>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                <Button
                  variant="ghost"
                  className={`text-${feature.color} p-0 h-auto group-hover:underline`}
                >
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-decoration">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full"></div>
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-secondary/5 rounded-full"></div>
      </div>
    </section>
  );
}
