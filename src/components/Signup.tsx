import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; // Updated import
import toast, { Toaster } from "react-hot-toast";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Password Validation
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    setIsLoading(true);

    try {
      // 2. Supabase Signup
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          // This stores the username in the user's profile metadata
          data: {
            username: formData.username,
          },
        },
      });

      if (error) throw error;

      // 3. Success Handling
      // Note: By default, Supabase sends a confirmation email.
      toast.success("Signup successful! Please check your email to confirm.");
      navigate("/login");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 md:p-6">
      <Toaster position="top-center" />

      <div className="flex w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl transition-all flex-row-reverse">
        {/* Signup Form Section */}
        <div className="w-full px-6 py-10 sm:px-10 md:w-1/2 lg:px-14 flex flex-col justify-center">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-indigo-600 tracking-tight">
              Join Rants.
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Join our community of writers today.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Username
              </label>
              <input
                name="username"
                type="text"
                required
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
                placeholder="johndoe"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Confirm
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-start py-2">
              <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <span className="ml-2 text-xs text-gray-600">
                I agree to the{" "}
                <a
                  href="#"
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full rounded-xl bg-indigo-600 px-4 py-4 font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-95 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-bold text-indigo-600 hover:underline"
            >
              Log In
            </button>
          </p>
        </div>

        {/* Visual Branding Section */}
        <div className="hidden bg-indigo-600 md:flex md:w-1/2 flex-col justify-center p-12 text-white relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>

          <div className="relative z-10 space-y-6">
            <h3 className="text-4xl font-black leading-tight">
              Your voice matters.
            </h3>
            <p className="text-lg text-indigo-100 italic">
              "The best way to predict the future is to write it."
            </p>

            <div className="space-y-4 pt-6">
              {[
                "Unlimited blog posts",
                "Community feedback",
                "Analytics dashboard",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 text-indigo-100"
                >
                  <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 h-1.5 w-16 bg-white rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
