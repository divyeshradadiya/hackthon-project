import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';
import { zodTextFormat } from 'openai/helpers/zod';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const CorrectAnswer = z.union([
  z.literal(0), z.literal(1), z.literal(2), z.literal(3),
]);

const QuizQuestionSchema = z.object({
  id: z.number(),
  question: z.string(),
  options: z.array(z.string()),
  correctAnswer: CorrectAnswer,
  points: z.number(),
});

const QuizArrayWrapperSchema = z.object({
  quiz_questions: z.array(QuizQuestionSchema),
});

export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;

export async function POST(request: Request) {
  try {
    const { topic, difficulty = 'medium' } = await request.json();
    const pointsMap = {
      easy: { base: 5, bonus: 5 },
      medium: { base: 10, bonus: 5 },
      hard: { base: 15, bonus: 10 },
    };
    const { base, bonus } = pointsMap[difficulty as keyof typeof pointsMap];

    const prompt = `
Generate quiz between 5 and 20 multiple choice quiz questions about "${topic}" at a ${difficulty} difficulty level.

Each question must include:
- id: number (starting from 1)
- question: string
- options: array of 4 strings
- correctAnswer: number (0–3)
- points: ${base} or ${base + bonus}

Return JSON like this:
{
  "quiz_questions": [
    {
      "id": 1,
      "question": "What is the capital of France?",
      "options": ["Paris", "London", "Rome", "Berlin"],
      "correctAnswer": 0,
      "points": ${base}
    },
    ...
  ]
}
`;

    const systemPrompt = `You are a professional quiz generator. Create well-structured, engaging multiple choice questions.`;

    const raw = await openai.responses.create({
      model: 'gpt-4o-mini',
      input: [
        { role: 'system', content: systemPrompt },
        { role: 'user',    content: prompt },
      ],
      text: { format: zodTextFormat(QuizArrayWrapperSchema, 'quiz_questions') },
    });

    const parsed = JSON.parse(raw.output_text);
    const { quiz_questions } = QuizArrayWrapperSchema.parse(parsed);
    return NextResponse.json({ questions: quiz_questions });
  } catch (err) {
    console.error('Quiz generation error:', err);
    return NextResponse.json(
      { error: 'Failed to generate quiz' },
      { status: 500 }
    );
  }
}
