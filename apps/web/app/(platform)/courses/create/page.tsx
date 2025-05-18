'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateCourse } from '@/app/services/course-service';
import { FaRobot, FaPaperPlane, FaLightbulb } from 'react-icons/fa';

const examplePrompts = [
  'Python for Beginners',
  'Machine Learning Basics',
  'Web Development with React',
  'Data Structures & Algorithms',
  'Introduction to Databases',
];

const aiSteps = [
  'Course created',
  'Modules generated',
  'Lessons created',
  'Refining outline',
  'Categorizing content',
];

export default function CreateCoursePage() {
  const [topic, setTopic] = useState('');
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([]);
  const [botMessages, setBotMessages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const { mutate, isPending } = useCreateCourse();
  const router = useRouter();
  const progressRef = useRef<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, botMessages]);

  const startSimulation = () => {
    setBotMessages([]);
    setProgress(0);

    progressRef.current = window.setInterval(() => {
      setProgress(prev => {
        const next = Math.min(prev + 6, 90);
        if (next === 90 && progressRef.current !== null) {
          clearInterval(progressRef.current);
        }
        return next;
      });
    }, 2000);

    aiSteps.forEach((step, i) => {
      setTimeout(() => {
        setBotMessages(prev => [...prev, step]);
      }, 2000 * (i + 1));
    });
  };

  const handleSend = () => {
    const trimmed = topic.trim();
    if (!trimmed) return;

    setMessages(m => [...m, { from: 'user', text: trimmed }]);
    setTopic('');
    startSimulation();

    // call API
    mutate(trimmed, {
      onSuccess: data => router.push(`/courses/${data.courseId}`),
    });
  };

  const pickExample = (ex: string) => setTopic(ex);

  const isEmpty = messages.length === 0 && botMessages.length === 0;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center px-6 py-4 bg-white shadow">
        <FaRobot className="text-2xl text-green-600 mr-3" />
        <h1 className="text-xl font-semibold text-gray-800">Create New Course</h1>
      </header>

      {/* Main */}
      <main className={`flex-1 px-6 ${isEmpty ? 'flex flex-col justify-center items-center' : 'overflow-y-auto py-6'}`}>
        {isEmpty ? (
          <>
            {/* Welcome Message */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
              Hello! How can I help you today?
            </h2>
            {/* Centered Typing Box */}
            <div className="w-full max-w-md relative">
              <input
                type="text"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type your course topic…"
                className="w-full border border-gray-300 rounded-full px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                onClick={handleSend}
                disabled={isPending}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-green-600 hover:bg-green-700 disabled:opacity-50"
              >
                <FaPaperPlane className="text-white" />
              </button>
            </div>
            {/* Example Prompts Below */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {examplePrompts.map(ex => (
                <button
                  key={ex}
                  onClick={() => pickExample(ex)}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700"
                >
                  <FaLightbulb className="text-yellow-500" />
                  <span>{ex}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Progress Bar */}
            {botMessages.length > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
            {/* Chat Messages */}
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className="flex justify-end">
                  <div className="max-w-xs px-4 py-2 rounded-lg bg-green-600 text-white">
                    {msg.text}
                  </div>
                </div>
              ))}
              {botMessages.map((text, idx) => (
                <div key={`bot-${idx}`} className="flex justify-start">
                  <div className="max-w-xs px-4 py-2 rounded-lg bg-white text-gray-800 shadow">
                    {text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </>
        )}
      </main>

      {/* Footer Input & Examples (only when active) */}
      {!isEmpty && (
        <footer className="bg-white p-4 shadow-inner">
          <div className="flex items-center relative">
            <input
              type="text"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type your course topic…"
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={handleSend}
              disabled={isPending}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-green-600 hover:bg-green-700 disabled:opacity-50"
            >
              <FaPaperPlane className="text-white" />
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {examplePrompts.map(ex => (
              <button
                key={ex}
                onClick={() => pickExample(ex)}
                className="flex items-center space-x-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700"
              >
                <FaLightbulb className="text-yellow-500" />
                <span>{ex}</span>
              </button>
            ))}
          </div>
        </footer>
      )}
    </div>
  );
}
