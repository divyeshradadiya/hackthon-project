import { Badge } from "@repo/ui/badge";
import { Card } from "@repo/ui/card";
import { Star, BarChart, CheckCircle, Users } from "lucide-react";

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-destructive/10 text-destructive border-0 py-1.5 px-3">
            Success stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
            Join thousands of students who have transformed their relationship
            with math through MathQuest
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Alex, 10",
              avatar: "A",
              quote:
                "I used to hate math, but now it's my favorite subject! The games make learning so much fun and I actually look forward to practice time.",
              stars: 5,
              improvement: "Grade improved from C to A",
              color: "primary",
            },
            {
              name: "Sophia, 12",
              avatar: "S",
              quote:
                "MathQuest helped me understand fractions when I was really struggling. The visual lessons and games made it click for me!",
              stars: 5,
              improvement: "Mastered fractions in 3 weeks",
              color: "secondary",
            },
            {
              name: "Ethan, 9",
              avatar: "E",
              quote:
                "I love earning stars and badges. It makes me want to practice math every day! My parents are amazed at how much I've improved.",
              stars: 5,
              improvement: "Practices daily without reminders",
              color: "success",
            },
          ].map((testimonial, index) => (
            <Card
              key={index}
              className={`bg-white rounded-xl shadow-md border border-${testimonial.color}/20 p-6 hover:shadow-lg transition-all duration-300 group overflow-hidden relative h-full`}
            >
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-${testimonial.color}/50`}
              ></div>
              <div className="flex mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-secondary fill-secondary"
                  />
                ))}
              </div>
              <p className="text-dark-gray mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                <div
                  className={`w-10 h-10 rounded-full bg-${testimonial.color}/20 flex items-center justify-center text-${testimonial.color} font-bold mr-3`}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-dark-gray">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-neutral-gray">
                    {testimonial.improvement}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              value: "95%",
              label: "Student Satisfaction",
              icon: <Star className="h-6 w-6 text-secondary" />,
            },
            {
              value: "87%",
              label: "Grade Improvement",
              icon: <BarChart className="h-6 w-6 text-primary" />,
            },
            {
              value: "10M+",
              label: "Problems Solved",
              icon: <CheckCircle className="h-6 w-6 text-success" />,
            },
            {
              value: "50K+",
              label: "Active Students",
              icon: <Users className="h-6 w-6 text-destructive" />,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-all duration-300 transform hover:translate-y-[-2px]"
            >
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-dark-gray mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-gray">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
