const JudgeVerdict = ({ judge }) => {
  if (!judge) return null;

  const { solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning } = judge;

  const winner =
    solution_1_score > solution_2_score ? "Solution 1"
    : solution_2_score > solution_1_score ? "Solution 2"
    : "Tie";

  const winnerColor =
    winner === "Solution 1" ? "text-[#6ee7b7]"
    : winner === "Solution 2" ? "text-[#93c5fd]"
    : "text-[#fbbf24]";

  return (
    <div className="bg-[#031d4b] rounded-xl border border-[#2b4680]/25 overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-[#00225a] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#adc6ff"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span className="text-[#dee5ff] font-semibold text-sm">Judge Verdict</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 text-sm flex-shrink-0">
          <span className="text-[#91aaeb] text-xs sm:text-sm">Winner:</span>
          <span className={`font-bold text-xs sm:text-sm ${winnerColor}`}>{winner}</span>
        </div>
      </div>

      {/* Score blocks — stack on mobile, side by side on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:divide-x divide-[#2b4680]/20 divide-y sm:divide-y-0">
        <ScoreBlock
          label="Solution 1"
          score={solution_1_score}
          reasoning={solution_1_reasoning}
          isWinner={solution_1_score > solution_2_score}
        />
        <ScoreBlock
          label="Solution 2"
          score={solution_2_score}
          reasoning={solution_2_reasoning}
          isWinner={solution_2_score > solution_1_score}
        />
      </div>
    </div>
  );
};

const ScoreBlock = ({ label, score, reasoning, isWinner }) => {
  const barWidth = `${(score / 10) * 100}%`;
  const barColor =
    score >= 8 ? "bg-[#059669]" : score >= 5 ? "bg-[#2563eb]" : "bg-[#dc2626]";

  return (
    <div className="px-4 sm:px-6 py-3 sm:py-4 flex flex-col gap-2 sm:gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isWinner && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="none">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
          )}
          <span className="text-[#91aaeb] text-xs uppercase tracking-widest font-medium">{label}</span>
        </div>
        <span className="text-[#dee5ff] font-bold text-base sm:text-lg">
          {score}<span className="text-[#5b74b1] text-xs sm:text-sm font-normal">/10</span>
        </span>
      </div>

      <div className="h-1.5 bg-[#000000] rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${barColor}`} style={{ width: barWidth }} />
      </div>

      {reasoning && (
        <p className="text-[#9e9da1] text-xs leading-relaxed">{reasoning}</p>
      )}
    </div>
  );
};

export default JudgeVerdict;