// src/modules/projects/api/projectServices.ts

import { axiosInstance } from "./axiosInstance";

// export interface ProjectData {
//     title: string;
//     description: string;
//     dueDate: string;
//     status: "planing" | "active" | "stopped" | "completed";
//   }
export const createProject = async (projectData: any) => {
    try {
        const { data } = await axiosInstance.post("/projects/projects/", projectData);
        return data;
    } catch (error) {
        console.error("Error creando proyecto:", error);
        throw new Error("No se pudo crear el proyecto.");
    }
};

export const findProjects = async () => {
    try {
        const { data } = await axiosInstance.get("/projects/projects/");
        return data;
    } catch (error) {
        console.error("Error obteniendo proyectos:", error);
        throw new Error("No se pudieron obtener los proyectos.");
    }
};

export const findProjectById = async (projectId: string) => {
    try {
        const { data } = await axiosInstance.get(`/projects/projects/${projectId}/`);
        return data;
    } catch (error) {
        console.error(`Error obteniendo proyecto ${projectId}:`, error);
        throw new Error("No se pudo obtener el proyecto.");
    }
};
export const updateProject = async (projectId: string, projectData: any) => {
    try {
        const { data } = await axiosInstance.put(`/projects/projects/${projectId}/`, projectData);
        return data;
    } catch (error) {
        console.error(`Error actualizando proyecto ${projectId}:`, error);
        throw new Error("No se pudo actualizar el proyecto.");
    }
};

export const deleteProject = async (projectId: string) => {
    try {
        const { data } = await axiosInstance.delete(`/projects/projects/${projectId}/`);
        return data;
    } catch (error) {
        console.error(`Error eliminando proyecto ${projectId}:`, error);
        throw new Error("No se pudo eliminar el proyecto.");
    }
};
