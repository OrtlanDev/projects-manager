import { AuthProvider } from "@/modules/auth/context/auth-context";
import { PrivateRoute } from "@/modules/auth/ui/components/private-route";
import { PublicRoute } from "@/modules/auth/ui/components/public-route";
import AuthLayout from "@/modules/auth/ui/layouts/Auth";
import VerifyEmailPage from "@/modules/auth/ui/pages/EmailVerification";
import VerifiedEmailPage from "@/modules/auth/ui/pages/EmailVerified";
import { LoginPage } from "@/modules/auth/ui/pages/Login";
import SignupPage from "@/modules/auth/ui/pages/SignUp";
import { SidebarProvider } from "@/modules/core/ui/components/shadcn/sidebar";
import MainLayout from "@/modules/core/ui/layouts/Main";
import NotFoundPage from "@/modules/core/ui/pages/NotFound";
import TaskPage from "@/modules/projects/ui/pages/project-details-page";
import ProjectsPage from "@/modules/projects/ui/pages/projects-page";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function RoutesMap() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <SidebarProvider>
                    <Routes>
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
                        <Route
                            path="auth"
                            element={
                                <PublicRoute>
                                    <AuthLayout />
                                </PublicRoute>
                            }
                        >
                            <Route index path="login" element={<LoginPage />} />
                            <Route path="signup" element={<SignupPage />} />
                            <Route path="verify-email" element={<VerifyEmailPage />} />
                            <Route path="verify-email/:token" element={<VerifiedEmailPage />} />
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
                            <Route index path="projects" element={<ProjectsPage />} />
                            <Route index path="projects/:projectId" element={<TaskPage />} />
                        </Route>
                        {/* 404 Not Found */}
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </SidebarProvider>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default RoutesMap;
