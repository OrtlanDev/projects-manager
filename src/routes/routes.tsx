import { PrivateRoute } from "@/components/auth/private-route";
import { AuthProvider } from "@/context/auth-context";
import AuthLayout from "@/layout/auth-layout";
import MainLayout from "@/layout/main-layout";
import { LoginPage } from "@/pages/auth-login";
import SignupPage from "@/pages/auth-signup";
import ProjectsPage from "@/pages/projects";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function RoutesMap() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/synchrony">
                        {/* Root */}
                        <Route
                            index
                            element={
                                <PrivateRoute>
                                    <Navigate to="dashboard" replace />
                                </PrivateRoute>
                            }
                        />

                        {/* Auth */}
                        <Route path="auth" element={<AuthLayout />}>
                            <Route path="login" element={<LoginPage />} />
                            <Route path="signup" element={<SignupPage />} />
                        </Route>

                        {/* Dashboard */}
                        <Route
                            path="dashboard"
                            element={
                                <PrivateRoute>
                                    <MainLayout />
                                </PrivateRoute>
                            }
                        >
                            <Route index element={<Navigate to="projects" replace />} />
                            <Route path="projects" element={<ProjectsPage />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default RoutesMap;
