"use client";

import { QuizView } from "../../components/QuizView";
import { useEffect } from "react";
import { QuizTypeSelection } from "@/components/quiz/QuizTypeSelection";
import { TopicInput } from "@/components/quiz/TopicInput";
import { QuizReview } from "@/components/quiz/QuizReview";
import { useQuizStore } from "@/store/quiz-store";

export default function QuizPage() {
  const {
    quizType,
    questions,
    showInstructions,
    quizStarted,
    timeSpent,
    quizResult,
    userAnswers,
    startQuiz,
    submitQuiz,
    resetQuiz,
    incrementTime,
  } = useQuizStore();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizStarted) {
      timer = setInterval(() => {
        incrementTime();
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, incrementTime]);

  useEffect(() => {
    if (!quizType) {
      useQuizStore.getState().setQuizType("topic");
    }
  }, [quizType]);

  const handleRetry = () => {
    startQuiz();
  };

  console.log("Quiz Result:", quizResult, "Quiz Started:", quizStarted);
  return (
    <div className="min-h-screen bg-white/50 dark:bg-[#111113] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!quizStarted && (
          <>
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-dark-gray dark:text-[#ECECEC] sm:text-4xl">
                Test Your Knowledge
              </h1>
              <p className="mt-4 text-lg text-neutral-gray dark:text-gray-400">
                Choose how you want to create your quiz
              </p>

              <div className="mt-8">
                <QuizTypeSelection />
              </div>

              {quizType === "topic" && <TopicInput />}
            </div>

            {/* Instructions */}
            {showInstructions && !quizStarted && (
              <div className="mt-8 max-w-2xl mx-auto p-6 bg-white/50 dark:bg-[#111113] rounded-lg shadow border border-gray-200 dark:border-gray-800">
                <h2 className="text-2xl font-bold mb-4 text-dark-gray dark:text-[#ECECEC]">
                  Quiz Instructions
                </h2>
                <ul className="space-y-2 text-neutral-gray dark:text-gray-400 mb-6">
                  <li>• You will have unlimited time to complete the quiz</li>
                  <li>
                    • Each question has different points based on difficulty
                  </li>
                  <li>• You cannot go back to previous questions</li>
                  <li>• Your final score will be shown at the end</li>
                </ul>
                <button
                  onClick={() => startQuiz()}
                  className="w-full py-3 bg-primary dark:bg-primary/80 text-white rounded-lg hover:bg-primary/90 dark:hover:bg-primary/70"
                >
                  Begin Quiz
                </button>
              </div>
            )}
          </>
        )}

        {/* Quiz */}
        {quizStarted && (
          <div className="mt-8">
            <div className="text-right mb-4">
              <span className="text-neutral-gray dark:text-gray-400">
                Time: {Math.floor(timeSpent / 60)}:
                {(timeSpent % 60).toString().padStart(2, "0")}
              </span>
            </div>
            <QuizView questions={questions} onSubmit={submitQuiz} />
          </div>
        )}

        {/* Results and Review */}
        {quizResult && !quizStarted && (
          <>
            <div className="mt-8 max-w-2xl mx-auto p-6 bg-white/50 dark:bg-[#111113] rounded-lg shadow border border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl font-bold mb-4 text-dark-gray dark:text-[#ECECEC]">
                Quiz Results
              </h2>
              <div className="space-y-4 text-neutral-gray dark:text-gray-400">
                <p>
                  Score: {quizResult.score} / {quizResult.totalPoints} points
                </p>
                <p>
                  Correct Answers: {quizResult.correctAnswers} /{" "}
                  {quizResult.totalQuestions}
                </p>
                <p>
                  Time Spent: {Math.floor(quizResult.timeSpent / 60)}:
                  {(quizResult.timeSpent % 60).toString().padStart(2, "0")}
                </p>
              </div>
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleRetry}
                  className="w-full py-3 bg-primary dark:bg-primary/80 text-white rounded-lg hover:bg-primary/90 dark:hover:bg-primary/70"
                >
                  Retry Quiz
                </button>
                <button
                  onClick={resetQuiz}
                  className="w-full py-3 bg-blue-500 dark:bg-blue-500/80 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-500/70"
                >
                  Start New Quiz
                </button>
              </div>
            </div>

            {/* Quiz Review Section */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-6 text-dark-gray dark:text-[#ECECEC] text-center">
                Review Your Answers
              </h3>
              <QuizReview questions={questions} userAnswers={userAnswers} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
