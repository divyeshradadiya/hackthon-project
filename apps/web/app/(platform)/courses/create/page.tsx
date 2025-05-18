'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateCourse } from '@/app/services/course-service';
import { FaRobot, FaPaperPlane, FaLightbulb } from 'react-icons/fa';
import { Loader2 } from 'lucide-react';

const examplePrompts = [
  'Full-Stack Interview Preparation Guide with System Design',
  'Italian Cuisine Masterclass: From Basics to Advanced',
  'Complete AWS Services Documentation Simplified',
  'MERN Stack Development',
  'Learn about tailwindCSS',
  'Complete DevOps Pipeline Implementation',
  'Japanese Language: N5 to N1 Preparation',
  'Digital Marketing: SEO to Social Media Strategy'
];

// the simulated AI steps
const aiSteps = [
  // 'Course created',
  'Modules generated...',
  'Generating module content...',
  'Categorizing content...',
  'Finalizing course structure...',
];

export default function CreateCoursePage() {
  const [topic, setTopic] = useState('');
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([]);
  const [botMessages, setBotMessages] = useState<string[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const { mutate, isPending } = useCreateCourse();
  const router = useRouter();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, botMessages]);

  // recursively show one AI step at a time
  const showNextMessage = (index: number) => {
    if (index < aiSteps.length) {
      setTimeout(() => {
        if (typeof aiSteps[index] === 'string') {
          setBotMessages(prev => [...prev, aiSteps[index] as string]);
        }
        showNextMessage(index + 1);
      }, Math.random() * 1000 + 2000);
    } else {
      setBotMessages(prev => [
        ...prev,
        "✨ Course generation complete! Redirecting shortly..."
      ]);
      setIsThinking(false);
    }
  };

  const startSimulation = () => {
    setBotMessages([]);
    setIsThinking(true);
    showNextMessage(0);
  };

  const handleSend = () => {
    const trimmed = topic.trim();
    if (!trimmed) return;

    setMessages(m => [...m, { from: 'user', text: trimmed }]);
    setTopic('');
    setIsGenerating(true);
    startSimulation();

    mutate(trimmed, {
      onSuccess: data => {
        setIsRedirecting(true);
        setTimeout(() => {
          router.push(`/courses/${data.courseId}`);
        }, 2000);
      }
    });
  };

  const pickExample = (ex: string) => setTopic(ex);

  const isEmpty = messages.length === 0 && botMessages.length === 0;

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">

      <header className="flex flex-col gap-4 px-6 py-4 bg-white dark:bg-gray-800 shadow">
        <div className="flex items-center space-x-3">
          <FaRobot className="text-2xl text-green-600 dark:text-green-400" />
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Create New Course
          </h1>
        </div>

        {!isEmpty && (
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map(ex => (
              <button
                key={ex}
                onClick={() => pickExample(ex)}
                className="flex items-center space-x-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-sm text-gray-700 dark:text-gray-200"
              >
                <FaLightbulb className="text-yellow-500" />
                <span>{ex}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className={`flex-1 ${isEmpty ? 'flex flex-col justify-center items-center' : 'overflow-y-auto py-6'}`}>
        {!isGenerating ? (
          // Original empty state UI
          <div className="w-full max-w-xl space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                <span role="img" aria-label="waving hand" className="mr-2">👋</span>
                Hi! How can I help you today?
                </h2>
              {/* <p className="text-gray-600 dark:text-gray-400">
                Describe the course you want to create
              </p> */}
            </div>
            <div className="relative">
              <textarea
              value={topic}
              onChange={e => setTopic(e.target.value)}
              onKeyDown={e => e.ctrlKey && e.key === 'Enter' && handleSend()}
              placeholder="Type your course topic…"
              rows={3}
              className="w-full min-w-[400px] border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
              onClick={handleSend}
              className="absolute bottom-4 right-2 p-2 rounded-lg bg-green-600 hover:bg-green-700"
              >
              <FaPaperPlane className="text-white" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {examplePrompts.map(ex => (
                <button
                  key={ex}
                  onClick={() => pickExample(ex)}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-sm text-gray-700 dark:text-gray-200"
                >
                  <FaLightbulb className="text-yellow-500" />
                  <span>{ex}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Chat stream */}
            <div className="max-w-3xl mx-auto space-y-4 px-6">
              {/* Input field at top */}
              <div className="sticky top-0 bg-gray-50 dark:bg-gray-900 pb-4">
                <div className="relative">
                  <textarea
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    onKeyDown={e => e.ctrlKey && e.key === 'Enter' && handleSend()}
                    placeholder="Add more details or ask questions..."
                    rows={2}
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <button
                    onClick={handleSend}
                    disabled={isThinking || isPending}
                    className="absolute bottom-2 right-2 p-2 rounded-lg bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                  >
                    <FaPaperPlane className="text-white" />
                  </button>
                </div>
              </div>

              {messages.map((msg, i) => (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[80%] px-4 py-2 rounded-lg bg-green-600 dark:bg-green-500 text-white">
                    {msg.text}
                  </div>
                </div>
              ))}

              {botMessages.map((text, i) => (
                <div key={`b${i}`} className="flex justify-start">
                  <div className="max-w-[80%] px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow">
                    {text}
                  </div>
                </div>
              ))}

              {/* loader while thinking / redirecting */}
              {(isThinking || isPending) && (
                <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>
                    {isRedirecting
                      ? "Preparing to redirect..."
                      : "Generating course content..."}
                  </span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
