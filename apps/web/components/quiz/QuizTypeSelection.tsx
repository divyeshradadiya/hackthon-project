import { useQuizStore } from "@/store/quiz-store";

export const QuizTypeSelection = () => {
  const { quizType, setQuizType } = useQuizStore();
  
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-2xl mx-auto">
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
  );
};
