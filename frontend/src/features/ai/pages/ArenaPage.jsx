import Navbar from "../../shared/components/Navbar";
import PromptInput from "../components/PromptInput";
import Result from "../components/Result";
import useAi from "../hooks/useAi";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import SideBar from "../components/SideBar";

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
  const loading = useSelector(state => state.ai.loading);
  const error = useSelector(state => state.ai.error);
  const aiResponse = useSelector(state => state.ai.aiResponse);
  const {handleSendProblemToAI,handleGetAllBattleProblems} = useAi();

  const handleBattle = async (inputMessage) => {
    await handleSendProblemToAI(inputMessage);
  };
  
  const prevLoadingRef = useRef(loading);

  useEffect(() => {
    if (prevLoadingRef.current && !loading) {
      if (aiResponse) {
        toast.success("Battle completed");
      }
    }
    prevLoadingRef.current = loading;
  }, [loading, aiResponse]);



  useEffect(()=>{
    handleGetAllBattleProblems()
  },[aiResponse])
  
  return (
    <div className="min-h-screen w-full bg-[#060e20] flex flex-col">
      <Navbar />
      <div className="flex w-full h-full flex-1 ">
      <SideBar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        {/* Page header */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h1 className="text-[#dee5ff] text-xl  font-bold tracking-tight">
              Battle Arena
            </h1>
            
          </div>
          <p className="text-[#91aaeb]  text-sm">
            Submit a prompt and watch two AI models fight it out — judged by a third AI.
          </p>
        </div>
        {/* <SideBar /> */}
        {/* Prompt input */}
        <PromptInput onSubmit={handleBattle}  loading={loading} />

        {/* Error banner */}
        {error && (
          <div
          id="arena-error"
          className="px-4 py-3 bg-[#7f2927]/30 border border-[#7f2927]/50 rounded-lg text-[#ff9993] text-sm"
          >
            {error}
          </div>
        )}



        {/* Problem statement & Solutions */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <SkeletonCard title="Solution 1" />
            <SkeletonCard title="Solution 2" />
          </div>
        ) : aiResponse ? (
          <div className="flex flex-col gap-6">
            <div className="bg-[#06122d] border border-[#2b4680]/30 rounded-xl px-5 py-3.5">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-[11px] uppercase tracking-widest text-[#91aaeb] font-medium">
                  Problem
                </p>
                <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 bg-[#00225a] text-[#5b74b1] rounded font-medium">
                  AI Battle Arena
                </span>
              </div>
              <p className="text-[#dee5ff] text-sm font-medium leading-relaxed">
                {aiResponse?.problem}
              </p>
            </div>
            
            <Result aiResponse={aiResponse} />
          </div>
        ) : (
          <EmptyState />
        )}
      </main>
      </div>
      
    </div>
  );
};

export default ArenaPage;
