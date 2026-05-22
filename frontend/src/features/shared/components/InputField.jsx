const InputField = ({
  id, label, type = "text", value, onChange,
  placeholder, required = false, autoComplete,
}) => {
  return (
    <div className="flex flex-col gap-1 sm:gap-1.5">
      <label
        htmlFor={id}
        className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#91aaeb] font-medium"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="w-full bg-[#00000060] border border-[#2b4680]/50 focus:border-[#5b74b1] outline-none rounded-md px-3 py-2 sm:px-3.5 sm:py-2.5 text-[#dee5ff] text-xs sm:text-sm placeholder:text-[#5b74b1] transition-all duration-200 focus:bg-[#00000080]"
      />
    </div>
  );
};

export default InputField;