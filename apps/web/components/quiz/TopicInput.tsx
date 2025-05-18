import { useQuizStore } from "@/store/quiz-store";

export const TopicInput = () => {
  const { topic, difficulty, loading, setTopic, setDifficulty, generateQuiz } = useQuizStore();

  return (
    <div className="mt-8 max-w-xl mx-auto space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter your topic (e.g., 'Basic Algebra', 'World War II')"
          className="flex-1 p-4 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          onKeyDown={(e) => e.key === 'Enter' && generateQuiz()}
        />
        <button
          onClick={() => generateQuiz()}
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
  );
};
