import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// Copy to clipboard button for code blocks
const CopyButton = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="text-[10px] text-[#91aaeb] hover:text-[#dee5ff] transition-colors cursor-pointer"
    >
      {isCopied ? "✓ Copied!" : "Copy"}
    </button>
  );
};

const MarkdownRenderer = ({ content }) => {
  return (
    <div className="max-w-none text-sm leading-relaxed text-[#dee5ff]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Code blocks
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            const codeString = String(children).replace(/\n$/, "");
            const isBlock = !inline && (match || codeString.includes("\n"));

            if (isBlock) {
              return (
                <div className="my-3 rounded-lg overflow-hidden border border-[#2b4680]/40">
                  {/* Language label bar */}
                  <div className="flex items-center justify-between px-4 py-1.5 bg-[#00225a]">
                    <span className="text-[10px] uppercase tracking-widest text-[#91aaeb] font-medium">
                      {language || "code"}
                    </span>
                    <CopyButton code={codeString} />
                  </div>
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={language || "text"}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      borderRadius: 0,
                      background: "#000212",
                      fontSize: "0.78rem",
                      padding: "1rem",
                      lineHeight: "1.6",
                    }}
                    {...props}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </div>
              );
            }

            // Inline code
            return (
              <code
                className="bg-[#00225a] text-[#adc6ff] px-1.5 py-0.5 rounded text-[0.78em] font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },

          h1: ({ children }) => (
            <h1 className="text-lg font-bold text-[#dee5ff] mt-4 mb-2 border-b border-[#2b4680]/30 pb-1">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base font-semibold text-[#dee5ff] mt-3 mb-1.5">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-semibold text-[#adc6ff] mt-2 mb-1">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-[#dee5ff] text-sm leading-relaxed mb-2 last:mb-0">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside text-[#dee5ff] space-y-1 mb-2 ml-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside text-[#dee5ff] space-y-1 mb-2 ml-2">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-sm text-[#dee5ff] leading-relaxed">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-[#2563eb] pl-3 my-2 text-[#91aaeb] italic">
              {children}
            </blockquote>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-[#adc6ff]">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-[#91aaeb]">{children}</em>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#adc6ff] underline underline-offset-2 hover:text-[#dee5ff] transition-colors"
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-3 rounded-lg border border-[#2b4680]/30">
              <table className="w-full text-sm border-collapse">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#00225a]">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 text-left text-xs uppercase tracking-wider font-semibold text-[#adc6ff] border-b border-[#2b4680]/30">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 text-[#dee5ff] border-b border-[#2b4680]/10">{children}</td>
          ),
          tr: ({ children }) => (
            <tr className="even:bg-[#05183c]/40">{children}</tr>
          ),
          hr: () => <hr className="border-[#2b4680]/30 my-3" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
