'use client';

interface LearningUnit {
  title: string;
  description: string;
  estimatedTime: string;
  resources: Array<{
    type: 'video' | 'article' | 'exercise';
    title: string;
    url?: string;
  }>;
}

interface LearningPlanProps {
  topic: string;
  units: LearningUnit[];
}

export function LearningPlan({ topic, units }: LearningPlanProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{topic}</h1>
        <p className="text-gray-600">Your personalized learning journey</p>
      </div>

      <div className="space-y-6">
        {units.map((unit, index) => (
          <div
            key={index}
            className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">{unit.title}</h3>
                <p className="text-gray-600">{unit.description}</p>
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap">
                {unit.estimatedTime}
              </span>
            </div>

            <div className="space-y-3">
              {unit.resources.map((resource, rIndex) => (
                <div
                  key={rIndex}
                  className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <div className="mr-4">
                    {resource.type === 'video' && (
                      <svg
                        className="w-6 h-6 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                    {resource.type === 'article' && (
                      <svg
                        className="w-6 h-6 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14"
                        />
                      </svg>
                    )}
                    {resource.type === 'exercise' && (
                      <svg
                        className="w-6 h-6 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{resource.title}</h4>
                    {resource.url && (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:text-blue-600"
                      >
                        Access Resource →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
