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
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") handleSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="bg-[#06122d] border border-[#2b4680]/40 rounded-xl p-3 sm:p-4 focus-within:border-[#5b74b1] transition-all duration-200">
        <textarea
          id="battle-prompt-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your battle prompt..."
          rows={2}
          disabled={loading}
          className="w-full bg-transparent outline-none resize-none text-[#dee5ff] text-sm placeholder:text-[#5b74b1] leading-relaxed disabled:opacity-60 sm:rows-3"
          style={{ minHeight: '56px' }}
        />
        <div className="flex items-center justify-between mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-[#2b4680]/20 gap-2">
          <span className="text-[10px] sm:text-[11px] text-[#5b74b1] hidden xs:block sm:block">
            {prompt.length > 0
              ? `${prompt.length} chars · Ctrl+Enter`
              : "Two AI models will compete"}
          </span>
          <Button
            id="start-battle-btn"
            type="submit"
            loading={loading ? "Battling..." : false}
            disabled={!prompt.trim()}
            className="!w-auto px-4 sm:px-6 ml-auto"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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