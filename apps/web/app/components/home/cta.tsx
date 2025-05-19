import Link from "next/link";
import { Button } from "@repo/ui/button";
import { Badge } from "@repo/ui/badge";
import { ArrowRight, CheckCircle } from "lucide-react";

export function Cta() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container px-4 mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl border border-gray-100">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent rounded-l-full transform translate-x-1/3 z-0"></div>
          <div className="relative z-10 max-w-3xl">
            <Badge className="mb-6 bg-primary/10 text-primary border-0 py-1.5 px-3">
              Build. Learn. Track.
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-4">
              Supercharge Your Leanring Creation!
            </h2>
            <p className="text-lg text-neutral-gray mb-8">
              Say goodbye to manual lesson planning. Use AI to generate, edit, and
              organize course content in markdown. Add quizzes, track learner
              progress, and manage everything from a unified dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-xl group transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
                >
                  Login now from top button
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg rounded-xl"
                >
                  Browse Modules
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-6">
              {[
                "AI-Powered Content Generation",
                "Customizable Lessons & Quizzes",
                "Progress Tracking Dashboard",
                "No Setup Required",
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-success mr-2" />
                  <span className="text-dark-gray">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
