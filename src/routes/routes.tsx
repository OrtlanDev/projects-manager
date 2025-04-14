import MainLayout from "@/layout/main-layout";
import ProjectsPage from "@/pages/projects";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function RoutesMap() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard/projects" replace />} />
                <Route path="/dashboard" element={<MainLayout />}>
                    <Route path="projects" element={<ProjectsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesMap;
