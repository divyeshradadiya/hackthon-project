import { Badge } from "@repo/ui/badge";
import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import {
  Code,
  Edit3,
  ClipboardList,
  BarChart2,
  BookOpen,
  Users,
  ChevronRight,
} from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Code,
      title: "Generate Modules",
      description:
        "Turn simple prompts into fully-fleshed markdown modules in seconds—no manual writing required.",
      gradient: "from-blue-400 to-blue-600",
    },
    {
      icon: Edit3,
      title: "Edit Lessons",
      description:
        "Tweak and refine every lesson to fit your style or curriculum with our built-in markdown editor.",
      gradient: "from-green-400 to-green-600",
    },
    {
      icon: ClipboardList,
      title: "Quiz Builder",
      description:
        "Auto-generate quizzes from your content or write custom questions to test and reinforce learning.",
      gradient: "from-pink-400 to-pink-600",
    },
    {
      icon: BarChart2,
      title: "Progress Tracking",
      description:
        "Visual dashboards show individual and class progress, completion rates, and performance over time.",
      gradient: "from-yellow-400 to-yellow-600",
    },
    {
      icon: BookOpen,
      title: "Template Library",
      description:
        "Choose from a library of pre-made module templates or save your own for rapid reuse.",
      gradient: "from-purple-400 to-purple-600",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "Invite co-teachers or teaching assistants to co-author content and share feedback in real time.",
      gradient: "from-teal-400 to-teal-600",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="features">
      <div className="container px-4 mx-auto relative z-content">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-secondary/10 text-secondary border-0 py-1.5 px-3">
            Why course creators love us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-4">
            Build and Manage Courses with Ease
          </h2>
          <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
            From AI-powered module generation to real-time quizzes and detailed progress insights, our platform gives you everything you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, description, gradient }, idx) => (
            <Card
              key={idx}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 group overflow-hidden relative h-full"
            >
              {/* Accent bar */}
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b {gradient} transition-all duration-300 group-hover:opacity-20" />

              {/* Gradient icon */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br ${gradient} shadow-lg`}
              >
                <Icon className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-xl font-bold text-dark-gray mb-2">
                {title}
              </h3>
              <p className="text-neutral-gray">{description}</p>

              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                <Button
                  variant="ghost"
                  className="text-dark-gray p-0 h-auto group-hover:underline flex items-center"
                >
                  Learn more
                  <ChevronRight className="h-4 w-4 ml-1 text-dark-gray" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none z-decoration">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-secondary/5 rounded-full" />
      </div>
    </section>
  );
}
  