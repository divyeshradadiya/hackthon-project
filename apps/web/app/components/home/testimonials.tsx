import { Badge } from "@repo/ui/badge";
import { Card } from "@repo/ui/card";
import { Star, Clock, Code, Users } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Dr. Lee",
      role: "Curriculum Manager",
      avatar: "DL",
      quote:
        "This platform revolutionized how we build courses—what used to take days now takes minutes. Our team couldn’t be happier!",
      stars: 5,
      color: "blue",
    },
    {
      name: "Jordan",
      role: "Bootcamp Lead",
      avatar: "JH",
      quote:
        "The ability to edit AI-generated lessons on the fly lets us adapt material to each cohort instantly. Engagement is through the roof!",
      stars: 5,
      color: "green",
    },
    {
      name: "Dr. Maya Patel",
      role: "Research Scientist, EduLabs",
      avatar: "MP",
      quote:
        "We used AI-generated modules to pilot new teaching methods. The analytics gave us insights we never had before—game-changer for our studies!",
      stars: 5,
      color: "purple",
    },
    {
      name: "Carlos",
      role: "Self-Paced Learner",
      avatar: "C",
      quote:
        "As someone learning on my own schedule, the quizzes and progress dashboard kept me motivated—I've never felt more in control of my learning!",
      stars: 5,
      color: "pink",
    },
  ];

  const stats = [
    {
      value: "95%",
      label: "Creator Satisfaction",
      icon: <Star className="h-6 w-6 text-blue-600" />,
    },
    {
      value: "80%",
      label: "Time Saved",
      icon: <Clock className="h-6 w-6 text-green-600" />,
    },
    {
      value: "5K+",
      label: "Modules Generated",
      icon: <Code className="h-6 w-6 text-pink-600" />,
    },
    {
      value: "10K+",
      label: "Active Users",
      icon: <Users className="h-6 w-6 text-yellow-600" />,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-destructive/10 text-destructive border-0 py-1.5 px-3">
            Success Stories
          </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-4">
            JUST WALL OF LOVE 💖
            </h2>
          <p className="text-lg text-neutral-gray max-w-2xl mx-auto">
            Hear from course creators, researchers, bootcamp leads, and self-learners who've transformed how they teach and learn.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {testimonials.map((t, idx) => (
            <Card
              key={idx}
              className={`bg-white rounded-xl shadow-md border border-${t.color}/20 p-6 hover:shadow-lg transition-all duration-300 relative h-full`}
            >
              {/* Accent bar */}
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-${t.color}/50`}
              />
              {/* Stars */}
              <div className="flex mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 text-${t.color} fill-${t.color}`}
                  />
                ))}
              </div>
              {/* Quote */}
              <p className="text-dark-gray mb-6 italic">"{t.quote}"</p>
              {/* Author */}
              <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                <div
                  className={`w-10 h-10 rounded-full bg-${t.color}/20 flex items-center justify-center text-${t.color} font-bold mr-3`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-dark-gray">{t.name}</div>
                  <div className="text-sm text-neutral-gray">{t.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
                {s.icon}
              </div>
              <div className="text-3xl font-bold text-dark-gray mb-1">
                {s.value}
              </div>
              <div className="text-sm text-neutral-gray">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
