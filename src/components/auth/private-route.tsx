import { useAuth } from "@/hooks/use-auth";
import { JSX } from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: { children: JSX.Element }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/synchrony/auth/login" replace />;
}
