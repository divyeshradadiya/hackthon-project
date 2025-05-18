import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface ProgressStats {
    completedModules: number;
    completedCourses: number;
    coursesPlayed: number;
    avgCourseCompletion: number;
}

export const useUserProgress = () =>
    useQuery<ProgressStats>({
        queryKey: ['userProgress'],
        queryFn: async () => {
            const { data } = await axios.get('/api/course/progress');
            return data;
        },
    });
