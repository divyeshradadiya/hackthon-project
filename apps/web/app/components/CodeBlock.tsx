import hljs from "highlight.js";
import { useEffect, useRef } from "react";

// import { Tooltip } from "@components/ui/tooltip";
import { Check, Copy } from "lucide-react";
import { Button } from "@repo/ui/button";
import { useClipboard } from "../hooks/use-clipboard";
import { fontIbemPlex } from "../lib/fonts";

export type codeBlockProps = {
  lang?: string;
  code?: string;
};

export const CodeBlock = ({ lang, code }: codeBlockProps) => {
  const ref = useRef<HTMLElement>(null);
  const { copiedText, copy, showCopied } = useClipboard();
  const safeLang = typeof lang === "string" ? lang : "plaintext";
  const language = hljs.getLanguage(safeLang) ? safeLang : "plaintext";

  useEffect(() => {
    if (ref?.current && code) {
      const highlightedCode = hljs.highlight(language, code).value;
      ref.current.innerHTML = highlightedCode;
    }
  }, [code, language]);

  return (
    <div className="not-prose w-full flex-shrink-0 overflow-hidden rounded-xl border border-gray-200 text-gray-800 dark:border-gray-700 dark:bg-[#111113] dark:text-gray-200">
      <div className="flex w-full items-center justify-between border-b border-gray-200 bg-gray-50 p-1 dark:border-gray-700 dark:bg-[#111113]">
        <p className="gap-1 px-2 text-xs text-gray-600 dark:text-gray-400">
          {language}
        </p>
        <Button
          className="gap-1 !text-xs"
          variant="gray"
          size="sm"
          onClick={() => {
            code && copy(code);
          }}
        >
          {showCopied ? (
            <Check size={14} strokeWidth="2" />
          ) : (
            <Copy size={14} strokeWidth="2" />
          )}{" "}
          Copy
        </Button>
      </div>
      <pre className="w-full p-[2px] pb-0 rounded-lg bg-gray-50 dark:bg-[#111113]">
        <code
          style={fontIbemPlex.style}
          className={`hljs language-${language} inline-block w-full overflow-x-auto whitespace-pre-wrap break-words pr-[100%] !text-[11px] tracking-wide lg:text-[12px]`}
          ref={ref}
        ></code>
      </pre>
    </div>
  );
};