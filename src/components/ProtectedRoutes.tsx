import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect, type ReactNode } from "react";

interface ProtectedRoutesProps {
  children: ReactNode;
}

function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    auth().catch(() => {
      setIsAuthorized(false);
    });
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const response = await api.post("/blogapi/token/refresh", {
        refresh: refreshToken,
      });
      if (response.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
        localStorage.setItem(REFRESH_TOKEN, response.data.refreshToken);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
        await refreshToken();
      } else {
        setIsAuthorized(true);
      }
    } catch {
      setIsAuthorized(false);
    }
  };

  if (isAuthorized === null) {
    return <div>A minute...</div>;
  }

  return isAuthorized ? <>{children}</> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
