// Layer 1 - Page: Arena — the main battle page
import { useState } from "react";
import { battleService } from "../service/battleService";
import Navbar from "../../shared/components/Navbar";
import PromptInput from "../components/PromptInput";
import SolutionCard from "../components/SolutionCard";
import JudgeVerdict from "./JudgeVerdict";

// ─── Dummy Data ───────────────────────────────────────────────────────────────
const DUMMY_RESULT = {
  problem: "Write a program to find the factorial of a number.",
  solution_1: `## Python Solution — Recursive Approach

Here's a clean recursive implementation of factorial in Python:

\`\`\`python
def factorial(n: int) -> int:
    """
    Calculate the factorial of a non-negative integer.
    
    Args:
        n: A non-negative integer
        
    Returns:
        The factorial of n (n!)
        
    Raises:
        ValueError: If n is negative
    """
    if n < 0:
        raise ValueError("Factorial is not defined for negative numbers")
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)


# ── Also includes an iterative version for large numbers ──
def factorial_iterative(n: int) -> int:
    if n < 0:
        raise ValueError("Factorial is not defined for negative numbers")
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result


# Test cases
if __name__ == "__main__":
    test_cases = [0, 1, 5, 10, 15]
    for num in test_cases:
        print(f"factorial({num}) = {factorial(num)}")
\`\`\`

### Output
| Input | Result |
|-------|--------|
| 0     | 1      |
| 1     | 1      |
| 5     | 120    |
| 10    | 3628800 |
| 15    | 1307674368000 |

### Key Points
- Handles **edge cases** (0, 1, negative numbers)
- Includes both **recursive** and **iterative** implementations
- Uses **type hints** and **docstrings** for clarity
- Raises \`ValueError\` for invalid inputs
`,
  solution_2: `## JavaScript Solution — Multiple Approaches

Here's a comprehensive JavaScript implementation covering multiple patterns:

\`\`\`javascript
/**
 * Factorial using recursion
 * @param {number} n - Non-negative integer
 * @returns {number} n!
 */
function factorialRecursive(n) {
  if (n < 0) throw new Error("Factorial undefined for negatives");
  if (n === 0 || n === 1) return 1;
  return n * factorialRecursive(n - 1);
}

/**
 * Factorial using a while loop
 */
function factorialIterative(n) {
  if (n < 0) throw new Error("Factorial undefined for negatives");
  let result = 1;
  while (n > 1) {
    result *= n--;
  }
  return result;
}

/**
 * Factorial using Array.reduce (functional style)
 */
const factorialFunctional = (n) =>
  n <= 1 ? 1 : Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a * b, 1);

// Run tests
const tests = [0, 1, 5, 10];
tests.forEach((n) => {
  console.log(\`factorial(\${n}) = \${factorialRecursive(n)}\`);
});
\`\`\`

### Bonus: Memoized Version

\`\`\`javascript
const memo = {};
function factorialMemo(n) {
  if (n in memo) return memo[n];
  if (n <= 1) return 1;
  return (memo[n] = n * factorialMemo(n - 1));
}
\`\`\`

### Summary
- ✅ Recursive approach with base case
- ✅ Iterative with \`while\` loop
- ✅ Functional style using \`Array.reduce\`
- ✅ **Memoized** version for repeated calls
`,
  judge: {
    solution_1_score: 9,
    solution_2_score: 7,
    solution_1_reasoning:
      "Excellent solution with clear type hints, docstrings, both recursive and iterative approaches, and a nicely formatted output table. Error handling is robust. Slight deduction as it doesn't include a memoized version for large inputs.",
    solution_2_reasoning:
      "Good coverage of multiple patterns including a memoized version and functional style. However, the explanations are less structured compared to Solution 1, and type safety is absent without TypeScript. Still a solid, practical implementation.",
  },
};
// ─────────────────────────────────────────────────────────────────────────────

// Loading skeleton card
const SkeletonCard = ({ title }) => (
  <div className="flex flex-col bg-[#031d4b] rounded-xl border border-[#2b4680]/25 overflow-hidden h-full animate-pulse">
    <div className="px-5 py-3.5 bg-[#00225a] flex items-center gap-2.5">
      <div className="w-2 h-2 rounded-full bg-[#2b4680]" />
      <div className="h-3 w-24 bg-[#2b4680] rounded" />
    </div>
    <div className="px-5 py-4 flex flex-col gap-3">
      <div className="h-3 bg-[#06122d] rounded w-full" />
      <div className="h-3 bg-[#06122d] rounded w-5/6" />
      <div className="h-3 bg-[#06122d] rounded w-4/6" />
      <div className="h-16 bg-[#000212] rounded mt-2" />
      <div className="h-3 bg-[#06122d] rounded w-full" />
      <div className="h-3 bg-[#06122d] rounded w-3/4" />
    </div>
  </div>
);

// Empty state (no battle yet)
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
    <div className="w-16 h-16 bg-[#00225a] rounded-2xl flex items-center justify-center">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#5b74b1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
        <path d="M13 19l6-6" />
        <path d="M2 2l20 20" />
        <path d="M20 2l-8.5 8.5" />
      </svg>
    </div>
    <div>
      <p className="text-[#dee5ff] font-semibold text-base">
        No battle yet
      </p>
      <p className="text-[#5b74b1] text-sm mt-1 max-w-xs">
        Enter a prompt above and press Start Battle to see two AI models compete live.
      </p>
    </div>
  </div>
);

const ArenaPage = () => {
  // const { token } = useAuth();
  const [result, setResult] = useState(DUMMY_RESULT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDummy, setIsDummy] = useState(true);
  const [currentProblem, setCurrentProblem] = useState("");

  const handleBattle = async (prompt) => {
    setError("");
    setLoading(true);
    setCurrentProblem(prompt);
    setResult(null);
    setIsDummy(false);

    try {
      const data = await battleService.startBattle(prompt, token);
      // Support both { response: {...} } and flat { problem, solution_1, ... }
      setResult(data.response || data);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060e20] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        {/* Page header */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h1 className="text-[#dee5ff] text-xl font-bold tracking-tight">
              Battle Arena
            </h1>
            {isDummy && (
              <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-[#00225a] text-[#91aaeb] rounded border border-[#2b4680]/50 font-medium">
                Demo
              </span>
            )}
          </div>
          <p className="text-[#91aaeb] text-sm">
            Submit a prompt and watch two AI models fight it out — judged by a third AI.
          </p>
        </div>

        {/* Prompt input */}
        <PromptInput onSubmit={handleBattle} loading={loading} />

        {/* Error banner */}
        {error && (
          <div
            id="arena-error"
            className="px-4 py-3 bg-[#7f2927]/30 border border-[#7f2927]/50 rounded-lg text-[#ff9993] text-sm"
          >
            {error}
          </div>
        )}

        {/* Demo info banner */}
        {isDummy && (
          <div className="flex items-start gap-3 px-4 py-3 bg-[#00225a]/40 border border-[#2b4680]/40 rounded-xl">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#91aaeb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-[#91aaeb] text-xs leading-relaxed">
              This is a <span className="text-[#adc6ff] font-semibold">demo result</span> showing how battles look. Enter your own prompt above and press <span className="text-[#adc6ff] font-semibold">Start Battle</span> to run a real competition.
            </p>
          </div>
        )}

        {/* Problem statement */}
        {(loading || result) && (
          <div className="bg-[#06122d] border border-[#2b4680]/30 rounded-xl px-5 py-3.5">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-[11px] uppercase tracking-widest text-[#91aaeb] font-medium">
                Problem
              </p>
              {isDummy && (
                <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 bg-[#00225a] text-[#5b74b1] rounded font-medium">
                  Demo
                </span>
              )}
            </div>
            <p className="text-[#dee5ff] text-sm font-medium leading-relaxed">
              {result?.problem || currentProblem}
            </p>
          </div>
        )}

        {/* Solutions grid */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <SkeletonCard title="Solution 1" />
            <SkeletonCard title="Solution 2" />
          </div>
        ) : result ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <SolutionCard
                title="Solution 1"
                content={result.solution_1}
                score={result.judge?.solution_1_score}
                reasoning={result.judge?.solution_1_reasoning}
              />
              <SolutionCard
                title="Solution 2"
                content={result.solution_2}
                score={result.judge?.solution_2_score}
                reasoning={result.judge?.solution_2_reasoning}
              />
            </div>

            {/* Judge Verdict */}
            {result.judge && (
              <JudgeVerdict judge={result.judge} problem={result.problem} />
            )}
          </>
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
};

export default ArenaPage;
