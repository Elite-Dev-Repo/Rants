import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../api";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signing up with:", formData);
    // Add your authentication logic here
    // Filter out confirmPassword before sending
    const { confirmPassword, ...registerData } = formData;

    try {
      await api.post("/blogapi/user/register/", registerData);
      navigate("/login");
    } catch (error: any) {
      console.error("Signup error details:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.response?.config?.url,
        finalUrl: error.request?.responseURL,
      });

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // If data is HTML (like 404 page), truncate it for alert
        const data = error.response.data;
        const alertMsg =
          typeof data === "string" && data.startsWith("<!DOCTYPE")
            ? `Server returned HTML (likely 404 or 500). Check console.`
            : JSON.stringify(data);

        alert(alertMsg);
      } else if (error.request) {
        // The request was made but no response was received
        alert("No response received from server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        alert(`Error: ${error.message}`);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl m-4 flex-row-reverse">
        {/* Right Side: Signup Form */}
        <div className="w-full px-8 py-10 md:w-1/2 lg:px-12">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="mt-2 text-gray-500">
              Join our community of writers today.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                name="username"
                type="text"
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                placeholder="John Doe"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-indigo-600 underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-indigo-600 underline">
                  Privacy Policy
                </a>
                .
              </span>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-bold text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-colors shadow-lg shadow-indigo-200"
              onClick={function () {
                localStorage.clear();
                return <Navigate to="/login" />;
              }}
            >
              Sign Up
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-bold text-indigo-600 hover:underline"
            >
              Log In
            </a>
          </p>
        </div>

        {/* Left Side: Inspiration Panel (Hidden on Mobile) */}
        <div className="hidden bg-indigo-600 md:flex md:w-1/2 flex-col justify-center p-12 text-white">
          <div className="space-y-6">
            <h3 className="text-4xl font-bold leading-tight">
              Your voice matters.
            </h3>
            <p className="text-lg text-indigo-100 italic">
              "The best way to predict the future is to write it."
            </p>
            <ul className="space-y-3 pt-4">
              <li className="flex items-center text-indigo-100">
                <span className="mr-2 text-green-400">✓</span> Unlimited blog
                posts
              </li>
              <li className="flex items-center text-indigo-100">
                <span className="mr-2 text-green-400">✓</span> Custom newsletter
                integration
              </li>
              <li className="flex items-center text-indigo-100">
                <span className="mr-2 text-green-400">✓</span> Analytics
                dashboard
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
