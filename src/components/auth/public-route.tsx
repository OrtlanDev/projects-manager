import { useAuth } from "@/hooks/use-auth";
import { JSX } from "react";
import { Navigate } from "react-router-dom";

export function PublicRoute({ children }: { children: JSX.Element }) {
    const { isAuthenticated } = useAuth();
    // If user is authenticated, redirect to dashboard, else render children (login/signup pages)
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}
