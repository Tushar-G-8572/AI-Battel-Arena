import React from 'react';
import SolutionCard from './SolutionCard';
import JudgeVerdict from '../pages/JudgeVerdict';

const Result = ({ aiResponse }) => {
  if (!aiResponse) return null;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SolutionCard
          title="Solution 1"
          content={aiResponse.solution_1}
          score={aiResponse.judge?.solution_1_score}
          reasoning={aiResponse.judge?.solution_1_reasoning}
        />
        <SolutionCard
          title="Solution 2"
          content={aiResponse.solution_2}
          score={aiResponse.judge?.solution_2_score}
          reasoning={aiResponse.judge?.solution_2_reasoning}
        />
      </div>

      {/* Judge Verdict */}
      {aiResponse.judge && (
        <JudgeVerdict judge={aiResponse.judge} problem={aiResponse.problem} />
      )}
    </>
  );
}

export default Result;