import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../../auth/hooks/useAuth";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { resetAI } from "../../ai/ai.slice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleLogout } = useAuth();
  const user = useSelector(state => state.auth.user);

  const handleNewBattle = () => {
    dispatch(resetAI());
    navigate("/");
  };

  const handleSubmit = async () => {
    try {
      await handleLogout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[#2b4680]/30 bg-[#060e20]/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-12 sm:h-14 flex items-center justify-between gap-2">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer select-none flex-shrink-0"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="#adc6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
            <path d="M13 19l6-6" />
            <path d="M2 2l20 20" />
            <path d="M20 2l-8.5 8.5" />
          </svg>
          {/* Hide text on very small screens */}
          <span className="text-[#dee5ff] font-bold text-sm sm:text-base tracking-tight hidden xs:block sm:block">
            AI Battle Arena
          </span>
          {/* Show short name on tiny screens */}
          <span className="text-[#dee5ff] font-bold text-sm tracking-tight xs:hidden sm:hidden">
            Arena
          </span>
        </div>

        {/* Right side */}
        {user && (
          <div className="flex items-center gap-2 sm:gap-4">

            {/* New Battle — icon only on mobile, full button on sm+ */}
            <button
              onClick={handleNewBattle}
              className="cursor-pointer hover:bg-[#3079d2] px-2 py-1.5 sm:px-4 sm:py-2 rounded-md bg-[#004395] flex items-center justify-center text-[#adc6ff] text-xs font-semibold uppercase transition-colors duration-200"
              title="New Battle"
            >
              {/* Icon always visible */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="flex-shrink-0">
                <path d="M12 5v14M5 12h14" />
              </svg>
              {/* Label hidden on mobile */}
              <span className="hidden sm:inline ml-1.5">New Battle</span>
            </button>

            {/* Avatar + username */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#004395] flex items-center justify-center text-[#adc6ff] text-xs font-semibold uppercase flex-shrink-0">
                {(user.username || user.email || "U")[0]}
              </div>
              <span className="text-[#91aaeb] text-xs sm:text-sm hidden sm:block truncate max-w-[120px] lg:max-w-none">
                {user.username || user.email}
              </span>
            </div>

            {/* Logout */}
            <button
              id="logout-btn"
              onClick={handleSubmit}
              className="text-xs text-[#91aaeb] hover:text-[#dee5ff] border border-[#2b4680] hover:border-[#5b74b1] px-2 py-1 sm:px-3 sm:py-1.5 rounded transition-all duration-200 cursor-pointer flex-shrink-0"
            >
              <span className="hidden sm:inline">Logout</span>
              {/* Icon fallback on mobile */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="sm:hidden">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>

          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;