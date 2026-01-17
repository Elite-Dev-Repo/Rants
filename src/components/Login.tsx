import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", formData);
    // Add your authentication logic here
    try {
      const response = await api.post("/blogapi/token/", formData);
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl m-4">
        {/* Left Side: Login Form */}
        <div className="w-full px-8 py-12 md:w-1/2 lg:px-12">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="mt-2 text-gray-500">
              Please enter your details to sign in.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors"
            >
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-bold text-blue-600 hover:underline"
            >
              Sign up for free
            </a>
          </p>
        </div>

        {/* Right Side: Visual Branding (Hidden on Mobile) */}
        <div className="hidden bg-blue-600 md:flex md:w-1/2 flex-col justify-center p-12 text-white">
          <h3 className="text-4xl font-bold leading-tight">
            Insightful Reads Start Here.
          </h3>
          <p className="mt-4 text-lg text-blue-100">
            Join our community of 10,000+ writers and readers sharing their
            stories every day.
          </p>
          <div className="mt-8 h-1 w-20 bg-white/30 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
