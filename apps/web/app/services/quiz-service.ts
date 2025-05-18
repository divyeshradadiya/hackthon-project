export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface QuizResult {
  score: number;
  totalPoints: number;
  timeSpent: number;
  correctAnswers: number;
  totalQuestions: number;
}

export const quizService = {  generateQuiz: async (topic: string, difficulty: 'easy' | 'medium' | 'hard'): Promise<QuizQuestion[]> => {
    try {
      const response = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, difficulty }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate quiz');
      }

      const data = await response.json();
      return data.questions;
    } catch (error) {
      console.error('Error generating quiz:', error);
      throw error;
    }
  },

  calculateResult: (questions: QuizQuestion[], answers: number[], timeSpent: number): QuizResult => {
    let score = 0;
    let totalPoints = 0;
    let correctAnswers = 0;

    questions.forEach((question, index) => {
      totalPoints += question.points;
      if (answers[index] === question.correctAnswer) {
        score += question.points;
        correctAnswers++;
      }
    });

    return {
      score,
      totalPoints,
      timeSpent,
      correctAnswers,
      totalQuestions: questions.length,
    };
  },
};