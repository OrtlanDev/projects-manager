import { API_URL } from "@/modules/core/api/apiConfig";
import axios from "axios";

const getUserData = async (token: string) => {
    try {
        const response = await axios.get(`${API_URL}/auth/account/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};

const getUserId = async (): Promise<string> => {
    const token = localStorage.getItem("token");
    if (token) {
        const userData = await getUserData(token);
        return userData.id;
    }
    return "id";
};

export { getUserId };
