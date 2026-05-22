const Button = ({
  children, onClick, type = "button", variant = "primary",
  loading = false, disabled = false, className = "", id,
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold text-xs sm:text-sm rounded-md transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white px-4 py-2.5 sm:px-5 sm:py-2.5 w-full",
    ghost:
      "bg-transparent border border-[#2b4680] hover:border-[#5b74b1] text-[#adc6ff] px-4 py-2 sm:px-5 sm:py-2.5",
    danger:
      "bg-[#7f2927] hover:bg-[#991b1b] text-[#ff9993] px-4 py-2.5 sm:px-5 sm:py-2.5 w-full",
  };

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <>
          <svg className="animate-spin w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
          <span>{typeof loading === "string" ? loading : "Loading..."}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;