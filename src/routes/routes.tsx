import { PrivateRoute } from "@/components/auth/private-route";
import { AuthProvider } from "@/context/auth-context";
import MainLayout from "@/layout/main-layout";
import { LoginPage } from "@/pages/auth-login";
import ProjectsPage from "@/pages/projects";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function RoutesMap() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Navigate to="/dashboard" replace />
                            </PrivateRoute>
                        }
                    />

                    <Route path="/login" element={<LoginPage />} />

                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <MainLayout />
                            </PrivateRoute>
                        }
                    >
                        <Route index element={<Navigate to="/dashboard/projects" replace />} />
                        <Route path="projects" element={<ProjectsPage />} />
                    </Route>

                    {/* Ruta catch-all para cualquier ruta no definida: redirige a /login */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default RoutesMap;
