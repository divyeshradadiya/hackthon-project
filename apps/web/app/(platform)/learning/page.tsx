import { LearningPlan } from "../../components/LearningPlan";

// This would typically come from your API based on the PDF analysis
const sampleLearningPlan = {
  topic: "Introduction to Machine Learning",
  units: [
    {
      title: "Foundations of Machine Learning",
      description:
        "Learn the basic concepts and terminology of machine learning",
      estimatedTime: "2 hours",
      resources: [
        {
          type: "video" as const,
          title: "What is Machine Learning?",
          url: "https://example.com/video1",
        },
        {
          type: "article" as const,
          title: "Key Machine Learning Concepts",
          url: "https://example.com/article1",
        },
        {
          type: "exercise" as const,
          title: "Basic Terminology Quiz",
          url: "https://example.com/quiz1",
        },
      ],
    },
    // Add more units as needed
  ],
};

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Your Learning Journey
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Follow this personalized learning plan to master the content
          </p>
        </div>
        <LearningPlan
          topic={sampleLearningPlan.topic}
          units={sampleLearningPlan.units}
        />
      </div>
    </div>
  );
}
