import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAi from '../hooks/useAi';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const problemStatement = useSelector((state) => state.ai.problemStatement);
  const { handleGetAllBattleProblems, handleGetBattleDetail } = useAi();

  useEffect(() => {
    handleGetAllBattleProblems();
  }, []);

  const handleBattleClick = async (battleId) => {
    await handleGetBattleDetail(battleId);
  };


  // Safe check if problemStatement is an array
  const problems = Array.isArray(problemStatement) ? problemStatement : [];

  return (
    <div
      className={`relative flex flex-col bg-[#06122d] transition-all duration-300 ease-in-out shrink-0  ${
        isOpen ? 'w-[260px] border-r border-[#2b4680]/30' : 'w-0 border-r-0'
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute top-4 z-50 flex items-center justify-center p-2 rounded-lg hover:bg-[#2b4680]/40 text-[#91aaeb] transition-all duration-300 ${
          isOpen
            ? 'right-3 bg-transparent'
            : '-right-14 bg-[#06122d] border border-[#2b4680]/30 shadow-md'
        }`}
        title={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <path d="M9 3v18" />
          {isOpen ? (
            <path d="m16 15-3-3 3-3" />
          ) : (
            <path d="m14 9 3 3-3 3" />
          )}
        </svg>
      </button>

      {/* Sidebar Content */}
      <div
        className={`flex flex-col h-full overflow-hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="p-4 pt-10 flex-1 overflow-y-auto">
          <h2 className="text-[11px] border-b-2 border-gray-800 uppercase tracking-widest text-[#91aaeb] font-medium mb-4 px-2">
            Recent Battles
          </h2>
          <div className="flex flex-col gap-1 w-[228px]">
            {problems.map((item, index) => (
              <button
                onClick={()=>{handleBattleClick(item._id)}}
                key={item._id || index}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-[#dee5ff] hover:bg-[#2b4680]/30 transition-colors flex items-center gap-3 group"
                title={item.problem}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#5b74b1] shrink-0 group-hover:text-[#91aaeb] transition-colors"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="truncate">{item.problem}</span>
              </button>
            ))}
            {problems.length === 0 && (
              <p className="text-sm text-[#5b74b1] px-2 italic">No battle history yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
