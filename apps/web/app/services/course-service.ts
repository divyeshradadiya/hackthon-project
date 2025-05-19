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

export type CourseSummary = Omit<Course, 'modules'> & {
  moduleCount: number;
};

export const useAllCourses = () =>
  useQuery<CourseSummary[], unknown>({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data } = await axios.get<CourseSummary[]>('/api/course/get-courses');
      return data;
    },
  });

export const useUpdateModuleProgress = () =>
  useMutation({
    mutationFn: ({ moduleId, completed }: { moduleId: string; completed: boolean }) =>
      axios.post(`/api/course/progress/${moduleId}`, { completed }).then(res => res.data),
  });

export const useModuleProgress = (moduleId: string) =>
  useQuery({
    queryKey: ['moduleProgress', moduleId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/course/progress/${moduleId}`);
      return data;
    },
    enabled: !!moduleId,
  });

export const useDeleteCourse = () =>
  useMutation({
    mutationFn: (courseId: string) =>
      axios.delete(`/api/course/delete-course?courseId=${courseId}`).then(res => res.data),
  });

export const useUpdateModuleContent = () =>
  useMutation({
    mutationFn: ({ moduleId, content }: { moduleId: string; content: string }) =>
      axios.post(`/api/course/update-module`, { moduleId, content }).then(res => res.data),
  });
