"use client";

import { QuizView } from "../../components/QuizView";

// This would typically come from your API
const sampleQuestions = [
  {
    id: 1,
    question: "What is the main purpose of learning?",
    options: [
      "To pass tests",
      "To memorize facts",
      "To understand and apply knowledge",
      "To get good grades",
    ],
    correctAnswer: 2,
  },
  // Add more sample questions as needed
];

export default function QuizPage() {
  const handleQuizSubmit = (answers: number[]) => {
    // Handle quiz submission
    console.log("Quiz answers:", answers);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Test Your Knowledge
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Answer the questions below to assess your understanding
          </p>
        </div>
        <QuizView questions={sampleQuestions} onSubmit={handleQuizSubmit} />
      </div>
    </div>
  );
}
