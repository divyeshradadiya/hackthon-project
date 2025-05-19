import Link from "next/link";
import { Button } from "@repo/ui/button";
import { Badge } from "@repo/ui/badge";
import {
  ArrowRight,
  Code,
  Edit3,
  ClipboardList,
  BarChart2,
  ChevronDown,
} from "lucide-react";

export function Hero() {
  const features = [
    {
      icon: Code,
      label: "Generate",
      x: "10%",
      y: "25%",
      delay: "0s",
      gradient: "from-blue-200 to-blue-400",
    },
    {
      icon: Edit3,
      label: "Edit",
      x: "15%",
      y: "75%",
      delay: "1s",
      gradient: "from-green-200 to-green-400",
    },
    {
      icon: ClipboardList,
      label: "Quiz",
      x: "90%",
      y: "30%",
      delay: "0.7s",
      gradient: "from-pink-200 to-pink-400",
    },
    {
      icon: BarChart2,
      label: "Track",
      x: "85%",
      y: "70%",
      delay: "1.8s",
      gradient: "from-yellow-200 to-yellow-400",
    },
  ];

  return (
    <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-28 lg:pb-28 overflow-hidden bg-gradient-to-br from-white via-primary/5 to-secondary/10">
      <div className="container px-4 mx-auto relative z-content">
        <div className="flex flex-col items-center">
          {/* Central content */}
          <div className="w-full lg:max-w-3xl xl:max-w-4xl text-center mx-auto">
            <Badge className="mb-6 bg-primary/10 text-primary border-0 py-2 px-4 text-sm">
              AI-powered course creation in seconds
            </Badge>

            {/* Three-word action heading */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-dark-gray leading-tight mb-4">
              <span className="block">
                <span className="text-blue-600">Create.</span>{" "}
                <span className="text-green-600">Read.</span>{" "}
                {/* <span className="text-purple-600">Read.</span>{" "} */}
                <span className="text-yellow-600">Track.</span>
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-neutral-gray mb-8">
              your learning journey—supercharged by AI
            </p>

            <p className="text-lg md:text-xl text-neutral-gray mb-8 max-w-lg mx-auto">
              Generate markdown lessons, customize every detail, build on-the-fly quizzes, and monitor progress—all in a single AI-driven dashboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-xl group transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg rounded-xl group transition-all duration-300"
                >
                  <ChevronDown className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-180" />
                  Learn How It Works
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center mt-8 gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-primary font-bold shadow-sm"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div className="text-neutral-gray">
                <span className="font-bold text-dark-gray">500+</span>{" "}
                modules generated today
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating feature cards */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {features.map(({ icon: Icon, label, x, y, delay, gradient }, idx) => (
          <div
            key={idx}
            className="absolute transform animate-float-slow"
            style={{
              left: x,
              top: y,
              transform: "translate(-50%, -50%)",
              animationDelay: delay,
            }}
          >
            <div
              className={`rounded-xl p-3 flex flex-col items-center justify-center w-20 h-20 shadow-lg bg-gradient-to-br ${gradient}`}
            >
              <Icon className="h-8 w-8 text-white mb-1" />
              <span className="font-bold text-white text-xs">{label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Background symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-decoration">
        {["+","–","×","÷"].map((sym, i) => (
          <div
            key={i}
            className="absolute text-6xl font-bold text-secondary/5 animate-float-slow"
            style={{
              top: `${20 + i * 20}%`,
              left: `${15 + i * 20}%`,
              animationDelay: `${i * 1.2}s`,
            }}
          >
            {sym}
          </div>
        ))}
      </div>
    </section>
  );
}
