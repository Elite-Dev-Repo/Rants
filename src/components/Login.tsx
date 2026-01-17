import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; // Updated import
import toast, { Toaster } from "react-hot-toast";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "", // Changed 'username' to 'email' to match Supabase logic
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Supabase handles the session and tokens automatically
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      toast.success("Welcome back!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Invalid credentials. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 md:p-6">
      <Toaster position="top-center" />

      <div className="flex w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
        {/* Left Side: Login Form */}
        <div className="w-full px-6 py-10 sm:px-10 md:w-1/2 lg:px-14 flex flex-col justify-center">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-indigo-600 tracking-tight">
              Rants.
            </h2>
            <h3 className="text-xl font-bold text-gray-800 mt-6">
              Welcome Back
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Please enter your details to sign in.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                required
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-xs text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                Remember me
              </label>
              <a
                href="#"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full rounded-xl bg-indigo-600 px-4 py-4 font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-95 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="font-bold text-indigo-600 hover:underline"
            >
              Sign up for free
            </button>
          </p>
        </div>

        {/* Right Side: Visual Branding */}
        <div className="hidden bg-indigo-600 md:flex md:w-1/2 flex-col justify-center p-12 text-white relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>

          <div className="relative z-10">
            <h3 className="text-4xl font-black leading-tight">
              Insightful Reads Start Here.
            </h3>
            <p className="mt-6 text-lg text-indigo-100 leading-relaxed">
              Join our community of 10,000+ writers and readers sharing their
              stories every day.
            </p>
            <div className="mt-10 h-1.5 w-16 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
