import { API_URL } from "@/modules/core/api/apiConfig";
import axios from "axios";

const AUTH_TOKEN = localStorage.getItem("token");

export const createProject = async (projectData: any) => {
    console.log(projectData); // ! todo: delete
    try {
        const response = await axios.post(`${API_URL}/projects/projects/`, projectData, {
            headers: {
                Authorization: `Bearer ${AUTH_TOKEN}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating project:", error);
        throw error;
    }
};

export const findProjects = async () => {
    try {
        const response = await axios.get(`${API_URL}/projects/projects/`, {
            headers: {
                Authorization: `Bearer ${AUTH_TOKEN}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating project:", error);
        throw error;
    }
};
