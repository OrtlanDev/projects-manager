import { API_URL } from "@/modules/core/api/apiConfig";
import axios from "axios";

export async function refreshAuthToken() {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        throw new Error("No refresh token available.");
    }

    const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
        refreshToken,
    });

    const { token, refreshToken: newRefreshToken } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", newRefreshToken);

    return token;
}
