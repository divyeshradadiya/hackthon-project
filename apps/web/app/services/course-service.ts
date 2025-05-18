'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type CourseModule = {
  id: string;
  title: string;
  description: string;
  content?: string;
  courseId: string;
};

export type Course = {
  courseId: string;
  title: string;
  learningInput?: string;
  createdAt?: string;
  modules: CourseModule[];
};

export const useCreateCourse = () =>
  useMutation({
    mutationFn: (learningInput: string) =>
      axios.post<Course>('/api/course/generate', { learningInput }).then(res => res.data),
  });

export const useCourse = (courseId: string) =>
  useQuery({
    queryKey: ['courseId', courseId],
    queryFn: async () => {
      const { data } = await axios.get<Course>(`/api/course/${courseId}`);
      return data;
    },
    enabled: !!courseId,
  });
