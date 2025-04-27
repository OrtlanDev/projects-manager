import axiosInstance from "@/modules/core/api/axiosInstance";

export const createTask = async (taskData: any) => {
    const { data } = await axiosInstance.post("/tasks/tasks/", taskData);
    return data;
};

export const findTasks = async () => {
    const { data } = await axiosInstance.get("/tasks/tasks/");
    return data;
};

export const findTaskById = async (taskId: string) => {
    const { data } = await axiosInstance.get(`/tasks/tasks/${taskId}/`);
    return data;
};

export const updateTask = async (taskId: string, taskData: any) => {
    const { data } = await axiosInstance.put(`/tasks/tasks/${taskId}/`, taskData);
    return data;
};

export const deleteTask = async (taskId: string) => {
    const { data } = await axiosInstance.delete(`/tasks/tasks/${taskId}/`);
    return data;
};
