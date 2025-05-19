import Image from "next/image";
import { Timeline } from "@/components/ui/timeline";
import React from "react";

export function HowItWorks() {
  const steps = [
    {
      title: "Module Generation",
      imageSrc: "/images/step-generate-large.png",
      description:
        "Enter a prompt and choose a template. AI immediately spins up a full markdown module complete with sections, examples, and exercises.",
    },
    {
      title: "Markdown Editor",
      imageSrc: "/images/step-edit-large.png",
      description:
        "Use our built-in editor to tweak any section, re-order content, or insert your own examples and commentary.",
    },
    {
      title: "Quiz Builder",
      imageSrc: "/images/step-quiz-large.png",
      description:
        "Auto-generate quizzes from your module or craft custom questions to reinforce every key concept.",
    },
    {
      title: "Track Progress",
      imageSrc: "/images/step-track-large.png",
      description:
        "View completion rates, quiz scores, and learner analytics in real time on your dashboard.",
    },
  ];

  const timelineData = steps.map(({ title, imageSrc, description }) => ({
    title,
    content: (
      <div className="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          width={600}
          height={360}
          className="w-full h-auto object-cover"
        />
        <div className="p-6 text-center">
          <h4 className="text-2xl font-semibold mb-2">{title}</h4>
          <p className="text-neutral-gray">{description}</p>
        </div>
      </div>
    ),
  }));

  return (
    <section id="how-it-works" className="py-20 bg-gray-50 w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="w-full mx-auto">
          <Timeline data={timelineData} />
        </div>
      </div>
    </section>
  );
}
