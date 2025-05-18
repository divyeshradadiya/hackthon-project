import Image from "next/image";
import Link from "next/link";
import React, { memo, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./CodeBlock";
import { ArrowUpRight, LinkIcon } from "lucide-react";

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
  console.log(children)
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
   
    return (
      <div className="relative w-full h-0 pb-[56.25%]">
        <Image
          src={src || ""}
          alt={alt || ""}
          fill
          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
        />
      </div>
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
    <table className="my-2 w-full !text-[14px] border-collapse">{children}</table>
  ),
  thead: ({ children }) => (
    <thead className="bg-gray-50 !text-[14px] dark:bg-gray-800">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="border !text-[14px] border-gray-300 dark:border-gray-600 p-2">
      {children}
    </th>
  ),
    // Custom link renderer for react-markdown
    a: ({ href, children, ...props }) => {
      if (href) {
        return (
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600"
            {...props}
          >
            <LinkIcon className="w-4 h-4" />
            {children}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        );
      }
      return <></>;
    },
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
  // a: ({ node, children, ...props }) => {
  //   return (
  //     // @ts-expect-error
  //     <Link
  //       className="text-blue-600 hover:underline dark:text-blue-400"
  //       target="_blank"
  //       rel="noreferrer"
  //       {...props}
  //     >
  //       {children}
  //     </Link>
  //   );
  // },
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
        className="mt-2 !text-[14px] font-semibold text-black dark:text-white"
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