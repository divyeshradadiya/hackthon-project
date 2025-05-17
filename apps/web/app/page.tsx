import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import { UserButton, SignInButton } from "@clerk/nextjs";
// import { useUser } from '@clerk/clerk-react';

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  const isSignedIn = true;

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 bg-blue-300 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to Learning AI
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Transform your PDFs into interactive learning experiences
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href="/upload"
            className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Upload PDF
              </h2>
            </div>
            <p className="mt-4 text-gray-600">
              Upload your document to start the learning journey
            </p>
          </a>

          <a
            href="/quiz"
            className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Take Quiz</h2>
            </div>
            <p className="mt-4 text-gray-600">
              Test your knowledge with AI-generated quizzes
            </p>
          </a>

          <a
            href="/learn"
            className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Learning Plan
              </h2>
            </div>
            <p className="mt-4 text-gray-600">
              Follow your personalized learning journey
            </p>
          </a>
        </div>

        <div className="mt-12 text-center">
          {!isSignedIn ? (
            <SignInButton mode="modal">
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Sign in to get started
              </button>
            </SignInButton>
          ) : (
            <div className="inline-flex items-center space-x-4">
              <span className="text-gray-600">Manage your account</span>
              <UserButton afterSignOutUrl="/" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
