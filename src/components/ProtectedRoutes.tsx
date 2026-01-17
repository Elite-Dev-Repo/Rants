import { Navigate } from "react-router-dom";
import { useState, useEffect, type ReactNode } from "react";
import { supabase } from "../supabaseClient";

interface ProtectedRoutesProps {
  children: ReactNode;
}

function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Supabase automatically checks if the session is valid
      // and refreshes it if necessary.
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error("Error checking auth session:", error);
      setIsAuthorized(false);
    }
  };

  // While checking the session, show a loader
  if (isAuthorized === null) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
          <p className="text-gray-500 font-medium">Checking session...</p>
        </div>
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
