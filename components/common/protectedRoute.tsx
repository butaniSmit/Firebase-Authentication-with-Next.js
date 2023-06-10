import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
const token = localStorage.getItem("Token")
    if (!token) {
      router.push("/login");
    }
  return <>{token ? children : null}</>;
};

export default ProtectedRoute;

export const ProtectedRouteLogin = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
  const token = localStorage.getItem("Token")
      if (token) {
        router.push("/");
      }
    return <>{!token ? children : null}</>;
  };
