import { API_URL } from "@/modules/core/api/apiConfig";
import axios from "axios";
import { ProjectFormValues } from "../types/project-form";

export async function createProject(data: ProjectFormValues) {
    const payload = {
        name: data.name,
        description: data.description,
        status: data.status,
        dueDate: data.dueDate ? data.dueDate.toISOString() : null,
    };

    const response = await axios.post(`${API_URL}/projects/projects`, payload);
    return response.data;
}
