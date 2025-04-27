import { API_URL } from "@/modules/core/api/apiConfig";
import axios from "axios";

export const createProject = async (projectData: any) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("authenticatedUser");

    try {
        const response = await axios.post(`${API_URL}/projects/projects/`, projectData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating project:", error);
        throw error;
    }
};
