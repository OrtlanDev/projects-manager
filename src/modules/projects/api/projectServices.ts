import { axiosInstance } from "./axiosInstance";

export const createProject = async (projectData: any) => {
    const { data } = await axiosInstance.post("/projects/projects/", projectData);
    return data;
};

export const findProjects = async () => {
    const { data } = await axiosInstance.get("/projects/projects/");
    return data;
};

export const findProjectById = async (projectId: string) => {
    const { data } = await axiosInstance.get(`/projects/projects/${projectId}/`);
    return data;
};

export const updateProject = async (projectId: string, projectData: any) => {
    const { data } = await axiosInstance.put(`/projects/projects/${projectId}/`, projectData);
    return data;
};

export const deleteProject = async (projectId: string) => {
    const { data } = await axiosInstance.delete(`/projects/projects/${projectId}/`);
    return data;
};

export const setAsFavoriteProject = async (projectId: string, isFavorite: boolean) => {
    const { data } = await axiosInstance.put(`/projects/projects/${projectId}/`, { isFavorite });
    return data;
};
