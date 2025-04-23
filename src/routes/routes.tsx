import { PrivateRoute } from "@/components/auth/private-route";
import { PublicRoute } from "@/components/auth/public-route";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/context/auth-context";
import AuthLayout from "@/layout/auth-layout";
import MainLayout from "@/layout/main-layout";
import { LoginPage } from "@/pages/auth-login-page";
import SignupPage from "@/pages/auth-signup-page";
import NotFoundPage from "@/pages/not-found-page";
import TaskPage from "@/pages/project-details-page";
import ProjectsPage from "@/pages/projects-page";
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
                            <Route index path="projects/1" element={<TaskPage />} />
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
