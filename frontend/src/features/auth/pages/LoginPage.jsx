// Layer 1 - Page: Login
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import InputField from "../../shared/components/InputField";
import Button from "../../shared/components/Button";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const user = useSelector(state => state.auth.user);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(form.email,form.password);
    navigate('/')
  };

  if(loading){
    return (
      <h1>Loading....</h1>
    )
  }

  if(!loading && user){
    navigate('/')
  }



  return (
    <div className="min-h-screen bg-[#060e20] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#00225a] rounded-xl mb-4">
            <svg
              width="24"
              height="24"
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
          </div>
          <h1 className="text-[#dee5ff] text-2xl font-bold tracking-tight">
            AI Battle Arena
          </h1>
          <p className="text-[#91aaeb] text-sm mt-1">Where AI Models Compete</p>
        </div>

        {/* Card */}
        <div className="bg-[#06122d] rounded-2xl border border-[#2b4680]/30 p-7">
          <h2 className="text-[#dee5ff] font-semibold text-base mb-5">
            Sign in to your account
          </h2>

          {/* Error Banner */}
          {error && (
            <div
              id="login-error"
              className="mb-4 px-4 py-2.5 bg-[#7f2927]/30 border border-[#7f2927]/50 rounded-lg text-[#ff9993] text-xs"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputField
              id="login-email"
              label="Email"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
            <InputField
              id="login-password"
              label="Password"
              type="password"
              value={form.password}
              onChange={handleChange("password")}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
            <Button
              id="login-submit-btn"
              type="submit"
              loading={loading ? "Signing in..." : false}
              className="mt-1"
            >
              Sign In
            </Button>
          </form>

          <p className="text-center text-[#91aaeb] text-xs mt-5">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#adc6ff] hover:text-[#dee5ff] font-medium transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
