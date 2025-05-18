import { QuizQuestion } from "@/app/services/quiz-service";

interface QuizReviewProps {
  questions: QuizQuestion[];
  userAnswers: number[];
}

export const QuizReview = ({ questions, userAnswers }: QuizReviewProps) => {
  return (
    <div className="space-y-8">
      {questions.map((question, index) => (
        <div 
          key={index}
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow"
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Question {index + 1}: {question.question}
          </h3>
          <div className="space-y-2">
            {question.options.map((option, optionIndex) => (
              <div 
                key={optionIndex}
                className={`p-3 rounded-lg ${
                  question.correctAnswer === optionIndex
                    ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500'
                    : userAnswers[index] === optionIndex
                    ? 'bg-red-100 dark:bg-red-900/30 border-2 border-red-500'
                    : 'bg-gray-50 dark:bg-gray-700'
                }`}
              >
                <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  {option}
                  {question.correctAnswer === optionIndex && (
                    <span className="text-green-600 dark:text-green-400 text-sm">
                      (Correct Answer)
                    </span>
                  )}
                  {userAnswers[index] === optionIndex && 
                   question.correctAnswer !== optionIndex && (
                    <span className="text-red-600 dark:text-red-400 text-sm">
                      (Your Answer)
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
          {/* {question.explanation && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Explanation:</strong> {question.explanation}
              </p>
            </div>
          )} */}
        </div>
      ))}
    </div>
  );
};
