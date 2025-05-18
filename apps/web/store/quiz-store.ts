import { QuizQuestion, QuizResult, quizService } from '@/app/services/quiz-service';
import { create } from 'zustand';

interface QuizStore {
  quizType: "module" | "topic" | null;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: QuizQuestion[];
  loading: boolean;
  showInstructions: boolean;
  quizStarted: boolean;
  timeSpent: number;
  quizResult: QuizResult | null;
  userAnswers: number[];
  setQuizType: (type: "module" | "topic" | null) => void;
  setTopic: (topic: string) => void;
  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
  setUserAnswers: (answers: number[]) => void;
  generateQuiz: () => Promise<void>;
  startQuiz: () => void;
  submitQuiz: (answers: number[]) => void;
  resetQuiz: () => void;
  incrementTime: () => void;
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  quizType: null,
  topic: 'topic',
  difficulty: 'medium',
  questions: [],
  loading: false,
  showInstructions: false,
  quizStarted: false,
  timeSpent: 0,
  quizResult: null,
  userAnswers: [],
  
  setQuizType: (type) => set({ quizType: type }),
  setTopic: (topic) => set({ topic }),
  setDifficulty: (difficulty) => set({ difficulty }),
  setUserAnswers: (answers) => set({ userAnswers: answers }),
  
  generateQuiz: async () => {
    set({ loading: true });
    try {
      const questions = await quizService.generateQuiz(get().topic, get().difficulty);
      set({ questions, showInstructions: true, loading: false });
    } catch (error) {
      console.error('Error generating quiz:', error);
      set({ loading: false });
    }
  },
  
  startQuiz: () => set({ showInstructions: false, quizStarted: true, timeSpent: 0, quizResult: null }),
  
  submitQuiz: (answers) => {
    const result = quizService.calculateResult(get().questions, answers, get().timeSpent);
    set({ quizStarted: false, quizResult: result, userAnswers: answers });
  },
  
  resetQuiz: () => set({
    quizType: null,
    topic: '',
    questions: [],
    showInstructions: false,
    quizStarted: false,
    timeSpent: 0,
    quizResult: null,
    userAnswers: [],
  }),
  
  incrementTime: () => set((state) => ({ timeSpent: state.timeSpent + 1 })),
}));
