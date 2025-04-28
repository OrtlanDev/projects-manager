import axiosInstance from "@/modules/core/api/axiosInstance";

export const createTask = async (taskData: any) => {
    console.log(taskData);
    const { data } = await axiosInstance.post(`/tasks/${taskData.project}/tasks/`, taskData);
    return data;
};

export const findTasks = async (project: string) => {
    const { data } = await axiosInstance.get(`/tasks/${project}/tasks/`);
    console.log(data);
    return data;
};

export const findTaskById = async (taskId: string) => {
    const { data } = await axiosInstance.get(`/tasks/tasks/${taskId}/`);
    return data;
};

type UpdateTaskBody = {
    is_completed: boolean;
};

export const updateTask = async (taskId: string, project: string, body: UpdateTaskBody) => {
    console.log(body);
    const { data } = await axiosInstance.put(`/tasks/${project}/tasks/${taskId}/`, body);
    console.log(data);
    return data;
};

export const deleteTask = async (taskId: string) => {
    const { data } = await axiosInstance.delete(`/tasks/tasks/${taskId}/`);
    return data;
};
