// Layer 2 - Component: Single AI solution card with score badge
import MarkdownRenderer from "./MarkdownRenderer";

const ScoreBadge = ({ score }) => {
  const getColor = () => {
    if (score >= 8) return "bg-[#1a3a1a] text-[#6ee7b7] border-[#065f46]/50";
    if (score >= 5) return "bg-[#1a2a3a] text-[#93c5fd] border-[#1e3a5f]/50";
    return "bg-[#3a1a1a] text-[#fca5a5] border-[#7f1d1d]/50";
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-bold ${getColor()}`}
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="none"
      >
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
      {score}/10
    </div>
  );
};

const SolutionCard = ({ title, content, score, reasoning, modelLabel }) => {
  return (
    <div className="flex flex-col bg-[#031d4b] rounded-xl border border-[#2b4680]/25 overflow-hidden h-full">
      {/* Card Header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#00225a]">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#2563eb]" />
          <span className="text-[#dee5ff] font-semibold text-sm">{title}</span>
          {modelLabel && (
            <span className="text-[10px] text-[#91aaeb] uppercase tracking-widest">
              · {modelLabel}
            </span>
          )}
        </div>
        {score !== undefined && score !== null && (
          <ScoreBadge score={score} />
        )}
      </div>

      {/* Solution Content */}
      <div className="flex-1 px-5 py-4 overflow-y-auto max-h-[420px] custom-scroll">
        {content ? (
          <MarkdownRenderer content={content} />
        ) : (
          <div className="flex items-center justify-center h-24 text-[#5b74b1] text-sm">
            Waiting for response...
          </div>
        )}
      </div>

      {/* Reasoning footer */}
      {reasoning && (
        <div className="px-5 py-3.5 bg-[#05183c] border-t border-[#2b4680]/20">
          <p className="text-[11px] uppercase tracking-widest text-[#91aaeb] mb-1.5 font-medium">
            Judge Reasoning
          </p>
          <p className="text-[#9e9da1] text-xs leading-relaxed">{reasoning}</p>
        </div>
      )}
    </div>
  );
};

export default SolutionCard;
