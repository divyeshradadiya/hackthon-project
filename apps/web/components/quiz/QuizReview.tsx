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
          className="p-6 bg-white/50 dark:bg-[#111113] rounded-lg shadow border border-gray-200 dark:border-gray-800"
        >
          <h3 className="text-lg font-medium text-dark-gray dark:text-[#ECECEC] mb-4">
            Question {index + 1}: {question.question}
          </h3>
          <div className="space-y-2">
            {question.options.map((option, optionIndex) => (
              <div 
                key={optionIndex}
                className={`p-3 rounded-lg border-2 ${
                  question.correctAnswer === optionIndex
                    ? 'border-green-500 dark:border-green-500/80 bg-green-50 dark:bg-green-500/10'
                    : userAnswers[index] === optionIndex
                    ? 'border-red-500 dark:border-red-500/80 bg-red-50 dark:bg-red-500/10'
                    : 'border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-[#111113]'
                }`}
              >
                <p className="text-dark-gray dark:text-[#ECECEC] flex items-center gap-2">
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
        </div>
      ))}
    </div>
  );
};
