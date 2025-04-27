import { axiosInstance } from "../../core/api/axiosInstance";

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

export const setAsFavoriteProject = async (projectId: string, favorite: boolean) => {
    const { data } = await axiosInstance.put(`/projects/projects/${projectId}/`, { favorite });
    return data;
};
