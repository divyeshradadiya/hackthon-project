import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import {
  Code,
  Edit3,
  ClipboardList,
  BarChart2,
  Play,
  CheckCircle,
} from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <Code className="h-8 w-8 text-blue-600" />,
      title: "1. Generate Module",
      description:
        "Enter a prompt and let AI spin up a complete markdown module in seconds.",
      color: "blue",
    },
    {
      icon: <Edit3 className="h-8 w-8 text-green-600" />,
      title: "2. Edit & Customize",
      description:
        "Tweak any section, add your own examples, and style it to fit your curriculum.",
      color: "green",
    },
    {
      icon: <ClipboardList className="h-8 w-8 text-pink-600" />,
      title: "3. Build Quizzes",
      description:
        "Auto-generate question banks or hand-craft quizzes to test and reinforce learning.",
      color: "pink",
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-yellow-600" />,
      title: "4. Track Progress",
      description:
        "Monitor completion rates and performance metrics on your real-time dashboard.",
      color: "yellow",
    },
  ];

  return (
    <section
      className="py-20 bg-gradient-to-br from-sky-light to-white relative overflow-hidden"
      id="how-it-works"
    >
      <div className="container px-4 mx-auto relative z-content">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-0 py-1.5 px-3">
            4-Step Workflow
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-4">
            How It Works
          </h2>
          <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
            From prompt to performance insights, here’s how our AI-powered course builder gets you up and running.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 transform -translate-y-1/2 z-0 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div
                    className={`w-20 h-20 rounded-full bg-${step.color}/10 border-4 border-${step.color} flex items-center justify-center z-10 transition-transform duration-300 hover:scale-110 cursor-pointer`}
                  >
                    {step.icon}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-200 z-0">
                    {i + 1}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-dark-gray">
                  {step.title}
                </h4>
                <p className="text-sm text-neutral-gray mt-2">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Demo CTA */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <Badge className="mb-4 bg-success/10 text-success border-0 py-1.5 px-3 w-fit">
                Live Demo
              </Badge>
              <h3 className="text-2xl md:text-3xl font-bold text-dark-gray mb-4">
                See It in Action
              </h3>
              <p className="text-neutral-gray mb-6">
                Watch a quick walkthrough of how easy it is to generate, edit, quiz, and track—all from one dashboard.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl w-fit group transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                Watch Demo
                <Play className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </Button>
            </div>

            {/* Right visual */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 flex items-center justify-center relative overflow-hidden">
              <div className="relative w-full max-w-md aspect-video bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden group">
                {/* Play overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:opacity-90 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                    <Play className="h-6 w-6 text-primary" />
                  </div>
                </div>
                {/* Placeholder content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-50">
                  <CheckCircle className="h-12 w-12 text-success" />
                </div>
              </div>

              {/* Floating symbols */}
              <div className="absolute top-10 left-10 text-4xl font-bold text-primary/10 animate-float-slow">
                +
              </div>
              <div
                className="absolute bottom-10 right-10 text-4xl font-bold text-secondary/10 animate-float-slow"
                style={{ animationDelay: "1s" }}
              >
                =
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
