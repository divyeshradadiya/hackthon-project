import Link from "next/link"
import { Button } from "@repo/ui/button"
import { Badge } from "@repo/ui/badge"
import {
  ArrowRight,
  Play,
  BookOpen,
  Gamepad2,
  Trophy,
  Star,
  ChevronDown,
} from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-28 lg:pb-28 overflow-hidden bg-gradient-to-br from-white via-primary/5 to-secondary/10">
      <div className="container px-4 mx-auto relative z-content">
        <div className="flex flex-col items-center">
          {/* Central content */}
          <div className="w-full lg:max-w-3xl xl:max-w-4xl text-center mx-auto">
            <Badge className="mb-6 bg-primary/10 text-primary border-0 py-2 px-4 text-sm">
               Let's apply smarter way for self-learning!
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-gray leading-tight mb-6">
                Turn Learning Into an{" "}
              <span className="text-primary relative">
                Adventure
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-secondary"
                  viewBox="0 0 100 15"
                  preserveAspectRatio="none"
                >
                  <path d="M0,15 Q50,0 100,15" fill="none" stroke="currentColor" strokeWidth="5" />
                </svg>
              </span>{" "}
              with AI
            </h1>
            <p className="text-lg md:text-xl text-neutral-gray mb-8 max-w-lg mx-auto">
              Personalized lessons, real-time quizzes, and interactive challenges—powered by AI to match your pace and style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-xl group transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg rounded-xl group transition-all duration-300"
                >
                  <Play className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  See How It Works
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
                <span className="font-bold text-dark-gray">10,000+</span> students learning today
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating small cards around the hero */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Top left floating card */}
        <div className="absolute top-1/4 left-[10%] transform -translate-x-1/2 animate-float-slow" style={{ animationDelay: "0s" }}>
          <div className="bg-primary/10 rounded-xl p-3 flex flex-col items-center justify-center w-20 h-20 shadow-lg">
            <BookOpen className="h-8 w-8 text-primary mb-1" />
            <span className="font-bold text-primary text-xs">Lessons</span>
          </div>
        </div>
        
        {/* Bottom left floating card */}
        <div className="absolute bottom-1/4 left-[15%] transform -translate-x-1/2 animate-float-slow" style={{ animationDelay: "1.5s" }}>
          <div className="bg-secondary/10 rounded-xl p-3 flex flex-col items-center justify-center w-20 h-20 shadow-lg">
            <Gamepad2 className="h-8 w-8 text-secondary mb-1" />
            <span className="font-bold text-secondary text-xs">Games</span>
          </div>
        </div>
        
        {/* Top right floating card */}
        <div className="absolute top-1/3 right-[10%] transform translate-x-1/2 animate-float-slow" style={{ animationDelay: "0.7s" }}>
          <div className="bg-success/10 rounded-xl p-3 flex flex-col items-center justify-center w-20 h-20 shadow-lg">
            <Trophy className="h-8 w-8 text-success mb-1" />
            <span className="font-bold text-success text-xs">Challenges</span>
          </div>
        </div>
        
        {/* Bottom right floating card */}
        <div className="absolute bottom-1/3 right-[15%] transform translate-x-1/2 animate-float-slow" style={{ animationDelay: "2.2s" }}>
          <div className="bg-destructive/10 rounded-xl p-3 flex flex-col items-center justify-center w-20 h-20 shadow-lg">
            <Star className="h-8 w-8 text-destructive mb-1" />
            <span className="font-bold text-destructive text-xs">Rewards</span>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-decoration">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>

        {/* Animated math symbols */}
        <div className="absolute top-1/3 left-1/4 text-6xl font-bold text-primary/5 animate-float-slow">+</div>
        <div
          className="absolute bottom-1/3 right-1/4 text-6xl font-bold text-secondary/5 animate-float-slow"
          style={{ animationDelay: "1.5s" }}
        >
          ×
        </div>
        <div
          className="absolute top-2/3 right-1/3 text-6xl font-bold text-success/5 animate-float-slow"
          style={{ animationDelay: "2.5s" }}
        >
          ÷
        </div>
      </div>
    </section>
  )
}
