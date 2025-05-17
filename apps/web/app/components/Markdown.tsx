import Image from "next/image";
import Link from "next/link";
import React, { memo, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./CodeBlock";

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown remarkPlugins={remarkPlugins} components={components}>
      {children}
    </ReactMarkdown>
  );
};

export const Markdown = memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children,
);

const remarkPlugins = [remarkGfm];

const components: Partial<Components> = {
  //@ts-ignore
  code: ({ node, inline, className, children, ...props }) => {
    // Debugging: Log the inline prop and children
    // console.log("Inline code detected:", inline, "Content:", children);

    // Convert children to a string
    const content = String(children).replace(/\n$/, "");

    // Manually detect inline code
    const isInlineCode =
      inline || // Use the `inline` prop if available
      (content.trim().length > 0 && !content.includes("\n")); // Heuristic: Single-line content is likely inline code

    // Handle inline code (codespan)
    if (isInlineCode) {
      return (
        <span className="space-y-2 rounded-md bg-zinc-100 px-2 py-1 !text-[14px] font-medium text-zinc-800 dark:bg-white/10 dark:text-white whitespace-pre-wrap break-words">
          {content}
        </span>
      );
    }

    // Handle block code
    const match = /language-(\w+)/.exec(className || "");

    // Check if the language is "markdown"
    if (match && match[1] === "markdown") {
      // Render as normal Markdown
      return (
        <div className="not-prose w-full flex-shrink-0 overflow-x-auto !text-[14px]">
          <Markdown>{content}</Markdown>
        </div>
      );
    }

    // Default behavior for other code blocks
    return (
      <div className="not-prose my-4 w-full flex-shrink-0 overflow-x-auto">
        <CodeBlock lang={match ? match[1] : "plaintext"} code={content} />
      </div>
    );
  },
  img: function Img({ src, alt }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);

    if (!src) return null;

    const handleDownload = () => {
      fetch(src)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = alt || "image.png";
          link.click();
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => console.error("Error downloading the image:", error));
    };

    const toggleZoom = () => setIsZoomed(!isZoomed);

    return (
      <>
        <div className="relative my-6 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <div className="relative overflow-hidden">
            <Image
              src={src}
              alt={alt || "Image"}
              className={`h-auto w-full transition-all duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
              loading="lazy"
              layout="responsive"
              width={600}
              height={400}
              objectFit="contain"
              onLoad={() => setIsLoaded(true)}
              onClick={toggleZoom}
            />
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500"></div>
              </div>
            )}
          </div>

          {isLoaded && (
            <div className="flex flex-col border-t border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50 sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300 sm:mb-0">
                {alt && <span>{alt}</span>}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={toggleZoom}
                  className="inline-flex items-center rounded-md bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:ring-gray-600 dark:hover:bg-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1.5 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>View</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                  View
                </button>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center rounded-md bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 shadow-sm ring-1 ring-inset ring-blue-700/10 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-700/30 dark:hover:bg-blue-900/40"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1.5 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>Download</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download
                </button>
              </div>
            </div>
          )}
        </div>

        {isZoomed &&
          createPortal(
            <div
              className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/90 p-4"
              onClick={toggleZoom}
            >
              <div
                className="relative z-50 max-h-[90vh] max-w-[90vw] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={src}
                  alt={alt || "Image"}
                  className="z-50 h-auto max-h-[85vh] w-auto rounded-lg object-contain"
                  width={1200}
                  height={900}
                />
                <button
                  className="absolute right-2 top-2 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                  onClick={toggleZoom}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>Close</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>,
            document.body,
          )}
      </>
    );
  },
  // pre: ({ children }) => (
  //   <pre className="!text-[14px] rounded p-1 text-gray-800 shadow-inner">
  //     {children}
  //   </pre>
  // ),
  // Add table components
  p: ({ children }) => (
    <p className="p-1/2 m-0 !text-[14px] text-gray-800 dark:text-gray-200">
      {children}
    </p>
  ),
  table: ({ children }) => (
    <table className="w-full border-collapse">{children}</table>
  ),
  thead: ({ children }) => (
    <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="border border-gray-300 dark:border-gray-600 p-2">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-gray-300 dark:border-gray-600 p-2">
      {children}
    </td>
  ),
  ol: ({ node, children, ...props }) => {
    return (
      <ol
        className="ml-3 py-2 !text-[14px] text-gray-900 dark:text-gray-200"
        {...props}
      >
        {children}
      </ol>
    );
  },
  ul: ({ node, children, ...props }) => {
    return (
      <ul
        className="mb-0 ml-3 list-inside list-disc p-0 py-2 !text-[14px] text-gray-900 dark:text-gray-200"
        {...props}
      >
        {children}
      </ul>
    );
  },
  li: ({ node, children, ...props }) => {
    return (
      <li className="py-1 !text-[14px]" {...props}>
        {children}
      </li>
    );
  },
  strong: ({ node, children, ...props }) => {
    return (
      <span
        className="!text-[14px] font-semibold dark:text-gray-200"
        {...props}
      >
        {children}
      </span>
    );
  },
  a: ({ node, children, ...props }) => {
    return (
      // @ts-expect-error
      <Link
        className="text-blue-600 hover:underline dark:text-blue-400"
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        {children}
      </Link>
    );
  },
  h1: ({ node, children, ...props }) => {
    return (
      <h3
        className="mt-1 !text-[14px] font-semibold text-black dark:text-white"
        {...props}
      >
        {children}
      </h3>
    );
  },
  h2: ({ node, children, ...props }) => {
    return (
      <h3
        className="mt-1 !text-[14px] font-semibold text-black dark:text-white"
        {...props}
      >
        {children}
      </h3>
    );
  },
  h3: ({ node, children, ...props }) => {
    return (
      <h3
        className="mt-2 !text-[14px] font-semibold text-gray-800 dark:text-gray-200"
        {...props}
      >
        {children}
      </h3>
    );
  },
  h4: ({ node, children, ...props }) => {
    return (
      <h3
        className="!text-[14px] font-semibold text-gray-800 dark:text-gray-200"
        {...props}
      >
        {children}
      </h3>
    );
  },
  h5: ({ node, children, ...props }) => {
    return (
      <h3
        className="!text-[14px] text-base font-semibold text-gray-800 dark:text-gray-200"
        {...props}
      >
        {children}
      </h3>
    );
  },
  h6: ({ node, children, ...props }) => {
    return (
      <h3
        className="!text-[14px] text-sm font-semibold text-gray-800 dark:text-gray-200"
        {...props}
      >
        {children}
      </h3>
    );
  },
};