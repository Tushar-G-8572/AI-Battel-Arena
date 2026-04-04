// Layer 2 - Component: Prompt input area with submit button
import { useState } from "react";
import Button from "../../shared/components/Button";

const PromptInput = ({ onSubmit, loading }) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;
    onSubmit(prompt.trim());
    setPrompt("");
  };

  const handleKeyDown = (e) => {
    // Ctrl+Enter or Cmd+Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="bg-[#06122d] border border-[#2b4680]/40 rounded-xl p-4 focus-within:border-[#5b74b1] transition-all duration-200">
        <textarea
          id="battle-prompt-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your battle prompt... (e.g. Write a program to find a factorial)"
          rows={3}
          disabled={loading}
          className="w-full bg-transparent outline-none resize-none text-[#dee5ff] text-sm placeholder:text-[#5b74b1] leading-relaxed disabled:opacity-60"
        />
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#2b4680]/20">
          <span className="text-[11px] text-[#5b74b1]">
            {prompt.length > 0
              ? `${prompt.length} chars · Press Ctrl+Enter to submit`
              : "Two AI models will compete on your prompt"}
          </span>
          <Button
            id="start-battle-btn"
            type="submit"
            loading={loading ? "Battling..." : false}
            disabled={!prompt.trim()}
            className="!w-auto px-6"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M2 2l20 20M20 2l-8.5 8.5" />
            </svg>
            Start Battle
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PromptInput;
