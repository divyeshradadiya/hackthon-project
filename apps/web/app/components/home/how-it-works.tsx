import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import {
  Layers,
  Rocket,
  Gamepad2,
  Award,
  CheckCircle,
  Play,
  Brain,
  Star,
  MousePointer,
} from "lucide-react";

export function HowItWorks() {
  return (
    <section
      className="py-20 bg-gradient-to-br from-sky-light to-white relative overflow-hidden"
      id="how-it-works"
    >
      <div className="container px-4 mx-auto relative z-content">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-0 py-1.5 px-3">
            Simple process
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-4">
            How MathQuest Works
          </h2>
          <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
            Our platform makes learning math intuitive and engaging through a
            simple four-step process
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 transform -translate-y-1/2 z-0 hidden md:block"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {[
              {
                icon: <Layers className="h-8 w-8" />,
                title: "Personalized Assessment",
                description:
                  "We identify your strengths and areas for improvement",
                color: "primary",
              },
              {
                icon: <Rocket className="h-8 w-8" />,
                title: "Custom Learning Path",
                description: "A tailored curriculum designed just for you",
                color: "secondary",
              },
              {
                icon: <Gamepad2 className="h-8 w-8" />,
                title: "Interactive Learning",
                description: "Engage with lessons, games, and challenges",
                color: "success",
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Track & Celebrate",
                description: "Monitor progress and earn rewards",
                color: "destructive",
              },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div
                    className={`w-20 h-20 rounded-full bg-${step.color}/10 border-4 border-${step.color} flex items-center justify-center bg-white z-10 relative transition-transform duration-300 hover:scale-110 cursor-pointer`}
                  >
                    <div className={`text-${step.color}`}>{step.icon}</div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-gray-200 z-0">
                    {index + 1}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-dark-gray text-center">
                  {step.title}
                </h4>
                <p className="text-sm text-neutral-gray text-center mt-2">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <Badge className="mb-4 bg-success/10 text-success border-0 py-1.5 px-3 w-fit">
                Interactive learning
              </Badge>
              <h3 className="text-2xl md:text-3xl font-bold text-dark-gray mb-4">
                See MathQuest in Action
              </h3>
              <p className="text-neutral-gray mb-6">
                Watch how students engage with our interactive platform to
                master math concepts through games and challenges.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Visualize complex math concepts",
                  "Learn through interactive games",
                  "Track progress with detailed analytics",
                  "Earn rewards for achievements",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl w-fit group transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg">
                Watch Demo
                <Play className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </Button>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 flex items-center justify-center relative overflow-hidden">
              {/* Interactive demo visualization */}
              <div className="relative w-full max-w-md aspect-video bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden group">
                {/* Demo thumbnail with play button overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:opacity-90 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                    <Play className="h-6 w-6 text-primary ml-1" />
                  </div>
                </div>

                {/* Demo content preview */}
                <div className="absolute inset-0 p-4 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Brain className="h-4 w-4 text-primary" />
                      </div>
                      <span className="ml-2 font-medium text-sm">
                        Fraction Master
                      </span>
                    </div>
                    <Badge className="bg-success/20 text-success border-0">
                      Level 3
                    </Badge>
                  </div>

                  <div className="flex-1 flex items-center justify-center opacity-50">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-4 text-2xl font-bold mb-4">
                        <div className="flex flex-col items-center">
                          <div className="text-center font-bold">1</div>
                          <div className="w-8 border-t border-current my-1"></div>
                          <div className="text-center font-bold">2</div>
                        </div>
                        <span className="text-primary">+</span>
                        <div className="flex flex-col items-center">
                          <div className="text-center font-bold">1</div>
                          <div className="w-8 border-t border-current my-1"></div>
                          <div className="text-center font-bold">4</div>
                        </div>
                        <span>=</span>
                        <div className="flex flex-col items-center">
                          <div className="text-center font-bold">3</div>
                          <div className="w-8 border-t border-current my-1"></div>
                          <div className="text-center font-bold">4</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-secondary fill-secondary" />
                      <span className="ml-1 text-xs">25 points</span>
                    </div>
                    <MousePointer className="h-4 w-4 text-neutral-gray animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-10 left-10 text-4xl font-bold text-primary/10 animate-float-slow">
                +
              </div>
              <div
                className="absolute bottom-10 right-10 text-4xl font-bold text-secondary/10 animate-float-slow"
                style={{ animationDelay: "1s" }}
              >
                ÷
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
