import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ModuleProgress {
  moduleId: string;
  completed: boolean;
  lastAccessedAt: Date;
}

interface ProgressState {
  progress: Record<string, ModuleProgress>;
  setModuleProgress: (moduleId: string, completed: boolean) => void;
  getModuleProgress: (moduleId: string) => ModuleProgress | undefined;
  getCourseProgress: (moduleIds: string[]) => number;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: {},
      setModuleProgress: (moduleId, completed) => {
        set((state) => ({
          progress: {
            ...state.progress,
            [moduleId]: {
              moduleId,
              completed,
              lastAccessedAt: new Date(),
            },
          },
        }));
      },
      getModuleProgress: (moduleId) => {
        return get().progress[moduleId];
      },
      getCourseProgress: (moduleIds) => {
        const completedModules = moduleIds.filter(
          (id) => get().progress[id]?.completed
        ).length;
        return (completedModules / moduleIds.length) * 100;
      },
    }),
    {
      name: 'course-progress',
    }
  )
);
