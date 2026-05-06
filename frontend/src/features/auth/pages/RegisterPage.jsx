import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../shared/components/InputField";
import GoogleAuth from "../components/GoogleAuth";
import Button from "../../shared/components/Button";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../shared/components/Loader";

const RegisterPage = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const error = useSelector(state=> state.auth.error);
  const loading = useSelector(state => state.auth.loading);
  const user = useSelector(state => state.auth.user);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters.")
      return
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.")
      return
    }
    
    const success = await handleRegister(form.username,form.email,form.password);
    if(success) {
      toast.success("Verify Your Email");
      navigate('/login');
    }else{
      toast.error("Error in Registering")
    }
  };

  if(loading){
    return (
      <Loader />
    )
  }



  if(!loading && user){
    navigate('/')
  }

  return (
  <div className="min-h-screen bg-[#060e20] flex items-center justify-center px-4 py-8 sm:py-12">
    <div className="w-full max-w-xs sm:max-w-sm">
      {/* Logo */}
      <div className="text-center mb-4 sm:mb-6">
        <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#00225a] rounded-xl mb-2 sm:mb-3">
          <svg
            width="20" height="20"
            className="sm:w-6 sm:h-6"
            viewBox="0 0 24 24" fill="none"
            stroke="#adc6ff" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
            <path d="M13 19l6-6" />
            <path d="M2 2l20 20" />
            <path d="M20 2l-8.5 8.5" />
          </svg>
        </div>
        <h1 className="text-[#dee5ff] text-xl sm:text-2xl font-bold tracking-tight">
          AI Battle Arena
        </h1>
        <p className="text-[#91aaeb] text-xs sm:text-sm mt-1">Join the Battle</p>
      </div>

      {/* Card */}
      <div className="bg-[#06122d] rounded-2xl border border-[#2b4680]/30 p-5 sm:p-7">
        <h2 className="text-[#dee5ff] font-semibold text-sm sm:text-base mb-4 sm:mb-5">
          Create your account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <InputField id="register-username" label="Username" type="text"
            value={form.username} onChange={handleChange("username")}
            placeholder="commander_xyz" required autoComplete="username" />
          <InputField id="register-email" label="Email" type="email"
            value={form.email} onChange={handleChange("email")}
            placeholder="you@example.com" required autoComplete="email" />
          <InputField id="register-password" label="Password" type="password"
            value={form.password} onChange={handleChange("password")}
            placeholder="Min. 6 characters" required autoComplete="new-password" />
          <InputField id="register-confirm-password" label="Confirm Password" type="password"
            value={form.confirmPassword} onChange={handleChange("confirmPassword")}
            placeholder="••••••••" required autoComplete="new-password" />
          <Button id="register-submit-btn" type="submit"
            loading={loading ? "Creating account..." : false}
            className="mt-1 w-full text-sm sm:text-base py-2.5 sm:py-3">
            Create Account
          </Button>
        </form>

        <GoogleAuth />

        <p className="text-center text-[#91aaeb] text-xs mt-4 sm:mt-5">
          Already have an account?{" "}
          <Link to="/login"
            className="text-[#adc6ff] hover:text-[#dee5ff] font-medium transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  </div>
);
};


export default RegisterPage;
