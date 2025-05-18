"use client";

import { QuizView } from "../../components/QuizView";
import { useState, useEffect } from "react";
import { quizService, type QuizQuestion, type QuizResult } from "../../services/quiz-service";

export default function QuizPage() {
  const [quizType, setQuizType] = useState<"module" | "topic" | null>(null);
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizStarted) {
      timer = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted]);

  const handleQuizSubmit = (answers: number[]) => {
    setQuizStarted(false);
    const result = quizService.calculateResult(questions, answers, timeSpent);
    setQuizResult(result);
  };

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };

  const handleStartQuiz = async () => {
    try {
      setLoading(true);
      const generatedQuestions = await quizService.generateQuiz(topic, difficulty);
      setQuestions(generatedQuestions);
      setShowInstructions(true);
      setLoading(false);
    } catch (error) {
      console.error('Error generating quiz:', error);
      setLoading(false);
    }
  };

  const handleRetry = async () => {
    setTimeSpent(0);
    setQuizResult(null);
    setQuizStarted(true);
  };

  const handleBeginQuiz = () => {
    setShowInstructions(false);
    setQuizStarted(true);
    setTimeSpent(0);
    setQuizResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!quizStarted && (
          <>
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                Test Your Knowledge
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Choose how you want to create your quiz
              </p>

              {/* Quiz Type Selection */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-2xl mx-auto">
                <button
                  onClick={() => setQuizType("module")}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    quizType === "module"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/50"
                      : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                  }`}
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Create Quiz from Module
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Generate questions from your existing modules
                  </p>
                </button>

                <button
                  onClick={() => setQuizType("topic")}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    quizType === "topic"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/50"
                      : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                  }`}
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Create Quiz from Topic
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Generate questions from any topic
                  </p>
                </button>
              </div>

              {/* Topic Input and Difficulty Selection */}
              {quizType === "topic" && (
                <div className="mt-8 max-w-xl mx-auto space-y-4">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={topic}
                      onChange={handleTopicChange}
                      placeholder="Enter your topic (e.g., 'Basic Algebra', 'World War II')"
                      className="flex-1 p-4 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      onKeyDown={(e) => e.key === 'Enter' && handleStartQuiz()}
                    />
                    <button
                      onClick={handleStartQuiz}
                      disabled={!topic || loading}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    >
                      {loading ? 'Generating...' : 'Generate Quiz'}
                    </button>
                  </div>
                  
                  <div className="flex justify-center gap-4">
                    {(['easy', 'medium', 'hard'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setDifficulty(level)}
                        className={`px-6 py-2 rounded-lg capitalize ${
                          difficulty === level
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            {showInstructions && !quizStarted && (
              <div className="mt-8 max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Quiz Instructions</h2>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                  <li>• You will have unlimited time to complete the quiz</li>
                  <li>• Each question has different points based on difficulty</li>
                  <li>• You cannot go back to previous questions</li>
                  <li>• Your final score will be shown at the end</li>
                </ul>
                <button
                  onClick={handleBeginQuiz}
                  className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
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
              <span className="text-gray-600 dark:text-gray-400">
                Time: {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <QuizView questions={questions} onSubmit={handleQuizSubmit} />
          </div>
        )}

        {/* Results */}
        {quizResult && !quizStarted && (
          <div className="mt-8 max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Quiz Results</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>Score: {quizResult.score} / {quizResult.totalPoints} points</p>
              <p>Correct Answers: {quizResult.correctAnswers} / {quizResult.totalQuestions}</p>
              <p>Time Spent: {Math.floor(quizResult.timeSpent / 60)}:{(quizResult.timeSpent % 60).toString().padStart(2, '0')}</p>
            </div>
            <div className="mt-6 space-y-3">
              <button
                onClick={handleRetry}
                className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Retry Quiz
              </button>
              <button
                onClick={() => {
                  setQuizResult(null);
                  setQuestions([]);
                  setTopic('');
                  setQuizType(null);
                }}
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Start New Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
