import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../../auth/hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const {handleLogout} = useAuth();
  const user = useSelector(state => state.auth.user);
  const handleSubmit = async () => {
    await handleLogout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[#2b4680]/30 bg-[#060e20]/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5 select-none">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#adc6ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
            <path d="M13 19l6-6" />
            <path d="M2 2l20 20" />
            <path d="M20 2l-8.5 8.5" />
          </svg>
          <span className="text-[#dee5ff] font-bold text-base tracking-tight">
            AI Battle Arena
          </span>
        </div>

        {/* User info + logout */}
        {user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#004395] flex items-center justify-center text-[#adc6ff] text-xs font-semibold uppercase">
                {(user.username || user.email || "U")[0]}
              </div>
              <span className="text-[#91aaeb] text-sm hidden sm:block">
                {user.username || user.email}
              </span>
            </div>
            <button
              id="logout-btn"
              onClick={handleSubmit}
              className="text-xs text-[#91aaeb] hover:text-[#dee5ff] border border-[#2b4680] hover:border-[#5b74b1] px-3 py-1.5 rounded transition-all duration-200 cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
