"use client";

import React, { useState } from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizViewProps {
  questions: Question[];
  onSubmit: (answers: number[]) => void;
}

export function QuizView({ questions, onSubmit }: QuizViewProps) {
  const [answers, setAnswers] = useState<number[]>(
    new Array(questions.length).fill(-1),
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (answers.every((answer) => answer !== -1)) {
      onSubmit(answers);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-dark-gray dark:text-[#ECECEC]">
            Quiz
          </h2>
          <span className="text-sm text-neutral-gray dark:text-gray-400">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full">
          <div
            className="h-full bg-primary dark:bg-primary/80 rounded-full transition-all duration-300"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="space-y-8">
        {questions.map((question, qIndex) => (
          <div
            key={question.id}
            className={qIndex === currentQuestion ? "block" : "hidden"}
          >
            <h3 className="text-xl font-medium mb-4 text-dark-gray dark:text-[#ECECEC]">
              {question.question}
            </h3>
            <div className="space-y-3">
              {question.options.map((option, oIndex) => (
                <button
                  key={oIndex}
                  onClick={() => handleAnswer(qIndex, oIndex)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all
                    ${
                      answers[qIndex] === oIndex
                        ? "border-primary dark:border-primary/80 bg-primary/20 dark:bg-primary/10"
                        : "border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary/80 bg-white/50 dark:bg-[#111113]"
                    } text-dark-gray dark:text-[#ECECEC]`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
          className="px-6 py-2 rounded-md bg-white/50 dark:bg-[#111113] border border-gray-200 dark:border-gray-800 text-dark-gray dark:text-[#ECECEC] hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {currentQuestion < questions.length - 1 ? (
          <button
            onClick={() =>
              setCurrentQuestion((prev) =>
                Math.min(questions.length - 1, prev + 1),
              )
            }
            className="px-6 py-2 rounded-md bg-primary dark:bg-primary/80 text-white hover:bg-primary/90 dark:hover:bg-primary/70"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={answers.some((answer) => answer === -1)}
            className="px-6 py-2 rounded-md bg-primary dark:bg-primary/80 text-white hover:bg-primary/90 dark:hover:bg-primary/70 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
