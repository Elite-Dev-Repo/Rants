import { AlertTriangle, Home, RefreshCcw } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Error: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Icon Container */}
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-indigo-100 mb-8 animate-pulse">
          <AlertTriangle className="h-12 w-12 text-indigo-600" />
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Oops! Error 404
          </h1>
          <p className="text-lg text-gray-500">
            We couldn't assign that page to a route. It might have been moved or
            doesn't exist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Home className="mr-2 h-5 w-5" />
            Go Home
          </button>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <RefreshCcw className="mr-2 h-5 w-5" />
            Reload Page
          </button>
        </div>
      </div>

      {/* Footer Text */}
      <footer className="mt-16 text-sm text-gray-400">
        If this persists, please contact support.
      </footer>
    </div>
  );
};

export default Error;
